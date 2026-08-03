"""Prepare the public Kaggle baseline notebooks for experience projects 01 and 02.

The local practice notebooks intentionally retain TODOs for students.  This helper
only fills the copies under tmp/kaggle-publish, which are the public Kaggle runs
used to produce the real result assets shown on the site.
"""

import json
import os
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PUBLISH_ROOT = Path(os.environ.get('KAGGLE_NOTEBOOK_ROOT', str(ROOT / 'tmp' / 'kaggle-publish')))


def load_notebook(name):
    path = PUBLISH_ROOT / name / f"KYDW_TRY_{name.upper()}.ipynb"
    return path, json.loads(path.read_text(encoding="utf-8"))


def put(nb, index, source):
    cell = nb["cells"][index]
    cell["source"] = [line + ("\n" if not line.endswith("\n") else "") for line in source.strip("\n").splitlines()]
    cell.pop("outputs", None)
    cell["execution_count"] = None


def save(path, nb):
    path.write_text(json.dumps(nb, ensure_ascii=True, indent=1), encoding="utf-8")


def complete_a01():
    path, nb = load_notebook("a01")
    put(nb, 4, r'''
ROOT=Path('/kaggle/input') if Path('/kaggle/input').exists() else Path.cwd()/'data'
all_tif=list(ROOT.rglob('*.tif'))+list(ROOT.rglob('*.png'))
mask_paths=[p for p in all_tif if '_mask' in p.stem.lower()]
pairs=[]
for m in mask_paths:
    img=Path(str(m).replace('_mask',''))
    if img.exists():
        patient=m.parent.name
        pairs.append((img,m,patient))
if not pairs:
    try:
        import kagglehub
        downloaded=Path(kagglehub.dataset_download('mateuszbuda/lgg-mri-segmentation'))
        all_tif=list(downloaded.rglob('*.tif'))+list(downloaded.rglob('*.png'))
        mask_paths=[p for p in all_tif if '_mask' in p.stem.lower()]
        for m in mask_paths:
            img=Path(str(m).replace('_mask',''))
            if img.exists(): pairs.append((img,m,m.parent.name))
    except Exception as exc:
        print('dataset fallback failed:', type(exc).__name__, exc)
random.Random(SEED).shuffle(pairs)
print('paired slices:',len(pairs))
assert pairs, '没有找到配对 MRI 与 mask，请查看额外注意事项中的数据集挂载说明。'
''')
    put(nb, 6, r'''
# TODO 1：完成数据检查
patient_count = len({patient for _, _, patient in pairs})
positive_masks = 0
for _, mask_path, _ in pairs:
    mask_array=np.asarray(Image.open(mask_path).convert('L'))
    positive_masks += int((mask_array>0).any())
empty_ratio = 1 - positive_masks / len(pairs)

sample_img_path, sample_mask_path, _ = pairs[len(pairs)//2]
img=np.array(Image.open(sample_img_path).convert('L'))
mask=np.array(Image.open(sample_mask_path).convert('L'))>0
print('patients:',patient_count,'positive masks:',positive_masks,'empty ratio:',empty_ratio)
print('sample shape:',img.shape,mask.shape)

fig,ax=plt.subplots(1,3,figsize=(10,3))
ax[0].imshow(img,cmap='gray'); ax[0].set_title('MRI')
ax[1].imshow(mask,cmap='gray'); ax[1].set_title('mask')
ax[2].imshow(img,cmap='gray'); ax[2].imshow(mask,alpha=.4,cmap='viridis'); ax[2].set_title('overlay')
for a in ax:a.axis('off')
plt.tight_layout(); plt.savefig(OUT/'task1_data_check.png',dpi=160); plt.show()
''')
    put(nb, 11, r'''
def dice_score(prob,target,threshold=.5,eps=1e-6):
    pred=(prob>=threshold).float()
    intersection=(pred*target).sum(dim=(1,2,3))
    denom=pred.sum(dim=(1,2,3))+target.sum(dim=(1,2,3))
    return ((2*intersection+eps)/(denom+eps)).mean()

def soft_dice_score(prob,target,eps=1e-6):
    inter=(prob*target).sum(dim=(1,2,3))
    return (2*inter+eps)/(prob.sum(dim=(1,2,3))+target.sum(dim=(1,2,3))+eps)
''')
    put(nb, 13, r'''
class DoubleConv(nn.Module):
    def __init__(self,cin,cout):
        super().__init__()
        self.block=nn.Sequential(
            nn.Conv2d(cin,cout,3,padding=1),nn.ReLU(inplace=True),
            nn.Conv2d(cout,cout,3,padding=1),nn.ReLU(inplace=True))
    def forward(self,x): return self.block(x)

class TinyUNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.e1=DoubleConv(1,16); self.p1=nn.MaxPool2d(2)
        self.e2=DoubleConv(16,32); self.p2=nn.MaxPool2d(2)
        self.b=DoubleConv(32,64)
        self.u2=nn.ConvTranspose2d(64,32,2,2); self.d2=DoubleConv(64,32)
        self.u1=nn.ConvTranspose2d(32,16,2,2); self.d1=DoubleConv(32,16)
        self.out=nn.Conv2d(16,1,1)
    def forward(self,x):
        e1=self.e1(x); e2=self.e2(self.p1(e1)); b=self.b(self.p2(e2))
        d2=self.d2(torch.cat([self.u2(b),e2],1))
        d1=self.d1(torch.cat([self.u1(d2),e1],1))
        return self.out(d1)

model=TinyUNet().to(DEVICE)
print('parameters:',sum(p.numel() for p in model.parameters()))
''')
    put(nb, 15, r'''
bce=nn.BCEWithLogitsLoss()
opt=torch.optim.Adam(model.parameters(),lr=1e-3)

def run_epoch(loader,training):
    model.train(training); losses=[]; dices=[]
    for x,y,_ in loader:
        x=x.to(DEVICE); y=y.to(DEVICE)
        if training:
            opt.zero_grad()
        logits=model(x); prob=torch.sigmoid(logits)
        loss=bce(logits,y)+(1-soft_dice_score(prob,y)).mean()
        if training:
            loss.backward(); opt.step()
        losses.append(float(loss.detach().cpu())); dices.append(float(dice_score(prob,y).detach().cpu()))
    return np.mean(losses),np.mean(dices)

history=[]; best=None; best_d=-1
for epoch in range(3):
    tl,td=run_epoch(train_loader,True); vl,vd=run_epoch(val_loader,False)
    history.append((tl,td,vl,vd)); print(epoch+1,history[-1])
    if vd>best_d: best_d=vd; best={k:v.detach().cpu().clone() for k,v in model.state_dict().items()}
model.load_state_dict(best)
''')
    put(nb, 18, r'''
# TODO 5：完成阈值选择
thresholds=[.3,.5,.7]
val_dices={}

def evaluate(loader,threshold):
    model.eval(); ds=[]; ious=[]; positive_ds=[]; positive_ious=[]; examples=[]
    empty_true=empty_pred=both_empty=0
    with torch.no_grad():
        for x,y,pid in loader:
            prob=torch.sigmoid(model(x.to(DEVICE))).cpu(); pred=(prob>=threshold).float()
            target_area=y.sum((1,2,3)); pred_area=pred.sum((1,2,3))
            empty_true += int((target_area==0).sum()); empty_pred += int((pred_area==0).sum())
            both_empty += int(((target_area==0)&(pred_area==0)).sum())
            inter=(pred*y).sum((1,2,3)); union=((pred+y)>0).float().sum((1,2,3))
            d=(2*inter+1e-6)/(pred.sum((1,2,3))+y.sum((1,2,3))+1e-6)
            i=(inter+1e-6)/(union+1e-6)
            positive=target_area>0
            ds.extend(d.numpy()); ious.extend(i.numpy()); positive_ds.extend(d[positive].numpy()); positive_ious.extend(i[positive].numpy())
            if len(examples)<4:
                for k in range(min(4-len(examples),len(x))): examples.append((x[k,0].numpy(),y[k,0].numpy(),prob[k,0].numpy()))
    stats={'total':len(ds),'empty_true':empty_true,'empty_pred':empty_pred,'both_empty':both_empty,'positive_true':len(positive_ds),'positive_dice':float(np.mean(positive_ds)) if positive_ds else None,'positive_iou':float(np.mean(positive_ious)) if positive_ious else None}
    return float(np.mean(ds)),float(np.mean(ious)),examples,stats

for threshold in thresholds:
    val_dices[threshold]=evaluate(val_loader,threshold)[0]
best_threshold=max(val_dices,key=val_dices.get)
print('validation dice by threshold:',val_dices)
test_dice,test_iou,examples,test_stats=evaluate(test_loader,best_threshold)
print('test:',best_threshold,test_dice,test_iou)
print('test mask stats:',test_stats)
''')
    put(nb, 19, r'''
fig,ax=plt.subplots(len(examples),3,figsize=(8,2.5*len(examples)))
for r,(x,y,p) in enumerate(examples):
    ax[r,0].imshow(x,cmap='gray'); ax[r,0].set_title('MRI')
    ax[r,1].imshow(y,cmap='gray'); ax[r,1].set_title('true mask')
    ax[r,2].imshow(x,cmap='gray'); ax[r,2].imshow(p>=best_threshold,alpha=.4,cmap='viridis'); ax[r,2].set_title('prediction')
    for c in range(3): ax[r,c].axis('off')
plt.tight_layout(); plt.savefig(OUT/'task1_prediction.png',dpi=160); plt.show()

result={'train_slices':len(train_ds),'validation_slices':len(val_ds),'test_slices':len(test_ds),'best_threshold':best_threshold,'test_dice':test_dice,'test_iou':test_iou,'test_mask_stats':test_stats,'seed':SEED}
(OUT/'task1_result.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
result
''')
    save(path, nb)


