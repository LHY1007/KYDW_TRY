from __future__ import annotations

import ast
import copy
import json
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(r"D:\00_同步\BaiduSyncdisk\01_学术研究\学生\KYDW\网站内容")
RUNNER = Path(r"D:\00_同步\BaiduSyncdisk\01_学术研究\展示\山大\tools\run_experience_0305_reference.py")
DATASETS = {
    "a03": ["liuhanyu1007/sdu-neuro-3-public-morphology-data"],
    "a04": ["liuhanyu1007/sdu-neuro-4-tabular-data"],
    "a05": ["liuhanyu1007/kydw-try-a05-paired-patches-public"],
}
KERNEL_IDS = {
    # The original A05 kernel retained a private datasource in its history;
    # use a fresh public slug for the student-facing entry.
    "a05": "liuhanyu1007/kydw-try-a05-public",
}


def load(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def dump(path: Path, value: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


def set_source(cell: dict, text: str) -> None:
    cell["source"] = [line + "\n" for line in text.rstrip().splitlines()]
    cell["execution_count"] = None
    cell["outputs"] = []


def runner_source(function_name: str, filename: str) -> str:
    raw = RUNNER.read_text(encoding="utf-8")
    tree = ast.parse(raw)
    lines = raw.splitlines()
    target = next(node for node in tree.body if isinstance(node, ast.FunctionDef) and node.name == function_name)
    # Include every helper defined before the selected runner function.  The
    # visual reference workflow uses shared data-selection and plotting helpers
    # in addition to the project function itself.
    preamble = "\n".join(lines[: target.lineno - 1])
    function = "\n".join(lines[target.lineno - 1 : target.end_lineno])
    return preamble + "\n\n" + function + f"\n\nDATA_PATH = sorted(Path('/kaggle/input').rglob('{filename}'))[0]\nOUT = Path('/kaggle/working')\n{function_name}(DATA_PATH, OUT)"


def reference_experience(public_no: str, student: dict) -> dict:
    nb = copy.deepcopy(student)
    project = f"a{public_no}"
    if project == "a03":
        set_source(nb["cells"][3], "summary = {kind: {'patches': int((split==kind).sum()), 'sources': np.unique(source_image_ids[split==kind]).tolist(), 'coordinate_min_yx': coordinates_yx[split==kind].min(axis=0).tolist(), 'coordinate_max_yx': coordinates_yx[split==kind].max(axis=0).tolist(), 'class_counts': np.bincount(labels[split==kind], minlength=3).tolist()} for kind in ('train','validation','test')}\nprint(summary)")
        set_source(nb["cells"][5], "usable_features = morphology_features[:, 1:]  # 排除由标签生成规则得到的 proxy_score\ntrain_mask = split == 'train'  # 任务2只用训练集统计，避免把测试集信息混入观察\nrgb = images.astype(np.float32) / 255.0  # 将RGB强度缩放到0到1，便于比较颜色统计\nfeature_summary = {\n    'feature_names': feature_names[1:].tolist(),\n    'train_mean': dict(zip(feature_names[1:].tolist(), np.round(usable_features[train_mask].mean(axis=0), 4).tolist())),\n    'train_std': dict(zip(feature_names[1:].tolist(), np.round(usable_features[train_mask].std(axis=0), 4).tolist())),\n    'train_rgb_mean': np.round(rgb[train_mask].mean(axis=(0, 1, 2)), 4).tolist(),\n    'rgb_mean_by_class': {str(k): np.round(rgb[train_mask & (labels == k)].mean(axis=(0, 1, 2)), 4).tolist() for k in range(3)},\n}\nprint(feature_summary)")
        set_source(nb["cells"][7], "usable_features = morphology_features[:, 1:]  # 排除由标签生成规则得到的 proxy_score\nmodel = RandomForestClassifier(n_estimators=600, max_features=0.8, class_weight='balanced', random_state=SEED, n_jobs=4)\nmodel.fit(usable_features[split=='train'], labels[split=='train'])\nprint(model)")
        set_source(nb["cells"][9], runner_source("run_project03", "meningioma_public_morphology_tiles.npz"))
        set_source(nb["cells"][11], "result=json.loads((OUT/'task3_pytorch_result.json').read_text())\nprint(result)")
    elif project == "a04":
        set_source(nb["cells"][3], "summary={'class_counts':df['label'].value_counts().to_dict(),'highest_missing':X.isna().mean().sort_values(ascending=False).head(10).to_dict(),'numeric_columns':list(X.select_dtypes(include=np.number).columns),'categorical_columns':[c for c in X if c not in X.select_dtypes(include=np.number).columns]}\nprint(summary)")
        set_source(nb["cells"][7], "model=Pipeline([('pre',pre),('clf',XGBClassifier(n_estimators=180,max_depth=3,learning_rate=.05,objective='multi:softprob',num_class=len(y_encoder.classes_),subsample=.8,colsample_bytree=.8,eval_metric='mlogloss',random_state=SEED,n_jobs=4,tree_method='hist'))])\nprint(model)")
        set_source(nb["cells"][9], runner_source("run_project04", "Data.csv"))
        set_source(nb["cells"][11], "result=json.loads((OUT/'task4_result.json').read_text())\nprint('high-confidence errors:',result['high_confidence_errors'])\nprint(result)")
    else:
        # 项目 05 在题目版中包含独立的三图可视化任务，插入后代码单元位置为 3、5、7、9、11。
        set_source(nb["cells"][3], "summary={'shapes':{'he':list(he.shape),'lr':list(lr.shape),'hr':list(hr.shape)},'split_counts':{k:int((split==k).sum()) for k in np.unique(split)},'nonzero_ratio':float((hr>0).mean()),'maximum':float(hr.max())}\nprint(summary)")
        set_source(nb["cells"][5], "sample_index=int(np.where(split=='train')[0][0])\nfig,axes=plt.subplots(1,3,figsize=(11,3))\naxes[0].imshow(np.moveaxis(he[sample_index],0,-1)); axes[0].set_title('H&E')\naxes[1].imshow(lr[sample_index,0]/64.0,cmap='magma'); axes[1].set_title('LR / 64')\naxes[2].imshow(hr[sample_index,0],cmap='magma'); axes[2].set_title('HR reference')\nfor ax in axes: ax.axis('off')\nfig.tight_layout(); fig.savefig(OUT/'task5_data_visualization_student.png',dpi=160); plt.show()")
        set_source(nb["cells"][7], "class STDataset(Dataset):\n    def __init__(self,kind): self.ids=np.where(split==kind)[0]\n    def __len__(self): return len(self.ids)\n    def __getitem__(self,k):\n        i=int(self.ids[k]); lr_total=lr[i]; x=np.concatenate([he[i],np.log1p(lr_total/64.0)],axis=0); y=np.log1p(hr[i]); return torch.from_numpy(x),torch.from_numpy(y),torch.from_numpy(lr_total),i\nclass SRNet(nn.Module):\n    def __init__(self):\n        super().__init__(); self.body=nn.Sequential(nn.Conv2d(4,16,3,padding=1),nn.ReLU(),nn.Conv2d(16,16,3,padding=1),nn.ReLU(),nn.Conv2d(16,1,3,padding=1))\n    def forward(self,x): return torch.nn.functional.softplus(x[:,3:4]+self.body(x))\nmodel=SRNet().to(DEVICE)\nprint(model)")
        set_source(nb["cells"][9], "def aggregate8(x): return torch.nn.functional.avg_pool2d(x,8,8)*64\ndef loss_fn(pred_log,target_log,lr_raw):\n    pred=torch.expm1(pred_log).clamp_min(0); l1=(pred_log-target_log).abs().mean(); consistency=(aggregate8(pred)-torch.nn.functional.avg_pool2d(lr_raw,8,8)).abs().mean(); return l1+.1*consistency")
        set_source(nb["cells"][11], runner_source("run_project05", "kydw-try-a05-paired-patches.npz"))
    return nb


def metadata(identifier: str, title: str, code_file: str, datasets: list[str], gpu: bool = False, private: bool = True) -> dict:
    return {
        "id": identifier,
        "title": title,
        "code_file": code_file,
        "language": "python",
        "kernel_type": "notebook",
        "is_private": private,
        "enable_gpu": gpu,
        "enable_tpu": False,
        "enable_internet": True,
        "keywords": ["KYDW", "research-experience"],
        "dataset_sources": datasets,
        "kernel_sources": [],
        "competition_sources": [],
        "model_sources": [],
    }


def package(folder: Path, notebook: dict, meta: dict) -> None:
    if folder.exists():
        shutil.rmtree(folder)
    folder.mkdir(parents=True)
    dump(folder / meta["code_file"], notebook)
    dump(folder / "kernel-metadata.json", meta)


def main() -> None:
    publish = ROOT / "tmp" / "kaggle-20260808"
    for public_no in ("03", "04", "05"):
        site_no = f"{int(public_no)+1:02d}"
        student = load(ROOT / "experience" / "practice" / f"project-{site_no}.ipynb")
        reference = reference_experience(public_no, student)
        # Keep the existing remote filenames so ``kaggle kernels push`` updates
        # the current public entry instead of creating a second code file.
        kernel_id = KERNEL_IDS.get(f"a{public_no}", f"liuhanyu1007/kydw-try-a{public_no}")
        practice_code_file = f"{kernel_id.rsplit('/', 1)[-1]}.ipynb"
        reference_id = f"{kernel_id}-reference"
        reference_code_file = f"{reference_id.rsplit('/', 1)[-1]}.ipynb"
        title_suffix = "_PUBLIC" if f"a{public_no}" in KERNEL_IDS else ""
        package(publish / f"a{public_no}-practice", student, metadata(kernel_id, f"KYDW_TRY_A{public_no}{title_suffix}", practice_code_file, DATASETS[f"a{public_no}"], False, False))
        package(publish / f"a{public_no}-reference", reference, metadata(reference_id, f"KYDW_TRY_A{public_no}{title_suffix}_REFERENCE", reference_code_file, DATASETS[f"a{public_no}"], False, False))
    for public_no in range(6):
        public_id=f"{public_no:02d}"; site_no=f"{public_no+1:02d}"
        student=load(ROOT/"experience"/"advanced-practice"/f"project-{site_no}.ipynb")
        reference=load(ROOT/"experience"/"advanced-answers"/f"project-{site_no}.ipynb")
        datasets=DATASETS.get(f"a{public_id}",[])
        code_file=f"KYDW_ADVANCED_A{public_id}.ipynb"
        package(publish/f"advanced-a{public_id}-practice",student,metadata(f"liuhanyu1007/kydw-advanced-a{public_id}",f"KYDW_ADVANCED_A{public_id}",code_file,datasets))
        package(publish/f"advanced-a{public_id}-reference",reference,metadata(f"liuhanyu1007/kydw-advanced-a{public_id}-reference",f"KYDW_ADVANCED_A{public_id}_REFERENCE",code_file,datasets))
    dataset=publish/"dataset-a05"; dataset.mkdir(parents=True,exist_ok=True)
    shutil.copy2(SOURCE/"体验项目"/"数据"/"kydw-try-a05-paired-patches.npz",dataset/"kydw-try-a05-paired-patches.npz")
    dump(dataset/"dataset-metadata.json",{"title":"KYDW TRY A05 Paired Patches Public","id":"liuhanyu1007/kydw-try-a05-paired-patches-public","subtitle":"配对 H&E、LR 与 HR 表达图教学数据","description":"用于 KYDW 空间转录组表达超分辨率实践的配对教学数据。","licenses":[{"name":"CC0-1.0"}]})
    print(publish)


if __name__ == "__main__":
    main()
