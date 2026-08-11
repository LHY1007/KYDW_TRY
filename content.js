const KYDW_INTERNSHIP_GROUP_QR = "assets/contact/project-announcement-qr-cropped.png";

window.KYDW = {
  site: {
    name: "科研大王",
    short: "KYDW",
    tagline: "学生自主运营的跨校、跨学科科研协作团队。",
    repo: "https://github.com/LHY1007/KYDW_TRY",
    pages: "https://lhy1007.github.io/KYDW_TRY/",
    wechat: "Liu_han-yu"
  },

  collections: [
    { id: "team", label: "团队介绍", href: "team/index.html", pages: ["team", "team-section"], home: true, homeMode: "intro" },
    { id: "programs", label: "项目与活动", href: "programs/index.html", pages: ["programs", "module", "sdu-lesson", "training-module", "training-plan", "experience", "experience-week", "project", "material"], home: true, homeMode: "showcase" },
    { id: "resources", label: "资源中心", href: "resources/index.html", pages: ["resources", "professional", "professional-faq", "professional-destinations"], home: true, homeMode: "cards" }
  ],

  team: {
    label: "KYDW / 团队",
    title: "科研大王（KYDW）",
    lead: "学生自主运营的跨校、跨学科科研协作团队。",
    paragraphs: [
      "KYDW 前身是东北大学生物医学工程专业学生发起的科研协作网络，2023 年 12 月成立。团队连接不同学校、专业与课题组，围绕医学、工程、计算机、人工智能与生物信息学等交叉方向分享科研信息与学术资源，促进国内外高校及课题组之间的交流、合作与成员推荐。",
      "团队公开整理科研入门培训、本科生科研入门体验项目、跨校合作项目、专业解读与教学文档，分别放在“项目与活动”和“资源中心”中。",
      "团队由学生自发组织、自主运营。成员来自不同学校、专业和课题组，按项目组成协作小组，持续维护网站内容、实践材料和专题交流。"
    ],
    facts: [
      { value: "83", label: "团队成员" },
      { value: "跨校", label: "协作范围" },
      { value: "多学科", label: "研究方向" },
      { value: "自主", label: "运营方式" }
    ],
    destinationRecords: [
      { region: "中国大陆", name: "清华大学", degree: "硕士", count: 1 },
      { region: "中国大陆", name: "北京大学", degree: "PhD", count: 1 },
      { region: "中国大陆", name: "北京大学", degree: "PhD", count: 1 },
      { region: "中国大陆", name: "复旦大学", degree: "PhD", count: 2 },
      { region: "中国大陆", name: "复旦大学", degree: "硕士", count: 1 },
      { region: "中国大陆", name: "上海交通大学", degree: "PhD", count: 1 },
      { region: "中国大陆", name: "上海交通大学", degree: "硕士", count: 1 },
      { region: "中国大陆", name: "浙江大学", degree: "硕士", count: 2 },
      { region: "中国大陆", name: "中国科学技术大学", degree: "PhD", count: 1 },
      { region: "英国", name: "剑桥大学", degree: "PhD", count: 1 },
      { region: "英国", name: "剑桥大学", degree: "一年制 MPhil", count: 1 },
      { region: "英国", name: "邓迪大学", degree: "PhD", count: 1 },
      { region: "英国", name: "邓迪大学", degree: "两年制 MPhil", count: 1 },
      { region: "英国", name: "帝国理工学院", degree: "MRes", count: 1 },
      { region: "美国", name: "康奈尔大学", degree: "硕士", count: 1 },
      { region: "美国", name: "约翰·霍普金斯大学", degree: "硕士", count: 1 },
      { region: "美国", name: "哈佛大学", degree: "硕士", count: 1 },
      { region: "中国香港与新加坡", name: "香港科技大学", degree: "两年制 MPhil", count: 1 },
      { region: "中国香港与新加坡", name: "香港中文大学", degree: "两年制 MPhil", count: 1 },
      { region: "中国香港与新加坡", name: "新加坡国立大学", degree: "PhD", count: 1 }
    ],
    destinationUniversityOrder: [
      "剑桥大学", "哈佛大学", "清华大学", "北京大学", "康奈尔大学",
      "香港科技大学", "香港中文大学", "新加坡国立大学", "复旦大学", "上海交通大学", "浙江大学",
      "中国科学技术大学", "约翰·霍普金斯大学", "帝国理工学院", "邓迪大学"
    ],
    undergraduateNetwork: [
      "东北大学", "复旦大学", "山东大学", "同济大学", "华南师范大学", "辽宁大学", "南方医科大学", "苏州大学", "河南农业大学", "爱尔兰皇家外科医学院", "邓迪大学"
    ],
    undergraduateNotes: [
      { name: "东北大学", text: "含医学与生物信息工程学院、计算机科学与工程学院、信息科学与工程学院、机械工程与自动化学院、生命科学与健康学院" }
    ],
    achievementMetrics: [
      { value: "13", label: "论文总数" },
      { value: "2", label: "CCF A" },
      { value: "4", label: "SCI 一区 Top" },
      { value: "5", label: "生医工一等奖" },
      { value: "5", label: "国家级优秀项目" }
    ],
    achievementNote: "多人合作论文或项目，无论人数多少，仅记为一次。",
    destinationNote: "已毕业成员去向包括直博、国内学硕和海外研究型硕士。",
    achievements: [
      { title: "论文产出", text: "CCF A 类会议 2 篇（IJCAI 2024、ICLR 2026）；CCF B 类会议 2 篇（MICCAI2025、ICASSP2026）；CCF B 类研讨会论文 5 篇（CMMCA2025、CMMCA2026）；SCI 一区 Top 论文 4 篇；SCI 二区论文 3 篇。", lines: ["CCF A 类会议 2 篇（IJCAI 2024、ICLR 2026）", "CCF B 类会议 2 篇（MICCAI2025、ICASSP2026）", "CCF B 类研讨会论文 5 篇（CMMCA2025、CMMCA2026）", "SCI 一区 Top 论文 4 篇", "SCI 二区论文 3 篇"] },
      { title: "国家级项目", text: "全国大学生数学建模竞赛 Outstanding Winner 1 项；国家级大学生创新创业训练计划优秀项目 5 项。", lines: ["全国大学生数学建模竞赛 Outstanding Winner 1 项", "国家级大学生创新创业训练计划优秀项目 5 项"] },
      { title: "学科竞赛", text: "全国生物医学工程创新设计竞赛一等奖 5 项、二等奖 13 项；其他国家级学科竞赛一等奖 7 项、二等奖 10 项。", lines: ["全国生物医学工程创新设计竞赛一等奖 5 项、二等奖 13 项", "其他国家级学科竞赛一等奖 7 项、二等奖 10 项"] }
    ],
    activities: [
      "每学期面向有兴趣同学的新成员科研入门培训",
      "核心成员与校友群体发起的多校联合科研项目（如 2501 期）",
      "面向医工学生的学业与科研规划分享",
      "每周生物医学人工智能专题交流",
      "面向有一定研究能力同学的专项合作，例如空间转录组学基准研究",
      "复旦大学秋季学期本科生践悟课程"
    ],
    news: [
      { date: "2026.8", html: "团队本科生 <strong>万和欣（24级）</strong>、<strong>刘怡航（24级）</strong>、<strong>周煜楷（25级）</strong>、<strong>伍东辰（23级）</strong> 的论文 <em>TASP: Task-Agnostic Structural Pretraining for 2D Medical Image Segmentation</em> 发表于 <strong>CCF C 类会议 British Machine Vision Conference（BMVC 2026，英国机器视觉会议）</strong>。" },
      { date: "2026.8", html: "团队本科生 <strong>李知彤（25级）</strong>、<strong>姜逸轩（24级）</strong>、<strong>刘子铭（25级）</strong>、<strong>武晨杰（25级）</strong> 的论文 <em>OncoRelay3D: Foundation-Model-Assisted Reconstruction of 3D Tumor Cell-Expression Fields for Mechanism-Aware Directed Cell-Cell Communication</em> 发表于 <strong>CCF B 类国际顶级医学影像会议 <em>International Conference on Medical Image Computing and Computer Assisted Intervention（MICCAI 2026）</em></strong> 研讨会 <strong><em>CMMCA 2026</em> Oral 级（排名第 5）</strong>。" },
      { date: "2026.8", html: "团队本科生 <strong>朱鸿杰（23级）</strong>、<strong>周华苑（24级）</strong> 的论文 <em>TriSCoV-Net: Cross-Scale Verified Virtual Immunomarker Proxy Generation from Diffusion Magnetic Resonance Imaging</em> 发表于 <strong>CCF B 类国际顶级医学影像会议 <em>International Conference on Medical Image Computing and Computer Assisted Intervention（MICCAI 2026）</em></strong> 研讨会 <strong><em>CMMCA 2026</em> Oral 级（排名第 2）</strong>。" },
      { date: "2026.7", html: "团队本科生 <strong>李知彤（25级）</strong>、<strong>刘子铭（25级）</strong>、<strong>姜逸轩（24级）</strong> 获 <strong>中国大学生生物医学工程创新设计竞赛国家级一等奖</strong>。" },
      { date: "2026.7", html: "团队本科生 <strong>朱鸿杰（23级）</strong>、<strong>周华苑（24级）</strong> 获 <strong>中国大学生生物医学工程创新设计竞赛国家级一等奖</strong>。" },
      { date: "2026.6", html: "团队本科生 <strong>苗正洋（23级）</strong>、<strong>万和欣（24级）</strong>、<strong>伍东辰（23级）</strong>、<strong>汤昊天（23级）</strong> 的论文 <em>Multi-Source Feature Fusion with Self-Supervised Contrastive Learning for AF Detection under Label Scarcity</em> 发表于 <strong>中科院一区期刊 <em>AI Engineering</em>（JCR 影响因子暂未公布）</strong>。" },
      { date: "2026.5", html: "团队本科生 <strong>汤昊天（23级）</strong>、<strong>崔涵禹（23级）</strong>、<strong>吴熙东（22级）</strong> 的论文 <em>A Diffusion-Enhanced Classification System for Physiological Signal-based Diagnosis</em> 发表于 <strong>中科院一区 TOP 学术期刊 <em>Expert Systems With Applications</em>（影响因子 9.4）</strong>。" },
      { date: "2026.5", html: "团队本科生 <strong>苗正洋（23级）</strong>、<strong>吴熙东（22级）</strong> 的论文 <em>MDF: A Model Dispatching Framework with Noise-Estimator-Centric Experts for Robust Biosignal Classification</em> 发表于 <strong>CCF B 类国际顶级声学、语音与信号处理会议 IEEE International Conference on Acoustics, Speech, and Signal Processing（ICASSP 2026）</strong>。" },
      { date: "2026.5", html: "团队本科生 <strong>孙宇嘉（24级）</strong> 的论文 <em>TASC-SwinMT: Task-Adaptive Synergistic Cross-Task Swin Multi-Task Framework for CT and MRI Image Interpolation and Segmentation</em> 发表于 <strong>SCI 收录、JCR Q2 期刊 <em>TOMOGRAPHY</em>（影响因子 2.5）</strong>。" },
      { date: "2026.4", html: "团队 MPhil <strong>唐浩（东北大学生物医学工程21级本科）</strong> 的论文 <em>Generalized Spherical Neural Operators: Green's Function Formulation</em> 发表于 <strong>CCF A 类国际顶级人工智能会议 <em>International Conference on Learning Representations（ICLR 2026）</em></strong>。" },
      { date: "2026.2", html: "团队本科生 <strong>吴熙东（22级）</strong>、<strong>汤昊天（23级）</strong>、<strong>伍东辰（23级）</strong> 的论文 <em>MSCGN: Multiscale complementary gating network for time series classification</em> 发表于 <strong>中科院一区期刊 <em>Biomedical Signal Processing and Control</em>（影响因子 5.7）</strong>。" },
      { date: "2026.1", html: "团队本科生 <strong>汤昊天（23级）</strong>、<strong>吴熙东（22级）</strong>、<strong>崔涵禹（23级）</strong> 的论文 <em>Lightweight element-wise product enhanced neural network for efficient arrhythmia detection on embedded devices</em> 发表于 <strong>中科院一区期刊 <em>Computer Methods and Programs in Biomedicine</em>（影响因子 6.4）</strong>。" },
      { date: "2025.11", html: "团队本科生 <strong>孙宇嘉（24级）</strong> 获 <strong>第十七届全国大学生数学竞赛（非数学 A 类）一等奖</strong>。" },
      { date: "2025.9", html: "团队本科生 <strong>汤昊天（23级）</strong>、<strong>唐欣蕊（22级）</strong>、<strong>吴运嘉</strong>、<strong>苗正洋（23级）</strong> 的论文 <em>Hierarchical Brain Structure Modeling for Predicting Genotype of Glioma</em> 发表于 <strong>CCF B 类国际顶级医学影像会议 <em>International Conference on Medical Image Computing and Computer Assisted Intervention（MICCAI 2025）</em></strong> 研讨会 <strong><em>CMMCA 2025</em></strong>。" },
      { date: "2025.9", html: "团队 PhD <strong>阙宁锋（东北大学生物医学工程21级本科）</strong> 的论文 <em>Adaptive spatial transcriptomics interpolation via cross-modal cross-slice modeling</em> 以 early accepted 形式发表于 <strong>CCF B 类国际顶级医学影像会议 <em>International Conference on Medical Image Computing and Computer Assisted Intervention（MICCAI 2025）</em></strong>。" },
      { date: "2025.9", html: "团队本科生 <strong>吴熙东（22级）</strong> 的论文 <em>OG-SAM: Enhancing Multi-Organ Segmentation with Organogenesis-Based Adaptive Modeling</em> 发表于 <strong>CCF B 类国际顶级医学影像会议 <em>International Conference on Medical Image Computing and Computer Assisted Intervention（MICCAI 2025）</em></strong> 研讨会 <strong><em>CMMCA 2025</em></strong>，并作 <strong>Oral</strong> 报告。" },
      { date: "2025.9", html: "团队本科生 <strong>蒋政（23级）</strong>、<strong>刘雪鹏（23级）</strong>、<strong>朱品安（24级）</strong> 的论文 <em>HaDM-ST: Histology-Assisted Differential Modeling for Spatial Transcriptomics Generation</em> 发表于 <strong>CCF B 类国际顶级医学影像会议 <em>International Conference on Medical Image Computing and Computer Assisted Intervention（MICCAI 2025）</em></strong> 研讨会 <strong><em>CMMCA 2025</em></strong>。" },
      { date: "2025.7", html: "团队本科生 <strong>万和欣（24级）</strong>、<strong>朱品安（24级）</strong> 获 <strong>中国大学生生物医学工程创新设计竞赛国家级一等奖</strong>。" },
      { date: "2025.7", html: "团队本科生 <strong>朱鸿杰（23级）</strong>、<strong>周华苑（24级）</strong> 获 <strong>中国大学生生物医学工程创新设计竞赛国家级一等奖</strong>。" },
      { date: "2025.4", html: "团队本科生 <strong>吴熙东（22级）</strong> 的论文 <em>Multiscale feature enhanced gating network for atrial fibrillation detection</em> 发表于 <strong>中科院一区期刊 <em>Computer Methods and Programs in Biomedicine</em>（影响因子 6.4）</strong>。" }
    ],
    leaders: [
      { name: "伍东辰", role: "2023 级负责人", preview: "东北大学生物医学工程专业 2023 级，现任 KYDW 2023 级负责人。曾获国际大学生数学建模竞赛特等奖 Outstanding Winner、国家奖学金。", paragraphs: [
        "伍东辰是东北大学生物医学工程专业 2023 级学生，现任 KYDW 2023 级负责人。",
        "他曾获国际大学生数学建模竞赛特等奖 Outstanding Winner，并获国家奖学金。",
        "国际大学生数学建模竞赛中的 Outstanding Winner 是他在竞赛方面的代表性成绩，国家奖学金则记录了他的本科阶段学业表现。",
        "作为 2023 级负责人，他与其他负责人共同组成当前负责人团队，负责维护面向本科生的培训、项目与公开资料。"
      ] },
      { name: "姜逸轩", role: "2024 级负责人", preview: "东北大学生物医学工程专业 2024 级，现任 KYDW 2024 级负责人、东北大学学生团队慧医智心负责人。曾获中国大学生生物医学工程创新设计竞赛国家级一等奖。", paragraphs: [
        "姜逸轩是东北大学生物医学工程专业 2024 级学生，现任 KYDW 2024 级负责人。",
        "他同时担任东北大学学生团队慧医智心负责人。",
        "他曾获中国大学生生物医学工程创新设计竞赛国家级一等奖。",
        "作为 2024 级负责人，他与其他负责人共同维护团队的培训、合作项目和专题交流。"
      ] },
      { name: "汤昊天", role: "2023 级负责人", preview: "东北大学生物医学工程专业 2023 级，现任 KYDW 2023 级负责人。以第一作者发表 CMBBE、MICCAI2025-CMMCA、ESWA论文。", paragraphs: [
        "东北大学生物医学工程专业 2023 级，现任 KYDW 2023 级负责人。以第一作者发表 CMBBE、MICCAI2025-CMMCA、ESWA论文。"
      ] },
      { name: "吴熙东", role: "2022 级负责人", preview: "东北大学生物医学工程专业学生，现任 2022 级负责人。以第一作者发表 CMBBE、BSPC 等 3 篇期刊论文，另有 MICCAI CMMCA Oral，现为新加坡国立大学医学院 PhD。", paragraphs: [
        "吴熙东是东北大学生物医学工程专业学生，现任 KYDW 2022 级负责人。",
        "他以第一作者发表 CMBBE、BSPC 等 3 篇期刊论文。",
        "此外，他有 1 篇论文入选 MICCAI CMMCA Oral，成果形式从期刊论文延伸到会议研讨会口头报告。",
        "他的公开成果包括多篇期刊论文和 MICCAI CMMCA Oral，既有第一作者论文，也有会议研讨会口头报告。",
        "他现为新加坡国立大学医学院 PhD。",
        "作为团队较早年级的负责人，他与其他负责人共同维护面向本科生的培训、合作项目和专题交流。"
      ] },
      { name: "刘涵瑜", role: "创始人 / 2021 级负责人", preview: "东北大学生物医学工程专业 2021 级，KYDW 创始人。现为剑桥大学数学院 PhD，主编《本科生科研入门指南》。", paragraphs: [
        "刘涵瑜是东北大学生物医学工程专业 2021 级学生，现为剑桥大学数学院 PhD。",
        "他发起 KYDW，团队从成立之初就以跨校、跨学科科研协作和本科生科研支持为主要方向。",
        "作为 KYDW 创始人，他主编《本科生科研入门指南》，将本科生接触科研时需要的基础内容整理为公开材料。",
        "KYDW 目前公开的科研入门培训、科研体验项目与教学文档，都是这一方向的具体内容。",
        "在负责人名单中，刘涵瑜同时承担创始人和 2021 级负责人的角色，负责团队早期定位与公开内容体系的建立。"
      ] }
    ]
  },

  resourceCollections: [
    {
      id: "professional",
      label: "专业解读",
      title: "专业解读",
      subtitle: "专业、行业与细分方向",
      text: "生物医学工程专业介绍、行业解读与细分方向专题。",
      audience: "浏览专业、行业或研究方向",
      status: "专题合集",
      href: "professional/index.html",
      home: true,
      homeOrder: 1,
      items: [
        { title: "生物医学工程专业解读", text: "专业性质、培养结构、科研、升学与就业。", href: "professional/index.html", home: true },
        { title: "生物医学工程专业答疑", text: "专业课程、方向选择、升学与职业问题。", href: "professional/faq.html", home: false },
        { title: "东北大学生物医学工程（中外合办）历年去向表", text: "东北大学生物医学工程（中外合办）历年升学去向数据。", href: "professional/destinations.html", home: false }
      ]
    },
    {
      id: "project-materials",
      label: "项目与活动资料",
      title: "项目与活动资料",
      subtitle: "项目说明、活动记录与实践材料",
      text: "集中收录课程、培训和专题交流的说明页与已公开材料，按活动分别进入。",
      audience: "查找项目说明与活动资料",
      status: "按项目整理",
      href: "programs/index.html",
      home: true,
      homeOrder: 2,
      items: [
        { title: "山东大学本科生暑期名校课程-神经影像学与人工智能", text: "剑桥大学 KYDW 成员所属课题组团队在山东大学授课的暑期短期课程，面向山东大学全学科 25、24 级学生，内容覆盖基础编程、MRI 分割、胸部 X 射线、计算病理、医学信息预测和空间转录组等任务。", href: "programs/sdu.html", home: true },
        { title: "KYDW科研入门培训", text: "培训内容包括电脑操作、文献阅读、数据基础、Python、人工智能、深度学习和科研实践，并按活动安排组织学习顺序与阶段任务。", href: "programs/training.html", home: true },
        { title: "复旦大学秋季学期本科生践悟课程", text: "剑桥大学 KYDW 成员所属课题组团队在复旦大学面向高潜力学生授课的科研践悟课程，主要从领域知识、学术常识、技能培养等多方面展开。", href: "programs/fudan.html", home: true },
        { title: "生物医学人工智能专题交流", text: "生物学与人工智能交叉主题的定期讨论。", href: "programs/workshop.html", home: true }
      ]
    },
    {
      id: "teaching-library",
      label: "教学文档库",
      title: "教学文档库",
      subtitle: "已开放项目的教学页面、实践项目与实践项目参考答案",
      text: "教学页面、实践项目与实践项目参考答案按项目配套收录，已开放的项目可以直接进入对应材料。",
      audience: "阅读某个研究方向的教学材料",
      status: "按开放项目持续收录",
      href: "resources/index.html#teaching-library",
      home: true,
      homeOrder: 3,
      items: [
        { title: "科研基础环境准备", text: "网络访问、账户注册和 Kaggle 代码项目构成科研实践前的环境准备。", href: "resources/environment.html", kind: "book" }
      ]
    }
  ],

  modules: [
    {
      id: "training",
      label: "科研入门培训",
      title: "KYDW科研入门培训",
      subtitle: "从科研基础进入人工智能与研究实践",
      text: "老版本的 KYDW 科研入门项目目前已不适用。培训从电脑操作、文献阅读和数据基础开始，逐步进入 Python、人工智能、深度学习和科研实践。",
      audience: "大一至大三、来自不同专业和院校的本科生",
      date: "持续整理",
      status: "持续整理",
      href: "programs/training.html",
      order: 2,
      period: "持续开展",
      home: true,
      training: true,
      quickLinks: [
        { label: "序言", caption: "学习路径", href: "programs/training/preface.html" },
        { label: "基础知识", caption: "科研入门", href: "programs/training/foundation.html" },
        { label: "初识人工智能", caption: "Python 与模型", href: "programs/training/ai-basics.html" },
        { label: "基础科研", caption: "代码与实践", href: "programs/training/research-basics.html" },
        { label: "科研工具与技能", caption: "工具与协作", href: "programs/training/tools.html", locked: true }
      ]
    },
    {
      id: "sdu",
      label: "山东大学本科生暑期名校课程-神经影像学与人工智能",
      title: "山东大学本科生暑期名校课程-神经影像学与人工智能",
      subtitle: "神经影像与医学人工智能实践项目",
      text: "剑桥大学 KYDW 成员所属课题组团队在山东大学授课的暑期短期课程，面向山东大学全学科 25、24 级学生，内容覆盖基础编程、MRI 分割、胸部 X 射线、计算病理、医学信息预测和空间转录组等任务。",
      audience: "山东大学全学科 25、24 级学生",
      date: "2026 年暑期历史课程",
      status: "首批内容",
      href: "programs/sdu.html",
      order: 1,
      period: "历史项目",
      home: true,
      lessons: [
        { id: "sdu-lesson-00", title: "实践 0 · 基础编程与人工智能", text: "我们使用 MNIST 手写数字图像检查数据、训练分类模型，并查看混淆矩阵和噪声测试结果。", date: "2026 年暑期历史课程", href: "programs/sdu-lesson-00.html", kaggle: "https://www.kaggle.com/code/liuhanyu1007/sdu-neuro-0" },
        { id: "sdu-lesson-01", title: "实践 1 · MRI 肿瘤图像分割", text: "我们使用配对的 MRI 切片和肿瘤 mask 按患者划分数据，完成分割并比较 Dice、IoU 和边界结果。", date: "2026 年暑期历史课程", href: "programs/sdu-lesson-01.html", kaggle: "https://www.kaggle.com/code/liuhanyu1007/sdu-neuro-1" },
        { id: "sdu-lesson-02", title: "实践 2 · 胸部 X 射线与生成模型", text: "我们使用胸部 X 射线观察投影图像和数字质量，训练残差卷积 VAE，并比较重建、潜空间采样和图像统计。", date: "2026 年暑期历史课程", href: "programs/sdu-lesson-02.html", kaggle: "https://www.kaggle.com/code/liuhanyu1007/sdu-neuro-2" },
        { id: "sdu-lesson-03", title: "实践 3 · 脑膜瘤数字病理分析", text: "我们使用脑膜瘤 H&E 组织图块核对图像来源和坐标，观察组织形态，完成基础分类，并结合验证、测试、错误图块和染色变化阅读结果。", date: "2026 年暑期历史课程", href: "programs/sdu-lesson-03.html", kaggle: "https://www.kaggle.com/code/liuhanyu1007/sdu-neuro-3" },
        { id: "sdu-lesson-04", title: "实践 4 · 脑疾病临床数据分析", text: "我们使用受试者级临床表格确认样本单位和变量，完成预处理、分类比较与概率评价，再通过变量贡献和错误样本查看模型表现。", date: "2026 年暑期历史课程", href: "programs/sdu-lesson-04.html", kaggle: "https://www.kaggle.com/code/liuhanyu1007/sdu-neuro-4" },
        { id: "sdu-lesson-05", title: "实践 5 · 空间转录组表达分析", text: "我们使用同一组织区域的图像与表达数据核对字段和数据划分，观察输入与参考图，训练轻量模型，并检查聚合一致性和基线差异。", date: "2026 年暑期历史课程", href: "programs/sdu-lesson-05.html", kaggle: "https://www.kaggle.com/code/liuhanyu1007/sdu-neuro-5" }
      ]
    },
    {
      id: "fudan",
      label: "复旦大学秋季学期本科生践悟课程",
      title: "复旦大学秋季学期本科生践悟课程",
      subtitle: "领域知识、学术常识与技能培养",
      text: "剑桥大学 KYDW 成员所属课题组团队在复旦大学面向高潜力学生授课的科研践悟课程，主要从领域知识、学术常识、技能培养等多方面展开。",
      audience: "复旦大学高潜力本科生",
      date: "2025 年秋季学期",
      status: "合作项目",
      href: "programs/fudan.html",
      order: 3,
      period: "合作项目",
      home: true,
      lessons: [
        { id: "fudan-lesson-01", title: "第一节 资源获取、编程与人工智能", text: "从学术资源获取、Python 与 Anaconda 环境、VSCode、Jupyter Notebook、Colab 以及人工智能工具开始建立科研工作环境。" },
        { id: "fudan-lesson-02", title: "第二节 文献与办公工具", text: "从论文检索、阅读、记录和常用办公工具开始整理科研资料。" },
        { id: "fudan-lesson-03", title: "第三节 科研工具与实践", text: "把资料、代码环境和实践任务放进同一条科研工作流程。" },
        { id: "fudan-lesson-04", title: "第四节 开发环境与系统基础", text: "认识开发环境、文件系统和代码项目运行所需的基础设置。" },
        { id: "fudan-lesson-05", title: "第五节 验证任务", text: "通过验证任务检查前面工具和方法是否能够用于实际问题。" },
        { id: "fudan-lesson-06", title: "第六节 近期人工智能更新与数据知识", text: "结合近期人工智能工具和数据知识，继续完善科研工作方式。" },
        { id: "fudan-lesson-07", title: "第七节 学术界常识", text: "整理进入学术研究后需要了解的基本规则、交流方式和研究习惯。" }
      ]
    },
    {
      id: "workshop",
      label: "专题交流",
      title: "生物医学人工智能专题交流",
      subtitle: "论文、代码与研究问题交流",
      text: "围绕医学影像、生物信息学和人工智能等交叉方向，讨论论文、代码实践与研究问题。",
      audience: "对生物学与人工智能交叉方向感兴趣的学生和研究者",
      date: "持续开展",
      status: "持续开展",
      href: "programs/workshop.html",
      order: 4,
      period: "持续开展",
      home: true
    }
  ],

  training: {
    title: "KYDW科研入门培训",
    lead: "基础知识、人工智能与科研实践构成研究任务所需的知识、工具与方法。",
    paragraphs: [
      "科研入门培训面向准备接触科研的本科生，内容包括电脑、文献、数据、Python、人工智能、深度学习和研究实践。每个章节都对应一组可以继续阅读或动手完成的内容。",
      "培训内容既包括基础知识，也包括文献阅读、代码环境、挑战赛和实战项目。学习时可以按照章节顺序进入，也可以根据已有基础直接选择需要的模块。"
    ],
    chapters: [
      {
        id: "preface",
        title: "学习方法与完整流程",
        lead: "准备材料、掌握方法和完成实践构成一条可以反复使用的学习路径。",
        topics: [
          { title: "先形成完整流程", text: "从研究问题、资料、工具和实践任务开始，先完成一次完整的学习过程。" },
          { title: "再逐步增加难度", text: "先复盘结果和过程，再进入更复杂的数据、模型和研究问题。" }
        ]
      },
      {
        id: "foundation",
        title: "基础知识",
        lead: "为后续阅读和实践补齐电脑操作、文献、数据与科研表达基础。",
        topics: [
          { title: "认识基本电脑知识", text: "文件管理、常用操作、编辑器、开发环境以及代码运行和调试。" },
          { title: "文献是什么", text: "从研究问题、方法、结果和讨论认识一篇论文如何组织信息。" },
          { title: "文献检索", text: "使用关键词和数据库寻找与研究问题相关的论文和资料。" },
          { title: "认识数据", text: "从表格、数组和图像理解数据的结构、形状与基本处理方式。" },
          { title: "面向初学者的阅读文献思路", text: "从摘要、图表和方法入手，逐步建立对论文的整体判断。" },
          { title: "实践：文献阅读", text: "把检索、筛选和梳理论文的方法用于一次具体阅读。" },
          { title: "实践：绘制科研海报", text: "将研究问题、方法、结果和结论组织成清晰的科研表达。" }
        ]
      },
      {
        id: "ai-basics",
        title: "初识人工智能",
        lead: "从 Python 和基础概念进入回归、分类以及医学数据任务。",
        topics: [
          { title: "人工智能基础知识", text: "认识数据、特征、标签、训练、预测和评价等基本概念。" },
          { title: "Python 安装与使用", text: "完成运行环境配置，掌握变量、函数、数组和基础数据处理。" },
          { title: "基于人工智能的自主学习", text: "用人工智能工具辅助查找资料、理解代码和拆分学习任务。" },
          { title: "人工智能时代也要讲人话", text: "把问题、输入、输出和限制条件说明白，再与工具进行有效交流。" },
          { title: "人工智能与 Python 入门", text: "通过短小的 Python 练习观察人工智能任务如何运行。" },
          { title: "机器学习：回归与分类", text: "从连续数值预测和类别判断理解最基本的监督学习任务。" },
          { title: "医学数据与人工智能任务", text: "把医学问题转化为数据、模型和结果可以表达的任务。" },
          { title: "实践：Python 与人工智能", text: "完成一次包含数据输入、模型运行和结果解释的入门实践。" }
        ]
      },
      {
        id: "challenges",
        title: "挑战赛",
        lead: "以限时任务训练数据处理、模型实践和研究表达。",
        topics: [
          { title: "医学人工智能挑战赛", text: "围绕医学影像、生理信号等方向完成数据任务，依据性能指标和学术报告评价结果。" },
          { title: "任务拆解与限时实践", text: "在有限时间内明确输入、输出、评价指标和实现路径。" },
          { title: "学术报告", text: "把任务背景、方法选择、实验结果和问题分析组织成完整报告。" }
        ]
      },
      {
        id: "research-basics",
        title: "基础科研",
        lead: "从深度学习环境和代码基础进入信号、图像与模型实践。",
        topics: [
          { title: "深度学习基础", text: "理解神经网络、训练过程和常见深度学习任务的基本结构。" },
          { title: "深度学习环境", text: "安装并检查深度学习项目所需的软件环境和依赖。" },
          { title: "信号分析实践", text: "从信号的表示、处理和特征观察进入实际分析任务。" },
          { title: "图像生成实践", text: "通过图像生成任务观察模型如何学习数据分布和视觉结构。" },
          { title: "PyTorch 代码复盘", text: "回顾数据集、模型、训练、验证和结果保存等代码环节。" }
        ]
      },
      {
        id: "advanced-research",
        title: "完整研究任务",
        lead: "把基础代码、数据处理、模型训练和结果分析放进更完整的研究任务。",
        locked: true,
        topics: [
          { title: "完整研究任务", text: "围绕研究问题完成数据准备、方法选择、实验设计和结果分析。" },
          { title: "研究过程复盘", text: "从数据质量、模型表现和实验结论中找出下一步需要验证的问题。" }
        ]
      },
      {
        id: "frontiers",
        title: "探索学科前沿",
        lead: "从论文、数据和研究问题出发，持续追踪医学与人工智能交叉方向。",
        locked: true,
        topics: [
          { title: "阅读前沿论文", text: "关注研究问题、数据来源、方法设计和结果解释，而不只记录名词。" },
          { title: "追踪研究方向", text: "比较不同论文如何处理同一类问题，并寻找可以继续验证的切入点。" }
        ]
      },
      {
        id: "practice",
        title: "知行合一 自强不息",
        lead: "把知识学习、代码实践和研究表达放在同一个任务中完成。",
        locked: true,
        topics: [
          { title: "完成一次实践", text: "把章节中的概念用于一次可运行、可观察、可解释的实践。" },
          { title: "检查运行结果", text: "根据运行结果检查问题、方法和结论，形成自己的研究判断。" }
        ]
      },
      {
        id: "tools",
        title: "科研工具与技能",
        lead: "整理科研过程中常用的代码环境、文献资料、结果表达与协作方法。",
        locked: true,
        topics: [
          { title: "代码环境", text: "配置编辑器、运行环境和项目依赖，使实践可以稳定复现。" },
          { title: "文献与资料", text: "建立检索、阅读、记录和整理研究资料的工作方式。" },
          { title: "结果表达", text: "用图表、海报、汇报和报告说明研究问题、方法与结果。" },
          { title: "协作与复盘", text: "在共享代码和资料的同时，清楚记录修改、实验和结论。" }
        ]
      },
      {
        id: "cooperation",
        title: "附录：KYDW合作项目表",
        lead: "整理团队关联的合作项目、研究方向与参与入口。",
        locked: true,
        topics: [
          { title: "合作项目目录", text: "按研究方向查看团队公开的合作项目与活动内容。" },
          { title: "方向与任务", text: "从项目任务了解不同课题组和研究方向的工作方式。" }
        ]
      },
      {
        id: "practice-projects",
        title: "附录：实战项目",
        lead: "把前面章节的知识带入完整的医学与人工智能实践任务。",
        locked: true,
        topics: [
          { title: "数据与结果", text: "按项目查看数据处理、模型搭建、结果分析和研究表达。" },
          { title: "深入学习", text: "完成入门实践后，根据兴趣继续阅读更完整的教学与代码材料。" }
        ]
      }
    ],
    plan: {
      title: "培训路径",
      lead: "基础学习、项目考核、实践进阶和合作交流共同组成培训路径。",
      parts: [
        { title: "基础学习", text: "学习基础知识和人工智能章节，建立完成后续实践所需的知识与工具基础。" },
        { title: "项目考核", text: "围绕基础章节完成四项实践，把文献、数据、代码和结果表达落实到具体任务。" },
        { title: "实践进阶", text: "可选择医学人工智能挑战赛或国内竞赛专项培训，继续训练研究任务或竞赛项目的完整执行。" },
        { title: "合作交流", text: "完成学习与实践后，可根据兴趣和能力，继续参加纯科研项目、竞赛项目，或联系课题组跟学。" }
      ],
      note: "外校学生也可以依托 KYDW 参与关联创新团队与课题组的科研或竞赛活动。"
    }
  },

  experience: {
    title: "本科生科研入门体验项目",
    label: "项目与活动 / 本科生科研入门",
    environment: {
      title: "项目环境准备",
      short: "完成网络访问、账户注册和 Kaggle 代码项目创建，开始实践前先完成这一步。",
      href: "resources/environment.html"
    },
    advancedResources: [],
    lockedAdvancedResources: [
      { title: "进阶项目说明", href: "experience/advanced-resources/index.html", locked: true, studentVisible: false },
      { title: "数据与运行说明", href: "experience/advanced-resources/data-guide.html", locked: true, studentVisible: false },
      { title: "资料与文献索引", href: "experience/advanced-resources/references.html", locked: true, studentVisible: false }
    ],
    homeProjectIds: ["project-04", "project-05", "project-06"],
    homeProjectSummaries: {
      "project-01": "我们使用 MNIST 手写数字图像检查数据、训练分类模型，并查看混淆矩阵和噪声测试结果。",
      "project-02": "我们使用配对的 MRI 切片和肿瘤 mask 按患者划分数据，完成分割并比较 Dice、IoU 和边界结果。",
      "project-03": "我们使用胸部 X 射线观察投影图像和数字质量，训练残差卷积 VAE，并比较重建、潜空间采样和图像统计。",
      "project-04": "我们使用脑膜瘤 H&E 组织图块核对图像来源和坐标，观察组织形态，完成基础分类，并结合验证、测试、错误图块和染色变化阅读结果。",
      "project-05": "我们使用受试者级临床表格确认样本单位和变量，完成预处理、分类比较与概率评价，再通过变量贡献和错误样本查看模型表现。",
      "project-06": "我们使用同一组织区域的图像与表达数据核对字段和数据划分，观察输入与参考图，训练轻量模型，并检查聚合一致性和基线差异。"
    },
    latestNews: {
      title: "最新消息",
      lead: "新项目开放：本科生科研入门体验项目 Week 2：",
      projectIds: ["project-04", "project-05", "project-06"]
    },
    lead: "面向0基础本科生的线上科研体验项目，按周开放，含医学影像、生物信息学与人工智能等多个方向与其交叉研究。",
    date: "计划开放时间：2026 年 8 月 2 日—9 月中旬；期间可随时加入，后加入可适当延期。",
    simulationNote: "本页下方的“参考输出”用于对照实践步骤。网页代码单元格只能阅读，不能直接填写；要得到自己的结果，请在 Kaggle 中打开公开 Notebook，点击“复制并编辑”保存到自己的账户后运行和修改。",
    practiceGuidance: "实践项目优先在 Kaggle 中运行：打开对应的公开 Notebook，点击“复制并编辑”保存到自己的账户，再按单元格逐步运行、修改并观察结果。也可以下载到自己的电脑上运行；遇到不理解的代码时，结合单元格说明和公开资料逐步理解。需要对照时，可以打开实践项目参考答案核对。",
    practiceTaskGuides: {
      "project-01": [
        { task: "任务 1：数据检查与真实样本可视化", fill: "补全数据集大小、类别分布、图像范围和样本标签的检查。", basis: "根据 train_full、sample_image、sample_label 等已有对象，以及单元格中的 print 和 assert 确定检查内容。", check: "运行后确认样本图像能显示，图像形状为 [1, 28, 28]，像素范围在 0—1，类别分布没有丢失。" },
        { task: "任务 2：训练集归一化", fill: "用训练子集计算像素均值和标准差，填入归一化变换。", basis: "只使用训练子集和 stat_loader 计算统计量；不能把验证集或测试集的数据混入统计。", check: "运行后查看均值、标准差和归一化后的样本范围，确认验证集和测试集只使用训练集统计量。" },
        { task: "任务 3：补全小型卷积神经网络", fill: "补全 SmallCNN 的卷积模块、池化后的展平维度和分类层。", basis: "根据输入形状 [1, 28, 28]、卷积和池化设置，以及最后需要输出 10 个类别的 CrossEntropyLoss 确定层结构。", check: "先用一批样本前向运行，确认输出形状为 [batch_size, 10]，没有维度错误。" },
        { task: "任务 4：补全训练步骤", fill: "完成一个标准训练循环中的前向计算、损失、反向传播、参数更新和验证记录。", basis: "按照 optimizer.zero_grad → model(x) → loss → loss.backward → optimizer.step 的顺序填写，并把每轮指标写入 history。", check: "运行后确认 train_loss 和 val_loss 有记录，损失和准确率曲线能够绘制。" },
        { task: "任务 5：测试集评价", fill: "调用 evaluate 得到测试损失、准确率、真实标签和预测标签，并计算混淆矩阵与 F1。", basis: "根据 evaluate 的返回值和后续绘图代码中的变量名填写，不要手动填写参考数字。", check: "确认混淆矩阵为 10×10，准确率、macro-F1 与类别标签数量对应。" },
        { task: "任务 6：噪声稳健性", fill: "使用 evaluate 的 noise_sigma 参数，对测试图像加入指定强度的噪声并记录准确率。", basis: "保留 noise_sigma=0.25，比较干净测试集和加噪测试集的指标。", check: "确认加噪准确率和准确率下降值由你的运行结果得到，参考数字只用于对照。" },
        { task: "任务 7：单变量对照", fill: "选择一个训练变量进行一次对照实验，并在 comparison 中记录变量、设置、指标和观察。", basis: "只能改变一个变量，例如学习率、训练轮数或噪声强度；其余设置保持不变。", check: "运行后比较两组结果，说明改变的变量是否影响准确率、损失或噪声稳健性。" }
      ],
      "project-02": [
        { task: "任务 1：完成数据核对", fill: "补全 patient_count、positive_masks 和 empty_ratio 等数据检查结果。", basis: "根据配对后的 MRI、mask 和患者文件夹统计；患者数量按患者标识去重，阳性 mask 和空 mask 由实际 mask 内容判断。", check: "确认图像、mask 和患者标识一一对应，叠加显示时 mask 能落在 MRI 图像上。" },
        { task: "任务 2：补全 Dice", fill: "完成概率图阈值化、预测区域与真实区域的交集，以及两侧区域面积计算。", basis: "根据 pred、target、threshold 和 eps 的变量含义填写；Dice 的分子使用交集，分母使用预测区域与真实区域面积之和。", check: "用全零、完全相同和完全不相交的简单输入检查结果范围与边界情况。" },
        { task: "任务 3：补全 U-Net 卷积块", fill: "完成 DoubleConv 的两次卷积、归一化和 ReLU，并保持空间尺寸不被意外改变。", basis: "根据 cin、cout、kernel、padding 和后续 U-Net 拼接的通道数确定层结构。", check: "用一批 MRI 输入前向运行，逐层确认通道数和高宽可以连接。" },
        { task: "任务 4：补全一次训练更新", fill: "依次完成清梯度、前向计算、BCE/soft Dice 损失、反向传播和优化器更新。", basis: "阈值化 Dice 用于结果评价，soft Dice 用概率图参与训练；根据 bce、soft_dice_score、model 和 opt 的已有定义，以及 history 的记录位置填写。", check: "确认训练损失、验证损失和 Dice 曲线有数值，模型参数在更新。" },
        { task: "任务 5：测试评价与阈值比较", fill: "比较 0.3、0.5、0.7 等候选阈值，在验证集选择 Dice 最好的阈值，再在测试集评价。", basis: "阈值只能用验证集选择；测试集用于最后一次评价，不能反过来选择阈值。", check: "确认最佳阈值、测试 Dice、IoU 和预测图像来自你的运行结果，预测 mask 与真实 mask 的形状一致。" }
      ],
      "project-03": [
        { task: "任务 1：解释归一化范围", fill: "在“你的回答”单元格说明为什么把胸片像素从显示范围映射到模型使用的范围。", basis: "结合原始像素范围、Normalize([.5],[.5])、解码器最后一层 Tanh 和显示时的反变换说明。", check: "运行后确认真实图像、重建图像和采样图像使用一致的模型数值范围，显示时能正确恢复到 [0,1]。" },
        { task: "任务 2：补全编码器与潜变量", fill: "完成 Encoder 的特征提取、mu/logvar 两个输出和重参数化函数。", basis: "根据输入 [B,1,64,64]、潜变量维度 64 以及 Decoder 的输入要求确定 shape；重参数化使用 z = mu + std * eps。", check: "用一批胸片运行 shape 检查，确认 mu、logvar 和 z 都为 [B,64]，且 z 能送入 Decoder。" },
        { task: "任务 3：补全解码器与训练损失", fill: "完成 Decoder 的上采样结构，并计算重建 L1、边缘损失和 KL 损失。", basis: "根据 z 的维度和目标图像 [B,1,64,64] 确定转置卷积层；总损失由重建项、边缘项和 KL 项按代码中的权重组成。", check: "确认一次前向运行得到与输入同 shape 的重建图像，三项损失均为有限数值。" },
        { task: "任务 4：结果检查", fill: "比较输入与重建图像、潜空间采样图像、训练曲线和图像统计。", basis: "同时观察胸廓、双肺、中央纵隔、灰度变化和样本差异，不能只看单张图像或单个损失数字。", check: "确认结果文件能够保存，并能根据重建 L1、图像特征差异和样本两两距离写出具体观察。" }
      ],
      "project-04": [
        { task: "任务 1：固定图块数据核对", fill: "读取课程 NPZ，核对图块 shape、标签、原图编号、原图坐标和 train/validation/test 划分。", basis: "根据 images、labels、source_image_ids、coordinates_yx 和 split 的字段含义生成汇总。", check: "确认每个集合的图块数、原图来源、坐标范围和三类标签数量。" },
        { task: "任务 2：图像统计与形态特征", fill: "输出训练集的五个图像测得特征名称、均值和标准差，并用 RGB 均值做一个颜色统计比较。", basis: "第一列 proxy_score 只用于说明标签来源；其余五列来自 H&E 图像测量，统计只使用训练集。", check: "确认特征统计有数值，RGB 比较能和三档教学标签对应阅读。" },
        { task: "任务 3：形态特征随机森林", fill: "使用五个图像测得的形态特征训练三分类随机森林，明确排除 proxy_score。", basis: "根据 train、validation、test 的原图级划分和 labels 完成模型输入与输出设置。", check: "确认模型输入不含 proxy_score，前向预测能输出三个类别。" },
        { task: "任务 4：验证集选模与独立测试", fill: "比较不同树数量的验证集宏平均 F1，固定最佳设置后只在测试集计算指标和混淆矩阵。", basis: "验证集用于选择树数量；测试集只用于最后评价，并从测试集中查看错误图块。", check: "确认验证曲线、测试宏平均 F1、混淆矩阵和错误图块都有结果。" },
        { task: "任务 5：错误图块与染色变化", fill: "查看测试错误图块，固定形态模型并改变 RGB 通道，比较染色变化前后的宏平均 F1。", basis: "把错误类型、染色扰动和代理标签来源放在一起解释，不把结果写成临床病理分级能力。", check: "确认结果图和 JSON 文件能够保存，并能说明颜色变化带来的影响。" },
      ],
      "project-05": [
        { task: "任务 1：样本单位和输入变量", fill: "核对每行受试者、四类标签、变量类型、ID 列和缺失率。", basis: "ID 只用于识别，label 是 CTL、AD、PD、DEP 四分类目标。", check: "确认类别数量、数值列、类别列和缺失总数与 Data.csv 一致。" },
        { task: "任务 2：训练集预处理与缺失值演示", fill: "建立训练/验证/测试划分、类别编码和只在训练集拟合的预处理管道，并观察一小段模拟缺失值的填补。", basis: "当前 Data.csv 没有缺失值，演示副本不改变原始数据；填补规则仍由训练集估计。", check: "确认预处理没有读取验证集或测试集的统计量。" },
        { task: "任务 3：XGBoost 参数", fill: "补全 n_estimators、max_depth、learning_rate 等轻量参数。", basis: "四分类模型输出四个类别的概率，参数设置应保持可运行。", check: "确认模型可以完成训练并生成四列概率。" },
        { task: "任务 4：验证集比较与测试评价", fill: "在验证集比较逻辑回归基线和 XGBoost，再在设置确定后输出测试集混淆矩阵、每类指标、宏平均 F1 和概率曲线。", basis: "测试集不参与模型选择。", check: "确认验证指标和测试指标分开记录。" },
        { task: "任务 5：变量贡献与错误分析", fill: "使用置换重要性和高置信度错误查看模型依赖的变量与错误样本。", basis: "置换重要性表示当前模型的输入依赖，不表示变量具有疾病因果作用。", check: "确认重要性排序和错误表能够对应实际变量。" }
      ],
      "project-06": [
        { task: "任务 1：输入字段与预设空间划分", fill: "核对 he、lr、hr、split 的 shape、表达范围和 train/validation/test 数量。", basis: "split 已由课程数据预先提供；NPZ 当前没有坐标或区域编号，实践中不重新计算空间距离。", check: "确认四个字段长度一致，集合名称和数量与数据一致。" },
        { task: "任务 2：同一区域三图可视化", fill: "选择一个训练样本，绘制 H&E、LR/64 和 HR 参考表达图。", basis: "三张图覆盖同一空间区域，但尺度和数值含义不同。", check: "确认图像能并排显示，并能说明粗尺度总量与细尺度表达的关系。" },
        { task: "任务 3：轻量联合输入网络", fill: "完成 4 通道输入、1 通道输出的表达预测网络。", basis: "H&E 提供形态，LR 提供粗尺度表达，输出与 HR 参考图 shape 一致。", check: "确认模型可以完成单批前向运行。" },
        { task: "任务 4：损失和聚合一致性", fill: "完成 log 空间损失与 8×8 聚合一致性计算。", basis: "预测按 8×8 区域聚合后，应与 LR 粗尺度总量接近。", check: "确认损失为有限值并能参与反向传播。" },
        { task: "任务 5：训练、基线和结果评价", fill: "完成验证选模，比较模型和插值基线的 MAE、相关性、聚合误差与空间图。", basis: "两种方法使用同一预设测试集合和同一评价标准。", check: "确认数值与图像结论一致，并说明细尺度预测不能自动等同于真实细胞表达。" }
      ]
    },
    goal: "通过一组完整而易上手的研究任务，接触更多专业方向，在实践中发现自己的兴趣偏好与能力优势。",
    paragraphs: [
      "体验项目把领域研究问题整理成一组简单、易懂、可以上手的实践。研究任务通常包含数据检查、处理、建模、结果和解释，学生可以在完整流程中了解不同方向。",
      "项目按周分批开放，每周开放一部分，每一部分包含 3 个项目。第一周的第一个项目是基础编程与人工智能，为零基础跨专业同学和 26 级新生准备；后续项目进入医学影像、计算病理、表格预测和空间转录组等方向。项目主题和开放状态均在项目目录中持续更新。",
      "开放期间可以自行安排学习。项目以线上自学为主，不涉及硬件和湿实验，使用计算机完成学习与实践。对某个项目感兴趣的同学可以联系负责人了解后续学习和课题组相关安排。",
      "项目内容面向受众较为广泛，且本身培养模式属于研究生阶段自学模式，并不会全面覆盖所有知识点。遇到不理解的问题时，可以结合教材、公开资料和文献逐步补全知识网络，同时锻炼自己的理解与检索能力。"
    ],
    facts: [
      { value: "1—3 年级", label: "主要面向本科生" },
      { value: "按周", label: "研究方向分组" },
      { value: "理论 + 实践", label: "每个项目两部分" },
      { value: "公开", label: "网站学习资料" }
    ],
    audience: "适合大学开学后 1—3 年级、来自不同专业、课题组和院校的本科生，尤其适合医学、工程、计算机、自动化、人工智能、生物医学工程和智能医学工程等交叉方向的本科生。",
    schedule: "开放期间可以自主安排学习；秋季开学后结束访问。项目按周分批开放，具体主题和开放状态以项目目录为准。",
    participation: "线上自学为主，不涉及硬件及湿实验，仅需计算机设备。每个项目包含约 1—2 小时理论知识讲解和一个交互式实践。",
    access: "关注“科研大王”公众号，后台留言或添加负责人微信 Liu_han-yu 获取项目入口与学习资料。",
    contact: {
      title: "答疑/反馈渠道",
      text: "参与项目的同学可以加入群聊、通过公众号后台私信、添加负责人微信或邮件联系等多种渠道进行提问和反馈，具体联系方式见页面最下方。",
      channels: [
        { title: "科研实习项目发布二群二维码", image: KYDW_INTERNSHIP_GROUP_QR },
        { title: "本项目专属群聊二维码", homeTitle: "本科生科研入门体验项目专属群聊", image: "assets/contact/project-group-qr-cropped.png" },
        { title: "微信公众号", image: "assets/contact/official-account-qr.jpg" },
        { title: "负责人微信二维码", image: "assets/contact/leader-wechat-qr-cropped.png" }
      ],
      email: "lhanyu07@foxmail.com"
    },
    comparison: [
      { title: "体验项目", text: "先阅读基础教学内容，再完成对应实践中的代码和文字任务。" },
      { title: "后续学习", text: "根据兴趣选择希望继续学习的方向，后续材料按项目开放状态更新。" }
    ],
    levels: [
      { title: "基础学习", text: "先阅读基础教学内容，再在实践项目中完成指定内容，完成后使用实践项目参考答案核对代码和分析过程。" },
      { title: "继续学习", text: "前面已经学习数个方向后，可以根据兴趣继续阅读同一领域的方法、前沿研究和研究设计；相关材料按项目开放状态更新。" }
    ],
    structure: [
      { no: "01", title: "教学项目", text: "教学内容建立完成实践所需的基础知识，并补充方法、前沿研究与研究设计。" },
      { no: "02", title: "实践项目", text: "基础实践完成指定内容；继续学习时可以设计方法、运行实验并形成设计报告。" },
      { no: "03", title: "实践项目参考答案", text: "完成实践后核对代码、分析过程和结果表达。每份实践项目参考答案展示一种可行方案。" },
      { no: "04", title: "继续学习项目", text: "继续学习项目包含教学项目、实践项目和实践项目参考答案，内容覆盖更完整的方法体系、前沿研究与研究设计；相关材料按开放状态更新。" },
      { no: "05", title: "答疑/反馈渠道", text: "可通过群聊、公众号后台、负责人微信或邮件提问和反馈，具体联系方式见页面最下方。" }
    ],
    path: [
      { title: "基础项目", text: "阅读基础教学内容，完成实践中的指定代码和文字。" },
      { title: "深入教学", text: "继续学习同一方向的方法、验证设计和前沿研究。" },
      { title: "深入实践", text: "自行设计或选择方法，完成实验并提交设计报告。" },
      { title: "联系负责人", text: "对感兴趣的方向形成清晰的学习记录后，可联系负责人了解后续学习安排。" }
    ],
    weeks: [
      { id: 1, title: "Week 1", note: "第一部分已开放。第一个项目为零基础跨专业同学和 26 级新生准备。", open: true, projects: ["project-01", "project-02", "project-03"] },
      { id: 2, title: "Week 2", note: "第二部分已开放，学生可以按项目阅读教学内容、完成题目并用参考答案核对结果。", open: true, projects: ["project-04", "project-05", "project-06"] },
      { id: 3, title: "Week 3", note: "等待后续开放。", open: false, projects: ["project-06", "project-07", "project-08", "project-09"] },
      { id: 4, title: "Week 4", note: "等待后续开放。", open: false, projects: ["project-10", "project-11", "project-12"] },
      { id: 5, title: "Week 5", note: "等待后续开放。", open: false, projects: ["project-13", "project-14", "project-15"] }
    ]
  },

  projects: [
     { id: "project-01", no: "00", week: 1, title: "基础编程与人工智能", short: "我们使用 MNIST 手写数字图像检查数据、训练分类模型，并查看混淆矩阵和噪声测试结果。", summary: "人工智能研究对象、任务类型、Python、数据表示和模型评价构成手写数字分类实践的知识基础。", input: "MNIST 手写数字图像与类别标签", output: "分类结果、混淆矩阵与噪声测试", prereq: "不要求已有编程经历", device: "普通电脑", duration: "约 1—2 小时理论 + 实践", date: "2026 年 8 月 2 日起，项目开放期内可随时加入", status: "材料已开放", teaching: "experience/teaching/project-01.html", practice: "experience/practice/project-01.ipynb", answer: "experience/answers/project-01.ipynb", kaggle: "https://www.kaggle.com/code/liuhanyu1007/kydw-try-a00", kaggleReference: "https://www.kaggle.com/code/liuhanyu1007/kydw-try-a00-reference", single: true, experience: "通过输入、处理和输出的关系认识人工智能。", tierText: "用 MNIST 手写数字分类串起数据检查、模型训练、评价与扰动实验。", referenceResults: [{ stepIndex: 3, title: "训练过程", image: "experience/assets/results/project-01/task0_training_curve.png", caption: "训练损失、验证损失与验证准确率" }, { stepIndex: 4, title: "测试集分类评价", image: "experience/assets/results/project-01/task0_confusion_matrix.png", caption: "MNIST 测试集混淆矩阵" }, { stepIndex: 5, title: "输入与预测对比", image: "experience/assets/results/project-01/task0_input_prediction_comparison.png", caption: "MNIST 测试输入、真实标签与模型预测对比" }, { stepIndex: 6, title: "测试集与噪声评价数值", text: "数据集：MNIST / torchvision\\n训练样本：51000；验证样本：9000；测试样本：10000\\n最佳验证准确率：0.9891111\\n测试准确率：0.9897\\n测试集 macro-F1：0.98965\\n噪声标准差：0.25\\n加噪测试准确率：0.9771\\n准确率下降：0.0126" }] },
     { id: "project-02", no: "01", week: 1, title: "MRI 肿瘤图像分割", short: "我们使用配对的 MRI 切片和肿瘤 mask 按患者划分数据，完成分割并比较 Dice、IoU 和边界结果。", summary: "以一张灰度 MRI 切片与对应的二值 mask 为输入，完成配对检查、患者级划分、TinyUNet 分割和 Dice/IoU 评价。", input: "配对的二维、单通道 MRI 切片与二值肿瘤 mask", output: "肿瘤区域预测、Dice/IoU 指标与测试切片结果", prereq: "不要求医学影像基础；需要愿意观察图像与结果", device: "普通电脑", duration: "约 1—2 小时理论 + 交互实践", date: "2026 年 8 月 2 日起，项目开放期内可随时加入", status: "材料已开放", experienceTeaching: "experience/teaching/project-02.html", experiencePractice: "experience/practice/project-02.ipynb", experienceAnswer: "experience/answers/project-02.ipynb", kaggle: "https://www.kaggle.com/code/liuhanyu1007/kydw-try-a01", kaggleReference: "https://www.kaggle.com/code/liuhanyu1007/kydw-try-a01-reference", advanced: "experience/advanced/project-02.html", advancedPractice: "experience/advanced-practice/project-02.ipynb", advancedAnswer: "experience/advanced-answers/project-02.ipynb", advancedReportTemplate: "experience/advanced-reports/templates/project-02.html", advancedReferenceReport: "experience/advanced-reports/examples/project-02.html", advancedOpen: false, advancedStatus: "尚未开放", advancedStudentVisible: false, experience: "观察一张灰度 MRI 切片怎样与同位置的二值 mask 配对，再把预测区域和真实区域放在一起评价。", tierText: "二维 MRI 切片与二值肿瘤 mask 用于患者级划分、TinyUNet 分割和 Dice/IoU 评价。", advancedTierText: "比较分割方法与边界评价，分析鲁棒性和不确定性，并在设计报告中说明方法选择与验证方案。", referenceResults: [{"stepIndex": 0, "title": "数据检查", "image": "experience/assets/results/project-02/task1_data_check.png", "caption": "MRI、阳性 mask 与叠加图"}, {"stepIndex": 4, "title": "训练过程", "image": "experience/assets/results/project-02/task1_training_curve.png", "caption": "训练与验证损失、Dice 曲线"}, {"stepIndex": 6, "title": "分割结果与指标", "image": "experience/assets/results/project-02/task1_prediction.png", "caption": "真实阳性测试样本、真实 mask、预测 mask 与 TP/FP/FN 编码", "text": "配对切片：3929；患者：110；训练/验证/测试：2604 / 547 / 778\n平衡训练样本：600（阳性 300、空 mask 300）；最佳阈值：0.75\n测试阳性 mask Dice：0.4870；阳性 mask IoU：0.3725\npixel Dice：0.5259；pixel IoU：0.3567；precision：0.5366；recall：0.5156\n展示图只从测试集中真实 mask 非空的切片中选择，绿色为 TP、红色为 FP、蓝色为 FN。"}] },
     { id: "project-03", no: "02", week: 1, title: "胸部 X 射线与生成模型", short: "我们使用胸部 X 射线观察投影图像和数字质量，训练残差卷积 VAE，并比较重建、潜空间采样和图像统计。", summary: "X 射线穿透、投影叠加和数字胸片质量构成残差卷积块、编码器、潜变量、解码器和生成样本评价的知识基础。", input: "胸部 X 射线图像", output: "胸片重建、潜空间采样、训练曲线与图像统计比较", prereq: "不要求先学会深度学习", device: "普通电脑；建议使用 GPU", duration: "约 1—2 小时理论 + 交互实践", date: "2026 年 8 月 2 日起，项目开放期内可随时加入", status: "材料已开放", experienceTeaching: "experience/teaching/project-03.html", experiencePractice: "experience/practice/project-03.ipynb", experienceAnswer: "experience/answers/project-03.ipynb", kaggle: "https://www.kaggle.com/code/liuhanyu1007/kydw-try-a02", kaggleReference: "https://www.kaggle.com/code/liuhanyu1007/kydw-try-a02-reference", advanced: "experience/advanced/project-03.html", advancedPractice: "experience/advanced-practice/project-03.ipynb", advancedAnswer: "experience/advanced-answers/project-03.ipynb", advancedReportTemplate: "experience/advanced-reports/templates/project-03.html", advancedReferenceReport: "experience/advanced-reports/examples/project-03.html", advancedOpen: false, advancedStatus: "尚未开放", advancedStudentVisible: false, experience: "真实胸片用于观察编码器、潜变量、解码器和生成结果之间的关系。", tierText: "胸片读取与归一化用于训练残差卷积 VAE，并比较输入、重建、潜空间采样和图像统计。", advancedTierText: "设计条件生成方案，检查患者留出、生成有效性与训练样本记忆风险，并解释评价方法。", referenceResults: [{"stepIndex": 0, "title": "真实胸片输入", "image": "experience/assets/results/project-03/task2_real_xray_grid.png", "caption": "真实胸片样本网格"}, {"stepIndex": 2, "title": "训练过程", "image": "experience/assets/results/project-03/task2_training_curve.png", "caption": "残差卷积 VAE 的总损失、重建 L1、边缘 L1 与 KL 损失曲线"}, {"stepIndex": 3, "title": "输入与生成结果", "image": "experience/assets/results/project-03/task2_input_generated_comparison.png", "caption": "上排为 INPUT / REAL CHEST X-RAY（真实输入），下排为 GENERATED OUTPUT / LATENT SAMPLE（生成结果）；两排不是同一张胸片的前后处理关系。", "text": "数据集：NORMAL 胸片 1341 张；训练/留出：1073 / 268\n模型：ResidualConvVAE；潜变量维度：64\n留出集重建 L1：0.0878；生成样本两两 L1：0.2334\n五项图像特征平均差：0.0114"}, {"stepIndex": 4, "title": "图像统计", "image": "experience/assets/results/project-03/task2_quality_metrics.png", "caption": "真实留出集与生成样本五项图像统计"}] },
     { id: "project-04", no: "03", week: 2, title: "脑膜瘤数字病理分析", short: "我们使用脑膜瘤 H&E 组织图块核对图像来源和坐标，观察组织形态，完成基础分类，并结合验证、测试、错误图块和染色变化阅读结果。", summary: "学生使用脑膜瘤 H&E 组织图块核对图像、标签、原图来源与坐标，比较颜色统计和轻量分类模型，再结合验证集、测试集、错误图块及染色变化阅读结果。", input: "脑膜瘤 H&E 组织图块、标签、原图来源、坐标和数据划分", output: "图像分类结果、混淆矩阵、错误图块和染色变化分析", prereq: "不要求病理学基础；需要接受逐步阅读图像", device: "普通电脑", duration: "约 1—2 小时理论 + 实践", date: "2026 年 8 月 2 日起，项目开放期内可随时加入", status: "材料已开放", experienceTeaching: "experience/teaching/project-04.html", experiencePractice: "experience/practice/project-04.ipynb", experienceAnswer: "experience/answers/project-04.ipynb", kaggle: "https://www.kaggle.com/code/liuhanyu1007/kydw-try-a03", kaggleReference: "https://www.kaggle.com/code/liuhanyu1007/kydw-try-a03-reference", advanced: "experience/advanced/project-04.html", advancedPractice: "experience/advanced-practice/project-04.ipynb", advancedAnswer: "experience/advanced-answers/project-04.ipynb", advancedReportTemplate: "experience/advanced-reports/templates/project-04.html", advancedReferenceReport: "experience/advanced-reports/examples/project-04.html", advancedOpen: false, advancedStatus: "尚未开放", advancedStudentVisible: false, experience: "我们使用脑膜瘤 H&E 组织图块核对图像来源和坐标，观察组织形态，完成基础分类，并结合验证、测试、错误图块和染色变化阅读结果。", tierText: "脑膜瘤 H&E 组织图块用于观察组织形态、完成基础分类和结果评价，并查看错误图块与染色变化。", advancedTierText: "以原图级无标签形态表征为核心，完成图块特征、多实例聚合、代表区域和染色稳定性分析。", referenceResults: [{stepIndex: 1, title: "真实脑膜瘤 H&E 图块", image: "experience/assets/results/project-04/task3_real_he_overview.png", caption: "课程数据中的真实脑膜瘤 H&E 组织图块"}, {stepIndex: 1, title: "图块坐标与步长", image: "experience/assets/results/project-04/task3_patch_stride_overview.png", caption: "同一原图中的真实图块坐标、128×128 图块和 256 像素坐标步长"}, {stepIndex: 3, title: "训练与验证", image: "experience/assets/results/project-04/task3_training_curve.png", caption: "随机森林树数量与验证集宏平均 F1"}, {stepIndex: 4, title: "测试结果与错误图块", image: "experience/assets/results/project-04/task3_prediction_visualization.png", caption: "测试错误图块与染色变化后的比较结果"}, {stepIndex: 4, title: "分类结果记录", text: "颜色统计基线 macro-F1：0.6007；形态特征随机森林测试准确率：1.0000；测试 macro-F1：1.0000；验证集选中的树数量：25。三档标签来自核密度代理分数，不对应临床病理分级。"}] },
     { id: "project-05", no: "04", week: 2, title: "脑疾病临床数据分析", short: "我们使用受试者级临床表格确认样本单位和变量，完成预处理、分类比较与概率评价，再通过变量贡献和错误样本查看模型表现。", summary: "学生使用受试者级表格确认样本单位和临床变量，建立只用训练集拟合的预处理流程，比较逻辑回归与树模型，再结合四类结果、混淆矩阵和变量贡献阅读模型表现。", input: "受试者级临床表格、变量和 CTL、AD、PD、DEP 四类疾病分组", output: "分类概率、混淆矩阵、分类指标与变量分析", prereq: "不要求遗传学或统计学基础", device: "普通电脑", duration: "约 1—2 小时理论 + 实践", date: "2026 年 8 月 2 日起，项目开放期内可随时加入", status: "材料已开放", experienceTeaching: "experience/teaching/project-05.html", experiencePractice: "experience/practice/project-05.ipynb", experienceAnswer: "experience/answers/project-05.ipynb", kaggle: "https://www.kaggle.com/code/liuhanyu1007/kydw-try-a04", kaggleReference: "https://www.kaggle.com/code/liuhanyu1007/kydw-try-a04-reference", advanced: "experience/advanced/project-05.html", advancedPractice: "experience/advanced-practice/project-05.ipynb", advancedAnswer: "experience/advanced-answers/project-05.ipynb", advancedReportTemplate: "experience/advanced-reports/templates/project-05.html", advancedReferenceReport: "experience/advanced-reports/examples/project-05.html", advancedOpen: false, advancedStatus: "尚未开放", advancedStudentVisible: false, experience: "我们使用受试者级临床表格确认样本单位和变量，完成预处理、分类比较与概率评价，再通过变量贡献和错误样本查看模型表现。", tierText: "受试者级临床表格用于确认样本单位和变量、完成训练集预处理与分类器比较，再查看测试评价、概率和错误样本。", advancedTierText: "使用帕金森语音记录与逻辑回归，比较受试者级和记录级验证，并完成概率校准、阈值选择和决策曲线分析。", referenceResults: [{stepIndex: 0, title: "数据摘要", image: "experience/assets/results/project-05/task4_data_summary.png", caption: "四类脑疾病表格的类别和变量摘要"}, {stepIndex: 3, title: "四分类混淆矩阵", image: "experience/assets/results/project-05/task4_confusion.png", caption: "测试集四分类混淆矩阵"}, {stepIndex: 3, title: "ROC 与 PR 曲线", image: "experience/assets/results/project-05/task4_roc_pr.png", caption: "四类分类概率的 ROC/PR 评价"}, {stepIndex: 4, title: "变量贡献", image: "experience/assets/results/project-05/task4_importance.png", caption: "置换重要性排名"}, {stepIndex: 3, title: "分类结果记录", text: "逻辑回归基线 macro-F1：0.7392；验证集 XGBoost macro-F1：0.7565；测试集准确率：0.7533；测试 macro-F1：0.7507。变量贡献用于描述模型依赖，不表示疾病因果关系。"}] },
     { id: "project-06", no: "05", week: 2, title: "空间转录组表达分析", short: "我们使用同一组织区域的图像与表达数据核对字段和数据划分，观察输入与参考图，训练轻量模型，并检查聚合一致性和基线差异。", summary: "学生使用同一组织区域的 H&E 图像和表达数据核对字段与数据划分，观察输入与参考图，训练轻量模型，再检查聚合一致性并与插值基线比较。", input: "同一组织区域的 H&E 图像、低分辨率表达图和高分辨率参考图", output: "表达估计、区域聚合比较与结果评价", prereq: "不要求先学会空间转录组分析", device: "普通电脑", duration: "约 1—2 小时理论 + 实践", date: "2026 年 8 月 2 日起，项目开放期内可随时加入", status: "材料已开放", experienceTeaching: "experience/teaching/project-06.html", experiencePractice: "experience/practice/project-06.ipynb", experienceAnswer: "experience/answers/project-06.ipynb", kaggle: "https://www.kaggle.com/code/liuhanyu1007/kydw-try-a05-public", kaggleReference: "https://www.kaggle.com/code/liuhanyu1007/kydw-try-a05-public-reference", advanced: "experience/advanced/project-06.html", advancedPractice: "experience/advanced-practice/project-06.ipynb", advancedAnswer: "experience/advanced-answers/project-06.ipynb", advancedReportTemplate: "experience/advanced-reports/templates/project-06.html", advancedReferenceReport: "experience/advanced-reports/examples/project-06.html", advancedOpen: false, advancedStatus: "尚未开放", advancedStudentVisible: false, experience: "我们使用同一组织区域的图像与表达数据核对字段和数据划分，观察输入与参考图，训练轻量模型，并检查聚合一致性和基线差异。", tierText: "同一组织区域的 H&E 图像和表达数据用于字段核对、输入与参考图观察、表达估计、聚合一致性检查和基线比较。", advancedTierText: "比较插值、图像分支与多模态融合，将当前实践中的高分辨率表达图作为教学目标，使用空间留出和聚合一致性评价，并解释不同模态的贡献。", referenceResults: [{stepIndex: 1, title: "配对输入与表达图", image: "experience/assets/results/project-06/task5_data_visualization.png", caption: "同一空间区域的 H&E、16 μm LR Snap25 和 2 μm HR Snap25"}, {stepIndex: 1, title: "大图与中心小图", image: "experience/assets/results/project-06/task5_scale_overview.png", caption: "配对大图和中心小图的空间范围"}, {stepIndex: 4, title: "训练过程", image: "experience/assets/results/project-06/task5_training_curve.png", caption: "模型训练损失与验证比较"}, {stepIndex: 4, title: "预测结果", image: "experience/assets/results/project-06/task5_prediction_visualization.png", caption: "Snap25 表达预测与参考图比较"}, {stepIndex: 4, title: "单基因结果记录", text: "当前 Notebook 固定预测 Snap25 一个基因；结果 JSON 记录模型 MAE、插值基线 MAE 与像素相关性。空间聚合一致性用于补充检查，结果不代表恢复了完整的细尺度转录组。"}] },
    { id: "project-07", no: "06", week: 3, title: "基于空间转录组学的细胞通讯", short: "细胞位置、配体受体和表达关系构成细胞通讯分析的基础。", summary: "围绕配体、受体、空间邻近和细胞状态，认识细胞通讯分析提出的问题与结果解释边界。", input: "空间位置、细胞类型与基因表达", output: "候选细胞通讯关系及其可视化", prereq: "项目开放后进入页面学习", device: "计算机", duration: "待开放后公布", status: "后续开放", advanced: null, experience: "从‘哪些细胞在一起’开始，观察‘哪些信号可能连接它们’。" },
    { id: "project-08", no: "07", week: 3, title: "基于传感器的人类活动识别", short: "用传感器信号判断人的活动状态。", summary: "认识时间序列、窗口切分和信号分类，理解连续传感器数据与活动标签之间的基本分析流程。", input: "加速度、陀螺仪等传感器时间序列", output: "活动类别预测与混淆分析", prereq: "项目开放后按页面提示学习", device: "待项目页说明", duration: "待开放后公布", status: "后续开放", advanced: null, experience: "先把连续信号切成可观察的小片段，再看不同活动留下的模式。" },
    { id: "project-09", no: "08", week: 3, title: "组织学图像虚拟染色", short: "让模型学习把一种组织图像转换成另一种染色外观。", summary: "理解图像翻译、染色差异和生成模型的任务边界，区分视觉相似与生物学真实。", input: "组织学图像及对应/非对应染色图像", output: "虚拟染色结果与差异分析", prereq: "项目开放后进入页面学习", device: "计算机", duration: "待开放后公布", status: "后续开放", advanced: null, experience: "观察不同染色如何改变图像外观，再讨论模型如何保留组织信息。" },
    { id: "project-10", no: "09", week: 4, title: "人体生理信号分析", short: "人体信号变化与健康状态、研究问题相关。", summary: "研究问题、信号类型和实践材料将在项目开放时介绍。", input: "待公布", output: "待公布", prereq: "待公布", device: "待公布", duration: "待公布", status: "待定", advanced: null, experience: "人体生理信号方向，内容随后公布。" },
    { id: "project-11", no: "10", week: 4, title: "后续方向 10", short: "后续方向陆续公布。", summary: "项目名称、研究问题和实践内容随后公布。", input: "待公布", output: "待公布", prereq: "待公布", device: "待公布", duration: "待公布", status: "待公布", advanced: null, experience: "内容随后公布。" },
    { id: "project-12", no: "11", week: 4, title: "后续方向 11", short: "后续方向陆续公布。", summary: "项目名称、研究问题和实践内容随后公布。", input: "待公布", output: "待公布", prereq: "待公布", device: "待公布", duration: "待公布", status: "待公布", advanced: null, experience: "内容随后公布。" },
    { id: "project-13", no: "12", week: 5, title: "后续方向 12", short: "后续方向陆续公布。", summary: "项目名称、研究问题和实践内容随后公布。", input: "待公布", output: "待公布", prereq: "待公布", device: "待公布", duration: "待公布", status: "待公布", advanced: null, experience: "内容随后公布。" },
    { id: "project-14", no: "13", week: 5, title: "后续方向 13", short: "后续方向陆续公布。", summary: "项目名称、研究问题和实践内容随后公布。", input: "待公布", output: "待公布", prereq: "待公布", device: "待公布", duration: "待公布", status: "待公布", advanced: null, experience: "内容随后公布。" },
    { id: "project-15", no: "14", week: 5, title: "后续方向 14", short: "后续方向陆续公布。", summary: "项目名称、研究问题和实践内容随后公布。", input: "待公布", output: "待公布", prereq: "待公布", device: "待公布", duration: "待公布", status: "待公布", advanced: null, experience: "内容随后公布。" }
  ],

  professional: {
    label: "专业解读",
    title: "生医工专业认知与发展路径",
    lead: "生物医学工程是一门连接工程、计算机、医学与生物学的交叉学科。",
     contextNote: "院校案例：东北大学生物医学工程（中外合办）采用中英联合培养，涉及邓迪大学课程、院内课程安排、较高课程负担和较高培养费用；专业发展、科研和就业部分为生物医学工程通用内容。",
    intro: [
      "生物医学工程是典型的交叉学科，以工程手段解决医学与生物学问题，既非纯生物，亦非临床医疗。下面从专业性质、培养结构、科研、升学、就业与本科阶段准备展开说明。"
    ],
    sections: [
      {
        title: "专业性质与培养结构",
        paragraphs: [
          "生物医学工程（生医工）是典型的跨学科专业，其培养方向与院校特色高度绑定，不同高校之间的差异远大于多数传统专业。判断一个生医工项目是否适合自己，首先应看其课程表中是否包含编程、计算机或人工智能相关课程，以及最终授予的是工学、理学还是医学学位——这三点是区分强工科导向与泛交叉导向的关键。",
          "以东北大学生医工为例，其底色是工科，核心课程集中在计算机、自动化与人工智能，本科阶段会把影像、生物、软件、材料、仪器、光电等交叉方向广泛涉猎一遍，真正的方向专精通常留到研究生阶段。本科培养强调多学科视野与方法基础，学生在研究生阶段再快速切入某一细分方向。",
          "东北大学生医工采用中外合办培养模式，学生最终获得英方本科学位。课程体量约为常规专业的 1.5 倍，考试以英文卷形式进行，题目难度整体不高但高分不易；授课分为中方课与英方课两类，英方课由邓迪大学教师全英文负责，低年级已配有实时字幕等辅助。这一模式在语言环境与海外衔接上形成了明显优势，但也意味着课业节奏更紧凑。"
        ]
      },
      {
        title: "本科广度与研究生专精",
        paragraphs: [
          "本科阶段的课程设置以广为特征。学生会在前三年接触生医领域各交叉方向的基础内容，方向选择通常在大二、大三逐渐清晰，再在研究生阶段深入。这样的课程结构保留了后续选择空间，也要求学生主动比较不同任务和研究方向。",
          "课业强度与语言环境是新生最关心的实际问题。整体课量偏大，但考核难度可控；英文教学环境在前两年有配套支持，随年级提升逐步过渡到自主适应。大四阶段在邓迪完成，当地课程体系把重要课程集中在三、四年级，且仅有这两年成绩计入学位等级，因此第四年的课程投入与下一阶段的升学准备需要统筹兼顾。"
        ]
      },
      {
        title: "发展现实与就业方向",
        paragraphs: [
          "生医工本科阶段的就业面相对狭窄，这是该专业被反复讨论天坑与红利的核心矛盾。其专业方向与学校课程普遍不面向直接就业，本科所学知识缺乏深入方向，企业更倾向招募已有单一专业能力的毕业生。现实中，本科毕业直接就业多局限于销售类岗位，或需自学计算机转码、考公考编。",
          "因此，该专业的主流发展路径是继续深造。无论是国内保研还是海外申研，名校的进入门槛都显著低于直接就业的要求，读研的性价比因此较高。平台与地域差异也深刻影响出路：以上交、上科为代表的强校与产业界（如上海联影）联系紧密，成果转化能力强；而中下 985 或非双一流院校若所在地区产业薄弱，对口就业会明显受限。选择往往大于努力——这一高度交叉的专业，未来出路更取决于个人对兴趣、擅长点与规划目标的整合，而非单纯按培养计划内卷。"
        ]
      },
      {
        title: "科研为何必要",
        paragraphs: [
          "这是最常被问到、也最需尽早建立认知的一点。升学评价导向上，保研层面冲刺清北复交浙等层级的同学普遍至少持有一篇学术论文，仅刷绩点不足以形成区分度。海外申请 MPhil / PhD 更看重研究计划、已有研究经历与产出，对硬性成绩要求反而低于国内，但科研门槛显著更高——以港三、新二或美国前 50 为目标，通常需至少一篇较高水平的期刊或会议论文。",
          "就业门槛同样存在。该专业就业高度依赖学历与科研，无科研经历与成果的授课型硕士，回国就业与本科区别有限。本科阶段需要通过小项目和不同任务判断自己更适合图像、信号、算法还是湿实验方向，也需要通过同辈与师长的交流了解真实的研究环境。除此之外，优质升学与科研机会往往通过同辈与师长间的开放交流获得，科研过程本身也是学术网络积累的一部分。",
          "对该专业而言，科研经历在升学、就业和方向选择中都占有重要位置；越早接触，越容易形成连续的研究经历，大四才起步通常已显仓促。"
        ]
      },
      {
        title: "保研路径与去向",
        paragraphs: [
          "中外合办生医工在保研上具备结构性优势。以院内计划为例，约 120 人规模保 20 人，且能保上的学生基本都能去到中上游 985，多数以哈工、西交为保底。若有人选择外申，资格会顺延，如 22 级最后一名为 32 名，21 级 36 名，20 级 26 名。",
          "保研的竞争集中在综合成绩前 20 名，需要兼顾课程成绩与综测活动。但真正拉开上限的是科研经历：拥有一作学术论文是冲刺清北复交浙层级几乎普遍的门槛。对辽宁生源而言，外省竞争更激烈，优先保住资格是务实策略；在此之上，再围绕感兴趣的方向寻找科研项目、积累竞赛与论文，才能提高保研的上限。",
          "从往届去向看，保研落点普遍落在西交、哈工这一档次以上，专业内保研到上交的同学为数不少，落在西交哈工之下的很少；而想冲清北复交浙，论文基本是硬通货。"
        ]
      },
      {
        title: "海外升学方向",
        paragraphs: [
          "海外升学是该专业另一条主干路径，其复杂度高于国内保研，核心变量是所申请的学位类型与目的地。按培养性质，出国升学可分为四类：授课型硕士 Master（工科常称 MEng，俗称水硕，属院校创收项目）、研究型硕士 MRes（高级版授课硕，部分项目带 MPhil 属性）、研究型硕士 MPhil（博士衔接学位，基本纯做科研）和博士 PhD。学费随项目与地区在每年 20 万—50 万元之间，生活费含房租约 10 万元起步、上不封顶。奖助方面，硕士除 MPhil 外基本无奖，PhD 多数带奖，MPhil 与 PhD 还可走国家公派留学。",
          "中外合办授予的英本学位，是该专业申研的显性优势。凭借英本身份，授课型硕士除藤校与牛剑外几乎全球无阻，港新英美名校每年大量录取，且对成果与硬性指标的要求远低于东北大学常规专业水平。以帝国理工授课硕为例，凭二等一学位、约年级 40%—60% 的排名即可达到门槛；往届甚至有过年级末段学生进入 UCL 的情况。牛剑授课硕专业内目前尚无先例，具备该层级实力的学生多转去港新冲全奖 MPhil / PhD。",
          "邓迪直博是生医专属通道：名义要求一等学位，实际名额常年大量剩余，基本均可申请，并享每年 1 万英镑学费减免，学费约 3 万英镑/年，零发表、零科研也可申请，学制 3—4 年、毕业难度不大；留英后可走科研快速签证，最快博士毕业即获永居，最慢工作 3—5 年亦可。相较之下，海外 PhD / MPhil 的评价逻辑与国内差异显著：硬性成绩要求不高，但研究计划、已有研究经历与产出的权重远高于国内，即便具备清北录取实力的学生，也未必能在世界前 200 高校拿到全奖。",
          "英国以邓迪直博、帝国理工和 UCL 授课硕为主，牛剑多走研究型学位；港新（港三、新二 NUS/NTU）的全奖 MPhil / PhD 竞争集中，通常需至少一篇顶级期刊或会议论文并构成完整研究体系，其申请门槛甚至高于多数东北大学博士毕业成果；美国前 50 同理，顶级论文几乎是标配；日本与欧洲则有不少具备当地背景的导师，学院内香港、新加坡、日本背景的教师较多，意向海外读博可优先对接。欧洲申请节奏偏晚，多在 9—10 月联系导师。"
        ]
      },
      {
        title: "历年升学情况",
        paragraphs: [
          "将路径落到具体数据上，以 25 届统计为例，专业内推免 25 人、申研 67 人，合计九十余人继续深造，专业内几乎无人选择本科直接就业。保研去向集中在中上游 985：以哈工、西交为保底，上交是常见落点，冲刺清北复交浙需论文支撑；申研去向则高度分散于港、新、英、美等地，包含港大、NUS、帝国理工、UCL、邓迪直博等方向。",
          "以院内约 120 人规模的计划为例，约 20 人获得保研资格；保研资格、申请去向和最终结果会随着年级与个人选择形成不同路径。授课型硕士的录取数量甚至超过东北大学其他专业之和。"
        ]
      },
      {
        title: "就业与费用",
        paragraphs: [
          "就业层面，学历与研究经历构成双重门槛。硕士阶段的求职高度看重研究经历与成果，往届经验显示，即便是 QS 前 10 的授课硕，若无经历无成果也难以被接收；读到博士，好工作才真正变得容易，去向集中在联影、迈瑞等医疗器械头部企业，以及产学研紧密结合的新型科研方向。",
          "费用方面，东北大学生医工前三年学费与住宿约 4.62 万元，第四年在邓迪的学费约 29 万元，住宿自 4 万至 9 万元不等，生活费差异较大。海外升学中，授课硕每年学费加生活费约 20 万—60 万元；MPhil 与 PhD 通常带奖，可通过院校奖学金、国家公派等渠道覆盖学费与生活费。生活费从自制约 2 万—3 万元到高消费 30 万元以上均有差异。"
        ]
      },
      {
        title: "本科阶段的准备",
        paragraphs: [
          "在厘清专业性质与发展路径之后，本科阶段的实际准备方向也逐渐清晰。无论目标是保研、申研还是长远的学术生涯，研究经历都是贯穿其中的隐性变量：保研时一作论文是上限的关键，申研时全奖与名校录取看研究计划与产出，就业时企业看重可验证的研究经历与成果。选择科研方向前，先根据兴趣做探索，了解清楚比盲目选择更有长期收益。",
          "本科进组的常规路径包括大创、学科竞赛与直接联系课题组。多数学生从零基础起步，依托已有项目逐步深入；若已有明确意向导师，可先了解其近年研究、用 AI 辅助梳理论文脉络，再带着初步理解当面向老师交流。时机上，越早接触越好——大四才起步往往来不及积累完整的研究计划，可能需要 Gap。",
          "研究经历的价值不只在成果本身。面试中能清晰梳理一段有递进关系的课题经历，即便暂无发表，也足以让导师产生兴趣。该专业读得好，能享受到产学研紧密结合与新型科研方向的生涯红利；读得不好，则容易陷入毕业即失业的被动。二者之间的分野，很大程度上始于本科阶段是否真正走进过实验室、做过一段深入的科研。"
        ]
      },
      {
        title: "结语",
        paragraphs: [
          "生物医学工程是一条高度依赖个人选择与时间投入的路径。选择得当、尽早科研，更容易形成连续的研究经历；只按培养计划被动推进，容易陷入迷茫。对专业或科研有疑问者，可通过公众号后台留言或添加微信 Liu_han-yu 交流。选择科研方向前先根据兴趣做探索，了解清楚比盲目选择更有长期收益；盲目选择容易在理想与现实的差异中逐渐失去动力。"
        ]
      }
    ],
    faq: [
      { group: "专业本身", q: "生物医学工程到底学什么？", a: "生物医学工程用工程方法处理医学与生物学问题，连接计算机、人工智能、电子、材料、机械，以及医学影像、生物信息学、信号和仪器等内容。它同时涉及医学基础与工程方法，具体课程由学校培养方案决定。" },
      { group: "专业本身", q: "生医工更偏医学还是工科？", a: "不能只看专业名称，要看课程和学位。课程中编程、计算机、自动化、人工智能占比高，且授予工学学位时，通常是工科导向；医学课程和临床基础比重更大时，培养侧重点就会不同。" },
      { group: "专业本身", q: "不同学校的生医工为什么差异很大？", a: "这个专业与院校特色绑定很紧。比较时可以先看培养方案、编程和人工智能课程的比例、医学与生物课程的安排，以及最终授予工学、理学还是医学学位。名称相同的专业，实际学习内容可能并不相同。" },
      { group: "专业本身", q: "为什么本科阶段要先接触很多方向？", a: "本科阶段通常先覆盖影像、生物、软件、材料、仪器和光电等基础内容，再在研究生阶段选择某一交叉方向深入。广覆盖的代价是难以在本科形成单一技术专长，但它为后续选择留下了空间。" },
      { group: "专业本身", q: "生医工需要学很多生物和医学吗？", a: "需要接触生物和医学基础，但比重取决于学校。偏工科的培养通常把计算机、自动化和人工智能作为核心，同时接触影像、生物、材料、仪器等内容；是否深入临床或生物实验，要看具体课程和研究方向。" },
      { group: "专业本身", q: "生医工可以往哪些研究方向发展？", a: "常见方向包括医学影像、医学人工智能、生物信息学、信号、材料、仪器和光电，也可以进一步进入算法或湿实验。选择时可以从课程、项目任务和课题组正在做的问题判断自己更适合哪一类工作。" },
      { group: "专业本身", q: "医学影像、信号和声学方向有什么联系？", a: "它们都可以从工程方法进入医学问题：医学影像关注成像与图像分析，信号方向关注采集与处理，声学或超声方向则可能涉及波传播、信号和成像。具体学习内容取决于学校课程和课题组任务。" },
      { group: "升学与职业", q: "本科阶段为什么要尽早接触科研？", a: "科研经历同时影响方向选择、升学准备和就业竞争力。小项目可以让学生较早判断自己更适合图像、信号、算法或实验方向；保研和海外研究型学位会关注研究经历与产出，研发岗位也更看重能说明实际能力的项目经历。" },
      { group: "升学与职业", q: "保研和海外申研分别看重哪些准备？", a: "保研首先要保持课程成绩和综合排名，再用竞赛、项目和论文提高上限；冲刺清北复交浙等层级时，论文通常是重要区分项。海外申请还要准备研究计划、方向匹配、英语能力、推荐信和已有研究经历，授课型硕士与研究型硕士、博士的侧重点不同。" },
      { group: "升学与职业", q: "授课型硕士、MRes、MPhil 和 PhD 有什么区别？", a: "授课型硕士以课程学习和学位课程为主；MRes 更强调研究训练；MPhil 通常以独立研究和论文为核心，是博士衔接路径之一；PhD 则要求在更长周期内完成相对独立的研究。不同学校对名称和培养方式的使用并不完全相同，比较时要看具体项目的课程、研究要求和资助方式。" },
      { group: "升学与职业", q: "海外申研的项目是不是一定很贵？", a: "不一定，关键在于学位类型、地区、学校、住宿和资助方式。授课型硕士通常需要自行承担较高的学费和生活费，常见区间约为每年 20 万—60 万元；研究型 MPhil 和 PhD 常见院校奖学金、国家公派或项目资助，费用结构与授课型项目不同。" },
      { group: "升学与职业", q: "研究型硕士和博士通常有哪些资助方式？", a: "MPhil 和 PhD 常见的资助来源包括院校奖学金、国家公派留学和导师或研究项目经费，形式可能是学费减免、生活费资助或半奖、全奖。申请时需要同时查看项目的学费、资助条件和研究方向要求。" },
      { group: "升学与职业", q: "生医工本科毕业能直接就业吗？", a: "可以，但本科直接就业的技术岗位选择相对有限。企业更看重某一方向的专长，医疗器械、医学影像和软件岗位对学历、编程能力、研究经历和实习经历的要求也不同；核心研发岗位通常需要硕士或博士。" },
      { group: "升学与职业", q: "生医工可以申请计算机或人工智能硕士吗？", a: "可以，但需要补足计算机体系基础，并准备与申请方向相关的课程、项目或科研经历。生医工更自然的申请路径通常是人工智能与医学的交叉方向；如果申请纯计算机或纯人工智能项目，需要用更明确的能力证明弥补本科课程结构的差异。" },
      { group: "升学与职业", q: "中外合作办学或英文培养有什么优势和代价？", a: "英文课程、英方学位经历和跨国培养环境有利于准备海外申请；同时课程量更大，部分课程和考试使用英文，费用也更高。选择时应同时比较课程安排、学位授予、语言要求、培养质量和后续升学方向。" },
      { group: "升学与职业", q: "邓迪直博通常需要准备什么？", a: "准备重点包括英本成绩、英语能力、研究方向匹配和申请材料。该路径的条件包括学费约 3 万英镑/年、约 1 万英镑/年的学费减免、3—4 年学制；如果考虑这条路径，还需要把研究计划、未来留英或回国安排一并想清楚。" },
      { group: "升学与职业", q: "需要先买高配置电脑吗？", a: "如果课程和科研涉及编程、工业软件或本地人工智能，建议优先考虑 Nvidia 显卡、16GB 内存、1TB 存储起步的中高性能电脑；只进行文档处理和轻量代码时，可以按实际任务选择设备。" },
      { group: "升学与职业", q: "什么时候开始准备保研、申研或就业？", a: "大一、大二先把课程和编程基础打稳，同时接触小项目，观察自己对图像、信号、算法或实验的兴趣；大二、大三逐步确定方向，积累项目、竞赛和研究经历；大四再集中准备申请或求职，通常很难补齐完整的研究经历。" }
    ],
    destinationOverview: {
      title: "东北大学生物医学工程（中外合办）历年去向表",
      lead: "按年度整理保研与申研去向；目前已确认的 25 届数据先以总量和去向概览呈现。",
      years: [
        {
          title: "2025 届",
          recommendation: {
            total: "25 人",
            text: "专业内推免 25 人。现有整理显示，保研去向集中在中上游 985；以哈尔滨工业大学、西安交通大学为保底，上海交通大学是常见落点，冲刺清华大学、北京大学、复旦大学、上海交通大学和浙江大学需要科研成果支撑。"
          },
          application: {
            total: "67 人",
            text: "申研 67 人。现有整理显示，去向分布于中国香港、新加坡、英国和美国等地区，包含香港大学、新加坡国立大学、帝国理工学院、伦敦大学学院和邓迪大学直博等方向。"
          }
        }
      ],
      note: "学校、学院和专业的逐项名单按年度继续补入；页面只展示已经整理确认的内容。"
    },
  }
};

