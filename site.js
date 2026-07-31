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
  const badges = (items = []) => items.map((item) => {
    const lower = String(item).toLowerCase();
    const cls = lower === "new" ? " new" : lower.includes("待") ? " warn" : lower.includes("开放") || lower.includes("推荐") ? " ok" : "";
    return `<span class="badge${cls}">${esc(item)}</span>`;
  }).join("");
  const tagRow = (items = []) => items.map((item) => `<span class="tag">${esc(item)}</span>`).join("");
  const findProject = (id) => data.projects.find((project) => project.id === id);

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
    return `<footer class="footer"><div class="footer-inner"><div><b>${esc(data.site.name)}（${esc(data.site.short)}）</b><p>${esc(data.site.tagline)}</p></div><div><p>KYDW 组内资源永久免费。</p><p>联系负责人：${esc(data.site.wechat)} · 关注“科研大王”公众号</p></div><div><p><a href="${esc(data.site.repo)}" target="_blank" rel="noreferrer">GitHub 仓库</a> · <a href="${esc(data.site.pages)}" target="_blank" rel="noreferrer">GitHub Pages</a></p><p>医学图像与生物数据用于科研学习。</p></div></div></footer>`;
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
    return `<section class="hero"><div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(title)}</h1><p class="lead">${esc(lead)}</p>${actions.length ? `<div class="hero-actions">${actions.map((a) => `<a class="${a.primary ? "solid-btn" : "outline-btn"}" href="${a.external ? esc(a.href) : rootHref(a.href)}"${a.external ? ' target="_blank" rel="noreferrer"' : ""}>${esc(a.label)}</a>`).join("")}</div>` : ""}${note ? `<p class="hero-note">${esc(note)}</p>` : ""}</section>`;
  }

  function statGrid(items) {
    return `<div class="stat-grid">${items.map((item) => `<div class="stat"><strong>${esc(item.value)}</strong><span>${esc(item.label)}</span></div>`).join("")}</div>`;
  }

  function sectionHead(title, text, href, label) {
    return `<div class="section-head"><div><h2>${esc(title)}</h2>${text ? `<p>${esc(text)}</p>` : ""}</div>${href ? `<a class="section-link" href="${rootHref(href)}">${esc(label || "查看详情")} →</a>` : ""}</div>`;
  }

  function moduleCard(module) {
    return `<article class="card" id="${esc(module.id)}"><div class="card-corner">${badges(module.badges)}</div><div class="card-kicker">${esc(module.label)}</div><h3>${esc(module.title)}</h3><p><b>${esc(module.subtitle)}</b></p><p>${esc(module.text)}</p><div class="tag-row">${tagRow([module.audience, module.status])}</div><div class="card-footer"><a class="outline-btn" href="${rootHref(module.href)}">查看详情 →</a></div></article>`;
  }

  function resourceCollectionCard(collection, homeOnly = false) {
    const visibleItems = (collection.items || []).filter((item) => !homeOnly || item.home !== false);
    const items = visibleItems.map((item) => `<li><b>${esc(item.title)}</b><span>${esc(item.text)}</span><a href="${rootHref(item.href)}">查看详情 →</a></li>`).join("");
    return `<article class="card resource-card" id="${esc(collection.id)}"><div class="card-corner">${badges(collection.badges)}</div><div class="card-kicker">${esc(collection.label)}</div><h3>${esc(collection.title)}</h3><p><b>${esc(collection.subtitle)}</b></p><p>${esc(collection.text)}</p><div class="tag-row">${tagRow([collection.audience, collection.status])}</div>${items ? `<ul class="resource-items">${items}</ul>` : ""}<div class="card-footer"><a class="outline-btn" href="${rootHref(collection.href)}">进入合集 →</a></div></article>`;
  }

  function showcaseItem(module) {
    return `<article class="showcase-item"><div class="showcase-item-top"><span class="card-kicker">${esc(module.label)}</span>${badges(module.badges.slice(0, 1))}</div><h3>${esc(module.title)}</h3><p><b>${esc(module.subtitle)}</b></p><p>${esc(module.text)}</p><a href="${rootHref(module.href)}">查看详情 →</a></article>`;
  }

  function projectCard(project) {
    const closed = !project.advanced && project.status !== "体验版即将开放";
    return `<article class="card project-card${closed ? " is-closed" : ""}"><div class="card-corner">${badges([project.status === "体验版即将开放" ? "NEW" : project.status])}</div><div class="project-no">${esc(project.no)}</div><h4>${esc(project.title)}</h4><p class="short">${esc(project.short)}</p><div class="project-bottom"><div class="tag-row">${tagRow([project.input, project.output])}</div><div class="card-footer"><a class="outline-btn" href="${rootHref(`experience/${project.id}.html`)}">查看详情 →</a></div></div></article>`;
  }

  function home() {
    const t = data.team;
    const e = data.experience;
    layout(`${hero({
      eyebrow: "KYDW / STUDENT-LED RESEARCH NETWORK",
      title: "把科研方向讲清楚，把第一次实践做完整。",
      lead: "KYDW 是学生自主运营的跨校、跨学科科研协作团队。我们通过学习材料、项目实践和经验分享，帮助本科生认识科研流程与交叉研究方向。",
      actions: [{ label: "开始科研体验", href: "experience/index.html", primary: true }, { label: "团队介绍", href: "team/index.html" }, { label: "专业解读", href: "professional/index.html" }],
      note: "本科生科研入门体验项目从基础编程与人工智能开始。"
    })}
    <section class="section">${sectionHead("KYDW团队", "团队背景、成员发展与活动内容。", "team/index.html", "团队介绍")}
      <div class="card-grid"><article class="card"><div class="card-kicker">TEAM / KYDW</div><h3>${esc(t.lead)}</h3>${paragraphs(t.paragraphs.slice(0, 2))}<div class="card-footer"><span class="muted small">自由 · 平等 · 开放 · 跨校协作</span><a href="${rootHref("team/index.html")}">团队介绍 →</a></div></article><div>${statGrid(t.facts)}</div></div>
    </section>
    <section class="section">${sectionHead("团队资源分享", "专业解读、升学资源、项目介绍与科研入门培训。", "resources/index.html", "资源中心")}
      <div class="resource-grid">${data.resourceCollections.filter((collection) => collection.home !== false).sort((a, b) => (a.homeOrder || 99) - (b.homeOrder || 99)).map((collection) => resourceCollectionCard(collection, true)).join("")}</div>
    </section>
    <section class="section">${sectionHead("团队活动与项目", "科研入门体验、培训、合作项目与专题交流。", "programs/index.html", "查看详情")}
      <div class="showcase-grid"><article class="card featured-showcase"><div class="card-corner">${badges(["NEW", "推荐入门"])}</div><div class="card-kicker">CURRENT PROJECT / EXPERIENCE</div><h3>${esc(e.title)}</h3><p><b>${esc(e.lead)}</b></p>${paragraphs(e.paragraphs.slice(0, 2))}<div class="path-rail">${e.path.slice(0, 4).map((step) => `<div class="path-step"><b>${esc(step.title)}</b><span>${esc(step.text)}</span></div>`).join("")}</div><div class="card-footer"><a class="solid-btn" href="${rootHref("experience/index.html")}">查看详情 →</a></div></article><aside class="showcase-side" aria-label="其他活动与项目"><div class="showcase-side-head"><h3>其他活动与项目</h3><p>培训、合作项目和专题交流。</p></div><div class="showcase-scroll">${data.modules.filter((module) => module.home !== false).map(showcaseItem).join("")}</div></aside></div>
    </section>
    <section class="section"><div class="notice-list"><div class="notice"><b>公开资源</b>团队介绍、项目说明和教学材料集中在 GitHub Pages。</div><div class="notice"><b>继续学习</b>对某个方向感兴趣，可以继续阅读进阶实践并准备方向报告。</div><div class="notice"><b>团队活动</b>培训、合作项目与 Workshop 按各自页面介绍开展。</div></div></section>`);
  }

  function team() {
    const t = data.team;
    layout(`${hero({ eyebrow: t.label, title: t.title, lead: t.lead, actions: [{ label: "开始科研体验", href: "experience/index.html", primary: true }, { label: "查看项目与培训", href: "programs/index.html" }], note: "学生自主运营 · 跨校协作网络" })}
    <section class="section"><div class="prose">${paragraphs(t.paragraphs)}</div></section>
    <section class="section">${sectionHead("团队概况", "成员规模与团队成立时间。", null)}${statGrid(t.facts)}</section>
    <section class="section"><div class="card-grid"><article class="card"><div class="card-kicker">DESTINATIONS</div><h2>成员升学去向</h2><p class="muted">成员去向按届次与地区折叠展示。</p>${t.destinations.map((group) => `<details class="fold"><summary>${esc(group.group)}</summary><div class="fold-body"><ul>${group.items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div></details>`).join("")}<p class="small muted">${esc(t.destinationNote)}</p></article><article class="card"><div class="card-kicker">ACTIVITIES</div><h2>活动体系</h2><p class="muted">入门培训、专题合作、学业分享与 Bio-AI Workshop。</p><ul>${t.activities.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></article></div></section>
    <section class="section">${sectionHead("代表性成果", "成员第一作者论文、会议、项目与竞赛信息。", null)}<div class="achievement-list">${t.achievements.map((item) => `<div class="achievement"><b>${esc(item.title)}</b><p>${esc(item.text)}</p></div>`).join("")}</div></section>
    <section class="section">${sectionHead("负责人和历届骨干", "记录团队不同阶段的组织与研究经历。", null)}<div class="leader-grid">${t.leaders.map((leader) => `<article class="leader"><h3>${esc(leader.name)}</h3><div class="role">${esc(leader.role)}</div><p>${esc(leader.text)}</p></article>`).join("")}</div></section>
    <section class="section"><div class="callout"><b>加入方式</b><p>欢迎对科研有兴趣、愿意持续学习和复盘的本科生。关注“科研大王”公众号，或添加负责人微信 <b>${esc(data.site.wechat)}</b> 咨询。</p></div><p class="small muted">KYDW 组内资源永久免费。</p></section>`);
  }

  function programs() {
    layout(`${hero({ eyebrow: "PROGRAMS / TRAINING / COLLABORATION", title: "团队活动与项目", lead: "KYDW 提供科研入门体验、基础培训、专题讨论和跨校合作项目。", actions: [{ label: "进入科研体验", href: "experience/index.html", primary: true }, { label: "查看专业解读", href: "professional/index.html" }] })}
    <section class="section">${sectionHead("项目与培训", "科研入门培训、山大项目、复旦项目与 Bio-AI Workshop。", null)}<div class="card-grid">${data.modules.map(moduleCard).join("")}</div></section>
    <section class="section"><article class="card"><div class="card-kicker">CONTACT</div><h2>资料与联系</h2><p>网站集中提供团队介绍、项目说明和公开学习材料。招新、课题组跟学与合作项目的信息，会在相应活动页面介绍。</p><div class="hero-actions"><a class="solid-btn" href="${rootHref("experience/index.html")}">查看科研体验</a><a class="outline-btn" href="${rootHref("professional/index.html")}">查看专业解读</a></div></article></section>`);
  }

  function resources() {
    layout(`${hero({ eyebrow: "RESOURCES / COLLECTIONS", title: "资源中心", lead: "专业解读、升学资源、项目介绍与科研入门培训，按合集集中整理。", actions: [{ label: "查看专业解读", href: "professional/index.html", primary: true }, { label: "查看项目与活动", href: "programs/index.html" }] })}
    <section class="section">${sectionHead("资源合集", "按主题查阅专业解读、升学准备、项目介绍与入门培训。", null)}<div class="resource-grid">${data.resourceCollections.map((collection) => resourceCollectionCard(collection)).join("")}</div></section>`);
  }

  function experience() {
    const e = data.experience;
    layout(`${hero({ eyebrow: e.label, title: e.title, lead: e.lead, actions: [{ label: "查看项目目录", href: "#project-directory", primary: true }, { label: "返回项目总览", href: "programs/index.html" }] })}
    <section class="section"><div class="prose">${paragraphs(e.paragraphs)}</div></section>
    <section class="section">${sectionHead("参加对象与安排", "项目对象、学习内容与参与方式。", null)}<div class="detail-grid"><div class="detail-item"><b>面向对象</b><span>${esc(e.audience)}</span></div><div class="detail-item"><b>时间安排</b><span>${esc(e.schedule)}</span></div><div class="detail-item"><b>参与方式</b><span>${esc(e.participation)}</span></div><div class="detail-item"><b>获取入口</b><span>${esc(e.access)}</span></div></div></section>
    <section class="section">${sectionHead("项目如何组成", "每个方向都从一个可以理解和运行的研究任务开始。", null)}<div class="structure-grid">${e.structure.map((item) => `<article class="structure-card"><div class="number">${esc(item.no)}</div><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join("")}</div></section>
    <section class="section">${sectionHead("学习路径", "体验、进阶实践、方向报告与课题组跟学。", null)}<div class="path-rail">${e.path.map((step) => `<div class="path-step"><b>${esc(step.title)}</b><span>${esc(step.text)}</span></div>`).join("")}</div><div class="callout"><b>继续学习</b><p>对某个研究方向感兴趣的同学，可以继续阅读进阶实践、提交方向报告并联系对应课题组；参加 KYDW 培训或活动，请查看团队活动页面。</p></div></section>
    <section class="section"><div class="card-grid">${e.comparison.map((item) => `<article class="card"><div class="card-kicker">PATH COMPARISON</div><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join("")}</div></section>
    <section class="section" id="project-directory">${sectionHead("项目目录", "按周分组展示，每组包含三个方向。", null)}${e.weeks.map((week) => `<section class="week" id="week-${week.id}"><div class="week-head"><div><h3>Week ${week.id} · ${esc(week.title)}</h3><p>${esc(week.note)}</p></div><div>${badges([week.badge])}</div></div><div class="project-grid">${week.projects.map((id) => projectCard(findProject(id))).join("")}</div></section>`).join("")}</section>
    <section class="section"><div class="notice-list"><div class="notice"><b>体验版</b>从一个具体研究任务开始，建立数据、模型与结果的认识。</div><div class="notice"><b>进阶实践</b>01—05 方向提供完整教学 HTML，其余方向会随着材料开放逐步加入。</div><div class="notice"><b>报告与跟学</b>完成体验后，可继续阅读进阶实践、准备方向报告并联系课题组。</div></div></section>`);
  }

  function projectPage() {
    const project = findProject(body.dataset.project);
    if (!project) return layout(hero({ eyebrow: "PROJECT", title: "项目不存在", lead: "请返回本科生科研入门体验项目主页选择方向。", actions: [{ label: "返回项目主页", href: "experience/index.html", primary: true }] }));
    const week = data.experience.weeks.find((item) => item.id === project.week);
    const advanced = project.advanced ? `<a class="solid-btn" href="${rootHref(project.advanced)}">打开进阶教学 HTML →</a>` : `<span class="outline-btn" aria-disabled="true">进阶内容尚未开放</span>`;
    const kaggle = project.kaggle ? `<a class="outline-btn" href="${esc(project.kaggle)}" target="_blank" rel="noreferrer">打开 Kaggle 代码实践 →</a>` : "";
    layout(`${hero({ eyebrow: `WEEK ${project.week} / PROJECT ${project.no}`, title: project.title, lead: project.short, actions: [{ label: "返回体验项目", href: "experience/index.html" }, { label: project.advanced ? "打开进阶内容" : "进阶内容尚未开放", href: project.advanced || "#", primary: !!project.advanced }], note: `${week ? `所属 Week ${week.id} · ${week.title}。` : ""}${project.status}` })}
    <section class="section"><div class="card-grid"><article class="card"><div class="card-kicker">体验项目</div><h2>项目简介</h2><p>${esc(project.experience)}</p><p>${esc(project.summary)}</p><div class="callout"><b>体验版内容</b><p>运行或观察一小段任务，说明输入是什么、处理做了什么、输出如何解释；项目页面会逐步介绍所需概念。</p></div><div class="card-footer"><a class="outline-btn" href="${rootHref("experience/index.html")}">返回项目目录 →</a></div></article><article class="card"><div class="card-kicker">进阶学习</div><h2>进阶实践与报告</h2><p>希望继续这个方向的同学，可以阅读进阶材料，复盘完整流程，再按方向说明准备研究报告。</p><div class="hero-actions">${advanced}${kaggle}</div></article></div></section>
    <section class="section">${sectionHead("这个项目会处理什么", "用输入—输出的方式建立任务心智模型。", null)}<div class="detail-grid"><div class="detail-item"><b>输入数据</b><span>${esc(project.input)}</span></div><div class="detail-item"><b>任务输出</b><span>${esc(project.output)}</span></div><div class="detail-item"><b>准备要求</b><span>${esc(project.prereq)}</span></div><div class="detail-item"><b>设备与运行</b><span>${esc(project.device)}</span></div><div class="detail-item"><b>学习量</b><span>${esc(project.duration)}</span></div><div class="detail-item"><b>开放状态</b><span>${esc(project.status)}</span></div></div></section>`);
  }

  function professional() {
    const p = data.professional;
    layout(`${hero({ eyebrow: p.label, title: p.title, lead: p.lead, actions: [{ label: "查看科研体验", href: "experience/index.html", primary: true }, { label: "查看升学准备", href: "#timeline" }], note: "专业课程、科研起步、升学与就业问题集中整理。" })}
    <section class="section"><div class="prose">${paragraphs(p.intro)}</div></section>
    <section class="section">${sectionHead("专业解读要点", "从课程、科研、升学与就业四个方面认识专业。", null)}<div class="card-grid">${p.takeaways.map((item) => `<article class="card"><div class="card-kicker">${esc(item.title)}</div><p>${esc(item.text)}</p></article>`).join("")}</div></section>
    <section class="section" id="timeline">${sectionHead("按年级安排第一次行动", "按年级整理课程、实践和申请准备。", null)}<div class="timeline">${p.timeline.map((item) => `<div class="timeline-item"><div class="timeline-grade">${esc(item.grade)}</div><div class="timeline-copy"><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></div></div>`).join("")}</div></section>
    <section class="section" id="faq">${sectionHead("常见问题", "点击问题，查看课程、科研、升学、就业与费用方面的整理。", null)}<div class="faq-grid">${p.faq.map((item) => `<details class="fold"><summary>${esc(item.q)}</summary><div class="fold-body"><p>${esc(item.a)}</p></div></details>`).join("")}</div></section>
    <section class="section">${sectionHead("资料中的量化信息", "重要数字按主题折叠展示。", null)}${p.quantifiedNotes.map((item) => `<details class="fold"><summary>${esc(item.title)}</summary><div class="fold-body"><p>${esc(item.text)}</p></div></details>`).join("")}</section>
    <section class="section"><div class="callout"><b>继续阅读</b><p>按年级查看课程、实践和申请准备，或打开常见问题查看升学、就业与费用主题。</p><div class="hero-actions"><a class="solid-btn" href="#timeline">按年级查看</a><a class="outline-btn" href="#faq">查看常见问题</a></div></div></section>`);
  }

  const renderers = { home, team, programs, resources, experience, project: projectPage, professional };
  if (renderers[page]) renderers[page]();
  else home();
})();
