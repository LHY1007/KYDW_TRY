window.KYDW = {
  site: {
    name: "科研大王",
    short: "KYDW",
    tagline: "把科研方向讲清楚，把第一次实践做完整。",
    repo: "https://github.com/LHY1007/KYDW_TRY",
    pages: "https://lhy1007.github.io/KYDW_TRY/",
    wechat: "Liu_han-yu"
  },

  collections: [
    { id: "team", label: "团队", href: "team/index.html", pages: ["team"], home: true, homeMode: "intro" },
    { id: "experience", label: "科研体验", href: "experience/index.html", pages: ["experience", "project"], home: true, homeMode: "featured" },
    { id: "programs", label: "项目与活动", href: "programs/index.html", pages: ["programs"], home: true, homeMode: "showcase" },
    { id: "resources", label: "资源中心", href: "resources/index.html", pages: ["resources", "professional"], home: true, homeMode: "cards" }
  ],

  team: {
    label: "TEAM / KYDW",
    title: "科研大王（KYDW）",
    lead: "一个由学生自主运营的跨校、跨学科科研协作团队。",
    paragraphs: [
      "KYDW 前身是东北大学医学与生物信息工程学院学生发起的科研协作网络，2023 年 12 月成立。团队连接不同学校、专业与课题组，围绕医学、工程、计算机、人工智能与生物信息学等交叉方向开展学习、项目实践和经验分享。",
      "这里的内容面向两类人：想了解科研流程的本科生，以及已经确定方向、希望继续做项目和研究的同学。我们把复杂的研究流程拆成可以理解、可以运行、可以复盘的任务，帮助第一次接触科研的同学逐步认识不同方向。",
      "KYDW 由学生自发组织、自主运营，采用自由、平等、开放的学术交流方式，连接不同学校、专业和课题组的同学。"
    ],
    facts: [
      { value: "2023.12", label: "团队成立" },
      { value: "约 61 人", label: "跨校协作网络（截至 2025-10 整理）" },
      { value: "线上为主", label: "学习、项目与交流方式" },
      { value: "免费开放", label: "KYDW 组内发布资源" }
    ],
    destinations: [
      { group: "剑桥与英国", items: ["剑桥大学 PhD × 1", "剑桥大学一年制 MPhil × 1", "邓迪大学 PhD × 1", "邓迪大学两年制 MPhil × 1"] },
      { group: "国内高校", items: ["北京大学 PhD × 1", "北京大学医学部 PhD × 1", "清华大学 × 1", "浙江大学硕士 × 1", "中国科学技术大学 PhD × 1"] },
      { group: "复旦、上交与港校", items: ["复旦大学 PhD × 2、硕士 × 1", "上海交通大学 PhD × 1、硕士 × 1", "香港科技大学两年制 MPhil × 1"] }
    ],
    destinationNote: "以上为 21–22 届成员已整理确认的部分去向，按国家、学校和学位类型分类展示。",
    achievements: [
      { title: "论文与会议", text: "成员第一作者成果（2023.11—至今整理）：CCF A 国际会议 1 项；SCI Q1 6 篇（其中顶级期刊 2 篇）；CCF B 顶级医学影像 1 项；CCF B Workshop 3 项（Oral 1 项）；SCI Q2 3 篇。" },
      { title: "国家级项目", text: "全国大学生数学建模竞赛 Outstanding Winner 1 项；国家级大学生创新创业训练计划优秀 3 项、良好 5 项。" },
      { title: "学科竞赛", text: "全国生物医学工程创新设计竞赛一等奖 3 项、二等奖 5 项；其他国家级学科竞赛一等奖 7 项、二等奖 10 项。" }
    ],
    activities: [
      "每学期面向有兴趣同学的新成员科研入门培训",
      "核心成员与校友群体发起的多校联合科研项目（如 2501 期）",
      "面向医工学生的学业与科研规划分享",
      "每周 Bio-AI Workshop",
      "面向有一定研究能力同学的专项合作，例如空间转录组学基准研究",
      "复旦本科生科研技能训练、剑桥/复旦方向试点项目"
    ],
    leaders: [
      { name: "刘涵瑜", role: "创始人 / 2021 级负责人", text: "东北大学医学与生物工程 2021 级，现剑桥大学数学院 PhD；发起 KYDW 并整理本科生科研入门材料。" },
      { name: "伍东辰", role: "2023 级负责人", text: "东北大学医学与生物工程 2023 级，曾获 MCM Outstanding Winner、国家奖学金。" },
      { name: "汤昊天", role: "2024 级负责人", text: "东北大学医学与生物工程 2024 级，参与 CMBBE、MICCAI2025-CMMCA 等研究工作。" },
      { name: "吴熙东", role: "2022 级负责人", text: "东北大学医学与生物工程 2023 级，参与 CMBBE、BSPC、MICCAI CMMCA Oral 等研究工作。" }
    ]
  },

  resourceCollections: [
    {
      id: "professional",
      label: "PROFESSIONAL INTERPRETATION",
      title: "专业解读",
      subtitle: "生医工专业、行业与细分方向",
      text: "围绕专业课程、交叉方向、科研起步、升学准备与就业方向，整理生医工专业、行业与细分方向的学习地图。",
      audience: "适合想了解生医工专业的同学",
      status: "专业资料",
      badges: ["专业解读", "资料整理"],
      href: "professional/index.html",
      home: true,
      homeOrder: 1,
      items: [
        { title: "生医工专业解读", text: "专业认知、课程特点、科研起步与发展路径。", href: "professional/index.html", home: true }
      ]
    },
    {
      id: "postgraduate",
      label: "PROGRESSION RESOURCES",
      title: "升学资源",
      subtitle: "按年级整理研究积累与升学准备",
      text: "围绕课程基础、项目实践、研究报告、国内升学、海外硕博和就业准备，整理成员经验与公开问答。",
      audience: "适合计划继续深造的本科生",
      status: "升学资料",
      badges: ["升学资源", "按年级"],
      href: "professional/index.html#timeline",
      home: true,
      homeOrder: 2,
      items: [
        { title: "本科阶段学习与升学准备", text: "按大一至大四整理课程、实践、研究报告与申请准备。", href: "professional/index.html#timeline", home: true },
        { title: "升学与就业常见问题", text: "围绕国内升学、海外硕博、就业方向与费用规划展开。", href: "professional/index.html#faq", home: true }
      ]
    },
    {
      id: "project-intro",
      label: "PROJECT INTRODUCTIONS",
      title: "项目介绍",
      subtitle: "科研体验、入门培训与合作项目",
      text: "集中介绍 KYDW 的科研入门培训、山大项目、复旦项目与 Bio-AI Workshop，方便了解不同活动形式。",
      audience: "适合想了解 KYDW 项目的同学",
      status: "项目资料",
      badges: ["项目介绍", "活动资料"],
      href: "programs/index.html",
      home: true,
      homeOrder: 3,
      items: [
        { title: "团队活动与项目目录", text: "科研入门培训、山大项目、复旦项目与 Bio-AI Workshop。", href: "programs/index.html", home: true }
      ]
    },
    {
      id: "training-resource",
      label: "TRAINING RESOURCES",
      title: "科研入门培训",
      subtitle: "从研究问题到一次完整实践",
      text: "按基础学习、项目实践、复盘与后续发展组织内容，帮助同学在理解数据、代码和结果后选择感兴趣的方向。",
      audience: "适合还没有明确方向的本科生",
      status: "培训资料",
      badges: ["线上学习", "零基础友好"],
      href: "programs/index.html#training",
      home: true,
      homeOrder: 4,
      items: [
        { title: "KYDW 科研入门培训", text: "基础学习、项目实践、复盘与后续发展。", href: "programs/index.html#training", home: true }
      ]
    }
  ],

  modules: [
    {
      id: "training",
      label: "TRAINING",
      title: "KYDW 科研入门培训",
      subtitle: "从研究问题到一次完整实践。",
      text: "按基础学习、项目实践、复盘与后续发展组织内容，帮助同学在理解数据、代码和结果后选择感兴趣的方向。",
      audience: "适合还没有明确方向的本科生",
      status: "持续整理",
      badges: ["线上为主", "零基础友好"],
      href: "programs/index.html#training",
      home: true
    },
    {
      id: "sdu",
      label: "SHANDONG UNIVERSITY",
      title: "山大项目",
      subtitle: "本科生科研入门体验项目",
      text: "山东大学方向的本科生实践材料围绕医学影像、生物信息学与人工智能交叉研究展开。项目包含交互式教学 HTML、体验项目说明和代码实践，适合从一个具体研究任务开始认识研究流程。",
      audience: "适合大一至大三、来自不同专业和院校的本科生",
      status: "首批内容",
      badges: ["NEW", "推荐入门"],
      href: "experience/index.html",
      home: true
    },
    {
      id: "fudan",
      label: "FUDAN UNIVERSITY",
      title: "复旦项目",
      subtitle: "本科生科研技能训练与合作试点",
      text: "KYDW 活动体系中的合作方向，聚焦本科生科研技能、研究任务拆解和跨校交流。",
      audience: "适合关注医学、工程、计算机与人工智能交叉研究的本科生",
      status: "合作项目",
      badges: ["合作方向", "按项目开放"],
      href: "programs/index.html#fudan",
      home: true
    },
    {
      id: "workshop",
      label: "WORKSHOP",
      title: "Bio-AI Workshop",
      subtitle: "围绕一个问题，讨论数据、方法与结果。",
      text: "以定期交流和专题讨论为主要形式，帮助成员把论文阅读、代码实践和研究问题放在同一条线上。",
      audience: "适合已开始阅读论文或做项目、希望交流方法的同学",
      status: "持续开展",
      badges: ["学术交流", "跨校协作"],
      href: "programs/index.html#workshop",
      home: true
    }
  ],

  experience: {
    title: "本科生科研入门体验项目",
    label: "EXPERIENCE / 01—15",
    lead: "从一个具体研究任务开始，认识医学与人工智能的交叉方向。",
    paragraphs: [
      "本项目由原 KYDW 科研入门指南升级而来。它以体验科研为核心，把领域前沿研究拆成一组简单、易懂、可以上手的体验项目，让新同学看到一个研究任务如何从数据开始，经过处理和建模，形成结果与解释。",
      "每个方向由两层内容组成：体验版用于建立兴趣和方向判断；进阶实践用于在一个方向上继续阅读、运行和复盘更完整的研究流程。完成进阶实践后，可以按方向要求准备研究报告并联系对应课题组。",
      "项目发布后开放，同学可以自主安排节奏；整体访问权限预计在秋季开学后统一关闭。项目以线上自学为主，不涉及硬件和湿实验，使用计算机完成学习与实践。"
    ],
    facts: [
      { value: "1—3 年级", label: "主要面向本科生" },
      { value: "15 个方向", label: "按周分组" },
      { value: "理论 + 实践", label: "每个项目两部分" },
      { value: "免费", label: "KYDW 组内发布资源" }
    ],
    audience: "适合大学开学后 1—3 年级、来自不同专业、课题组和院校的本科生，尤其适合医学、工程、计算机、自动化、人工智能、生物医学工程和智能医学工程等交叉方向的同学。",
    schedule: "项目发布后开放，同学可以自主安排学习节奏；预计秋季开学后统一关闭访问权限。项目按周展开，每周设置三个方向，页面会标明各项目的开放状态。",
    participation: "线上自学为主，不涉及硬件及湿实验，仅需计算机设备。每个项目包含约 1—2 小时理论知识讲解和一个交互式实践。",
    access: "关注“科研大王”公众号，后台留言或添加负责人微信 Liu_han-yu 获取项目入口与学习资料。KYDW 组内资源永久免费。",
    comparison: [
      { title: "往年路径", text: "寒暑期科研入门培训 → 表现优异者获得进组/推荐机会 → 组内培养 → 表现优异者重点培养。" },
      { title: "今年路径", text: "科研入门体验项目 → 感兴趣的同学可进组跟学一段时间 → 表现优异者重点培养。" }
    ],
    structure: [
      { no: "01", title: "理论知识讲解", text: "每个项目约 1—2 小时，先建立完成实践所需的最小知识储备。" },
      { no: "02", title: "体验实践", text: "用交互式代码逐步观察数据处理、模型搭建和结果分析，不要求先学完全部理论。" },
      { no: "03", title: "方向判断", text: "完成后记录自己理解了哪些内容、对哪个环节感兴趣，以及是否愿意继续深入。" }
    ],
    path: [
      { title: "先体验", text: "从一个项目的真实输入和输出开始。" },
      { title: "再判断", text: "判断自己更想继续数据、模型、医学问题还是结果解释。" },
      { title: "读进阶", text: "对感兴趣的方向，继续阅读完整教学材料并运行代码。" },
      { title: "写报告", text: "按方向要求提交报告，由对应课题组或团队审核。" }
    ],
    weeks: [
      { id: 1, title: "从代码到医学影像", note: "第一周：先建立数据、模型和结果的共同语言。", badge: "NEW", projects: ["project-01", "project-02", "project-03"] },
      { id: 2, title: "从图像到风险预测", note: "第二周：观察分类与多模态预测如何提出研究问题。", badge: "推荐入门", projects: ["project-04", "project-05", "project-06"] },
      { id: 3, title: "从空间信息到生理信号", note: "第三周：进入空间组学、信号和图像翻译方向。", badge: "方向拓展", projects: ["project-07", "project-08", "project-09"] },
      { id: 4, title: "待开放方向", note: "第四周：后续方向陆续公布。", badge: "待公布", projects: ["project-10", "project-11", "project-12"] },
      { id: 5, title: "后续方向陆续公布", note: "第五周：新增方向持续加入项目目录。", badge: "待公布", projects: ["project-13", "project-14", "project-15"] }
    ]
  },

  projects: [
    { id: "project-01", no: "01", week: 1, title: "基础编程与人工智能", short: "从一段可以运行的代码开始，认识数据、模型与结果。", summary: "面向没有科研经验的同学，建立 Python、数组、可视化和人工智能基本任务的直观认识，为后续方向铺垫。", input: "表格、数组、简单图像或结构化样例", output: "一张图、一个预测结果，以及对结果的解释", prereq: "不要求已有编程经历", device: "普通电脑", duration: "约 1—2 小时理论 + 实践", status: "体验版即将开放", advanced: "experience/advanced/project-01.html", experience: "从输入、处理和输出的关系开始认识医学 AI。" },
    { id: "project-02", no: "02", week: 1, title: "MRI 肿瘤图像分割", short: "让电脑在 MRI 图像中标出可能的肿瘤区域。", summary: "从脑部结构、MRI 多序列图像和专家标注出发，理解像素/体素级分割任务，以及模型结果如何被评价。", input: "多序列脑 MRI 与专家标注", output: "肿瘤区域的像素或体素级预测", prereq: "不要求医学影像基础；需要愿意观察图像与结果", device: "普通电脑", duration: "约 1—2 小时理论 + 交互实践", status: "体验版即将开放", advanced: "experience/advanced/project-02.html", experience: "观察一张 MRI 如何变成可计算的数据，理解标注和评价指标的作用。" },
    { id: "project-03", no: "03", week: 1, title: "X 射线图像重建与变分自编码器", short: "理解投影图像如何形成，以及模型怎样学习恢复图像。", summary: "从 X 射线穿透、组织衰减和投影重叠开始，逐步认识重建问题、表示学习和变分自编码器。", input: "胸片、投影图像与图像矩阵", output: "重建图像、潜在表示和误差比较", prereq: "不要求先学会深度学习", device: "普通电脑", duration: "约 1—2 小时理论 + 交互实践", status: "体验版即将开放", advanced: "experience/advanced/project-03.html", experience: "从肉眼看到的胸片开始，追踪图像背后的矩阵和模型输出。" },
    { id: "project-04", no: "04", week: 2, title: "病理癌症分级（图像分类）", short: "根据 H&E 病理图像观察组织形态并完成分类任务。", summary: "从组织切片、H&E 染色和放大倍数出发，理解计算病理中的图像分类、数据划分与错误分析。", input: "H&E 染色的组织切片图像", output: "类别预测与分类结果分析", prereq: "不要求病理学基础；需要接受逐步阅读图像", device: "普通电脑", duration: "约 1—2 小时理论 + 交互实践", status: "体验版即将开放", advanced: "experience/advanced/project-04.html", experience: "观察组织结构怎样被染色和记录，理解模型为什么会混淆相近类别。" },
    { id: "project-05", no: "05", week: 2, title: "遗传风险与影像组学预测", short: "把遗传、影像和临床信息放到同一个预测问题中。", summary: "理解风险、表型、结局和预测时间窗的区别，认识多基因风险评分、影像组学、多模态建模与评价。", input: "遗传变异、脑影像特征与临床变量", output: "受试者层面的风险预测与评价指标", prereq: "不要求遗传学或统计学基础", device: "普通电脑", duration: "约 1—2 小时理论 + 交互实践", status: "体验版即将开放", advanced: "experience/advanced/project-05.html", experience: "明确研究要预测的结果，观察不同来源的数据如何被对齐和评价。" },
    { id: "project-06", no: "06", week: 2, title: "空间转录组学图像超分辨", short: "在组织空间位置上观察更细的基因分布。", summary: "认识空间转录组学如何把基因表达与组织位置联系起来，并了解超分辨任务试图补充什么信息。", input: "组织图像、空间位置与基因表达矩阵", output: "更细尺度的空间表达估计", prereq: "体验版开放后按页面提示学习", device: "待项目页说明", duration: "待开放后公布", status: "后续开放", advanced: null, experience: "先从一张组织图和一张表达图的对应关系开始，理解空间信息为什么重要。" },
    { id: "project-07", no: "07", week: 3, title: "基于空间转录组学的细胞通讯", short: "从细胞位置和表达关系中推测细胞之间如何交流。", summary: "围绕配体、受体、空间邻近和细胞状态，认识细胞通讯分析提出的问题与结果解释边界。", input: "空间位置、细胞类型与基因表达", output: "候选细胞通讯关系及其可视化", prereq: "适合希望了解空间转录组学的同学", device: "计算机", duration: "待开放后公布", status: "后续开放", advanced: null, experience: "从‘哪些细胞在一起’开始，观察‘哪些信号可能连接它们’。" },
    { id: "project-08", no: "08", week: 3, title: "基于传感器的人类活动识别", short: "用传感器信号判断人的活动状态。", summary: "认识时间序列、窗口切分和信号分类，理解从连续传感器数据到活动标签的基本流程。", input: "加速度、陀螺仪等传感器时间序列", output: "活动类别预测与混淆分析", prereq: "体验版开放后按页面提示学习", device: "待项目页说明", duration: "待开放后公布", status: "后续开放", advanced: null, experience: "先把连续信号切成可观察的小片段，再看不同活动留下的模式。" },
    { id: "project-09", no: "09", week: 3, title: "组织学图像虚拟染色", short: "让模型学习把一种组织图像转换成另一种染色外观。", summary: "理解图像翻译、染色差异和生成模型的任务边界，区分视觉相似与生物学真实。", input: "组织学图像及对应/非对应染色图像", output: "虚拟染色结果与差异分析", prereq: "适合希望了解计算病理和图像翻译的同学", device: "计算机", duration: "待开放后公布", status: "后续开放", advanced: null, experience: "观察不同染色如何改变图像外观，再讨论模型如何保留组织信息。" },
    { id: "project-10", no: "10", week: 4, title: "人体生理信号分析", short: "从人体信号的变化中理解健康状态和研究问题。", summary: "研究问题、信号类型和实践材料将在项目开放时介绍。", input: "待公布", output: "待公布", prereq: "待公布", device: "待公布", duration: "待公布", status: "待定", advanced: null, experience: "人体生理信号方向，内容随后公布。" },
    { id: "project-11", no: "11", week: 4, title: "后续方向 11", short: "后续方向陆续公布。", summary: "项目名称、研究问题和实践内容随后公布。", input: "待公布", output: "待公布", prereq: "待公布", device: "待公布", duration: "待公布", status: "待公布", advanced: null, experience: "内容随后公布。" },
    { id: "project-12", no: "12", week: 4, title: "后续方向 12", short: "后续方向陆续公布。", summary: "项目名称、研究问题和实践内容随后公布。", input: "待公布", output: "待公布", prereq: "待公布", device: "待公布", duration: "待公布", status: "待公布", advanced: null, experience: "内容随后公布。" },
    { id: "project-13", no: "13", week: 5, title: "后续方向 13", short: "后续方向陆续公布。", summary: "项目名称、研究问题和实践内容随后公布。", input: "待公布", output: "待公布", prereq: "待公布", device: "待公布", duration: "待公布", status: "待公布", advanced: null, experience: "内容随后公布。" },
    { id: "project-14", no: "14", week: 5, title: "后续方向 14", short: "后续方向陆续公布。", summary: "项目名称、研究问题和实践内容随后公布。", input: "待公布", output: "待公布", prereq: "待公布", device: "待公布", duration: "待公布", status: "待公布", advanced: null, experience: "内容随后公布。" },
    { id: "project-15", no: "15", week: 5, title: "后续方向 15", short: "后续方向陆续公布。", summary: "项目名称、研究问题和实践内容随后公布。", input: "待公布", output: "待公布", prereq: "待公布", device: "待公布", duration: "待公布", status: "待公布", advanced: null, experience: "内容随后公布。" }
  ],

  professional: {
    label: "BIOENGINEERING / ORIENTATION",
    title: "生医工专业，从专业认知到发展路径",
    lead: "生物医学工程不是一个单一职业，而是一张连接工程、计算机、医学与生物学的方向地图。",
    intro: [
      "生医工通常把计算机、人工智能、电子、材料、力学等工程方法用于医学与生物学问题。具体培养内容取决于学校、学院、培养方案和学位类型：有的项目偏工程和计算，有的项目覆盖影像、生物、材料、器械和临床基础。选择方向时，可以从课程与学位结构开始了解。",
      "这里从专业课程、科研起步、升学准备、就业方向与费用规划展开，按主题与年级组织，方便从自己的阶段选择阅读内容。"
    ],
    takeaways: [
      { title: "先看培养方案", text: "检查课程里是否有编程、计算机、人工智能、自动化和工程基础，再判断自己是否愿意补齐这些能力。" },
      { title: "尽早做项目实践", text: "大一到大三可以通过小项目、竞赛、课程实践或课题组实践，逐步认识自己更喜欢数据、算法、实验还是医学问题。" },
      { title: "研究经历会影响选择", text: "国内推荐免试、海外研究型硕士/博士和部分研发岗位都重视研究经历，项目、报告和长期积累会成为后续准备的一部分。" },
      { title: "把个人经验放回规划", text: "升学、费用和就业情况会随年份、学校、国家、个人成果和政策变化，规划时可以结合目标项目的课程、研究方向和准备要求。" }
    ],
    timeline: [
      { grade: "大一", title: "确认自己在学什么", text: "读培养方案，认识工程、计算、医学与生物学的关系；从 Python、基础 AI 或一个小型可视化项目开始。" },
      { grade: "大二", title: "完成一次可复盘实践", text: "参加课程项目、创新项目、竞赛或课题组实践，记录数据、方法、结果和自己真正感兴趣的环节。" },
      { grade: "大三", title: "围绕方向形成积累", text: "选择一个方向继续阅读和实践，争取形成研究报告、项目成果或论文准备；同步了解保研、考研和留学要求。" },
      { grade: "大四", title: "按目标准备下一阶段", text: "根据国内推荐、国内升学、海外授课型硕士、MPhil/PhD 或就业目标，整理申请材料和能够说明研究能力的经历。" }
    ],
    faq: [
      { q: "生医工到底学什么？", a: "它通常用工程和计算方法处理医学与生物学问题。常见交叉内容包括编程、人工智能、医学影像、信号、材料、器械、生物信息学和临床基础。不同学校差异很大，应直接查看培养方案、课程名称和学位授予情况。" },
      { q: "生医工是偏医学还是偏工科？", a: "具体偏向要结合培养方案判断。以东北大学医工相关培养为例，课程具有工程基础，也会接触计算机、自动化、人工智能、影像、生物、材料、仪器和光学等内容；本科阶段覆盖面较宽，研究生阶段通常再选择更窄的方向。" },
      { q: "为什么很多同学会较早考虑科研？", a: "资料整理中反复出现的原因有四类：国内外升学竞争需要研究经历；部分研发岗位更看重硕士或博士阶段的训练；小项目能够帮助同学认识方向；科研过程能够建立导师、同学和跨校合作网络。" },
      { q: "本科毕业能直接就业吗？", a: "可以。岗位范围和竞争情况与具体课程、技能、实习和目标行业有关。公开问答中常见的经验是：部分生医工本科生会继续深造，核心技术研发岗位通常需要更明确的工程或计算能力；医疗器械、医学影像和软件岗位各有不同要求。" },
      { q: "保研和留学最看重什么？", a: "常见准备包括稳定的课程成绩、能够说明研究过程的项目或报告、研究计划、方向匹配、推荐信和英语能力。国内推荐免试、海外授课型硕士和研究型硕士/博士的材料组合各不相同。" },
      { q: "授课型硕士、MRes、MPhil 和 PhD 有什么区别？", a: "授课型硕士以课程和学位学习为主；部分 MRes 更接近研究训练；MPhil 以研究和论文为核心；PhD 通常要求更长期、独立的研究。各类项目在国家、学校、资金、学费和毕业去向上都有不同特点。" },
      { q: "邓迪直博的要求和费用可以直接照搬吗？", a: "资料中记录过的邓迪路线包含英语授课、研究计划与研究经历/成果，以及约 3 万英镑学费和约 1 万英镑减免等经验性信息。申请准备还包括研究方向、个人成果、英语能力和项目要求等内容。" },
      { q: "生医工项目是不是一定很贵？", a: "费用与地区、学校、学位类型、住宿和奖学金有关。整理材料中记录了国内前三年约 4.6 万元/年、英国邓迪学费约 29 万元、住宿约 4—9 万元、海外授课型项目约 20—60 万元/年等个人/时期性估计；研究型 MPhil/PhD 常见奖学金或资助方式。" },
      { q: "中外合作办学或英文培养有什么优势？", a: "常见优势包括英文课程、海外学位或申请材料准备方面的经历；同时需要关注课程强度、费用、学位认证、培养质量和个人适应度。英文授课项目的研究训练和申请材料通常也包含方向匹配与研究经历。" },
      { q: "没有代码基础，可以参加科研体验吗？", a: "可以。本科生科研入门体验项目从基础编程与人工智能开始，不需要先学完所有 Python 或人工智能知识，运行、观察并修改简单代码即可进入项目。" },
      { q: "需要先买高配置电脑吗？", a: "设备需求取决于项目运行方式。公开问答中出现过 Nvidia 显卡、16GB 内存、1TB 存储等个人经验；不同项目可能使用本地电脑、云端或 Kaggle，查看具体项目说明即可了解所需配置。" },
      { q: "体验项目完成后可以直接进组吗？", a: "体验项目帮助你了解方向；希望继续的同学可以阅读对应的进阶实践、完成方向报告，再联系对应课题组。课题组会按照研究方向和跟学安排组织后续学习。申请方向跟学与申请加入 KYDW 分别进行。" },
      { q: "方向报告是论文吗？", a: "方向报告重点说明你理解了哪些数据、完成了哪些操作、观察到什么结果、结果有什么限制，以及还想继续学习什么。报告模板、长度和审核要求会随方向说明提供。" },
      { q: "怎样进入 KYDW 的学习内容？", a: "团队介绍、项目说明、教学材料和专业解读均集中在本网站；科研入门体验项目按项目目录进入，组内资源永久免费。" },
      { q: "升学、就业和费用应该怎样安排？", a: "先按年级建立课程和实践积累，再根据国内升学、海外授课型硕士、MPhil/PhD 或就业方向准备相应材料；费用需要结合地区、学校、学位类型、住宿和资助方案分别规划。" }
    ],
    quantifiedNotes: [
      { title: "培养与专业背景", text: "成文材料以东北大学医工相关培养为例：工科基础较强，课程涉及计算机、自动化、人工智能、影像、生物、软件、材料、仪器和光学等；中外合作培养还涉及英文课程、较紧的课程节奏和中英两套课程体系。" },
      { title: "推免与继续深造经验", text: "资料中记录过 25 届约 25 人推免、约 67 人海外升学、超过 90 人继续深造等阶段性统计，也记录过约 120 人中约 20 人获得校内推荐的案例，呈现成员继续深造的不同路径。" },
      { title: "海外路线", text: "整理材料涉及英国邓迪、帝国理工、UCL、牛津/剑桥，香港与新加坡研究型项目，美国高排名项目，以及日本和欧洲其他项目。授课型硕士、MRes、MPhil 和 PhD 的研究要求、资金和申请难度各有特点。" },
      { title: "费用与资金", text: "资料中出现过国内前三年约 4.6 万元、邓迪学费约 29—30 万元、住宿约 4—9 万元、海外授课型项目约 20—60 万元/年等数字；这些数字来自不同年份和统计口径，可用于初步估算。研究型 MPhil/PhD 常见奖学金或资助方式。" }
    ],
  }
};