// 03、05 的结果页使用与当前本地参考流程一致的模型表述。
const _kydwProject04 = window.KYDW.projects.find((item) => item.id === "project-04");
if (_kydwProject04) {
  _kydwProject04.summary = "使用脑膜瘤 H&E 组织图块核对图像、标签、原图来源与坐标，比较颜色统计和形态特征随机森林，再结合验证集、测试集、错误图块及染色变化阅读结果。";
  _kydwProject04.tierText = "脑膜瘤 H&E 组织图块用于观察组织形态、完成形态特征分类和结果评价，并查看错误图块与染色变化。";
}
const _kydwProject06 = window.KYDW.projects.find((item) => item.id === "project-06");
if (_kydwProject06) {
  _kydwProject06.short = "使用同一组织区域的图像与表达数据核对字段和数据划分，观察输入与参考图，建立局部特征模型，并检查聚合一致性和基线差异。";
  _kydwProject06.summary = "使用同一组织区域的 H&E 图像和表达数据核对字段与数据划分，观察输入与参考图，建立带正则化的表达份额模型，再检查聚合一致性并与插值基线比较。";
  _kydwProject06.experience = "使用同一组织区域的图像与表达数据核对字段和数据划分，观察输入与参考图，建立局部特征模型，并检查聚合一致性和基线差异。";
}
if (window.KYDW.homeProjectSummaries) {
  window.KYDW.homeProjectSummaries["project-04"] = "使用脑膜瘤 H&E 组织图块核对图像来源和坐标，观察组织形态，完成形态特征分类，并结合验证、测试、错误图块和染色变化阅读结果。";
  window.KYDW.homeProjectSummaries["project-06"] = "使用同一组织区域的图像与表达数据核对字段和数据划分，观察输入与参考图，建立局部特征模型，并检查聚合一致性和基线差异。";
}

