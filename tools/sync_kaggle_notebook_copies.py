"""Build the public Kaggle copies for the three currently open experience projects.

The practice notebooks are the source of truth for teaching text and comments.
The reference copies start from the same notebooks and replace only executable
placeholders.  This keeps task numbers, explanations and beginner-facing
comments identical while making the reference copy runnable from top to bottom.
"""

from __future__ import annotations

import copy
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PAIRS = {
    "a00": ("project-01.ipynb", "KYDW_TRY_A00.ipynb"),
    "a01": ("project-02.ipynb", "KYDW_TRY_A01.ipynb"),
    "a02": ("project-03.ipynb", "KYDW_TRY_A02.ipynb"),
}


def load(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def dump(path: Path, notebook: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(notebook, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


def ensure_cell_ids(notebook: dict) -> bool:
    """为旧式 Notebook 补上稳定的单元格 ID，保持题目版与参考版结构可校验。"""
    changed = False
    for index, cell in enumerate(notebook.get("cells", [])):
        if not cell.get("id"):
            cell["id"] = f"cell-{index:02d}"
            changed = True
    return changed


def source(cell: dict) -> str:
    return "".join(cell.get("source", []))


def set_source(cell: dict, text: str) -> None:
    cell["source"] = [line + "\n" for line in text.rstrip("\n").split("\n")]


def code_cell(notebook: dict, index: int) -> dict:
    cell = notebook["cells"][index]
    if cell.get("cell_type") != "code":
        raise ValueError(f"第 {index} 个单元格不是代码单元格")
    return cell


def replace_exact(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise ValueError(f"{label}：期望替换 1 次，实际为 {count}")
    return text.replace(old, new)


def complete_a00(reference: dict) -> None:
    cell = code_cell(reference, 6)
    text = source(cell)
    for old, new in (
        ("sample_count = None", "sample_count = len(train_full)"),
        ("image_shape = None", "image_shape = tuple(sample_image.shape)"),
        ("image_dtype = None", "image_dtype = str(sample_image.dtype)"),
        ("pixel_min = None", "pixel_min = float(sample_image.min())"),
        ("pixel_max = None", "pixel_max = float(sample_image.max())"),
        ("class_counts = None", "class_counts = torch.bincount(all_labels, minlength=10)"),
    ):
        text = replace_exact(text, old, new, f"项目00任务1 {old}")
    set_source(cell, text)

    cell = code_cell(reference, 11)
    text = source(cell)
    text = replace_exact(
        text,
        "    # TODO：累计 images 的总和、平方和与像素数量\n    pass",
        "    # TODO：累计 images 的总和、平方和与像素数量\n"
        "    pixel_sum += images.sum().item()\n"
        "    pixel_sq_sum += (images ** 2).sum().item()\n"
        "    pixel_count += images.numel()",
        "项目00任务2 累计统计",
    )
    text = replace_exact(text, "train_mean = None", "train_mean = pixel_sum / pixel_count", "项目00任务2 均值")
    text = replace_exact(
        text,
        "train_std = None   # TODO，使用 E[x²] - E[x]²",
        "train_std = max(pixel_sq_sum / pixel_count - train_mean ** 2, 1e-8) ** 0.5   # TODO，使用 E[x²] - E[x]²",
        "项目00任务2 标准差",
    )
    set_source(cell, text)

    cell = code_cell(reference, 13)
    text = source(cell)
    text = replace_exact(
        text,
        "            # TODO 3A：加入 16→32 的 3×3 卷积、ReLU 和 2×2 最大池化\n# ===== 请在此处完成：项目00·任务3A 第二个卷积块（结束） =====",
        "            # TODO 3A：加入 16→32 的 3×3 卷积、ReLU 和 2×2 最大池化\n"
        "            nn.Conv2d(16, 32, kernel_size=3, padding=1),\n"
        "            nn.ReLU(),\n"
        "            nn.MaxPool2d(2),\n"
        "# ===== 请在此处完成：项目00·任务3A 第二个卷积块（结束） =====",
        "项目00任务3A 卷积块",
    )
    text = replace_exact(
        text,
        "            # TODO 3B：加入 32×7×7 → 64 的全连接层、ReLU，以及 64 → 10 的输出层\n# ===== 请在此处完成：项目00·任务3B 分类层（结束） =====",
        "            # TODO 3B：加入 32×7×7 → 64 的全连接层、ReLU，以及 64 → 10 的输出层\n"
        "            nn.Linear(32 * 7 * 7, 64),\n"
        "            nn.ReLU(),\n"
        "            nn.Linear(64, 10),\n"
        "# ===== 请在此处完成：项目00·任务3B 分类层（结束） =====",
        "项目00任务3B 分类层",
    )
    set_source(cell, text)

    cell = code_cell(reference, 15)
    text = source(cell)
    text = replace_exact(
        text,
        "        # 5. optimizer 更新参数\n        pass\n# ===== 请在此处完成：项目00·任务4 标准训练步骤（结束） =====",
        "        # 5. optimizer 更新参数\n"
        "        optimizer.zero_grad(set_to_none=True)\n"
        "        logits = model(images)\n"
        "        loss = criterion(logits, labels)\n"
        "        loss.backward()\n"
        "        optimizer.step()\n"
        "# ===== 请在此处完成：项目00·任务4 标准训练步骤（结束） =====",
        "项目00任务4 训练步骤",
    )
    set_source(cell, text)

    cell = code_cell(reference, 18)
    text = source(cell)
    text = replace_exact(
        text,
        "test_loss = None\ntest_acc = None\ny_true = None\ny_pred = None\nmacro_f1 = None\nper_class_f1 = None\ncm = None",
        "test_loss, test_acc, y_true, y_pred = evaluate(model, test_loader)\n"
        "macro_f1 = f1_score(y_true, y_pred, average='macro', zero_division=0)\n"
        "per_class_f1 = f1_score(y_true, y_pred, average=None, labels=np.arange(10), zero_division=0)\n"
        "cm = confusion_matrix(y_true, y_pred, labels=np.arange(10))",
        "项目00任务5 测试指标",
    )
    set_source(cell, text)

    cell = code_cell(reference, 21)
    text = source(cell)
    text = replace_exact(
        text,
        "noisy_loss = None\nnoisy_acc = None\naccuracy_drop = None",
        "noisy_loss, noisy_acc, _, _ = evaluate(model, test_loader, noise_sigma=noise_sigma)\n"
        "accuracy_drop = test_acc - noisy_acc",
        "项目00任务6 噪声评价",
    )
    set_source(cell, text)

    cell = code_cell(reference, 23)
    text = source(cell)
    text = replace_exact(
        text,
        "comparison = {\n    'changed_variable': None,\n    'baseline_value': None,\n    'new_value': None,\n    'baseline_best_val_accuracy': float(best_val),\n    'new_best_val_accuracy': None,\n    'observation': None,\n}",
        "comparison_model = SmallCNN().to(device)\n"
        "comparison_optimizer = torch.optim.Adam(comparison_model.parameters(), lr=1e-2)\n"
        "comparison_best = -1.0\n"
        "for _ in range(EPOCHS):\n"
        "    comparison_model.train()\n"
        "    for images, labels in train_loader:\n"
        "        images, labels = images.to(device), labels.to(device)\n"
        "        comparison_optimizer.zero_grad(set_to_none=True)\n"
        "        comparison_loss = criterion(comparison_model(normalize_batch(images)), labels)\n"
        "        comparison_loss.backward()\n"
        "        comparison_optimizer.step()\n"
        "    _, comparison_val, _, _ = evaluate(comparison_model, val_loader)\n"
        "    comparison_best = max(comparison_best, comparison_val)\n"
        "comparison = {\n"
        "    'changed_variable': 'learning_rate',\n"
        "    'baseline_value': 1e-3,\n"
        "    'new_value': 1e-2,\n"
        "    'baseline_best_val_accuracy': float(best_val),\n"
        "    'new_best_val_accuracy': float(comparison_best),\n"
        "    'observation': '只改变学习率，保持其他条件不变，重新训练并比较验证集最佳准确率。',\n"
        "}",
        "项目00任务7 对照记录",
    )
    set_source(cell, text)


def complete_a01(reference: dict) -> None:
    cell = code_cell(reference, 6)
    text = source(cell)
    text = replace_exact(
        text,
        "patient_count = None\npositive_masks = None\nempty_ratio = None",
        "patient_count = len({patient_id for _, _, patient_id in pairs})\n"
        "mask_nonempty = [bool(np.asarray(Image.open(mask_path).convert('L')).max() > 0) for _, mask_path, _ in pairs]\n"
        "positive_masks = int(np.sum(mask_nonempty))\n"
        "empty_ratio = float(1.0 - positive_masks / len(mask_nonempty))",
        "项目01任务1 数据统计",
    )
    set_source(cell, text)

    cell = code_cell(reference, 11)
    text = source(cell)
    text = replace_exact(
        text,
        "    # TODO 2：阈值化、计算交集与两侧面积\n    return None",
        "    # TODO 2：阈值化、计算交集与两侧面积\n"
        "    pred = (prob >= threshold).float()\n"
        "    dims = tuple(range(1, pred.ndim))\n"
        "    intersection = (pred * target).sum(dims)\n"
        "    denominator = pred.sum(dims) + target.sum(dims)\n"
        "    return ((2 * intersection + eps) / (denominator + eps)).mean()",
        "项目01任务2 Dice",
    )
    set_source(cell, text)

    cell = code_cell(reference, 13)
    text = source(cell)
    text = replace_exact(
        text,
        "        # TODO 3\n        self.block = None",
        "        # TODO 3\n"
        "        self.block = nn.Sequential(\n"
        "            nn.Conv2d(cin, cout, 3, padding=1, bias=False),\n"
        "            nn.GroupNorm(8, cout),\n"
        "            nn.ReLU(inplace=True),\n"
        "            nn.Conv2d(cout, cout, 3, padding=1, bias=False),\n"
        "            nn.GroupNorm(8, cout),\n"
        "            nn.ReLU(inplace=True),\n"
        "        )",
        "项目01任务3 卷积块",
    )
    set_source(cell, text)

    cell = code_cell(reference, 15)
    text = source(cell)
    text = replace_exact(
        text,
        "            # TODO 4：清梯度\n            pass",
        "            # TODO 4：清梯度\n            opt.zero_grad(set_to_none=True)",
        "项目01任务4 清梯度",
    )
    text = replace_exact(
        text,
        "            # TODO 4：反向传播与更新\n            pass",
        "            # TODO 4：反向传播与更新\n            loss.backward()\n            opt.step()",
        "项目01任务4 更新",
    )
    set_source(cell, text)

    cell = code_cell(reference, 18)
    text = source(cell)
    text = replace_exact(
        text,
        "# TODO 5：从 val_dices 中选择验证 Dice 最高的候选阈值。\nbest_threshold = None",
        "# TODO 5：从 val_dices 中选择验证 Dice 最高的候选阈值。\n"
        "for threshold in thresholds:\n"
        "    _, _, _, stats = evaluate(val_loader, threshold)\n"
        "    score = stats['positive_dice'] if stats['positive_dice'] is not None else 0.0\n"
        "    val_dices[threshold] = float(score)\n"
        "best_threshold = max(val_dices, key=val_dices.get)",
        "项目01任务5 阈值选择",
    )
    set_source(cell, text)


def complete_a02(reference: dict) -> None:
    cell = code_cell(reference, 8)
    text = source(cell)
    replacements = (
        ("        self.norm1=None", "        self.norm1=nn.GroupNorm(group_count(channels),channels)"),
        ("        self.conv1=None", "        self.conv1=nn.Conv2d(channels,channels,3,padding=1)"),
        ("        self.norm2=None", "        self.norm2=nn.GroupNorm(group_count(channels),channels)"),
        ("        self.conv2=None", "        self.conv2=nn.Conv2d(channels,channels,3,padding=1)"),
        ("        raise NotImplementedError('请补全 ResidualBlock.forward')", "        residual=x\n        x=self.conv1(self.activation(self.norm1(x)))\n        x=self.conv2(self.activation(self.norm2(x)))\n        return residual+x"),
        ("        self.down=None", "        self.down=nn.Conv2d(in_channels,out_channels,4,2,1)"),
        ("        self.norm=None", "        self.norm=nn.GroupNorm(group_count(out_channels),out_channels)"),
        ("        self.residual=None", "        self.residual=ResidualBlock(out_channels)"),
        ("        raise NotImplementedError('请补全 DownBlock.forward')", "        return self.residual(self.activation(self.norm(self.down(x))))"),
        ("        self.up=None", "        self.up=nn.ConvTranspose2d(in_channels,out_channels,4,2,1)"),
        ("        raise NotImplementedError('请补全 UpBlock.forward')", "        return self.residual(self.activation(self.norm(self.up(x))))"),
        ("        self.stem=None", "        self.stem=nn.Sequential(nn.Conv2d(1,32,3,padding=1),nn.GroupNorm(8,32),nn.SiLU(inplace=True))"),
        ("        self.encoder=None", "        self.encoder=nn.Sequential(ResidualBlock(32),DownBlock(32,64),DownBlock(64,128),DownBlock(128,256),DownBlock(256,256))"),
        ("        self.to_mu=None", "        self.to_mu=nn.Linear(256*4*4,latent_dim)"),
        ("        self.to_logvar=None", "        self.to_logvar=nn.Linear(256*4*4,latent_dim)"),
        ("        self.from_z=None", "        self.from_z=nn.Linear(latent_dim,256*4*4)"),
        ("        self.decoder=None", "        self.decoder=nn.Sequential(ResidualBlock(256),UpBlock(256,256),UpBlock(256,128),UpBlock(128,64),UpBlock(64,32),nn.Conv2d(32,1,3,padding=1),nn.Tanh())"),
        ("        raise NotImplementedError('请补全 ResidualConvVAE.encode')", "        features=self.encoder(self.stem(x)).flatten(1)\n        mu=self.to_mu(features)\n        logvar=self.to_logvar(features).clamp(-8,8)\n        return mu,logvar"),
        ("        raise NotImplementedError('请补全 ResidualConvVAE.reparameterize')", "        std=torch.exp(.5*logvar)\n        return mu+torch.randn_like(std)*std"),
        ("        raise NotImplementedError('请补全 ResidualConvVAE.decode')", "        features=self.from_z(z).view(-1,256,4,4)\n        return self.decoder(features)"),
        ("        raise NotImplementedError('请补全 ResidualConvVAE.forward')", "        mu,logvar=self.encode(x)\n        z=self.reparameterize(mu,logvar)\n        return self.decode(z),mu,logvar,z"),
    )
    for old, new in replacements:
        count = text.count(old)
        if count == 0:
            raise ValueError(f"项目02模型：找不到待替换内容 {old[:25]!r}")
        text = text.replace(old, new)
    set_source(cell, text)

    cell = code_cell(reference, 10)
    text = source(cell)
    placeholder = (
        "    reconstruction_component=None\n"
        "    edge_component=None\n"
        "    kl_component=None\n"
        "    total_loss=None\n"
        "    return total_loss,reconstruction_component,edge_component,kl_component"
    )
    if text.count(placeholder) != 1:
        raise ValueError("项目02任务3A：未找到唯一的损失函数占位代码")
    implementation = (
        "    reconstruction_component=F.l1_loss(reconstruction,target)\n"
        "    edge_component=gradient_loss(reconstruction,target)\n"
        "    kl_component=-.5*torch.mean(1+logvar-mu.square()-logvar.exp())\n"
        "    total_loss=reconstruction_component+EDGE_WEIGHT*edge_component+beta*kl_component\n"
        "    return total_loss,reconstruction_component,edge_component,kl_component"
    )
    text = text.replace(placeholder, implementation)
    train_forward = "        reconstruction,mu,logvar,_=vae(batch_images)"
    if text.count(train_forward) != 1:
        raise ValueError("项目02任务3B：未找到唯一的前向计算位置")
    text = text.replace(
        train_forward,
        "        optimizer.zero_grad(set_to_none=True)\n" + train_forward,
    )
    train_loss = "        total_loss,reconstruction_component,edge_component,kl_component=vae_loss(reconstruction,batch_images,mu,logvar,beta)"
    if text.count(train_loss) != 1:
        raise ValueError("项目02任务3B：未找到唯一的损失计算位置")
    text = text.replace(
        train_loss,
        train_loss + "\n        total_loss.backward()\n        optimizer.step()",
    )
    set_source(cell, text)


def comment_lines(notebook: dict) -> list[str]:
    lines: list[str] = []
    for cell in notebook.get("cells", []):
        if cell.get("cell_type") != "code":
            continue
        for line in source(cell).splitlines():
            stripped = line.strip()
            if stripped.startswith("#"):
                lines.append(stripped)
            elif "#" in line:
                lines.append(line[line.index("#") :].strip())
    return lines


AUTO_INLINE_COMMENT = re.compile(
    r"\s{2}# (?:导入当前步骤需要的工具|定义本任务使用的模型或数据结构|定义可重复调用的计算步骤|"
    r"逐批或逐样本执行当前步骤|根据当前条件选择处理分支|处理另一种情况或异常|在受控上下文中读取或计算|"
    r"返回当前步骤的计算结果|保留题目版的待完成位置|固定随机状态以便复现实验|读取本任务需要的数据|"
    r"建立互相隔离的数据划分|整理模型需要的数据格式|建立用于比较的模型|配置或更新模型参数|"
    r"计算训练目标并传递梯度|在训练数据上拟合模型|计算模型输出或预测概率|计算用于比较的评价指标|"
    r"绘制当前步骤的结果图|保存结果供后续核对|显示便于检查的关键信息|保存当前步骤使用的中间结果|"
    r"执行当前计算步骤|执行当前步骤并保留结果)\s*$"
)


def strip_auto_inline_comments(notebook: dict) -> None:
    """参考版补全依赖精确占位文本，因此只临时移除自动生成的行末教学注释。"""
    for cell in notebook.get("cells", []):
        if cell.get("cell_type") != "code":
            continue
        text = source(cell)
        set_source(cell, "\n".join(AUTO_INLINE_COMMENT.sub("", line) for line in text.splitlines()))


def build_reference(student: dict, project: str) -> dict:
    reference = copy.deepcopy(student)
    strip_auto_inline_comments(reference)
    if project == "a00":
        complete_a00(reference)
    elif project == "a01":
        complete_a01(reference)
    elif project == "a02":
        complete_a02(reference)
    else:
        raise ValueError(project)
    for cell in reference["cells"]:
        if cell.get("cell_type") == "code":
            cell["outputs"] = []
            cell["execution_count"] = None
    return reference


def main() -> None:
    for project, (student_name, reference_name) in PAIRS.items():
        student = load(ROOT / "experience" / "practice" / student_name)
        if ensure_cell_ids(student):
            dump(ROOT / "experience" / "practice" / student_name, student)
        reference = build_reference(student, project)
        dump(ROOT / "tmp" / "kaggle-practice-publish" / project / reference_name, student)
        dump(ROOT / "tmp" / "kaggle-publish" / project / reference_name, student)
        dump(ROOT / "tmp" / "kaggle-reference" / project / reference_name, reference)
        print(f"同步 {project}: {len(student['cells'])} cells；参考版完成实现，随后统一补充行末教学注释")


if __name__ == "__main__":
    main()