def complete_a02():
    path, nb = load_notebook("a02")
    put(nb, 2, r'''
from pathlib import Path
import json, random
import numpy as np
import matplotlib.pyplot as plt
import torch
import torch.nn as nn
from torch.utils.data import DataLoader,Subset
from torchvision import datasets,transforms,utils

SEED=42
random.seed(SEED); np.random.seed(SEED); torch.manual_seed(SEED)
try:
    gpu_ok=torch.cuda.is_available() and torch.cuda.get_device_capability(0)[0]>=7
except Exception:
    gpu_ok=False
DEVICE=torch.device('cuda' if gpu_ok else 'cpu')
OUT=Path('/kaggle/working') if Path('/kaggle/working').exists() else Path.cwd()/'outputs'; OUT.mkdir(exist_ok=True)
print('device:',DEVICE)
''')
    put(nb, 4, r'''
ROOT=Path('/kaggle/input') if Path('/kaggle/input').exists() else Path.cwd()/'data'
candidates=[p for p in ROOT.rglob('train') if (p/'NORMAL').exists() or (p/'PNEUMONIA').exists()]
if not candidates:
    try:
        import kagglehub
        downloaded=Path(kagglehub.dataset_download('paultimothymooney/chest-xray-pneumonia'))
        candidates=[p for p in downloaded.rglob('train') if (p/'NORMAL').exists() or (p/'PNEUMONIA').exists()]
    except Exception as exc:
        print('dataset fallback failed:', type(exc).__name__, exc)
assert candidates,'未找到胸片 train 目录。'
DATA_ROOT=candidates[0]
transform=transforms.Compose([transforms.Grayscale(1),transforms.Resize(72),transforms.CenterCrop(64),transforms.ToTensor(),transforms.Normalize([.5],[.5])])
ds=datasets.ImageFolder(DATA_ROOT,transform=transform)
MAX_IMAGES=min(1000,len(ds)); ds=Subset(ds,list(range(MAX_IMAGES)))
NUM_WORKERS=2 if Path('/kaggle/input').exists() else 0
loader=DataLoader(ds,batch_size=64,shuffle=True,num_workers=NUM_WORKERS,drop_last=True)
real,_=next(iter(loader)); utils.save_image((real[:36]+1)/2,OUT/'task2_real_xray_grid.png',nrow=6)

real_display=((real+1)/2).clamp(0,1)
plt.figure(figsize=(7.2,4.2))
plt.hist(real_display.flatten().numpy(),bins=60,color='#2b7b9b',alpha=.88)
plt.xlabel('pixel intensity [0,1]'); plt.ylabel('count')
plt.title('Real chest X-ray intensity distribution')
plt.tight_layout(); plt.savefig(OUT/'task2_intensity_histogram.png',dpi=160); plt.show()
print('images:',len(ds),real.shape,real.min().item(),real.max().item())
''')
    put(nb, 8, r'''
LATENT=100
class Generator(nn.Module):
    def __init__(self):
        super().__init__()
        self.net=nn.Sequential(
            nn.ConvTranspose2d(LATENT,256,4,1,0,bias=False),nn.BatchNorm2d(256),nn.ReLU(True),
            nn.ConvTranspose2d(256,128,4,2,1,bias=False),nn.BatchNorm2d(128),nn.ReLU(True),
            nn.ConvTranspose2d(128,64,4,2,1,bias=False),nn.BatchNorm2d(64),nn.ReLU(True),
            nn.ConvTranspose2d(64,32,4,2,1,bias=False),nn.BatchNorm2d(32),nn.ReLU(True),
            nn.ConvTranspose2d(32,1,4,2,1,bias=False),nn.Tanh())
    def forward(self,z): return self.net(z)

class Discriminator(nn.Module):
    def __init__(self):
        super().__init__()
        self.net=nn.Sequential(
            nn.Conv2d(1,32,4,2,1),nn.LeakyReLU(.2,True),
            nn.Conv2d(32,64,4,2,1),nn.BatchNorm2d(64),nn.LeakyReLU(.2,True),
            nn.Conv2d(64,128,4,2,1),nn.BatchNorm2d(128),nn.LeakyReLU(.2,True),
            nn.Conv2d(128,256,4,2,1),nn.BatchNorm2d(256),nn.LeakyReLU(.2,True),
            nn.Conv2d(256,1,4,1,0))
    def forward(self,x): return self.net(x).flatten()

G=Generator().to(DEVICE); D=Discriminator().to(DEVICE)
print(G(torch.randn(2,LATENT,1,1,device=DEVICE)).shape)
''')
    put(nb, 10, r'''
criterion=nn.BCEWithLogitsLoss()
opt_g=torch.optim.Adam(G.parameters(),lr=2e-4,betas=(.5,.999))
opt_d=torch.optim.Adam(D.parameters(),lr=2e-4,betas=(.5,.999))
fixed_z=torch.randn(36,LATENT,1,1,device=DEVICE)
history={'g':[],'d':[]}

for epoch in range(4):
    for real,_ in loader:
        real=real.to(DEVICE); b=len(real)
        ones=torch.ones(b,device=DEVICE); zeros=torch.zeros(b,device=DEVICE)
        opt_d.zero_grad()
        real_logits=D(real)
        fake=G(torch.randn(b,LATENT,1,1,device=DEVICE))
        fake_logits=D(fake.detach())
        loss_d=criterion(real_logits,ones)+criterion(fake_logits,zeros)
        loss_d.backward(); opt_d.step()
        opt_g.zero_grad()
        fake=G(torch.randn(b,LATENT,1,1,device=DEVICE))
        loss_g=criterion(D(fake),ones)
        loss_g.backward(); opt_g.step()
        history['d'].append(float(loss_d.detach().cpu())); history['g'].append(float(loss_g.detach().cpu()))
    with torch.no_grad(): fake=G(fixed_z).cpu()
    utils.save_image((fake+1)/2,OUT/f'task2_epoch_{epoch+1}.png',nrow=6)
    print(epoch+1,np.mean(history['d'][-len(loader):]),np.mean(history['g'][-len(loader):]))
''')
    save(path, nb)


if __name__ == "__main__":
    complete_a01()
    complete_a02()
    print("prepared public Kaggle notebooks")