// 结果页使用项目对应的参考结果记录。
const _kydwProjectResults = {
  "project-01": [
    { taskIndex: 3, stepIndex: 3, title: "训练过程", image: "experience/assets/results/project-01/task0_training_curve.png", caption: "训练损失、验证损失与验证准确率" },
    { taskIndex: 4, stepIndex: 4, title: "测试集分类评价", image: "experience/assets/results/project-01/task0_confusion_matrix.png", caption: "MNIST 测试集混淆矩阵" },
    { taskIndex: 4, stepIndex: 5, title: "输入与预测对比", image: "experience/assets/results/project-01/task0_input_prediction_comparison.png", caption: "测试输入、真实标签与模型预测对比", text: "数据集：MNIST / torchvision\n训练样本：51000；验证样本：9000；测试样本：10000\n最佳验证准确率：0.9891111\n测试准确率：0.9897\n测试集 macro-F1：0.989649982\n噪声标准差：0.25\n加噪测试准确率：0.9771\n准确率下降：0.0126" }
  ],
  "project-02": [
    { taskIndex: 0, stepIndex: 0, title: "数据检查", image: "experience/assets/results/project-02/task1_data_check.png", caption: "MRI、阳性 mask 与叠加图" },
    { taskIndex: 3, stepIndex: 3, title: "训练过程", image: "experience/assets/results/project-02/task1_training_curve.png", caption: "训练与验证损失、Dice 曲线" },
    { taskIndex: 4, stepIndex: 4, title: "分割结果与指标", image: "experience/assets/results/project-02/task1_prediction.png", caption: "阳性测试样本、真实 mask、预测 mask 与 TP/FP/FN 编码", text: "配对切片：3929；患者：110；训练/验证/测试：2604 / 547 / 778\n平衡训练样本：600（阳性 300、空 mask 300）；最佳阈值：0.75\n测试阳性 mask Dice：0.4870；阳性 mask IoU：0.3725\npixel Dice：0.5259；pixel IoU：0.3567；precision：0.5366；recall：0.5156\n展示图只从测试集中真实 mask 非空的切片中选择，图中绿色为 TP、红色为 FP、蓝色为 FN。" }
  ],
  "project-03": [
    { taskIndex: 0, stepIndex: 0, title: "胸片输入", image: "experience/assets/results/project-03/task2_real_xray_grid.png", caption: "正常胸片样本网格" },
    { taskIndex: 2, stepIndex: 2, title: "训练过程", image: "experience/assets/results/project-03/task2_training_curve.png", caption: "残差卷积 VAE 的总损失、重建 L1、边缘 L1 与 KL 损失曲线" },
    { taskIndex: 3, stepIndex: 3, title: "输入与生成结果", image: "experience/assets/results/project-03/task2_input_generated_comparison.png", caption: "上排为 INPUT / REAL CHEST X-RAY（真实输入），下排为 GENERATED OUTPUT / LATENT SAMPLE（生成结果）；两排不是同一张胸片的前后处理关系。", text: "数据集：NORMAL 胸片 1341 张；训练/留出：1073 / 268\n模型：ResidualConvVAE；潜变量维度：64\n留出集重建 L1：0.0878；生成样本两两 L1：0.2334\n五项图像特征平均差：0.0114" },
    { taskIndex: 4, stepIndex: 4, title: "图像统计", image: "experience/assets/results/project-03/task2_quality_metrics.png", caption: "留出集与生成样本的五项图像统计" }
  ]
};
for (const [id, results] of Object.entries(_kydwProjectResults)) {
  const project = window.KYDW.projects.find((item) => item.id === id);
  if (project) project.referenceResults = results;
}
// 项目 00 仅保留体验版；进阶项目从 01 开始，导航开放状态仍由 site.js 统一控制。
for (let publicNo = 1; publicNo <= 5; publicNo += 1) {
  const siteNo = String(publicNo + 1).padStart(2, "0");
  const publicId = String(publicNo).padStart(2, "0");
  const project = window.KYDW.projects.find((item) => item.id === `project-${siteNo}`);
  if (!project) continue;
  project.single = false;
  project.advanced = `experience/advanced/project-${siteNo}.html`;
  project.advancedPractice = `experience/advanced-practice/project-${siteNo}.ipynb`;
  project.advancedAnswer = `experience/advanced-answers/project-${siteNo}.ipynb`;
  project.advancedReportTemplate = `experience/advanced-reports/templates/project-${siteNo}.html`;
  project.advancedReferenceReport = `experience/advanced-reports/examples/project-${siteNo}.html`;
  project.advancedKagglePractice = `https://www.kaggle.com/code/liuhanyu1007/kydw-advanced-a${publicId}`;
  project.advancedKaggleReference = `https://www.kaggle.com/code/liuhanyu1007/kydw-advanced-a${publicId}-reference`;
  project.advancedOpen = false;
  project.advancedStatus = "尚未开放";
  project.advancedStudentVisible = false;
  if (publicNo >= 3) {
    project.kaggleReference = `https://www.kaggle.com/code/liuhanyu1007/kydw-try-a${publicId}-reference`;
  }
}
delete window._kydwProjectResults;

