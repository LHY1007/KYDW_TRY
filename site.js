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
  const findProject = (id) => data.projects.find((project) => project.id === id);
  const findModule = (id) => data.modules.find((module) => module.id === id);
  const findTrainingChapter = (id) => (data.training?.chapters || []).find((chapter) => chapter.id === id);
  const findWeek = (id) => data.experience.weeks.find((week) => String(week.id) === String(id));
  // 只有已经登记教学材料的项目进入公开目录；未开放方向保留在数据层，供后续补齐后自动出现。
  const isListedProject = (project) => project && Boolean(project.teaching || project.experienceTeaching) && project.status !== "待定" && project.status !== "待公布" && !/^后续方向/.test(project.title);
  const isWeekOpen = (week) => Boolean(week?.open);
  const isProjectOpen = (project) => isListedProject(project) && isWeekOpen(findWeek(project.week));
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
    return `<footer class="footer"><div class="footer-inner"><div><b>${esc(data.site.name)}（${esc(data.site.short)}）</b><p>${esc(data.site.tagline)}</p></div><div><p>网站公开资料免费阅读，请勿付费购买或用于牟利性修改。</p><p>联系负责人：${esc(data.site.wechat)} · 关注“科研大王”公众号</p></div><div><p><a href="${esc(data.site.repo)}" target="_blank" rel="noreferrer">GitHub 仓库</a> · <a href="${esc(data.site.pages)}" target="_blank" rel="noreferrer">网站主页</a></p></div></div></footer>`;
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
    return `<section class="hero"><div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(title)}</h1>${lead ? `<p class="lead">${esc(lead)}</p>` : ""}${actions.length ? `<div class="hero-actions">${actions.map(actionMarkup).join("")}</div>` : ""}${note ? `<p class="hero-note">${esc(note)}</p>` : ""}</section>`;
  }

  function statGrid(items) {
    return `<div class="stat-grid">${items.map((item) => `<div class="stat"><strong>${esc(item.value)}</strong><span>${esc(item.label)}</span></div>`).join("")}</div>`;
  }

  function metricGrid(items) {
    return `<div class="home-metrics">${(items || []).map((item) => `<div class="home-metric"><strong>${esc(item.value)}</strong><span>${esc(item.label)}</span></div>`).join("")}</div>`;
  }

  function universityCloud(items) {
    return `<div class="university-cloud">${(items || []).map((item) => `<span>${esc(item)}</span>`).join("")}</div>`;
  }

  function isDoctoralDegree(degree) {
    return /phd|博士/i.test(degree || "");
  }

  function universityOrder(team) {
    return new Map((team.destinationUniversityOrder || []).map((name, index) => [name, index]));
  }

  function sortUniversityNames(names, team) {
    const order = universityOrder(team);
    return [...new Set(names)].sort((a, b) => {
      const ar = order.has(a) ? order.get(a) : Number.MAX_SAFE_INTEGER;
      const br = order.has(b) ? order.get(b) : Number.MAX_SAFE_INTEGER;
      return ar - br || a.localeCompare(b, "zh-CN");
    });
  }

  function destinationUniversityNames(team, doctoral = null) {
    const names = (team.destinationRecords || [])
      .filter((item) => doctoral === null || isDoctoralDegree(item.degree) === doctoral)
      .map((item) => item.name);
    return sortUniversityNames(names, team);
  }

  function destinationUniversityCounts(team, doctoral) {
    const counts = new Map();
    for (const item of (team.destinationRecords || [])) {
      if (isDoctoralDegree(item.degree) !== doctoral) continue;
      const count = Number(item.count) || 0;
      counts.set(item.name, (counts.get(item.name) || 0) + count);
    }
    const orderedNames = sortUniversityNames([...counts.keys()], team);
    return orderedNames.map((name) => ({ name, count: counts.get(name) }));
  }

  function destinationUniversityCloud(team, doctoral) {
    return universityCloud(destinationUniversityCounts(team, doctoral).map((item) => `${item.name}*${item.count}`));
  }

  function teamOverviewSummary(team) {
    const memberFact = (team.facts || []).find((item) => item.label === "团队成员");
    const memberCount = memberFact ? `${memberFact.value} 名成员；` : "";
    return `${memberCount}已毕业成员高校按直博、国内学硕/海外研究型硕士分列，另列在校本科生成员高校。`;
  }

  function destinationEntries(team, doctoral) {
    const entries = new Map();
    for (const item of (team.destinationRecords || [])) {
      if (isDoctoralDegree(item.degree) !== doctoral) continue;
      const key = `${item.name}__${item.degree}`;
      const existing = entries.get(key);
      if (existing) existing.count += Number(item.count) || 0;
      else entries.set(key, { name: item.name, degree: item.degree, count: Number(item.count) || 0 });
    }
    const order = universityOrder(team);
    return [...entries.values()].sort((a, b) => {
      const ar = order.has(a.name) ? order.get(a.name) : Number.MAX_SAFE_INTEGER;
      const br = order.has(b.name) ? order.get(b.name) : Number.MAX_SAFE_INTEGER;
      return ar - br || a.name.localeCompare(b.name, "zh-CN") || a.degree.localeCompare(b.degree, "zh-CN");
    });
  }

  function destinationDegreeGroups(team) {
    return [
      { title: "直博", doctoral: true, entries: destinationEntries(team, true) },
      { title: "国内学硕/海外研究型硕士", doctoral: false, entries: destinationEntries(team, false) }
    ];
  }

  function destinationDegreeCards(team) {
    return destinationDegreeGroups(team).map((group) => `<article class="card destination-degree-card"><h2>${esc(group.title)}</h2><ul class="destination-entry-list">${group.entries.map((item) => `<li><b>${esc(item.name)}</b><span>${esc(item.degree)} × ${item.count}</span></li>`).join("")}</ul></article>`).join("");
  }

  function destinationSummary(team) {
    const highlights = destinationUniversityNames(team).slice(0, 5);
    return `已毕业成员去向包括${highlights.join("、")}等高校，分为直博、国内学硕/海外研究型硕士。`;
  }

  function memberNetwork(team) {
    const degreeBlocks = destinationDegreeGroups(team).map((group) => `<div class="destination-degree-block"><h5>${esc(group.title)}</h5>${destinationUniversityCloud(team, group.doctoral)}</div>`).join("");
    return `<div class="member-network"><div class="network-group graduated-network"><h4>已毕业成员高校</h4>${degreeBlocks}</div><div class="network-group undergraduate-network"><h4>在校本科生成员高校</h4>${universityCloud(team.undergraduateNetwork)}</div></div>`;
  }

  function achievementBody(item) {
    const lines = item.lines || [];
    return lines.length
      ? `<ul class="achievement-points">${lines.map((line) => `<li>${esc(line)}</li>`).join("")}</ul>`
      : `<p>${esc(item.text)}</p>`;
  }

  function leaderSlug(leader) {
    return `leader-${String(leader.name || "member").replace(/[^\u4e00-\u9fffA-Za-z0-9]+/g, "-")}`;
  }

  function leaderPreview(leader, linked = false) {
    const preview = leader.preview || "";
    const detailParagraphs = leader.paragraphs || (leader.text ? [leader.text] : []);
    if (linked) return `<a class="leader-fold leader-link${detailParagraphs.length ? "" : " leader-fold-empty"}" href="${rootHref(`team/people.html#${leaderSlug(leader)}`)}"><span class="leader-summary-main"><b>${esc(leader.name)}</b><small>${esc(leader.role)}</small>${preview ? `<em>${esc(preview)}</em>` : ""}</span><span class="leader-toggle">查看详情</span></a>`;
    if (!detailParagraphs.length) return `<div class="leader-fold leader-fold-empty" id="${leaderSlug(leader)}"><span class="leader-summary-main"><b>${esc(leader.name)}</b><small>${esc(leader.role)}</small></span></div>`;
    const detail = `<div class="fold-body">${paragraphs(detailParagraphs)}</div>`;
    return `<details class="leader-fold" id="${leaderSlug(leader)}"><summary><span class="leader-summary-main"><b>${esc(leader.name)}</b><small>${esc(leader.role)}</small>${preview ? `<em>${esc(preview)}</em>` : ""}</span><span class="leader-toggle">查看简介</span></summary>${detail}</details>`;
  }

  function newsMarkup(items) {
    if (!items || !items.length) return "";
    return `<div class="home-news"><h4>团队近期动态</h4><div class="home-news-list">${items.map((item) => `<article class="home-news-item"><time>${esc(item.date)}</time><p>${item.html || esc(item.text || "")}</p></article>`).join("")}</div></div>`;
  }

  function moduleMeta(module) {
    const bits = [];
    if (module.audience) bits.push(`受众：${module.audience}`);
    if (module.date || module.period) bits.push(`时间：${module.date || module.period}`);
    return bits.length ? `<div class="module-meta">${bits.map((item) => `<span>${esc(item)}</span>`).join("")}</div>` : "";
  }

  function homeProjectCard(project) {
    const summary = data.experience.homeProjectSummaries?.[project.id] || project.short;
    return `<a class="home-project-item" href="${rootHref(`experience/${project.id}.html`)}"><span class="project-new">new</span><span class="home-project-copy"><b>${esc(project.title)}</b><span>${esc(summary)}</span></span></a>`;
  }

  function quickLinksMarkup(items, label = "快捷入口", compact = false) {
    if (!items || !items.length) return "";
    const links = items.map((item) => {
      const locked = Boolean(item.locked);
      const inner = `<span class="quick-link-copy"><b>${esc(item.label)}</b>${item.caption ? `<span>${esc(item.caption)}</span>` : ""}</span>${locked ? `<span class="quick-link-lock" aria-hidden="true">锁定</span>` : ""}`;
      if (locked) return `<span class="quick-link is-locked" aria-disabled="true" title="暂未开放">${inner}</span>`;
      return `<a class="quick-link" href="${rootHref(item.href)}">${inner}</a>`;
    }).join("");
    return `<div class="quick-links${compact ? " is-compact" : ""}"><div class="quick-links-head">${esc(label)}</div><div class="quick-link-grid">${links}</div></div>`;
  }

  function experienceQuickLinks() {
    return data.experience.weeks.map((week) => ({
      label: `Week ${week.id}`,
      caption: isWeekOpen(week) ? "已开放" : "等待项目中段开放",
      href: `experience/week-${String(week.id).padStart(2, "0")}.html`,
      locked: !isWeekOpen(week)
    }));
  }

  function moduleQuickLinks(module, compact = false, label = "快捷入口") {
    const derived = (module.id === "sdu" || module.id === "fudan") && module.lessons?.length
      ? module.lessons.map((lesson) => ({
        label: lesson.title,
        caption: module.id === "sdu" ? "Kaggle 实践" : "已完成",
        href: lesson.href || `programs/fudan.html#${lesson.id}`,
        locked: Boolean(lesson.locked)
      }))
      : module.quickLinks;
    return quickLinksMarkup(derived, label, compact);
  }

  function teachingLibraryItems() {
    const projectItems = (data.projects || [])
      .filter((project) => {
        const hasTeaching = Boolean(project.teaching || project.experienceTeaching);
        const listed = project.status !== "待定" && project.status !== "待公布" && !/^后续方向/.test(project.title || "");
        return hasTeaching && listed && (project.week == null || isProjectOpen(project));
      })
      .sort((a, b) => (a.week || 99) - (b.week || 99) || String(a.no || "").localeCompare(String(b.no || "")))
      .map((project) => ({
        title: project.title,
        text: project.short || project.summary || "",
        href: project.experienceTeaching || project.teaching,
        kind: "book"
      }));
    const extraItems = (data.resourceCollections || [])
      .find((collection) => collection.id === "teaching-library")?.items || [];
    return [...projectItems, ...extraItems];
  }

  function moduleLessons(module) {
    if (!module.lessons || !module.lessons.length) return "";
    const lessonCard = (lesson) => {
      const links = [
        lesson.href ? `<a class="outline-btn" href="${rootHref(lesson.href)}">查看课程页面</a>` : "",
        lesson.kaggle ? `<a class="outline-btn" href="${esc(lesson.kaggle)}" target="_blank" rel="noreferrer">进入 Kaggle 实践</a>` : ""
      ].join("");
      return `<article class="card module-lesson" id="${esc(lesson.id)}"><h3>${lesson.href ? `<a href="${rootHref(lesson.href)}">${esc(lesson.title)}</a>` : esc(lesson.title)}</h3><p>${esc(lesson.text)}</p>${moduleMeta({ audience: lesson.audience || module.audience, date: lesson.date || module.date })}${links ? `<div class="card-footer">${links}</div>` : ""}</article>`;
    };
    return `<section class="section" id="module-lessons">${sectionHead("授课内容", null, null)}<div class="module-lesson-list">${module.lessons.map(lessonCard).join("")}</div></section>`;
  }

  function experienceActivityCard() {
    const e = data.experience;
    return `<article class="card activity-card activity-card-featured" id="experience"><div class="activity-order" aria-hidden="true"></div><div class="card-kicker"><span class="project-new">new</span></div><h3>${esc(e.title)}</h3><p><b>${esc(e.lead)}</b></p><p>${esc(e.date)}</p>${quickLinksMarkup(experienceQuickLinks(), "快捷入口")}<div class="card-footer"><a class="outline-btn" href="${rootHref("experience/index.html")}">查看详情</a></div></article>`;
  }

  function sectionHead(title, text, href, label) {
    const linkLabel = label || "查看详情";
    return `<div class="section-head"><div><h2>${esc(title)}</h2>${text ? `<p>${esc(text)}</p>` : ""}</div>${href ? `<a class="section-link" href="${rootHref(href)}">${esc(linkLabel)}${linkLabel === "查看详情" ? "" : " →"}</a>` : ""}</div>`;
  }

  function resourceCollectionCard(collection, homeOnly = false) {
    const sourceItems = collection.id === "teaching-library" ? teachingLibraryItems() : (collection.items || []);
    const visibleItems = homeOnly ? [] : sourceItems;
    const items = visibleItems.map((item) => `<li class="${item.kind === "book" ? "book-item" : ""}"><b>${esc(item.title)}</b><span>${esc(item.text)}</span><a href="${rootHref(item.href)}">${item.kind === "book" ? "打开文档 →" : "查看详情"}</a></li>`).join("");
    return `<article class="card resource-card" id="${esc(collection.id)}"><h3>${esc(collection.title)}</h3><p><b>${esc(collection.subtitle)}</b></p><p>${esc(collection.text)}</p>${items ? `<ul class="resource-items ${collection.id === "teaching-library" ? "book-list" : ""}">${items}</ul>` : ""}<div class="card-footer"><a class="outline-btn" href="${rootHref(collection.href)}">进入合集 →</a></div></article>`;
  }

  function showcaseItem(module) {
    return `<article class="showcase-item"><h3>${esc(module.title)}</h3><p><b>${esc(module.subtitle)}</b></p><p>${esc(module.text)}</p>${moduleMeta(module)}${moduleQuickLinks(module, true)}<a href="${rootHref(module.href)}">查看详情</a></article>`;
  }

  function moduleCard(module) {
    return `<article class="card activity-card" id="${esc(module.id)}"><div class="activity-order" aria-hidden="true"></div><h3>${esc(module.title)}</h3><p><b>${esc(module.subtitle)}</b></p><p>${esc(module.text)}</p>${moduleMeta(module)}${moduleQuickLinks(module)}<div class="card-footer"><a class="outline-btn" href="${rootHref(module.href)}">查看详情</a></div></article>`;
  }

  function trainingChapterCard(chapter, index) {
    if (chapter.locked) return `<article class="card training-chapter-card is-locked"><div class="chapter-number">${String(index + 1).padStart(2, "0")}</div><h3>${esc(chapter.title)}</h3><p>${esc(chapter.lead)}</p><div class="card-footer"><span class="outline-btn is-disabled" aria-disabled="true">等待后续开放</span></div></article>`;
    return `<article class="card training-chapter-card"><div class="chapter-number">${String(index + 1).padStart(2, "0")}</div><h3>${esc(chapter.title)}</h3><p>${esc(chapter.lead)}</p><div class="card-footer"><a class="outline-btn" href="${rootHref(`programs/training/${chapter.id}.html`)}">进入章节</a></div></article>`;
  }

  function weekCard(week) {
    const projects = week.projects.map(findProject).filter(isListedProject);
    if (!projects.length) return "";
    const locked = !isWeekOpen(week);
    return `<article class="card week-card${locked ? " is-locked" : ""}"><div class="card-kicker">Week ${esc(week.id)}</div><h3>Week ${esc(week.id)}</h3><p>${esc(week.note)}</p><div class="week-project-list">${projects.map((project) => `<span><b>${esc(project.no)}</b>${esc(project.title)}</span>`).join("")}</div><div class="card-footer"><span class="muted small">${locked ? "等待项目中段开放" : `${projects.length} 个项目`}</span>${locked ? `<span class="outline-btn is-disabled" aria-disabled="true">暂未开放</span>` : `<a class="outline-btn" href="${rootHref(`experience/week-${String(week.id).padStart(2, "0")}.html`)}">查看详情</a>`}</div></article>`;
  }

  function projectMode(project, advanced = false) {
    if (advanced && !project.single) {
      return `<article class="project-mode advanced-mode is-locked"><div class="mode-kicker">进阶项目</div><p>等待项目中段开放。</p><span class="quick-link-lock">锁定</span></article>`;
    }
    const title = project.single ? "项目" : "体验项目";
    return `<article class="project-mode"><div class="mode-kicker">${title}</div><p>${esc(project.experience || project.short)}</p></article>`;
  }

  function weekProjectPanel(project) {
    const modes = [projectMode(project, false)];
    if (project.advanced && !project.single) modes.push(projectMode(project, true));
    return `<article class="card week-project-panel"><div class="week-project-title"><div><span class="project-no">${esc(project.no)}</span><h3>${esc(project.title)}</h3></div></div><p class="project-short">${esc(project.short)}</p><div class="project-split">${modes.join("")}</div><div class="card-footer"><a class="solid-btn" href="${rootHref(`experience/${project.id}.html`)}">查看项目详情</a></div></article>`;
  }

  function home() {
    const t = data.team;
    const e = data.experience;
    const homeProjects = (e.homeProjectIds || []).map(findProject).filter(Boolean);
    const otherModules = sortedModules();
    const resourceCards = sortedResources().filter((collection) => collection.home !== false);
    layout(`${hero({
      eyebrow: "KYDW / 科研大王",
      title: "科研大王 KYDW",
      lead: t.lead,
      actions: [{ label: "团队介绍", href: "team/index.html", primary: true }, { label: "项目与活动", href: "programs/index.html" }, { label: "资源中心", href: "resources/index.html" }]
    })}
    <section class="section" id="team-overview">${sectionHead("团队概况", teamOverviewSummary(t), "team/index.html", "完整团队介绍")}
      <div class="home-intro-grid"><div class="home-overview-left"><article class="card home-team-copy"><h3>连接不同学校、专业与课题组</h3>${paragraphs(t.paragraphs.slice(0, 2))}<div class="card-footer"><span class="muted small">医学 · 工程 · 计算机 · 人工智能 · 生物信息学</span><a href="${rootHref("team/index.html")}">进入团队介绍 →</a></div></article><article class="card home-leaders-card"><div class="card-kicker">负责人</div><div class="leader-list home-leader-scroll" role="region" aria-label="负责人列表" tabindex="0">${t.leaders.map((leader) => leaderPreview(leader, true)).join("")}</div><div class="card-footer"><a class="outline-btn" href="${rootHref("team/people.html")}">查看详细介绍</a></div></article></div><div class="home-overview-side"><article class="card home-results-card"><div class="card-kicker">代表性成果（成员一作/项目负责人）</div>${metricGrid(t.achievementMetrics)}${newsMarkup(t.news)}</article><article class="card university-card"><div class="card-kicker">成员高校</div>${memberNetwork(t)}</article></div></div>
    </section>
    <section class="section" id="featured-projects">${sectionHead("项目与活动", "本科生科研入门体验项目、科研培训、合作项目和专题交流。", "programs/index.html", "查看全部项目与活动")}
      <div class="showcase-grid"><article class="card featured-showcase"><div class="card-kicker">当前项目</div><h3>${esc(e.title)}</h3><p><b>${esc(e.lead)}</b></p><p>${esc(e.date)}</p><div class="home-project-list">${homeProjects.map(homeProjectCard).join("")}</div>${quickLinksMarkup(experienceQuickLinks(), "快捷入口")}<div class="card-footer"><a class="solid-btn" href="${rootHref("experience/index.html")}">查看详情</a></div></article><aside class="showcase-side" aria-label="其他活动与项目"><div class="showcase-side-head"><h3>其他项目与活动</h3><p>科研入门培训、课程项目、合作课程和生物医学人工智能专题交流。</p></div><div class="showcase-scroll">${otherModules.map(showcaseItem).join("")}</div></aside></div>
    </section>
    <section class="section">${sectionHead("资源中心", "专业解读、项目与活动资料、教学文档库。", "resources/index.html", "进入资源中心")}
      <div class="resource-grid">${resourceCards.map((collection) => resourceCollectionCard(collection, true)).join("")}</div>
    </section>`);
  }

  function team() {
    const t = data.team;
    layout(`${hero({ eyebrow: t.label, title: "团队介绍", lead: t.lead, actions: [{ label: "查看项目与活动", href: "programs/index.html", primary: true }, { label: "进入资源中心", href: "resources/index.html" }] })}
    <section class="section"><div class="prose">${paragraphs(t.paragraphs)}</div></section>
    <section class="section">${sectionHead("团队概况", teamOverviewSummary(t), null)}${statGrid(t.facts)}<div class="card university-card team-universities"><div class="card-kicker">成员高校</div>${memberNetwork(t)}</div></section>
    <section class="section">${sectionHead("团队工作方式", null, null)}<div class="three-grid"><article class="card"><h3>连接不同学校与方向</h3><p>成员来自不同学校、专业和课题组，交流医学、工程、计算机、人工智能与生物信息学等方向。</p></article><article class="card"><h3>从研究任务进入方法</h3><p>项目、培训和专题合作都从具体任务出发，讨论数据、方法、结果和研究表达。</p></article><article class="card"><h3>资源共享 · 合作共赢</h3><p>多学科线上合作交流平台，经验分享、共享信息、公开资源。</p></article></div></section>
    <section class="section">${sectionHead("代表性成果（成员一作/项目负责人）", null, "team/achievements.html", "查看完整成果")}<div class="achievement-list">${t.achievements.map((item) => `<details class="fold"><summary>${esc(item.title)}</summary><div class="fold-body">${achievementBody(item)}</div></details>`).join("")}</div></section>
    <section class="section"><div class="card-grid"><article class="card"><h2>升学去向</h2><p class="muted">${destinationSummary(t)}</p><div class="hero-actions"><a class="outline-btn" href="${rootHref("team/destinations.html")}">查看成员去向</a></div></article><article class="card"><h2>团队活动</h2><p class="muted">复旦大学秋季学期本科生践悟课程、2501 期联合项目和生物医学人工智能专题交流，分别提供课程、合作与讨论内容。</p><div class="hero-actions"><a class="outline-btn" href="${rootHref("team/activities.html")}">查看活动体系</a></div></article></div></section>
    <section class="section">${sectionHead("负责人和历届骨干", "伍东辰、姜逸轩、汤昊天、吴熙东、刘涵瑜。", "team/people.html", "查看成员介绍")}<div class="leader-list">${t.leaders.map(leaderPreview).join("")}</div></section>
    <section class="section"><div class="callout"><b>联系 KYDW</b><p>关注“科研大王”公众号，或添加负责人微信 <b>${esc(data.site.wechat)}</b> 了解团队活动和项目入口。</p></div><p class="small muted">网站公开资料免费阅读，请勿用于牟利性销售。</p></section>`);
  }

  function teamSection() {
    const section = body.dataset.teamSection || "achievements";
    const t = data.team;
    const configs = {
      achievements: { eyebrow: "团队介绍 / 成果", title: "代表性成果（成员一作/项目负责人）", lead: "", back: "team/index.html" },
      destinations: { eyebrow: "团队介绍 / 成员发展", title: "成员升学去向", lead: "已毕业成员去向包括直博、国内学硕/海外研究型硕士。", back: "team/index.html" },
      activities: { eyebrow: "团队介绍 / 活动", title: "团队活动体系", lead: "科研入门培训、跨校项目、复旦大学秋季学期本科生践悟课程和生物医学人工智能专题交流。", back: "team/index.html" },
      people: { eyebrow: "团队介绍 / 成员", title: "负责人和历届骨干", lead: "伍东辰、姜逸轩、汤昊天、吴熙东、刘涵瑜。", back: "team/index.html" }
    };
    const cfg = configs[section] || configs.achievements;
    let inner = hero({ eyebrow: cfg.eyebrow, title: cfg.title, lead: cfg.lead, actions: [{ label: "返回团队介绍", href: cfg.back, primary: true }, { label: "项目与活动", href: "programs/index.html" }] });
    if (section === "achievements") inner += `<section class="section"><div class="achievement-list">${t.achievements.map((item) => `<article class="achievement"><b>${esc(item.title)}</b><div>${achievementBody(item)}</div></article>`).join("")}</div></section>`;
    if (section === "destinations") inner += `<section class="section">${sectionHead("已毕业成员去向", null, null)}<div class="destination-degree-sections">${destinationDegreeCards(t)}</div><p class="small muted">${esc(t.destinationNote)}</p><div class="card university-card section-card"><div class="card-kicker">在校本科生成员高校</div>${universityCloud(t.undergraduateNetwork)}</div></section>`;
    if (section === "activities") inner += `<section class="section">${sectionHead("活动目录", null, "programs/index.html", "查看项目与活动")}
      <div class="activity-timeline">${sortedModules().map((module) => `<article class="activity-row"><div><h3>${esc(module.title)}</h3><p>${esc(module.text)}</p></div><a class="outline-btn" href="${rootHref(module.href)}">查看详情</a></article>`).join("")}</div><div class="card section-card"><ul>${t.activities.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div></section>`;
    if (section === "people") inner += `<section class="section">${sectionHead("成员介绍", null, null)}<div class="leader-list">${t.leaders.map(leaderPreview).join("")}</div></section>`;
    layout(inner);
  }

  function programs() {
    layout(`${hero({ eyebrow: "项目与活动", title: "项目与活动", lead: "KYDW 的培训、合作项目、科研体验和专题交流。", actions: [{ label: "进入科研体验项目", href: "experience/index.html", primary: true }, { label: "进入资源中心", href: "resources/index.html" }] })}
    <section class="section">${sectionHead("项目与活动", "科研体验、科研培训、课程项目与专题交流，分别进入对应项目页。", null)}<div class="activity-timeline">${experienceActivityCard()}${sortedModules().map(moduleCard).join("")}</div></section>`);
  }

  function modulePage() {
    const module = findModule(body.dataset.module);
    if (!module) return layout(hero({ eyebrow: "项目与活动", title: "活动不存在", lead: "请返回项目与活动目录选择内容。", actions: [{ label: "返回项目与活动", href: "programs/index.html", primary: true }] }));
    if (module.id === "training") return trainingOverview();
    const quickLinks = moduleQuickLinks(module, false, "授课目录");
    layout(`${hero({ eyebrow: module.id === "sdu" ? "项目与活动 / 历史项目" : "项目与活动", title: module.title, lead: module.subtitle, actions: [{ label: "返回项目与活动", href: "programs/index.html", primary: true }, { label: "进入资源中心", href: "resources/index.html" }] })}
    <section class="section"><div class="prose"><p>${esc(module.text)}</p>${moduleMeta(module)}</div>${quickLinks}</section>
    ${moduleLessons(module)}`);
  }

  function sduLessonPage() {
    const module = findModule("sdu");
    const lesson = (module?.lessons || []).find((item) => item.id === body.dataset.lesson);
    if (!module || !lesson) return layout(hero({ eyebrow: "项目与活动 / 山东大学本科生暑期名校课程-神经影像学与人工智能", title: "课程页面不存在", lead: "请返回山东大学本科生暑期名校课程-神经影像学与人工智能选择实践项目。", actions: [{ label: "返回山东大学本科生暑期名校课程-神经影像学与人工智能", href: "programs/sdu.html", primary: true }] }));
    layout(`${hero({ eyebrow: "山东大学本科生暑期名校课程-神经影像学与人工智能 / Kaggle 实践", title: lesson.title, lead: "Kaggle 代码实践", actions: [{ label: "返回山东大学本科生暑期名校课程-神经影像学与人工智能", href: "programs/sdu.html", primary: true }, { label: "返回项目与活动", href: "programs/index.html" }] })}
    <section class="section"><div class="prose"><p>${esc(lesson.text)}</p>${moduleMeta({ audience: lesson.audience || module.audience, date: lesson.date || module.date })}</div></section>
    <section class="section"><div class="card feature-callout"><h2>实践入口</h2><p>在 Kaggle 中打开对应 Notebook，按照页面中的代码和说明完成实践。</p><div class="card-footer"><a class="solid-btn" href="${esc(lesson.kaggle)}" target="_blank" rel="noreferrer">进入 Kaggle 实践</a></div></div></section>`);
  }

  function trainingOverview() {
    const t = data.training;
    const trainingModule = findModule("training");
    layout(`${hero({ eyebrow: "项目与活动 / 科研入门培训", title: t.title, lead: t.lead, actions: [{ label: "查看培训章节", href: "#training-chapters", primary: true }, { label: "返回项目与活动", href: "programs/index.html" }] })}
    <section class="section"><div class="prose">${paragraphs(t.paragraphs)}${moduleMeta(trainingModule)}</div>${moduleQuickLinks(trainingModule, false, "快捷入口")}</section>
    <section class="section" id="training-chapters">${sectionHead("培训章节", "从基础知识开始，逐步进入人工智能、科研实践与实战项目。", "programs/training/path.html", "查看培训路径")}<div class="training-chapter-grid">${t.chapters.map(trainingChapterCard).join("")}</div></section>
    <section class="section"><div class="card feature-callout"><h2>${esc(t.plan.title)}</h2><p>${esc(t.plan.lead)}</p><div class="card-footer"><a class="solid-btn" href="${rootHref("programs/training/path.html")}">查看培训路径 →</a></div></div></section>`);
  }

  function trainingModulePage() {
    const chapter = findTrainingChapter(body.dataset.trainingChapter);
    if (!chapter) return layout(hero({ eyebrow: "科研入门培训", title: "培训章节不存在", lead: "请返回科研入门培训主页选择章节。", actions: [{ label: "返回培训主页", href: "programs/training.html", primary: true }] }));
    if (chapter.locked) return layout(hero({ eyebrow: "科研入门培训", title: chapter.title, lead: "该章节正在整理，等待后续开放。", actions: [{ label: "返回培训主页", href: "programs/training.html", primary: true }] }));
    layout(`${hero({ eyebrow: `科研入门培训 / ${chapter.title}`, title: chapter.title, lead: chapter.lead, actions: [{ label: "返回培训主页", href: "programs/training.html", primary: true }, { label: "查看培训路径", href: "programs/training/path.html" }] })}
    <section class="section">${sectionHead("本章内容", null, null)}<div class="training-topic-grid">${chapter.topics.map((topic) => `<article class="card training-topic-card"><h3>${esc(topic.title)}</h3><p>${esc(topic.text)}</p></article>`).join("")}</div></section>`);
  }

  function trainingPlanPage() {
    const t = data.training;
    layout(`${hero({ eyebrow: "科研入门培训 / 培训路径", title: t.plan.title, lead: t.plan.lead, actions: [{ label: "返回培训主页", href: "programs/training.html", primary: true }, { label: "查看项目与活动", href: "programs/index.html" }] })}
    <section class="section"><div class="training-path-grid">${t.plan.parts.map((part, index) => `<article class="card training-path-card"><div class="chapter-number">${String(index + 1).padStart(2, "0")}</div><h2>${esc(part.title)}</h2><p>${esc(part.text)}</p></article>`).join("")}</div><div class="callout"><p>${esc(t.plan.note)}</p></div></section>`);
  }

  function resources() {
    layout(`${hero({ eyebrow: "资源中心", title: "资源中心", lead: "专业解读、项目与活动资料、教学文档库。", actions: [{ label: "浏览资源合集", href: "#resource-directory", primary: true }, { label: "查看项目与活动", href: "programs/index.html" }] })}
    <section class="section" id="resource-directory">${sectionHead("资源合集", null, null)}<div class="resource-grid">${sortedResources().map((collection) => resourceCollectionCard(collection)).join("")}</div></section>`);
  }

  function projectDirectoryCard(project) {
    const open = isProjectOpen(project);
    const status = open ? "已开放" : `等待 Week ${project.week} 开放`;
    return `<article class="card directory-project-card${open ? "" : " is-locked"}"><div class="card-kicker">Week ${esc(project.week)}</div><h3>${esc(project.title)}</h3><p>${esc(project.short)}</p><div class="project-directory-meta"><span>受众：${esc(project.audience || project.prereq || "本科生")}</span><span>时间：${esc(project.date || "项目开放期")}</span></div><div class="card-footer">${open ? `<a class="outline-btn" href="${rootHref(`experience/${project.id}.html`)}">查看项目详情</a>` : `<span class="outline-btn is-disabled" aria-disabled="true">${esc(status)}</span>`}</div></article>`;
  }

  function experience() {
    const e = data.experience;
    const directoryProjects = [...(data.projects || [])]
      .filter(isListedProject)
      .sort((a, b) => (a.week || 99) - (b.week || 99) || String(a.no || "").localeCompare(String(b.no || "")));
    layout(`${hero({ eyebrow: e.label, title: e.title, lead: e.lead, actions: [{ label: "查看项目目录", href: "#project-directory", primary: true }, { label: "返回项目与活动", href: "programs/index.html" }], note: e.date })}
    <section class="section"><div class="prose">${paragraphs(e.paragraphs)}</div></section>
    <section class="section">${sectionHead("项目构成", null, null)}<div class="structure-grid">${e.structure.map((item) => `<article class="structure-card"><span class="number">${esc(item.no)}</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join("")}</div></section>
    <section class="section" id="project-directory">${sectionHead("项目目录", "目录按已登记项目展示，并标注所属 Week；尚未开放的项目保留锁定状态。", null)}<div class="directory-project-grid">${directoryProjects.map(projectDirectoryCard).join("")}</div></section>
    <section class="section"><div class="callout"><b>参与方式</b><p>${esc(e.participation)}学习后无需提交报告；如对某个方向产生兴趣，可以联系负责人开展进阶项目。</p><p>${esc(e.access)}</p></div></section>`);
  }

  function weekPage() {
    const week = findWeek(body.dataset.week);
    if (!week) return layout(hero({ eyebrow: "科研体验项目", title: "周页面不存在", lead: "请返回科研体验项目主页选择项目周次。", actions: [{ label: "返回项目主页", href: "experience/index.html", primary: true }] }));
    if (!isWeekOpen(week)) return layout(`${hero({ eyebrow: "科研体验项目", title: `Week ${week.id}`, lead: "该周项目等待项目中段开放。", actions: [{ label: "返回项目目录", href: "experience/index.html", primary: true }, { label: "项目与活动", href: "programs/index.html" }] })}<section class="section"><div class="card feature-callout"><p>本周内容正在整理，开放后将从项目名称进入对应的教学项目、实践项目和参考答案。</p></div></section>`);
    const projects = week.projects.map(findProject).filter(isListedProject);
    if (!projects.length) return layout(hero({ eyebrow: `科研体验项目 / Week ${week.id}`, title: `Week ${week.id}`, lead: "本周项目尚未开放。", actions: [{ label: "返回项目目录", href: "experience/index.html", primary: true }, { label: "项目与活动", href: "programs/index.html" }] }));
    layout(`${hero({ eyebrow: `科研体验项目 / Week ${week.id}`, title: `Week ${week.id}`, lead: week.note, actions: [{ label: "返回项目目录", href: "experience/index.html", primary: true }, { label: "项目与活动", href: "programs/index.html" }], note: `${projects.length} 个项目` })}
    <section class="section">${sectionHead(`Week ${week.id}`, null, null)}<div class="week-projects">${projects.map(weekProjectPanel).join("")}</div></section>`);
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
    const firstTeaching = project.teaching || project.experienceTeaching;
    if (!firstTeaching || !isProjectOpen(project)) return layout(hero({ eyebrow: `科研体验项目 / Week ${project.week}`, title: project.title, lead: `该项目等待 Week ${project.week} 开放。`, actions: [{ label: "返回项目目录", href: "experience/index.html", primary: true }, { label: "返回项目与活动", href: "programs/index.html" }] }));
    const answerHref = project.answer || project.referenceAnswer;
    const practiceHref = project.kaggle || project.practice;
    const singleTeaching = project.single ? (project.teaching || project.advanced) : null;
    const singlePractice = project.single ? practiceHref : null;
    const singleAnswer = project.single ? answerHref : null;
    const experienceTeaching = project.experienceTeaching || null;
    const experiencePractice = project.experiencePractice || null;
    const experienceAnswer = project.experienceAnswer || null;
    const advancedTeaching = project.single ? null : project.advanced;
    const advancedPractice = project.advancedPractice || null;
    const advancedAnswer = project.advancedAnswer || null;
    const tier = (title, text, teachingHref, practiceLink, answerLink) => `<article class="project-tier"><div class="mode-kicker">${esc(title)}</div>${text ? `<p class="project-tier-text">${esc(text)}</p>` : ""}<div class="material-grid">${materialCard("教学项目", "教学", "", teachingHref)}${materialCard("实践项目", "实践", "", practiceLink, /^https?:/i.test(practiceLink || ""))}${materialCard("参考答案", "答案", "", answerLink)}</div></article>`;
    const lockedAdvancedTier = `<article class="project-tier is-locked"><div class="mode-kicker">进阶项目</div><p class="project-tier-text">等待项目中段开放。</p><span class="quick-link-lock">锁定</span></article>`;
    const projectContent = project.single
      ? tier("项目", project.tierText || "", singleTeaching, singlePractice, singleAnswer)
      : `<div class="project-tier-grid">${tier("体验项目", project.tierText || "", experienceTeaching, experiencePractice, experienceAnswer)}${lockedAdvancedTier}</div>`;
    layout(`${hero({ eyebrow: `科研体验项目 / Week ${project.week} / 项目 ${project.no}`, title: project.title, lead: project.short, actions: [{ label: "返回所属 Week", href: `experience/week-${String(project.week).padStart(2, "0")}.html`, primary: true }, { label: "返回项目与活动", href: "programs/index.html" }] })}
    <section class="section"><div class="project-page-meta"><span>受众：${esc(project.audience || project.prereq || "本科生")}</span><span>时间：${esc(project.date || "项目开放期")}</span></div></section>
    <section class="section">${sectionHead("项目材料", null, null)}${projectContent}</section>`);
  }

  function professional() {
    const p = data.professional;
    layout(`${hero({ eyebrow: "资源中心 / 专业解读", title: "生物医学工程专业解读", lead: p.lead, actions: [{ label: "返回资源中心", href: "resources/index.html", primary: true }, { label: "查看专业答疑", href: "professional/faq.html" }] })}
    <section class="section"><div class="prose">${paragraphs(p.intro)}</div></section>
    <section class="section"><div class="long-prose">${p.sections.map((item) => `<article class="prose-section"><h2>${esc(item.title)}</h2>${paragraphs(item.paragraphs)}</article>`).join("")}</div></section>`);
  }

  function professionalFaq() {
    const p = data.professional;
    const groups = ["专业本身", "升学与职业"].map((title) => ({ title, items: p.faq.filter((item) => item.group === title) }));
    const faqColumn = (group) => `<article class="faq-column"><h2>${esc(group.title)}</h2><div class="faq-stack">${group.items.map((item) => `<details class="fold"><summary>${esc(item.q)}</summary><div class="fold-body"><p>${esc(item.a)}</p></div></details>`).join("")}</div></article>`;
    layout(`${hero({ eyebrow: "专业解读 / 答疑", title: "生物医学工程专业答疑", lead: "左侧介绍专业本身，右侧整理升学与职业问题。", actions: [{ label: "返回专业解读", href: "professional/index.html", primary: true }, { label: "返回资源中心", href: "resources/index.html" }] })}
    <section class="section"><div class="faq-columns">${groups.map(faqColumn).join("")}</div></section>`);
  }

  const renderers = { home, team, "team-section": teamSection, programs, module: modulePage, "sdu-lesson": sduLessonPage, "training-module": trainingModulePage, "training-plan": trainingPlanPage, resources, experience, "experience-week": weekPage, project: projectPage, professional, "professional-faq": professionalFaq };
  if (renderers[page]) renderers[page]();
  else home();
})();
