(function () {
  "use strict";

  const data = window.KYDW;
  const body = document.body;
  const root = body.dataset.root || "";
  const page = body.dataset.page || "home";
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const esc = (value) => String(value ?? "").replace(/[&<>\"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

  const rootHref = (target) => {
    if (!target) return "#";
    if (/^(https?:|mailto:|#)/i.test(target)) return target;
    return root + target;
  };
  const paragraphs = (items) => (items || []).map((item) => `<p>${esc(item)}</p>`).join("");
  const badges = (items = []) => items.filter(Boolean).map((item) => {
    const lower = String(item).toLowerCase();
    const cls = lower === "new" || lower.includes("hot") ? " new" : lower.includes("待") || lower.includes("即将") ? " warn" : lower.includes("开放") || lower.includes("推荐") || lower.includes("当前") ? " ok" : "";
    return `<span class="badge${cls}">${esc(item)}</span>`;
  }).join("");
  const tagRow = (items = []) => items.filter(Boolean).map((item) => `<span class="tag">${esc(item)}</span>`).join("");
  const findProject = (id) => data.projects.find((project) => project.id === id);
  const findModule = (id) => data.modules.find((module) => module.id === id);
  const findWeek = (id) => data.experience.weeks.find((week) => String(week.id) === String(id));
  const isListedProject = (project) => project && project.status !== "待定" && project.status !== "待公布" && !/^后续方向/.test(project.title);
  const sortedModules = () => [...data.modules].sort((a, b) => (a.order || 99) - (b.order || 99));
  const sortedResources = () => [...data.resourceCollections].sort((a, b) => (a.homeOrder || 99) - (b.homeOrder || 99));

  function actionMarkup(action) {
    if (action.disabled) return `<span class="outline-btn is-disabled" aria-disabled="true">${esc(action.label)}</span>`;
    const href = action.external ? esc(action.href) : rootHref(action.href);
    const attrs = action.external ? ' target="_blank" rel="noreferrer"' : "";
    return `<a class="${action.primary ? "solid-btn" : "outline-btn"}" href="${href}"${attrs}>${esc(action.label)}${action.arrow === false ? "" : " →"}</a>`;
  }

  function header() {
    const nav = [{ id: "home", label: "主页", href: "index.html", pages: ["home"] }, ...data.collections];
    const navHtml = nav.map((item) => `<a href="${rootHref(item.href)}"${item.pages.includes(page) ? ' aria-current="page"' : ""}>${esc(item.label)}</a>`).join("");
    return `<header class="topbar"><div class="topbar-inner">
      <a class="brand" href="${rootHref("index.html")}"><span class="brand-mark">K</span><span class="brand-copy"><b>科研大王 KYDW</b><span>学生自主运营的科研协作团队</span></span></a>
      <nav class="nav" aria-label="主导航">${navHtml}</nav>
      <div class="top-actions"><button class="icon-btn" id="themeToggle" type="button" aria-label="切换明暗模式">☼</button></div>
    </div></header>`;
  }

  function footer() {
    return `<footer class="footer"><div class="footer-inner"><div><b>${esc(data.site.name)}（${esc(data.site.short)}）</b><p>${esc(data.site.tagline)}</p></div><div><p>网站公开资料免费阅读，请勿用于牟利性销售。</p><p>联系负责人：${esc(data.site.wechat)} · 关注“科研大王”公众号</p></div><div><p><a href="${esc(data.site.repo)}" target="_blank" rel="noreferrer">GitHub 仓库</a> · <a href="${esc(data.site.pages)}" target="_blank" rel="noreferrer">网站主页</a></p><p>医学图像与生物数据用于科研学习。</p></div></div></footer>`;
  }

  function layout(inner) {
    $("#site-header").innerHTML = header();
    $("#page-content").innerHTML = inner;
    $("#site-footer").innerHTML = footer();
    bindTheme();
    if (location.hash) setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView(), 80);
  }

  function bindTheme() {
    const saved = localStorage.getItem("kydw-theme");
    if (saved) document.documentElement.dataset.theme = saved;
    const button = $("#themeToggle");
    if (!button) return;
    button.textContent = document.documentElement.dataset.theme === "dark" ? "☾" : "☼";
    button.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("kydw-theme", next);
      button.textContent = next === "dark" ? "☾" : "☼";
    });
  }

  function hero({ eyebrow, title, lead, actions = [], note = "" }) {
    return `<section class="hero"><div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(title)}</h1><p class="lead">${esc(lead)}</p>${actions.length ? `<div class="hero-actions">${actions.map(actionMarkup).join("")}</div>` : ""}${note ? `<p class="hero-note">${esc(note)}</p>` : ""}</section>`;
  }

  function statGrid(items) {
    return `<div class="stat-grid">${items.map((item) => `<div class="stat"><strong>${esc(item.value)}</strong><span>${esc(item.label)}</span></div>`).join("")}</div>`;
  }

  function sectionHead(title, text, href, label) {
    return `<div class="section-head"><div><h2>${esc(title)}</h2>${text ? `<p>${esc(text)}</p>` : ""}</div>${href ? `<a class="section-link" href="${rootHref(href)}">${esc(label || "查看详情")} →</a>` : ""}</div>`;
  }

  function resourceCollectionCard(collection, homeOnly = false) {
    const visibleItems = homeOnly ? [] : (collection.items || []);
    const items = visibleItems.map((item) => `<li class="${item.kind === "book" ? "book-item" : ""}"><b>${esc(item.title)}</b><span>${esc(item.text)}</span><a href="${rootHref(item.href)}">${item.kind === "book" ? "打开文档" : "查看详情"} →</a></li>`).join("");
    return `<article class="card resource-card" id="${esc(collection.id)}"><div class="card-corner">${badges(collection.badges)}</div><div class="card-kicker">${esc(collection.label)}</div><h3>${esc(collection.title)}</h3><p><b>${esc(collection.subtitle)}</b></p><p>${esc(collection.text)}</p><div class="tag-row">${tagRow([collection.audience, collection.status])}</div>${items ? `<ul class="resource-items ${collection.id === "teaching-library" ? "book-list" : ""}">${items}</ul>` : ""}<div class="card-footer"><a class="outline-btn" href="${rootHref(collection.href)}">进入合集 →</a></div></article>`;
  }

  function showcaseItem(module) {
    return `<article class="showcase-item"><div class="showcase-item-top"><span class="card-kicker">${esc(module.period || module.label)}</span>${badges((module.badges || []).slice(0, 1))}</div><h3>${esc(module.title)}</h3><p><b>${esc(module.subtitle)}</b></p><p>${esc(module.text)}</p><a href="${rootHref(module.href)}">查看详情 →</a></article>`;
  }

  function moduleCard(module) {
    return `<article class="card activity-card" id="${esc(module.id)}"><div class="activity-order">${esc(module.period || `项目 ${module.order || ""}`)}</div><div class="card-corner">${badges(module.badges)}</div><div class="card-kicker">${esc(module.label)}</div><h3>${esc(module.title)}</h3><p><b>${esc(module.subtitle)}</b></p><p>${esc(module.text)}</p><div class="tag-row">${tagRow([module.audience, module.status])}</div><div class="card-footer"><a class="outline-btn" href="${rootHref(module.href)}">查看详情 →</a></div></article>`;
  }

  function weekCard(week) {
    const projects = week.projects.map(findProject).filter(isListedProject);
    if (!projects.length) return "";
    return `<article class="card week-card"><div class="card-corner">${badges([week.badge])}</div><div class="card-kicker">第 ${esc(week.id)} 周</div><h3>${esc(week.title)}</h3><p>${esc(week.note)}</p><div class="week-project-list">${projects.map((project) => `<span><b>${esc(project.no)}</b>${esc(project.title)}</span>`).join("")}</div><div class="card-footer"><span class="muted small">${projects.length} 个方向</span><a class="outline-btn" href="${rootHref(`experience/week-${String(week.id).padStart(2, "0")}.html`)}">查看详情 →</a></div></article>`;
  }

  function projectMode(project, advanced = false) {
    if (advanced && !project.single) {
      return `<article class="project-mode advanced-mode"><div class="mode-kicker">进阶项目</div><p>继续阅读教学项目，完成实践并整理方向报告。</p></article>`;
    }
    const title = project.advanced && !project.single ? "体验项目" : "项目";
    return `<article class="project-mode"><div class="mode-kicker">${title}</div><p>${esc(project.experience || project.short)}</p></article>`;
  }

  function weekProjectPanel(project) {
    const modes = [projectMode(project, false)];
    if (project.advanced && !project.single) modes.push(projectMode(project, true));
    return `<article class="card week-project-panel"><div class="week-project-title"><div><span class="project-no">${esc(project.no)}</span><h3>${esc(project.title)}</h3></div></div><p class="project-short">${esc(project.short)}</p><div class="project-split">${modes.join("")}</div><div class="card-footer"><a class="solid-btn" href="${rootHref(`experience/${project.id}.html`)}">查看项目详情 →</a></div></article>`;
  }

  function home() {
    const t = data.team;
    const e = data.experience;
    const featured = findModule("sdu");
    const otherModules = sortedModules().filter((module) => module.id !== "sdu");
    const resourceCards = sortedResources().filter((collection) => collection.home !== false);
    layout(`${hero({
      eyebrow: "KYDW / 科研大王",
      title: "科研大王 KYDW",
      lead: "学生自主运营的跨校、跨学科科研协作团队，围绕科研入门、项目实践、专业解读与经验分享，整理可阅读、可实践的公开内容。",
      actions: [{ label: "团队介绍", href: "team/index.html", primary: true }, { label: "项目与活动", href: "programs/index.html" }, { label: "资源中心", href: "resources/index.html" }],
      note: "团队介绍 · 项目与活动 · 资源中心"
    })}
    <section class="section" id="team-overview">${sectionHead("团队概况", "从团队定位、协作方式和公开成果认识科研大王。", "team/index.html", "完整团队介绍")}
      <div class="home-intro-grid"><article class="card"><div class="card-kicker">KYDW / 团队</div><h3>${esc(t.lead)}</h3>${paragraphs(t.paragraphs.slice(0, 2))}<div class="card-footer"><span class="muted small">学生组织 · 跨校协作 · 交叉研究</span><a href="${rootHref("team/index.html")}">进入团队介绍 →</a></div></article><div>${statGrid(t.facts)}</div></div>
    </section>
    <section class="section">${sectionHead("团队资源分享", "从合集进入专业解读、项目资料、培训内容和教学文档。", "resources/index.html", "进入资源中心")}
      <div class="resource-grid">${resourceCards.map((collection) => resourceCollectionCard(collection, true)).join("")}</div>
    </section>
    <section class="section" id="featured-projects">${sectionHead("项目与活动", "当前重点项目放在左侧，其他活动按开展阶段列在右侧。", "programs/index.html", "查看全部项目与活动")}
      <div class="showcase-grid"><article class="card featured-showcase"><div class="card-corner">${badges(["新增", "推荐入门"])}</div><div class="card-kicker">当前重点项目 / ${esc(featured?.label || "项目")}</div><h3>${esc(e.title)}</h3><p><b>${esc(e.lead)}</b></p><p>${esc(featured?.text || e.paragraphs[0])}</p><div class="card-footer"><a class="solid-btn" href="${rootHref("experience/index.html")}">查看详情 →</a></div></article><aside class="showcase-side" aria-label="其他活动与项目"><div class="showcase-side-head"><h3>其他活动与项目</h3><p>培训、合作项目与专题交流。</p></div><div class="showcase-scroll">${otherModules.map(showcaseItem).join("")}</div></aside></div>
    </section>
    <section class="section">${sectionHead("团队成果与成员发展", "代表性成果和成员去向集中收录在团队介绍的子页面。", "team/index.html", "进入团队介绍")}
      <div class="home-output-grid"><article class="card compact-summary"><div class="card-kicker">代表性产出</div><h3>论文、项目与竞赛成果</h3><p>${esc(t.achievements[0].text)}</p><a href="${rootHref("team/achievements.html")}">查看完整成果 →</a></article><article class="card compact-summary"><div class="card-kicker">成员发展</div><h3>升学去向与团队负责人</h3><p>${esc(t.destinationNote)}</p><a href="${rootHref("team/destinations.html")}">查看成员去向 →</a></article></div>
    </section>`);
  }

  function team() {
    const t = data.team;
    layout(`${hero({ eyebrow: t.label, title: "团队介绍", lead: t.lead, actions: [{ label: "查看项目与活动", href: "programs/index.html", primary: true }, { label: "进入资源中心", href: "resources/index.html" }], note: "学生自主运营 · 跨校协作网络" })}
    <section class="section"><div class="prose">${paragraphs(t.paragraphs)}</div></section>
    <section class="section">${sectionHead("团队概况", "团队成立时间、协作网络和公开资源方式。", null)}${statGrid(t.facts)}</section>
    <section class="section">${sectionHead("团队工作方式", "围绕协作、实践和分享形成活动体系。", null)}<div class="three-grid"><article class="card"><div class="card-kicker">跨校协作</div><h3>连接不同学校与方向</h3><p>围绕医学、工程、计算机、人工智能与生物信息学等交叉方向开展交流。</p></article><article class="card"><div class="card-kicker">项目实践</div><h3>从研究任务进入方法</h3><p>通过项目、培训和专题合作，讨论数据、方法、结果和研究表达。</p></article><article class="card"><div class="card-kicker">资源分享</div><h3>把经验整理成公开内容</h3><p>团队介绍、项目说明、专业解读和教学材料集中放在网站资源中心。</p></article></div></section>
    <section class="section">${sectionHead("代表性成果", "论文、国家级项目和学科竞赛成果。", "team/achievements.html", "查看完整成果")}<div class="achievement-list">${t.achievements.map((item) => `<details class="fold"><summary>${esc(item.title)}</summary><div class="fold-body"><p>${esc(item.text)}</p></div></details>`).join("")}</div></section>
    <section class="section"><div class="card-grid"><article class="card"><div class="card-kicker">成员发展</div><h2>升学去向</h2><p class="muted">按地区、学校和学位类型整理成员去向。</p><div class="hero-actions"><a class="outline-btn" href="${rootHref("team/destinations.html")}">查看成员去向 →</a></div></article><article class="card"><div class="card-kicker">活动体系</div><h2>团队活动</h2><p class="muted">新成员培训、多校联合项目、学业规划分享和 Bio-AI Workshop。</p><div class="hero-actions"><a class="outline-btn" href="${rootHref("team/activities.html")}">查看活动体系 →</a></div></article></div></section>
    <section class="section">${sectionHead("负责人和历届骨干", "记录团队不同阶段的组织与研究经历。", "team/people.html", "查看成员介绍")}<div class="leader-grid">${t.leaders.slice(0, 2).map((leader) => `<article class="leader"><h3>${esc(leader.name)}</h3><div class="role">${esc(leader.role)}</div><p>${esc(leader.text)}</p></article>`).join("")}</div></section>
    <section class="section"><div class="callout"><b>联系 KYDW</b><p>关注“科研大王”公众号，或添加负责人微信 <b>${esc(data.site.wechat)}</b> 了解团队活动和项目入口。</p></div><p class="small muted">网站公开资料免费阅读，请勿用于牟利性销售。</p></section>`);
  }

  function teamSection() {
    const section = body.dataset.teamSection || "achievements";
    const t = data.team;
    const configs = {
      achievements: { eyebrow: "团队介绍 / 成果", title: "代表性成果", lead: "成员论文、会议、国家级项目和学科竞赛成果。", back: "team/index.html" },
      destinations: { eyebrow: "团队介绍 / 成员发展", title: "成员升学去向", lead: "按地区、学校和学位类型整理成员去向。", back: "team/index.html" },
      activities: { eyebrow: "团队介绍 / 活动", title: "团队活动体系", lead: "培训、联合项目、规划分享和专题交流构成团队的主要活动。", back: "team/index.html" },
      people: { eyebrow: "团队介绍 / 成员", title: "负责人和历届骨干", lead: "记录团队不同阶段的组织与研究经历。", back: "team/index.html" }
    };
    const cfg = configs[section] || configs.achievements;
    let inner = hero({ eyebrow: cfg.eyebrow, title: cfg.title, lead: cfg.lead, actions: [{ label: "返回团队介绍", href: cfg.back, primary: true }, { label: "项目与活动", href: "programs/index.html" }] });
    if (section === "achievements") inner += `<section class="section">${sectionHead("成果目录", "按成果类型集中展示。", null)}<div class="achievement-list">${t.achievements.map((item) => `<article class="achievement"><b>${esc(item.title)}</b><p>${esc(item.text)}</p></article>`).join("")}</div></section>`;
    if (section === "destinations") inner += `<section class="section">${sectionHead("已整理成员去向", "按地区和学校类型折叠展示。", null)}<div class="card-grid">${t.destinations.map((group) => `<article class="card"><div class="card-kicker">成员去向</div><h3>${esc(group.group)}</h3><ul>${group.items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></article>`).join("")}</div><p class="small muted">${esc(t.destinationNote)}</p></section>`;
    if (section === "activities") inner += `<section class="section">${sectionHead("活动目录", "每项活动进入独立的项目与活动详情页。", "programs/index.html", "查看项目与活动")}
      <div class="activity-timeline">${sortedModules().map((module) => `<article class="activity-row"><div class="activity-period">${esc(module.period || "活动")}</div><div><div class="card-kicker">${esc(module.label)}</div><h3>${esc(module.title)}</h3><p>${esc(module.text)}</p></div><a class="outline-btn" href="${rootHref(module.href)}">查看详情 →</a></article>`).join("")}</div><div class="card section-card"><h3>其他团队活动</h3><ul>${t.activities.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div></section>`;
    if (section === "people") inner += `<section class="section">${sectionHead("成员介绍", "负责人和历届骨干信息。", null)}<div class="leader-grid">${t.leaders.map((leader) => `<article class="leader"><h3>${esc(leader.name)}</h3><div class="role">${esc(leader.role)}</div><p>${esc(leader.text)}</p></article>`).join("")}</div></section>`;
    layout(inner);
  }

  function programs() {
    layout(`${hero({ eyebrow: "项目与活动", title: "项目与活动", lead: "KYDW 的培训、合作项目、科研体验和专题交流，按开展阶段整理。", actions: [{ label: "进入科研体验项目", href: "experience/index.html", primary: true }, { label: "进入资源中心", href: "resources/index.html" }] })}
    <section class="section">${sectionHead("项目活动目录", "当前重点项目置于前列，其他活动按长期开展或合作阶段排列。", null)}<div class="activity-timeline">${sortedModules().map(moduleCard).join("")}</div></section>`);
  }

  function modulePage() {
    const module = findModule(body.dataset.module);
    if (!module) return layout(hero({ eyebrow: "项目与活动", title: "活动不存在", lead: "请返回项目与活动目录选择内容。", actions: [{ label: "返回项目与活动", href: "programs/index.html", primary: true }] }));
    const related = module.id === "sdu" ? `<section class="section"><div class="card feature-callout"><div class="card-kicker">重点项目</div><h2>本科生科研入门体验项目</h2><p>进入项目主页查看项目说明、周页面和各研究方向的项目详情。</p><a class="solid-btn" href="${rootHref("experience/index.html")}">进入项目主页 →</a></div></section>` : "";
    layout(`${hero({ eyebrow: `${module.label} / ${module.period || "活动"}`, title: module.title, lead: module.subtitle, actions: [{ label: "返回项目与活动", href: "programs/index.html", primary: true }, { label: "进入资源中心", href: "resources/index.html" }], note: module.status })}
    <section class="section"><div class="prose"><p>${esc(module.text)}</p><p><strong>适合对象：</strong>${esc(module.audience)}</p></div></section>
    ${related}`);
  }

  function resources() {
    layout(`${hero({ eyebrow: "资源中心", title: "资源中心", lead: "把团队公开的解读、项目资料、教学文档和活动信息按合集整理。", actions: [{ label: "浏览资源合集", href: "#resource-directory", primary: true }, { label: "查看项目与活动", href: "programs/index.html" }] })}
    <section class="section" id="resource-directory">${sectionHead("资源合集", "按主题进入对应资料集合。", null)}<div class="resource-grid">${sortedResources().map((collection) => resourceCollectionCard(collection)).join("")}</div></section>`);
  }

  function experience() {
    const e = data.experience;
    layout(`${hero({ eyebrow: e.label, title: e.title, lead: "面向本科生的跨学科科研项目集合，覆盖医学影像、生物信息与人工智能等方向。", actions: [{ label: "查看项目目录", href: "#project-directory", primary: true }, { label: "返回项目与活动", href: "programs/index.html" }] })}
    <section class="section"><div class="prose">${paragraphs(e.paragraphs)}</div></section>
    <section class="section">${sectionHead("参与方式", null, null)}<div class="prose participation-prose"><p><strong>面向对象：</strong>${esc(e.audience)}</p><p><strong>学习安排：</strong>${esc(e.schedule)}</p><p><strong>学习形式：</strong>${esc(e.participation)}</p></div></section>
    <section class="section" id="project-directory">${sectionHead("项目目录", "按主题周进入项目详情。", null)}<div class="week-card-grid">${e.weeks.map(weekCard).filter(Boolean).join("")}</div></section>`);
  }

  function weekPage() {
    const week = findWeek(body.dataset.week);
    if (!week) return layout(hero({ eyebrow: "科研体验项目", title: "周页面不存在", lead: "请返回科研体验项目主页选择项目周次。", actions: [{ label: "返回项目主页", href: "experience/index.html", primary: true }] }));
    const projects = week.projects.map(findProject).filter(isListedProject);
    layout(`${hero({ eyebrow: `科研体验项目 / 第 ${week.id} 周`, title: `第 ${week.id} 周 · ${week.title}`, lead: week.note, actions: [{ label: "返回项目目录", href: "experience/index.html", primary: true }, { label: "项目与活动", href: "programs/index.html" }], note: `${projects.length} 个研究方向` })}
    <section class="section">${sectionHead("本周项目", null, null)}<div class="week-projects">${projects.map(weekProjectPanel).join("")}</div></section>`);
  }

  function materialCard(title, type, text, href, external = false) {
    const copy = text ? `<p>${esc(text)}</p>` : "";
    if (!href) return `<article class="material-card is-pending"><div class="material-type">${esc(type)}</div><h3>${esc(title)}</h3>${copy}<span class="material-status">暂未开放</span></article>`;
    const link = external ? `<a class="outline-btn" href="${esc(href)}" target="_blank" rel="noreferrer">进入 Kaggle →</a>` : `<a class="outline-btn" href="${rootHref(href)}">打开${esc(title)} →</a>`;
    return `<article class="material-card"><div class="material-type">${esc(type)}</div><h3>${esc(title)}</h3>${copy}${link}</article>`;
  }

  function projectPage() {
    const project = findProject(body.dataset.project);
    if (!project) return layout(hero({ eyebrow: "科研体验项目", title: "项目不存在", lead: "请返回本科生科研入门体验项目主页选择方向。", actions: [{ label: "返回项目主页", href: "experience/index.html", primary: true }] }));
    const answerHref = project.answer || project.referenceAnswer;
    const practiceHref = project.kaggle || project.practice;
    const singleTeaching = project.single ? project.advanced : null;
    const singlePractice = project.single ? practiceHref : null;
    const singleAnswer = project.single ? answerHref : null;
    const experienceTeaching = project.experienceTeaching || null;
    const experiencePractice = project.experiencePractice || null;
    const experienceAnswer = project.experienceAnswer || null;
    const advancedTeaching = project.single ? null : project.advanced;
    const advancedPractice = project.advancedPractice || null;
    const advancedAnswer = project.advancedAnswer || null;
    const tier = (title, text, teachingHref, practiceLink, answerLink) => `<article class="project-tier"><div class="mode-kicker">${esc(title)}</div><p class="project-tier-text">${esc(text)}</p><div class="material-grid">${materialCard("教学项目", "教学", "", teachingHref)}${materialCard("实践项目", "实践", "", practiceLink, !!practiceLink)}${materialCard("参考答案", "答案", "", answerLink)}</div></article>`;
    const projectContent = project.single
      ? tier("项目", project.summary, singleTeaching, singlePractice, singleAnswer)
      : `<div class="project-tier-grid">${tier("体验项目", project.experience || project.short, experienceTeaching, experiencePractice, experienceAnswer)}${tier("进阶项目", "继续阅读研究对象、数据结构、方法和结果分析。", advancedTeaching, advancedPractice, advancedAnswer)}</div>`;
    layout(`${hero({ eyebrow: `第 ${project.week} 周 / 项目 ${project.no}`, title: project.title, lead: project.short, actions: [{ label: "返回所属周次", href: `experience/week-${String(project.week).padStart(2, "0")}.html`, primary: true }, { label: "返回项目与活动", href: "programs/index.html" }] })}
    <section class="section">${sectionHead("项目内容", project.single ? "教学项目、实践项目和参考答案。" : "体验项目与进阶项目分别提供教学、实践和参考答案。", null)}${projectContent}</section>`);
  }

  function professional() {
    const p = data.professional;
    layout(`${hero({ eyebrow: "资源中心 / 专业解读", title: "生物医学工程专业解读", lead: p.lead, actions: [{ label: "返回资源中心", href: "resources/index.html", primary: true }, { label: "查看专业答疑", href: "professional/faq.html" }], note: "专业介绍与发展路径" })}
    <section class="section"><div class="prose">${paragraphs(p.intro)}</div></section>
    <section class="section"><div class="long-prose">${p.sections.map((item) => `<article class="prose-section"><h2>${esc(item.title)}</h2>${paragraphs(item.paragraphs)}</article>`).join("")}</div></section>`);
  }

  function professionalFaq() {
    const p = data.professional;
    layout(`${hero({ eyebrow: "专业解读 / 答疑", title: "生物医学工程专业答疑", lead: "集中回答课程、科研、升学、就业与费用等问题。", actions: [{ label: "返回专业解读", href: "professional/index.html", primary: true }, { label: "返回资源中心", href: "resources/index.html" }] })}
    <section class="section"><div class="faq-grid">${p.faq.map((item) => `<details class="fold"><summary>${esc(item.q)}</summary><div class="fold-body"><p>${esc(item.a)}</p></div></details>`).join("")}</div></section>`);
  }

  const renderers = { home, team, "team-section": teamSection, programs, module: modulePage, resources, experience, "experience-week": weekPage, project: projectPage, professional, "professional-faq": professionalFaq };
  if (renderers[page]) renderers[page]();
  else home();
})();