// 长期科研技能参考项目。正文来自《本科生科研入门指南 V2.1》、
// 复旦大学本科生课程和现有 KYDW 实践材料，时效性内容按 2026-08-11 核对。
window.KYDW.researchSkills = {
  title: "科研技能入门与查缺补漏",
  label: "科研技能项目",
  lead: "为第一次接触科研、正在完成网站实践，或准备进入课题组长期学习的本科生整理常用知识、工具和工作方法。",
  paragraphs: [
    "这套内容可以按顺序学习，也可以在遇到具体问题时直接查找。完成网站课程和代码实践时，优先阅读 Kaggle、Notebook、数据和人工智能章节；准备长期科研时，再继续配置本地环境、GitHub、Linux 与实验管理。",
    "章节中的任务用于自学和检查理解，不需要提交。实际项目已经提供环境文件或运行说明时，以对应项目的要求为准。"
  ],
  paths: [
    {
      title: "完成网站课程与代码实践",
      text: "先熟悉文件、Kaggle、Notebook、数组和人工智能辅助方式，再进入项目教学页和实践 Notebook。",
      chapterIds: ["02-computer-data", "03-kaggle-notebook", "05-python-data", "06-ai-tools", "11-experiments"]
    },
    {
      title: "准备长期科研与课题组学习",
      text: "在前述基础上继续学习本地 Python、文献管理、GitHub、Linux、远程计算、实验记录和学术常识。",
      chapterIds: ["04-local-python", "07-literature", "09-github-latex", "10-linux-remote", "12-academic-world"]
    }
  ],
  problems: [
    { label: "不知道先学什么", chapterId: "01-start" },
    { label: "文件和数据看不懂", chapterId: "02-computer-data" },
    { label: "Notebook 不会运行", chapterId: "03-kaggle-notebook" },
    { label: "准备本地编程环境", chapterId: "04-local-python" },
    { label: "Python 与 shape 不熟悉", chapterId: "05-python-data" },
    { label: "需要 AI 解释代码或报错", chapterId: "06-ai-tools" },
    { label: "不会检索或阅读论文", chapterId: "07-literature" },
    { label: "需要制作图表和汇报", chapterId: "08-office-figures" },
    { label: "准备复现开源项目", chapterId: "09-github-latex" },
    { label: "需要登录服务器运行任务", chapterId: "10-linux-remote" },
    { label: "不会判断实验结果", chapterId: "11-experiments" },
    { label: "想了解论文、学位和岗位", chapterId: "12-academic-world" }
  ],
  chapters: [
    {
      id: "01-start",
      slug: "01-start",
      no: "01",
      title: "使用方式与学习路径",
      summary: "根据当前任务选择需要的章节，建立资料、数据、代码、实验和表达之间的基本关系。",
      intro: [
        "本科生第一次接触科研时，困难通常来自多个环节同时出现：论文术语不熟悉、数据文件看不懂、代码环境没有准备好、模型指标也缺少直观含义。把全部内容一次学完并不现实，先解决当前任务需要的部分更容易形成稳定的学习节奏。",
        "一项常见的计算研究通常包含研究问题、资料检索、数据检查、代码运行、实验记录、结果解释和成果表达。各章节分别处理其中一个环节，后续项目会反复使用这些能力。"
      ],
      sections: [
        {
          title: "网站课程的学习顺序",
          paragraphs: [
            "打开一个项目后，先阅读教学项目，弄清研究对象、数据形式、输入、输出和评价方式。随后进入实践 Notebook，按顺序运行代码并完成留出的任务。最后打开实践项目参考答案，核对代码、图像、指标和结果说明。",
            "遇到陌生概念时可以回到本项目查阅；代码能运行但结果不理解时，优先查看数据与实验评价章节。"
          ],
          bullets: ["教学项目：理解问题、数据和方法", "实践项目：运行、修改并观察结果", "实践项目参考答案：完成后核对一种可行写法"]
        },
        {
          title: "长期科研的基本工作",
          paragraphs: [
            "长期项目需要保存来源、环境、代码版本、实验参数和结果文件。一个月后仍能说明某张图来自哪次实验，比临时记住一组参数更重要。",
            "建议为每个项目建立独立文件夹，保留 README、环境文件、代码、数据说明、实验记录和最终结果。原始数据保持只读，处理数据与输出文件分开存放。"
          ]
        },
        {
          title: "学习记录",
          paragraphs: ["每次学习可以只记录三个内容：今天解决了什么问题，使用了哪些资料或代码，还剩下什么问题。记录应能让未来的自己重新找到文件并复现操作。"],
          task: "选择当前正在学习的一个项目，写下研究对象、输入、输出、评价方式和下一步需要完成的动作。"
        }
      ]
    },
    {
      id: "02-computer-data",
      slug: "02-computer-data",
      no: "02",
      title: "电脑、文件与科研数据",
      summary: "理解路径、扩展名、文件组织、数据形态和样本单位，避免文件找不到、维度错位和数据泄漏。",
      intro: [
        "科研数据首先以文件存在。图像、表格、文本、Notebook 和模型参数都有不同的扩展名和读取方式。许多代码报错源自路径错误、文件名变化或数据目录层级不一致。",
        "数据进入模型前还需要明确一行、一张图或一个文件代表什么样本。医学数据经常同时包含患者、检查、切片和图块等层级，划分训练集时必须保留这种关系。"
      ],
      sections: [
        {
          title: "文件、路径与扩展名",
          paragraphs: ["Windows 路径通常包含盘符和反斜杠，Linux 与 Kaggle 路径使用正斜杠。相对路径从当前项目目录出发，更适合在不同电脑之间复用。"],
          bullets: [".csv、.xlsx：表格数据", ".png、.jpg、.tif：图像", ".npy、.npz：NumPy 数组", ".json、.yaml：配置和结构化记录", ".ipynb：Notebook", ".py：Python 脚本", ".pt、.pth：常见 PyTorch 参数文件"]
        },
        {
          title: "科研项目目录",
          paragraphs: ["项目目录应让输入、代码和输出各自有固定位置。原始数据尽量保持只读，预处理结果写入新的目录。临时图像、缓存和大型模型参数不应混在论文或教学正文中。"],
          code: "project/\n├─ README.md\n├─ data/raw/\n├─ data/processed/\n├─ notebooks/\n├─ src/\n├─ results/\n└─ environment.yml"
        },
        {
          title: "常见数据形态",
          paragraphs: [
            "表格通常表示样本乘特征，图像由高度、宽度和通道构成，时间序列还包含时间轴，空间组学还需要表达矩阵与坐标一一对应。shape 是理解数据最直接的入口。",
            "一张 MRI 切片可能是 256×256，一批彩色图像可能是 32×3×224×224，一份基因表达矩阵可能是位置数×基因数。每个维度的含义需要写清。"
          ]
        },
        {
          title: "样本单位与数据划分",
          paragraphs: ["同一患者的切片、同一组织的图块或相邻空间位置通常高度相似。把它们随机分到训练集和测试集会让模型提前接触测试对象。医学项目更常按照患者、完整切片、中心或时间进行划分。"],
          task: "查看一个实践项目的数据 shape，逐个写出每个维度代表的对象，并判断训练与测试应按哪个层级划分。"
        }
      ]
    },
    {
      id: "03-kaggle-notebook",
      slug: "03-kaggle-notebook",
      no: "03",
      title: "Kaggle 与 Notebook",
      summary: "使用在线 Notebook 复制项目、运行单元格、选择可用加速器、保存版本并处理常见错误。",
      intro: [
        "网站课程和代码实践优先使用 Kaggle。平台已经准备好 Python、常用数据科学库和可选计算加速器，适合第一次运行项目。",
        "Notebook 由 Markdown 单元格和代码单元格组成。代码共享同一个运行状态，因此执行顺序会影响变量、模型和输出。"
      ],
      sections: [
        {
          title: "打开与复制 Notebook",
          paragraphs: ["从项目实践页进入公开 Notebook，登录后使用复制或编辑入口保存到自己的账户。随后在个人副本中修改代码，原公开版本保持不变。"],
          bullets: ["确认页面标题与项目编号", "复制到个人账户", "从顶部开始依次运行", "在留出的任务位置修改", "完成后保存版本"]
        },
        {
          title: "代码单元格与运行状态",
          paragraphs: ["单元格左侧的运行编号反映执行顺序。重启会清空内存中的变量，但不会删除 Notebook 中的代码和已保存文本。出现变量不存在、结果与前文不一致时，可以重启会话并从头运行。"],
          note: "Run All 适合检查完整流程。调试时可以单独运行当前单元格，但要确认它依赖的上游单元格已经执行。"
        },
        {
          title: "计算资源",
          paragraphs: ["需要训练深度学习模型时，在 Notebook 设置中选择当前账户可用的 GPU 或其他加速器。具体型号和使用额度会随平台资源变化，页面只说明如何查看当前可用选项。普通数据检查与轻量模型可以先使用 CPU。"]
        },
        {
          title: "报错定位",
          paragraphs: ["先阅读报错最后一行，再向上寻找最早出现异常的位置。常见问题包括上游单元格未运行、文件路径错误、依赖未导入、shape 不匹配和显存不足。"],
          task: "复制一个实践 Notebook，在不改动结果的前提下重新运行全部单元格，并记录一次输入 shape、一次模型输出和一项评价指标。"
        }
      ]
    },
    {
      id: "04-local-python",
      slug: "04-local-python",
      no: "04",
      title: "本地 Python 环境",
      summary: "为长期学习配置 Python 3.13、虚拟环境、VS Code 和 Jupyter，并让不同项目保持依赖隔离。",
      intro: [
        "只完成网站课程时，Kaggle 已经能够覆盖多数任务。本地环境适合准备长期编程、处理私有数据、运行大型项目或连接服务器的学习者。",
        "Python 当前稳定系列为 3.14，最新正式版本为 3.14.7。本项目将 Python 3.13 作为本地教学默认版本。部分医学与深度学习项目对 Python、CUDA 和依赖版本有明确要求，此时使用项目提供的环境文件。"
      ],
      sections: [
        {
          title: "安装路线",
          paragraphs: ["普通 Python 项目可以使用官方 Python、venv 或 uv 管理环境；依赖复杂、需要编译库或 CUDA 的科学计算项目可以使用 Miniforge/conda。Anaconda 仍可使用，但不作为唯一安装方式。"],
          bullets: ["普通学习：Python 3.13 + venv/uv", "科学计算：Miniforge/conda", "项目复现：优先读取 requirements.txt、pyproject.toml 或 environment.yml"]
        },
        {
          title: "独立环境",
          paragraphs: ["每个项目使用独立环境可以避免库版本互相覆盖。环境名称应能对应项目，安装完成后记录 Python 版本和关键依赖。"],
          code: "python -m venv .venv\n.venv\\Scripts\\activate\npython -m pip install --upgrade pip\npip install numpy pandas matplotlib jupyter"
        },
        {
          title: "VS Code 与 Jupyter",
          paragraphs: ["VS Code 需要选择当前项目的 Python 解释器。Jupyter 内核也要指向同一个环境，否则终端安装的库可能仍然无法在 Notebook 中导入。"],
          bullets: ["打开项目文件夹", "选择解释器", "打开终端检查 python --version", "在 Notebook 右上角选择同一内核"]
        },
        {
          title: "环境记录",
          paragraphs: ["长期项目应保存依赖清单。更新大型库前先记录当前可运行版本，环境失效时根据记录重新创建。"],
          task: "创建一个独立环境，运行 Python 版本检查，导入 NumPy 和 Pandas，并把命令与版本记录到 README。"
        }
      ]
    },
    {
      id: "05-python-data",
      slug: "05-python-data",
      no: "05",
      title: "Python、NumPy 与基础数据处理",
      summary: "掌握阅读项目代码所需的变量、容器、条件、循环、函数、数组、表格和绘图。",
      intro: [
        "科研入门不需要先学完全部 Python。能够阅读变量、函数、数组和表格操作，就可以开始理解多数教学 Notebook。遇到新语法时再结合当前代码补充。",
        "代码阅读时先找输入变量，再找处理步骤和输出。行末注释解释关键动作，shape 和少量样本输出用于确认程序正在处理预期数据。"
      ],
      sections: [
        {
          title: "变量与数据容器",
          paragraphs: ["数字、字符串和布尔值保存单个信息；列表保存有顺序的一组值；字典用键关联信息。科研代码常用字典保存配置、指标和样本元数据。"],
          code: "sample = {\n    \"patient_id\": \"P001\",\n    \"age\": 54,\n    \"label\": 1\n}\nprint(sample[\"patient_id\"])"
        },
        {
          title: "条件、循环与函数",
          paragraphs: ["条件判断处理不同情况，循环对多个样本重复操作，函数把可重复的步骤集中起来。阅读函数时先看参数和 return，确认它接收什么并返回什么。"]
        },
        {
          title: "NumPy 数组与 shape",
          paragraphs: ["NumPy 数组适合数值计算。axis 指定在哪个维度聚合，reshape 改变维度组织，transpose 调整维度顺序。改变 shape 前应确认元素数量和每个轴的实际含义。"],
          code: "import numpy as np\nx = np.random.rand(8, 3, 64, 64)\nprint(x.shape)          # 8 个样本、3 个通道、64×64\nmean_image = x.mean(axis=0)\nprint(mean_image.shape) # 3×64×64"
        },
        {
          title: "Pandas 与绘图",
          paragraphs: ["Pandas 以行和列处理表格数据。读取后先查看列名、shape、前几行、缺失值和标签分布。Matplotlib 用于绘制直方图、散点图、曲线和图像。"],
          task: "创建一个 100×2 的随机数组，转换为两列表格，计算每列均值并绘制散点图。"
        }
      ]
    },
    {
      id: "06-ai-tools",
      slug: "06-ai-tools",
      no: "06",
      title: "人工智能基础与科研助手",
      summary: "理解数据、模型、训练和评价，并使用人工智能工具解释概念、检查代码、整理资料和验证结果。",
      intro: [
        "人工智能模型根据数据学习输入与输出之间的规律。分类预测类别，回归预测连续数值，分割输出像素或体素区域，生成模型学习产生新的样本或表示。训练过程通过损失函数调整参数，验证集帮助选择设置，测试集用于最后评价。",
        "科研助手可以解释代码、拆解任务、检查报错和改善表达。可靠使用需要给出上下文、目标、输入、限制和期望输出，并对论文、数据和运行结果进行核对。"
      ],
      sections: [
        {
          title: "常用模型任务",
          bullets: ["分类：疾病类型、活动类别", "回归：年龄、风险值、表达量", "分割：肿瘤、器官、细胞区域", "生成：图像、文本或分子表示", "聚类与表示学习：在缺少标签时发现结构"]
        },
        {
          title: "推荐工具与用途",
          paragraphs: ["工具选择按任务进行，不设置固定排名。模型和产品更新较快，使用前查看官方页面中的当前能力、额度和价格。"],
          tools: [
            { name: "ChatGPT 与 Codex", text: "优先用于概念解释、任务拆解、代码阅读、项目修改、运行检查和多文件协作。" },
            { name: "Claude 与 Claude Code", text: "适合长文档和复杂代码任务；Claude Code 高频处理大型代码库时费用较高，使用前查看订阅或 API 成本。" },
            { name: "DeepSeek V4 Flash", text: "适合中文问答、快速推理和代码辅助，可作为日常工具选择。" },
            { name: "Kimi K3", text: "适合长材料阅读、代码与资料整理。" },
            { name: "MiniMax M3", text: "适合代码、工具调用和多步骤任务。" },
            { name: "GLM-5.2", text: "适合中文任务、代码和通用研究辅助。" }
          ]
        },
        {
          title: "有效提示词",
          paragraphs: ["有效提示词会说明读者基础、当前材料、需要完成的任务、不能改变的条件和输出形式。给出实际报错、数据 shape 和相关代码，通常比只问“为什么错了”更容易得到可用回答。"],
          code: "我正在学习一个面向本科生的 MRI 分割 Notebook。\n输入张量 shape 为 [8, 1, 128, 128]，标签为 [8, 128, 128]。\n下面是报错和相关代码。请先解释错误原因，再给出最小修改，\n逐行说明修改后各维度的含义，不要改动数据划分。"
        },
        {
          title: "夸张表达与有效约束",
          paragraphs: [
            "“老奶学习法”用夸张身份要求解释得足够通俗；“祭献流”用夸张后果强化服从感。它们可以展示语气对回答风格的影响。真正稳定的做法是明确基础、目标、术语保留范围、例子数量和检查标准。",
            "例如，把“请把这篇文章讲到完全看懂”改为“面向第一次接触该领域的本科生，保留必要术语，先解释研究问题和数据，再逐图说明方法与结果，最后列出三处容易误解的内容”。"
          ]
        },
        {
          title: "核对与隐私",
          paragraphs: ["论文题目、DOI、数据集和软件版本需要回到原始来源核对；代码需要实际运行；模型给出的指标解释需要结合任务定义。未公开数据、患者信息、账号和密钥不要直接发送给外部工具。"],
          task: "选择一段看不懂的项目代码，分别写一条夸张提示词和一条结构化提示词，比较两次回答能否准确说明输入、处理和输出。"
        }
      ]
    },
    {
      id: "07-literature",
      slug: "07-literature",
      no: "07",
      title: "文献检索、阅读与管理",
      summary: "围绕研究问题检索论文，阅读摘要、图表和方法，并使用 Zotero 等工具保存来源和笔记。",
      intro: [
        "论文记录一个研究问题、所用数据、方法、实验和结论。初学者不需要第一次就逐字阅读，可以先判断论文是否与当前问题相关，再选择需要深入的部分。",
        "检索的目标是找到能够回答当前问题的资料。关键词通常由研究对象、数据类型、任务和方法组成，逐步替换同义词可以扩大或缩小范围。"
      ],
      sections: [
        {
          title: "资料来源",
          bullets: ["学校图书馆与出版社页面", "PubMed 与 Europe PMC", "Google Scholar", "arXiv 与 bioRxiv", "论文作者主页和开放获取版本", "论文中的参考文献与被引文献"]
        },
        {
          title: "检索式",
          paragraphs: ["先写出研究对象、数据、任务和方法，再组合英文关键词。例如脑肿瘤、MRI、分割、Transformer 可以组成不同宽度的检索式。标题和摘要足以完成第一轮筛选。"],
          code: "(brain tumor OR glioma) AND MRI AND segmentation\nspatial transcriptomics AND cell-cell communication\nwearable sensor AND human activity recognition"
        },
        {
          title: "阅读顺序",
          paragraphs: ["先看题目、摘要、主要图表和结论，确认研究问题与核心结果；随后阅读引言和方法，弄清已有工作、数据划分和实验设计；最后查看补充材料、代码和失败案例。"],
          bullets: ["研究问题是什么", "数据从哪里来，样本单位是什么", "输入和输出是什么", "与哪些基线比较", "训练与测试如何划分", "结论能支持到什么范围"]
        },
        {
          title: "文献管理",
          paragraphs: ["Zotero 或 EndNote 可以保存题录、PDF、标签和笔记，并与 Word 或 LaTeX 配合插入引用。文件名和文件夹不应替代文献库中的题录信息。"],
          task: "围绕一个项目找到一篇研究论文和一篇综述，填写研究问题、数据、方法、评价和结论边界。"
        }
      ]
    },
    {
      id: "08-office-figures",
      slug: "08-office-figures",
      no: "08",
      title: "Office、科研图表与学术表达",
      summary: "使用 Word、Excel、PPT 和绘图工具整理数据、制作图表、编写图注并完成简短汇报。",
      intro: [
        "科研表达需要让读者看清研究问题、方法、结果和结论。图表承担证据展示，正文解释图表与问题的关系，PPT 和海报帮助听众快速找到主线。",
        "Office 工具适合写作、表格检查、汇报和协作。复杂统计与可重复绘图仍应保留代码和原始数据。"
      ],
      sections: [
        {
          title: "Word 与协作",
          paragraphs: ["使用标题样式组织层级，图表使用题注，引用通过文献管理工具插入。多人协作时开启修订或评论，并保留明确版本。云盘容量和学校政策会变化，项目资料应有独立备份。"]
        },
        {
          title: "Excel 与表格检查",
          paragraphs: ["Excel 适合查看列名、筛选、简单汇总和人工核对。重要分析应保留脚本，避免只在单元格中完成无法追踪的修改。日期、缺失值和长编号导入时需要检查格式。"]
        },
        {
          title: "科研图表",
          bullets: ["标题说明比较对象", "坐标轴写清变量与单位", "颜色数量保持克制", "误差线说明含义", "分类结果同时查看混淆矩阵和类别指标", "图注说明样本、方法和关键观察"]
        },
        {
          title: "PPT 与科研海报",
          paragraphs: ["一页通常承载一个主要信息。研究背景、数据、方法、结果和结论应形成清楚顺序，方法图与结果图优先使用真实项目内容。装饰元素不能挤压坐标、图例和图注。"],
          task: "选择一个项目结果，把研究问题、数据、方法和一张结果图整理为单页汇报，并为图写完整图注。"
        }
      ]
    },
    {
      id: "09-github-latex",
      slug: "09-github-latex",
      no: "09",
      title: "GitHub、LaTeX 与项目复现",
      summary: "阅读开源仓库、记录代码版本、复现已有项目，并使用 LaTeX 组织公式、参考文献和论文排版。",
      intro: [
        "Git 记录代码变化，GitHub 提供远程仓库、问题讨论和协作入口。第一次接触开源项目时，先阅读 README、环境文件、目录结构和运行命令。",
        "复现工作的重点是使用相同数据、划分、依赖、参数和评价方式得到可比较结果。只成功运行一个示例文件还不能说明完整方法已经复现。"
      ],
      sections: [
        {
          title: "仓库阅读",
          bullets: ["README 与许可证", "安装和环境文件", "数据准备脚本", "训练与测试入口", "配置文件", "模型参数和结果说明", "Issues 与发布版本"]
        },
        {
          title: "Git 基础",
          code: "git clone <repository>\ngit status\ngit add <file>\ngit commit -m \"记录本次修改\"\ngit log --oneline",
          paragraphs: ["提交信息应说明改变了什么。大型数据、账号文件和模型缓存通常不进入 Git，使用 .gitignore 排除。"]
        },
        {
          title: "复现记录",
          paragraphs: ["记录代码提交、数据版本、环境、运行命令、随机种子和硬件。若结果不同，先检查数据划分、预处理、评价实现和模型权重。"]
        },
        {
          title: "LaTeX",
          paragraphs: ["LaTeX 适合公式、交叉引用、参考文献和多人论文协作。初学时可以使用现有模板，优先掌握章节、图表、公式、标签和 BibTeX。"],
          task: "选择一个公开仓库，找到安装、数据、训练和测试入口，并写出一份最小复现命令清单。"
        }
      ]
    },
    {
      id: "10-linux-remote",
      slug: "10-linux-remote",
      no: "10",
      title: "Linux、远程计算与实验管理",
      summary: "使用 SSH、SFTP、常见 Linux 命令和任务管理方式在服务器上运行、查看和保存实验。",
      intro: [
        "深度学习和大型数据任务经常在 Linux 服务器上运行。远程工作包含登录服务器、传输文件、创建环境、启动任务、查看日志和取回结果。",
        "服务器通常由多人共享。运行前确认目录、GPU、存储空间和进程状态，避免占用其他人的资源或把数据写到系统盘。"
      ],
      sections: [
        {
          title: "远程连接与文件传输",
          paragraphs: ["SSH 用于终端连接，SFTP 用于文件传输。VS Code Remote-SSH 可以在远程目录中编辑代码。账号、密钥和口令只保存在受控位置。"],
          code: "ssh user@server\nscp file.txt user@server:/data/project/\nscp -r results/ user@server:/data/project/"
        },
        {
          title: "常用命令",
          code: "pwd\nls -lah\ncd /data/project\ndu -sh *\nps -ef\nnvidia-smi\ntail -f train.log",
          paragraphs: ["删除、覆盖和递归移动文件前先确认绝对路径。大型目录可以先查看体积和目标位置。"]
        },
        {
          title: "后台任务与日志",
          paragraphs: ["长时间训练应把输出写入日志，并记录启动命令、配置和进程号。tmux、screen 或任务调度系统可以让任务在断开连接后继续运行。"]
        },
        {
          title: "实验目录",
          paragraphs: ["每次实验使用独立输出目录，保存配置、日志、指标、图像和模型参数。结果确认后再清理缓存和无用权重。"],
          task: "在一个练习目录中完成创建文件夹、查看磁盘、运行脚本、保存日志和查看进程五项操作。"
        }
      ]
    },
    {
      id: "11-experiments",
      slug: "11-experiments",
      no: "11",
      title: "实验设计、评价与结果解释",
      summary: "明确研究问题、基线、数据划分、指标和验证方式，区分模型得分、统计证据与实际应用价值。",
      intro: [
        "实验设计决定模型结果能回答什么问题。先写研究问题和评价方式，再选择模型和参数，可以减少只追求分数而忽略任务定义的情况。",
        "医学人工智能还需要关注样本单位、类别不平衡、中心差异、外部验证和临床使用条件。一个指标无法概括所有性能。"
      ],
      sections: [
        {
          title: "研究问题与基线",
          paragraphs: ["研究问题应说明对象、输入、输出和比较目标。基线提供最低参照，可以是简单统计方法、经典机器学习模型或公开方法。新模型应在相同数据划分和评价方式下比较。"]
        },
        {
          title: "训练、验证与测试",
          paragraphs: ["训练集用于学习参数，验证集用于选择模型和阈值，测试集用于最后评价。反复根据测试结果修改模型会把测试集变成新的验证集。患者、切片、时间和中心层级需要在划分时明确。"]
        },
        {
          title: "常见指标",
          bullets: ["分类：准确率、灵敏度、特异度、F1、AUC、校准", "回归：MAE、RMSE、相关性和误差分布", "分割：Dice、IoU、边界距离", "生成：重建误差、分布差异、多样性、任务有效性和记忆风险", "空间任务：数值误差、空间结构、粗尺度守恒和生物学验证"]
        },
        {
          title: "结果解释",
          paragraphs: ["平均指标应与类别结果、错误样本、置信区间和可视化一起阅读。内部测试表现良好说明模型在当前数据划分上有效；外部数据、真实流程和独立实验决定结果能否推广。"],
          task: "选择一个项目的参考结果，写出研究问题、数据划分、基线、主要指标、一个失败案例和结论适用范围。"
        }
      ]
    },
    {
      id: "12-academic-world",
      slug: "12-academic-world",
      no: "12",
      title: "学术界常识与发展路径",
      summary: "认识论文、同行评审、引用指标、研究学位、科研岗位和项目参与方式，理解不同路径的实际工作。",
      intro: [
        "学术研究通过论文、数据、代码、软件和会议交流传播结果。同行评审帮助检查问题、方法和证据，发表平台、引用数量和影响因子只能提供部分信息。阅读具体工作仍然是判断质量的基础。",
        "本科阶段可以通过课程、短期任务、训练项目和长期课题逐步确认兴趣。项目名称和合作单位无法替代实际承担的工作，简历与面试需要能够说明自己的任务、方法和结果。"
      ],
      sections: [
        {
          title: "论文与同行评审",
          paragraphs: ["研究论文通常包含摘要、引言、方法、结果、讨论和参考文献。预印本可以在正式评审前公开交流，正式版本可能在评审后发生变化。引用数、期刊指标和 h-index 受领域、时间和合作方式影响。"]
        },
        {
          title: "会议、期刊与研究方向",
          paragraphs: ["方法研究常见于计算机和工程会议或期刊，临床转化研究更强调队列、临床问题和真实流程，医学信息学还会处理电子病历、公共卫生和多模态数据。投稿位置应与论文问题、证据和读者群匹配。"]
        },
        {
          title: "学位类型",
          paragraphs: ["国内常见学术型硕士、专业型硕士、博士、直博和硕博连读；海外常见 MSc、MEng、MRes、MPhil 和 PhD。名称、学制、研究比例和转博安排由学校和项目决定，申请时需要阅读当年项目页面。"]
        },
        {
          title: "科研岗位",
          paragraphs: ["RA 通常承担数据、代码、实验和论文支持；博士后在博士毕业后继续开展研究；高校和研究机构还包含教学科研岗与研究岗。岗位名称在不同国家和单位之间存在差异，合同、独立性、项目职责和发展路径更值得关注。"]
        },
        {
          title: "项目选择",
          paragraphs: ["短期任务适合认识数据和协作方式，长期项目需要持续投入、独立推进和完整记录。选择项目时应了解时间、任务、基础要求、指导方式和成果安排，再判断是否符合当前学习目标。"],
          task: "选择一种硕博项目或科研岗位，查看一所学校或机构的当前官方说明，整理学制、研究内容、申请要求和毕业后的常见去向。"
        }
      ]
    }
  ]
};

// 招募合集保留论文研究项目和科研实习项目发布群。体验项目与科研实践活动不进入本集合。
window.KYDW.recruitment = {
  title: "人员招募",
  lead: "集中整理 KYDW 论文研究项目招募记录与科研实习项目发布群。",
  contact: {
    wechat: window.KYDW.site.wechat,
    email: "lhanyu07@foxmail.com",
    publicAccount: "科研大王",
    internshipGroupQr: {
      title: "科研实习项目发布二群二维码",
      image: KYDW_INTERNSHIP_GROUP_QR,
      text: "群内持续发布科研实习与论文研究项目信息，具体要求以每次项目公告为准。"
    }
  },
  records: [
    {
      id: "2025-internship-board",
      title: "科研实习项目发布群",
      published: "2025-02-11",
      period: "持续更新",
      status: "进行中",
      type: "科研实习项目发布群",
      institutions: ["KYDW", "合作高校与课题组"],
      field: "论文研究项目、短期科研任务与科研实习信息",
      mode: "群内发布与负责人对接",
      commitment: "由每次项目公告单独说明",
      capacity: "由每次项目公告单独说明",
      audience: "希望获取论文研究项目或科研实习信息的学生",
      requirements: ["阅读每次公告的研究方向、时间投入和基础要求", "报名后按项目要求保持沟通并完成任务"],
      work: ["查看论文研究项目与科研实习公告", "按公告要求联系项目负责人", "根据项目安排参与数据、代码、实验或论文工作"],
      outcomes: ["及时获取科研实习与论文研究项目信息", "具体训练、成果和作者安排由对应项目根据实际贡献确定"],
      apply: "扫描本页的科研实习项目发布二群二维码入群。",
      source: "【宣传】科研实习项目发布群（剑桥，东大等）",
      showGroupQr: true,
      updates: [
        { date: "2025-02-11", text: "建立科研实习项目发布群。" },
        { date: "2025-02-18", text: "补充项目类别、参与方式和任务交付规则。" }
      ]
    },
    {
      id: "2026-st-benchmark",
      title: "空间转录组学基准研究专项合作",
      published: "2026-01-17",
      period: "2026 年 1 月至 3 月",
      status: "已结束",
      type: "论文研究项目",
      institutions: ["KYDW", "合作课题组"],
      field: "空间转录组学与基准测试",
      mode: "线上项目协作",
      commitment: "按研究任务持续参与",
      capacity: "4—6 人",
      audience: "已经完成基础训练并具备一定研究经验的本科生",
      requirements: ["论文、项目考核或相关研究经验满足当期公告条件", "空间转录组学、病理组织学或模型实验经验优先"],
      work: ["模型训练与测试", "实验设计", "图表绘制", "论文撰写"],
      outcomes: ["在真实空间组学项目中训练实验和写作能力", "后续合作与作者安排依据实际贡献和项目进展确定"],
      apply: "历史项目已经结束，后续同方向项目以新公告为准。",
      source: "专项合作-空间转录组学基准研究（已开始）",
      updates: [{ date: "2026-01-17", text: "发布项目时间、人数、工作内容和基础要求。" }]
    },
    {
      id: "2024-human-activity",
      title: "人类活动识别研究项目",
      published: "2024-10-24",
      period: "2024 年 11 月起，约半年",
      status: "已结束",
      type: "论文研究项目",
      institutions: ["东北大学相关项目组"],
      field: "传感器、人类活动识别与人工智能",
      mode: "线上、按周推进",
      commitment: "按周完成研究任务",
      capacity: "首次公告 3—6 人，后续公告剩余 2 个名额",
      audience: "低年级、希望进入科研项目并具备自主学习能力的本科生",
      requirements: ["完成当期项目组基础培训与任务", "接受零项目经验", "能够持续参与代码和论文工作"],
      work: ["研究问题和创新点构建", "代码实现", "实验与论文撰写"],
      outcomes: ["参与完整论文研究流程", "作者和后续合作安排依据实际贡献与项目进展确定"],
      apply: "历史项目已经结束。",
      source: "【11月KYDW项目组招新公告】及【11月招新公告2】",
      updates: [
        { date: "2024-10-24", text: "首次公布项目内容、周期和招募条件。" },
        { date: "2024-11-10", text: "更新为剩余 2 个名额。" }
      ]
    },
    {
      id: "2024-neuro-oncology",
      title: "精准神经肿瘤多模态研究项目",
      published: "2024-10-24",
      period: "2024 年 11 月起",
      status: "已结束",
      type: "论文研究项目",
      institutions: ["剑桥大学相关项目组"],
      field: "医学影像、多模态学习与精准神经肿瘤",
      mode: "线上、长期投入",
      commitment: "当期公告要求较高强度投入",
      capacity: "首次公告 1—2 人，后续公告剩余 1 人",
      audience: "具有深度学习和论文项目经验的本科生",
      requirements: ["具备深度学习实践经验", "能够参与创新点、代码和论文工作", "当期公告优先考虑已有论文经验者"],
      work: ["拓展已有医学影像研究", "构建研究方法", "代码实现", "实验和论文撰写"],
      outcomes: ["训练医学影像论文研究能力", "投稿目标和作者安排依据实际结果与贡献确定"],
      apply: "历史项目已经结束。",
      source: "【11月KYDW项目组招新公告】及【11月招新公告2】",
      updates: [
        { date: "2024-10-24", text: "首次公布研究任务和基础要求。" },
        { date: "2024-11-10", text: "更新为剩余 1 个名额。" }
      ]
    },
    {
      id: "2024-3d-spatial",
      title: "3D 空间转录组学研究项目",
      published: "2024-10-24",
      period: "2024 年起，持续半年以上",
      status: "已结束",
      type: "论文研究项目",
      institutions: ["剑桥大学相关项目组"],
      field: "三维空间转录组学",
      mode: "线上、长期投入",
      commitment: "当期公告要求高强度持续参与",
      capacity: "3—4 人",
      audience: "具备较丰富深度学习和论文经验的本科生",
      requirements: ["不面向零基础", "具备深度学习实践和独立推进能力", "能够长期参与论文辅助工作"],
      work: ["承担论文实验与辅助研究任务", "参与三维空间组学方法和结果整理"],
      outcomes: ["训练高难度空间组学研究能力", "作者和后续项目安排依据实际贡献与项目进展确定"],
      apply: "历史项目已经结束。",
      source: "【11月KYDW项目组招新公告】",
      updates: [{ date: "2024-10-24", text: "发布项目周期、人数、基础和工作强度要求。" }]
    },
    {
      id: "2024-pan-cancer-data",
      title: "泛癌影像数据整理项目",
      published: "2024-09-20",
      period: "约 3—4 周",
      status: "已结束",
      type: "论文研究项目",
      institutions: ["剑桥大学数学院与临床医学院相关项目"],
      field: "泛癌影像与增强 CT 生成数据准备",
      mode: "线上",
      commitment: "当期公告为每日约 2—5 小时",
      capacity: "2—3 人",
      audience: "希望通过数据任务认识医学影像项目的本科生",
      requirements: ["能够持续投入并按期交付", "项目经验和年级不作硬性限制"],
      work: ["开源癌症影像数据清洗", "配准", "标注", "使用 3D Slicer 等工具整理数据"],
      outcomes: ["认识医学影像数据整理流程", "经历和作者安排依据实际贡献与项目进展确定"],
      apply: "历史项目已经结束。",
      source: "【KYDW项目组招新公告】剑桥大学数学院&临床医学院科研实习内推项目汇总（9月）",
      updates: [{ date: "2024-09-20", text: "发布工作内容、时间、人数和基础要求。" }]
    },
    {
      id: "2024-cancer-mask",
      title: "癌症分割掩码注释项目",
      published: "2024-09-20",
      period: "约 4 个月",
      status: "已结束",
      type: "论文研究项目",
      institutions: ["剑桥大学相关项目", "首都医学科学创新中心", "天坛医院", "宣武医院"],
      field: "癌症影像分割与标注",
      mode: "线上",
      commitment: "当期公告为每日约 2—5 小时",
      capacity: "5—7 人",
      audience: "希望参与医学影像代码运行和标注任务的本科生",
      requirements: ["能够持续投入并按期交付", "熟悉 Python 者优先", "当期公告优先考虑大二、大三学生"],
      work: ["运行已有分割代码", "检查模型输出", "人工修正错误标注"],
      outcomes: ["认识分割模型与人工标注协作流程", "经历和作者安排依据实际贡献与项目进展确定"],
      apply: "历史项目已经结束。",
      source: "【KYDW项目组招新公告】剑桥大学数学院&临床医学院科研实习内推项目汇总（9月）",
      updates: [{ date: "2024-09-20", text: "发布项目周期、人数、代码和标注任务。" }]
    }
  ]
};

// 新项目与招募合集接入现有单一内容源。
window.KYDW.collections.push({
  id: "recruitment",
  label: "人员招募",
  href: "recruitment/index.html",
  pages: ["recruitment", "recruitment-detail"],
  home: false
});

const _researchSkillsModule = {
  id: "research-skills",
  label: "科研技能入门与查缺补漏",
  title: "科研技能入门与查缺补漏",
  subtitle: "新人入组、课程实践与长期科研的基础参考",
  text: "按实际问题整理电脑与数据、Kaggle、Python、人工智能、文献、科研表达、GitHub、Linux、实验评价和学术常识。",
  audience: "准备接触科研、正在完成实践或进入课题组长期学习的本科生",
  date: "持续更新",
  status: "公开参考",
  href: "programs/research-skills.html",
  order: 1,
  period: "长期项目",
  home: true,
  researchSkills: true,
  quickLinks: window.KYDW.researchSkills.chapters.slice(0, 5).map((chapter) => ({
    label: chapter.title,
    caption: chapter.summary,
    href: `programs/research-skills/${chapter.slug}.html`
  }))
};
window.KYDW.modules.push(_researchSkillsModule);
for (const module of window.KYDW.modules) {
  if (module.id === "training") {
    module.order = 2;
    module.text = "面向具体培训周期组织学习、任务和交流，长期知识内容统一链接到“科研技能入门与查缺补漏”。";
    module.quickLinks = [
      { label: "培训说明", caption: "活动安排", href: "programs/training.html" },
      { label: "科研技能项目", caption: "长期参考", href: "programs/research-skills.html" },
      { label: "培训路径", caption: "阶段任务", href: "programs/training/path.html" }
    ];
  }
  if (module.id === "sdu") module.order = 3;
  if (module.id === "fudan") module.order = 4;
  if (module.id === "workshop") module.order = 5;
}

window.KYDW.training.lead = "科研入门培训按活动周期组织基础学习、实践任务和后续交流。长期知识内容集中在“科研技能入门与查缺补漏”项目。";
window.KYDW.training.paragraphs = [
  "科研入门培训是一项具体培训活动，适合希望在一个周期内完成基础学习、实践任务和交流的本科生。",
  "电脑、数据、Kaggle、Python、人工智能、文献、科研工具和学术常识等长期内容已经整理到“科研技能入门与查缺补漏”。培训页保留活动安排、学习顺序和阶段任务，并在需要时进入对应章节查阅。",
  "培训任务用于组织学习过程；长期项目、专项合作和人员招募信息分别进入项目页面与人员招募合集。"
];
const _trainingResearchLinks = {
  preface: ["01-start"],
  foundation: ["02-computer-data", "07-literature", "08-office-figures"],
  "ai-basics": ["05-python-data", "06-ai-tools", "11-experiments"],
  challenges: ["08-office-figures", "11-experiments"],
  "research-basics": ["03-kaggle-notebook", "04-local-python", "05-python-data", "11-experiments"],
  "advanced-research": ["09-github-latex", "10-linux-remote", "11-experiments"],
  frontiers: ["07-literature", "12-academic-world"],
  practice: ["01-start", "11-experiments"],
  tools: ["04-local-python", "07-literature", "08-office-figures", "09-github-latex", "10-linux-remote"],
  cooperation: ["12-academic-world"],
  "practice-projects": ["01-start", "11-experiments"]
};
for (const chapter of window.KYDW.training.chapters) {
  chapter.researchChapterIds = _trainingResearchLinks[chapter.id] || [];
  if (chapter.id === "practice-projects") {
    chapter.topics = [
      { title: "完整项目任务", text: "按项目查看数据、方法、实验、结果和研究表达。" },
      { title: "后续研究学习", text: "完成基础任务后，根据兴趣进入更长期的课程、专项合作或课题组学习。" }
    ];
  }
}
delete window._trainingResearchLinks;
