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
  const LOCKED_WEEK_IDS = new Set(["2", "3", "4", "5"]);
  const ANSWER_LABEL = "实践项目参考答案";
  const publicCopy = (value) => {
    const text = String(value ?? "");
    return text.includes(ANSWER_LABEL) ? text : text.replaceAll("参考答案", ANSWER_LABEL);
  };
  const isAdvancedPath = (href) => /(^|\/)advanced(?:[-/]|$)/i.test(String(href || ""));
  const isAdvancedOpen = () => false;
  // 只有已经登记教学材料的项目进入公开目录；未开放方向保留在数据层，供后续补齐后自动出现。
  const isListedProject = (project) => project && Boolean(project.teaching || project.experienceTeaching) && project.status !== "待定" && project.status !== "待公布" && !/^后续方向/.test(project.title);
  const isWeekOpen = (week) => Boolean(week?.open) && !LOCKED_WEEK_IDS.has(String(week.id));
  const isProjectOpen = (project) => isListedProject(project) && project.status !== "尚未开放" && isWeekOpen(findWeek(project.week));
  const sortedModules = () => [...data.modules].sort((a, b) => (a.order || 99) - (b.order || 99));
  const sortedResources = () => [...data.resourceCollections].sort((a, b) => (a.homeOrder || 99) - (b.homeOrder || 99));

  function actionMarkup(action) {
    if (action.disabled || (isAdvancedPath(action.href) && !isAdvancedOpen())) return `<span class="outline-btn is-disabled" aria-disabled="true">${esc(action.label)}（尚未开放）</span>`;
    const href = action.external ? esc(action.href) : rootHref(action.href);
    const attrs = action.external ? ' target="_blank" rel="noreferrer"' : action.download ? " download" : "";
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
    if (location.hash) setTimeout(focusHashTarget, 80);
  }

  function focusHashTarget() {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const target = document.getElementById(id);
    if (!target) return;
    if (target.tagName === "DETAILS") target.open = true;
    target.scrollIntoView({ block: "start" });
  }

  window.addEventListener("hashchange", () => setTimeout(focusHashTarget, 0));

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
    const degreeBlocks = destinationDegreeGroups(team).map((group) => `<div class="network-group graduated-degree-group"><h4>已毕业成员高校 · ${esc(group.title)}</h4>${destinationUniversityCloud(team, group.doctoral)}</div>`).join("");
    const notes = (team.undergraduateNotes || []).map((item) => `<p class="network-note"><b>${esc(item.name)}：</b>${esc(item.text)}</p>`).join("");
    return `<div class="member-network member-network-three">${degreeBlocks}<div class="network-group undergraduate-network"><h4>在校本科生成员高校</h4>${universityCloud(team.undergraduateNetwork)}${notes}</div></div>`;
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
    if (linked) return `<a class="leader-fold leader-link${detailParagraphs.length ? "" : " leader-fold-empty"}" href="${rootHref(`team/people.html#${leaderSlug(leader)}`)}"><span class="leader-summary-main"><b>${esc(leader.name)}</b><small>${esc(leader.role)}</small>${preview ? `<em>${esc(preview)}</em>` : ""}</span></a>`;
    if (!detailParagraphs.length) return `<div class="leader-fold leader-fold-empty" id="${leaderSlug(leader)}"><span class="leader-summary-main"><b>${esc(leader.name)}</b><small>${esc(leader.role)}</small></span></div>`;
    const detail = `<div class="fold-body">${paragraphs(detailParagraphs)}</div>`;
    return `<details class="leader-fold" id="${leaderSlug(leader)}"><summary><span class="leader-summary-main"><b>${esc(leader.name)}</b><small>${esc(leader.role)}</small>${preview ? `<em>${esc(preview)}</em>` : ""}</span><span class="leader-toggle">查看简介</span></summary>${detail}</details>`;
  }

  function newsItemsMarkup(items) {
    return items.map((item) => `<article class="home-news-item"><time>${esc(item.date)}</time><p>${item.html || esc(item.text || "")}</p></article>`).join("");
  }

  function newsMarkup(items) {
    if (!items || !items.length) return "";
    return `<div class="home-news"><h4>团队近期动态</h4><div class="home-news-list">${newsItemsMarkup(items)}</div></div>`;
  }

  function moduleMeta(module) {
    const bits = [];
    if (module.audience) bits.push(`受众：${module.audience}`);
    if (module.date || module.period) bits.push(`时间：${module.date || module.period}`);
    return bits.length ? `<div class="module-meta">${bits.map((item) => `<span>${esc(item)}</span>`).join("")}</div>` : "";
  }

  function homeProjectCard(project) {
    const summary = data.experience.homeProjectSummaries?.[project.id] || project.short;
    const open = isProjectOpen(project);
    const content = `<span class="project-new">new</span><span class="home-project-copy"><b>${esc(project.title)}</b><span>${esc(summary)}</span></span>`;
    if (!open) return `<div class="home-project-item is-locked" aria-disabled="true" title="暂未开放">${content}<span class="quick-link-lock">等待 Week ${esc(project.week)} 开放</span></div>`;
    return `<a class="home-project-item" href="${rootHref(`experience/${project.id}.html`)}">${content}</a>`;
  }

  function environmentProjectCard(environment, directory = false) {
    if (!environment) return "";
    if (directory) return `<article class="card directory-project-card environment-directory-card"><div class="card-kicker"><span class="project-required">必看</span></div><h3>${esc(environment.title)}</h3><p>${esc(environment.short)}</p><div class="project-directory-meta"><span>项目实践前的基础准备</span><span>网络访问、账户注册、Kaggle 代码项目</span></div><div class="card-footer"><a class="outline-btn" href="${rootHref(environment.href)}">进入环境准备</a></div></article>`;
    return `<a class="home-project-item environment-project-item" href="${rootHref(environment.href)}"><span class="project-required">必看</span><span class="home-project-copy"><b>${esc(environment.title)}</b><span>${esc(environment.short)}</span></span></a>`;
  }

  function quickLinksMarkup(items, label = "快捷入口", compact = false) {
    if (!items || !items.length) return "";
    const links = items.map((item) => {
      const locked = Boolean(item.locked) || (isAdvancedPath(item.href) && !isAdvancedOpen());
      const inner = `<span class="quick-link-copy"><b>${esc(item.label)}</b>${item.caption ? `<span>${esc(item.caption)}</span>` : ""}</span>${locked ? `<span class="quick-link-lock" aria-hidden="true">锁定</span>` : ""}`;
      if (locked) return `<span class="quick-link is-locked" aria-disabled="true" title="暂未开放">${inner}</span>`;
      return `<a class="quick-link" href="${rootHref(item.href)}">${inner}</a>`;
    }).join("");
    return `<div class="quick-links${compact ? " is-compact" : ""}"><div class="quick-links-head">${esc(label)}</div><div class="quick-link-grid">${links}</div></div>`;
  }

  function experienceQuickLinks() {
    return data.experience.weeks.map((week) => ({
      label: `Week ${week.id}`,
      caption: isWeekOpen(week) ? "已开放" : "尚未开放",
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
      .flatMap((project) => {
        const base = { text: project.short || project.summary || "", kind: "book" };
        const materials = project.single
          ? [
            { title: `项目 ${project.no} · ${project.title} · 教学项目`, href: project.teaching },
            { title: `项目 ${project.no} · ${project.title} · 实践项目`, href: materialViewerHref(project, "practice") },
            { title: `项目 ${project.no} · ${project.title} · ${ANSWER_LABEL}`, href: materialViewerHref(project, "answer") }
          ]
          : [
            { title: `项目 ${project.no} · ${project.title} · 体验版教学项目`, href: project.experienceTeaching },
            { title: `项目 ${project.no} · ${project.title} · 体验版实践项目`, href: materialViewerHref(project, "practice") },
            { title: `项目 ${project.no} · ${project.title} · 体验版${ANSWER_LABEL}`, href: materialViewerHref(project, "answer") }
          ];
        if (project.advanced && isAdvancedOpen()) {
          materials.push(
            { title: `项目 ${project.no} · ${project.title} · 进阶版教学项目`, href: project.advanced },
            { title: `项目 ${project.no} · ${project.title} · 进阶版实践项目`, href: materialViewerHref(project, "advanced-practice") },
            { title: `项目 ${project.no} · ${project.title} · 进阶版${ANSWER_LABEL}`, href: materialViewerHref(project, "advanced-answer") }
          );
        }
        return materials.map((item) => ({ ...base, ...item }));
      });
    const extraItems = (data.resourceCollections || [])
      .find((collection) => collection.id === "teaching-library")?.items || [];
    return [...projectItems, ...extraItems].map((item) => ({ ...item, locked: Boolean(item.locked) || (isAdvancedPath(item.href) && !isAdvancedOpen()) }));
  }

  function moduleLessons(module) {
    if (!module.lessons || !module.lessons.length) return "";
    const lessonCard = (lesson) => {
      const links = [
        lesson.href ? `<a class="outline-btn" href="${rootHref(lesson.href)}">查看课程页面</a>` : "",
        lesson.kaggle ? `<a class="outline-btn" href="${esc(lesson.kaggle)}" target="_blank" rel="noreferrer">进入 Kaggle 实践</a>` : ""
      ].join("");
      return `<article class="card module-lesson" id="${esc(lesson.id)}"><h3>${lesson.href ? `<a href="${rootHref(lesson.href)}">${esc(lesson.title)}</a>` : esc(lesson.title)}</h3><p>${esc(lesson.text)}</p>${moduleMeta({ date: lesson.date || module.date })}${links ? `<div class="card-footer">${links}</div>` : ""}</article>`;
    };
    return `<section class="section" id="module-lessons">${sectionHead("授课内容", null, null)}<div class="module-lesson-list">${module.lessons.map(lessonCard).join("")}</div></section>`;
  }

  function experienceActivityCard() {
    const e = data.experience;
    return `<article class="card activity-card activity-card-featured" id="experience"><div class="activity-order" aria-hidden="true"></div><div class="card-kicker"><span class="project-new">new</span></div><h3>${esc(e.title)}</h3><p><b>${esc(e.lead)}</b></p><p>${esc(e.date)}</p><div class="home-project-list experience-prep-list">${environmentProjectCard(e.environment)}</div>${quickLinksMarkup(experienceQuickLinks(), "快捷入口")}<div class="card-footer"><a class="outline-btn" href="${rootHref("experience/index.html")}">查看详情</a></div></article>`;
  }

  function sectionHead(title, text, href, label) {
    const linkLabel = label || "查看详情";
    return `<div class="section-head"><div><h2>${esc(title)}</h2>${text ? `<p>${esc(text)}</p>` : ""}</div>${href ? `<a class="section-link" href="${rootHref(href)}">${esc(linkLabel)}${linkLabel === "查看详情" ? "" : " →"}</a>` : ""}</div>`;
  }

  function resourceCollectionCard(collection, homeOnly = false) {
    const sourceItems = collection.id === "teaching-library" ? teachingLibraryItems() : (collection.items || []);
    const visibleItems = homeOnly ? [] : sourceItems.filter((item) => !item.locked && item.studentVisible !== false);
    const items = visibleItems.map((item) => {
      const locked = Boolean(item.locked) || (isAdvancedPath(item.href) && !isAdvancedOpen());
      const link = locked
        ? `<span class="resource-item-link is-disabled" aria-disabled="true">尚未开放</span>`
        : `<a href="${rootHref(item.href)}">打开</a>`;
      return `<li class="${item.kind === "book" ? "book-item" : ""}${locked ? " is-locked" : ""}"><b>${esc(publicCopy(item.title))}</b><span>${esc(publicCopy(item.text))}</span>${link}</li>`;
    }).join("");
    return `<article class="card resource-card" id="${esc(collection.id)}"><h3>${esc(collection.title)}</h3><p><b>${esc(publicCopy(collection.subtitle))}</b></p><p>${esc(publicCopy(collection.text))}</p>${items ? `<ul class="resource-items ${collection.id === "teaching-library" ? "book-list" : ""}">${items}</ul>` : ""}<div class="card-footer"><a class="outline-btn" href="${rootHref(collection.href)}">进入合集 →</a></div></article>`;
  }

  function contactMarkup(contact, options = {}) {
    if (!contact) return "";
    const channels = (contact.channels || []).map((channel) => `<figure class="contact-channel"><div class="contact-image-frame"><img src="${rootHref(channel.image)}" alt="${esc(channel.title)}" loading="lazy" /></div><figcaption>${esc(channel.title)}</figcaption></figure>`).join("");
    const email = contact.email ? `<p class="contact-email">邮件：<a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></p>` : "";
    const title = options.title || contact.title || "答疑/反馈渠道";
    const text = options.text || contact.text || "";
    return `<section class="section" id="${esc(options.id || "project-contact")}"><div class="contact-panel"><div class="section-head"><div><h2>${esc(title)}</h2><p>${esc(text)}</p></div></div>${channels ? `<div class="contact-channel-grid">${channels}</div>` : ""}${email}</div></section>`;
  }

  function showcaseItem(module) {
    return `<article class="showcase-item"><h3>${esc(module.title)}</h3><p><b>${esc(module.subtitle)}</b></p><p>${esc(module.text)}</p>${moduleMeta(module)}${moduleQuickLinks(module, true)}<a class="outline-btn" href="${rootHref(module.href)}">查看详情</a></article>`;
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
    const projectList = locked ? "" : `<div class="week-project-list">${projects.map((project) => `<span><b>${esc(project.no)}</b>${esc(project.title)}</span>`).join("")}</div>`;
    return `<article class="card week-card${locked ? " is-locked" : ""}><div class="card-kicker">Week ${esc(week.id)}</div><h3>Week ${esc(week.id)}</h3><p>${esc(locked ? "尚未开放。" : week.note)}</p>${projectList}<div class="card-footer"><span class="muted small">${locked ? "尚未开放" : `${projects.length} 个项目`}</span>${locked ? `<span class="outline-btn is-disabled" aria-disabled="true">暂未开放</span>` : `<a class="outline-btn" href="${rootHref(`experience/week-${String(week.id).padStart(2, "0")}.html`)}">查看详情</a>`}</div></article>`;
  }

  function projectMode(project, advanced = false) {
    if (advanced && !project.single) {
      return `<article class="project-mode advanced-mode is-locked" aria-disabled="true"><div class="mode-kicker">进阶项目</div><p>进阶项目当前尚未开放，开放后提供对应的教学项目、实践项目和实践项目参考答案。</p><span class="material-status">尚未开放</span></article>`;
    }
    const title = project.single ? "项目" : "体验项目";
    return `<article class="project-mode"><div class="mode-kicker">${title}</div><p>${esc(project.experience || project.short)}</p></article>`;
  }

  function weekProjectPanel(project) {
    const modes = [projectMode(project, false)];
    if (project.advanced && !project.single) modes.push(projectMode(project, true));
    const open = isProjectOpen(project);
    const footer = open
      ? `<a class="solid-btn" href="${rootHref(`experience/${project.id}.html`)}">查看详情</a>`
      : `<span class="solid-btn is-disabled" aria-disabled="true">等待 Week ${esc(project.week)} 开放</span>`;
    return `<article class="card week-project-panel${open ? "" : " is-locked"}"><div class="week-project-title"><div><span class="project-no">${esc(project.no)}</span><h3>${esc(project.title)}</h3></div></div><p class="project-short">${esc(project.short)}</p><div class="project-split">${modes.join("")}</div><div class="card-footer">${footer}</div></article>`;
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
    <section class="section" id="team-overview">${sectionHead("团队概况", null, "team/index.html", "完整团队介绍")}
      <div class="home-intro-grid"><div class="home-overview-left"><article class="card home-team-copy"><h3>团队做什么</h3>${paragraphs(t.paragraphs.slice(0, 2))}<div class="card-footer"><span class="muted small">医学 · 工程 · 计算机 · 人工智能 · 生物信息学</span><a href="${rootHref("team/index.html")}">进入团队介绍 →</a></div></article><article class="card university-card home-universities-card"><div class="card-kicker">成员高校</div>${memberNetwork(t)}</article></div><div class="home-overview-side"><article class="card home-results-card"><div class="card-kicker">代表性成果（成员一作/项目负责人）</div>${metricGrid(t.achievementMetrics)}${t.achievementNote ? `<p class="achievement-note">${esc(t.achievementNote)}</p>` : ""}${newsMarkup((t.news || []).slice(0, t.homeNewsLimit || 4))}</article><article class="card home-leaders-card"><div class="home-card-heading"><div class="card-kicker">负责人</div><a class="home-card-action" href="${rootHref("team/people.html")}">查看详细介绍</a></div><div class="leader-list home-leader-scroll" role="region" aria-label="负责人列表" tabindex="0">${t.leaders.map((leader) => leaderPreview(leader, true)).join("")}</div></article></div></div>
    </section>
    <section class="section" id="featured-projects">${sectionHead("项目与活动", "本科生科研入门体验项目、科研培训、合作项目和专题交流。", "programs/index.html", "查看全部项目与活动")}
      <div class="showcase-grid"><article class="card featured-showcase"><div class="card-kicker">当前项目</div><h3>${esc(e.title)}</h3><p><b>${esc(e.lead)}</b></p><p>${esc(e.date)}</p><div class="home-project-list">${environmentProjectCard(e.environment)}${homeProjects.map(homeProjectCard).join("")}</div>${quickLinksMarkup(experienceQuickLinks(), "快捷入口")}<div class="card-footer"><a class="solid-btn" href="${rootHref("experience/index.html")}">查看详情</a></div></article><aside class="showcase-side" aria-label="其他活动与项目"><div class="showcase-side-head"><h3>其他项目与活动</h3><p>科研入门培训、课程项目、合作课程和生物医学人工智能专题交流。</p></div><div class="showcase-scroll">${otherModules.map(showcaseItem).join("")}</div></aside></div>
    </section>
    <section class="section">${sectionHead("资源中心", "专业解读、项目与活动资料、教学文档库。", "resources/index.html", "进入资源中心")}
      <div class="resource-grid">${resourceCards.map((collection) => resourceCollectionCard(collection, true)).join("")}</div>
    </section>${contactMarkup(e.contact, { id: "home-contact", title: "联系我们", text: "加入项目公告群，关注 KYDW 公众号，或通过负责人微信和邮件联系团队。" })}`);
  }

  function team() {
    const t = data.team;
    layout(`${hero({ eyebrow: t.label, title: "团队介绍", lead: t.lead, actions: [{ label: "查看项目与活动", href: "programs/index.html", primary: true }, { label: "进入资源中心", href: "resources/index.html" }] })}
    <section class="section"><div class="prose">${paragraphs(t.paragraphs)}</div></section>
    <section class="section">${sectionHead("团队概况", teamOverviewSummary(t), null)}${statGrid(t.facts)}<div class="card university-card team-universities"><div class="card-kicker">成员高校</div>${memberNetwork(t)}</div></section>
    <section class="section">${sectionHead("团队工作方式", null, null)}<div class="three-grid"><article class="card"><h3>连接不同学校与方向</h3><p>成员来自不同学校、专业和课题组，交流医学、工程、计算机、人工智能与生物信息学等方向。</p></article><article class="card"><h3>从研究任务进入方法</h3><p>项目、培训和专题合作都从具体任务出发，讨论数据、方法、结果和研究表达。</p></article><article class="card"><h3>资源共享 · 合作共赢</h3><p>多学科线上合作交流平台，经验分享、共享信息、公开资源。</p></article></div></section>
    <section class="section">${sectionHead("代表性成果（成员一作/项目负责人）", null, "team/achievements.html", "查看完整成果")}${t.achievementNote ? `<p class="achievement-note">${esc(t.achievementNote)}</p>` : ""}<div class="achievement-list">${t.achievements.map((item) => `<details class="fold"><summary>${esc(item.title)}</summary><div class="fold-body">${achievementBody(item)}</div></details>`).join("")}</div></section>
    <section class="section"><div class="card-grid"><article class="card"><h2>升学去向</h2><p class="muted">${destinationSummary(t)}</p><div class="hero-actions"><a class="outline-btn" href="${rootHref("team/destinations.html")}">查看成员去向</a></div></article><article class="card"><h2>团队活动</h2><p class="muted">复旦大学秋季学期本科生践悟课程、多校联合项目和生物医学人工智能专题交流，是团队目前持续整理和开展的主要活动。</p><div class="hero-actions"><a class="outline-btn" href="${rootHref("team/activities.html")}">查看活动体系</a></div></article></div></section>
    <section class="section">${sectionHead("负责人和历届骨干", "伍东辰、姜逸轩、汤昊天、吴锡东、刘涵瑜。", "team/people.html", "查看成员介绍")}<div class="leader-list">${t.leaders.map((leader) => leaderPreview(leader, true)).join("")}</div></section>
    <section class="section"><div class="callout"><b>联系 KYDW</b><p>关注“科研大王”公众号，或添加负责人微信 <b>${esc(data.site.wechat)}</b> 了解团队活动和项目入口。</p></div><p class="small muted">网站公开资料免费阅读，请勿用于牟利性销售。</p></section>`);
  }

  function teamSection() {
    const section = body.dataset.teamSection || "achievements";
    const t = data.team;
    const configs = {
      achievements: { eyebrow: "团队介绍 / 成果", title: "代表性成果（成员一作/项目负责人）", lead: "", back: "team/index.html" },
      destinations: { eyebrow: "团队介绍 / 成员发展", title: "成员升学去向", lead: "已毕业成员去向包括直博、国内学硕/海外研究型硕士。", back: "team/index.html" },
      activities: { eyebrow: "团队介绍 / 活动", title: "团队活动体系", lead: "科研入门培训、跨校项目、复旦大学秋季学期本科生践悟课程和生物医学人工智能专题交流。", back: "team/index.html" },
      people: { eyebrow: "团队介绍 / 成员", title: "负责人和历届骨干", lead: "伍东辰、姜逸轩、汤昊天、吴锡东、刘涵瑜。", back: "team/index.html" }
    };
    const cfg = configs[section] || configs.achievements;
    let inner = hero({ eyebrow: cfg.eyebrow, title: cfg.title, lead: cfg.lead, actions: [{ label: "返回团队介绍", href: cfg.back, primary: true }, { label: "项目与活动", href: "programs/index.html" }] });
    if (section === "achievements") inner += `<section class="section team-news-section">${sectionHead("团队近期动态", null, null)}<div class="home-news-list">${newsItemsMarkup(t.news || [])}</div></section><section class="section team-achievements-section">${sectionHead("代表性成果", null, null)}<div class="achievement-list">${t.achievements.map((item) => `<article class="achievement"><b>${esc(item.title)}</b><div>${achievementBody(item)}</div></article>`).join("")}</div></section>`;
    if (section === "destinations") inner += `<section class="section">${sectionHead("已毕业成员去向", null, null)}<div class="destination-degree-sections">${destinationDegreeCards(t)}</div><p class="small muted">${esc(t.destinationNote)}</p><div class="card university-card section-card"><div class="card-kicker">成员高校</div>${memberNetwork(t)}</div></section>`;
    if (section === "activities") inner += `<section class="section">${sectionHead("活动目录", null, "programs/index.html", "查看项目与活动")}
      <div class="activity-timeline">${sortedModules().map((module) => `<article class="activity-row"><div><h3>${esc(module.title)}</h3><p>${esc(module.text)}</p></div><a class="outline-btn" href="${rootHref(module.href)}">查看详情</a></article>`).join("")}</div><div class="card section-card"><ul>${t.activities.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div></section>`;
    if (section === "people") inner += `<section class="section">${sectionHead("成员介绍", null, null)}<div class="leader-list">${t.leaders.map((leader) => leaderPreview(leader)).join("")}</div></section>`;
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
    <section class="section"><div class="prose"><p>${esc(lesson.text)}</p>${moduleMeta({ date: lesson.date || module.date })}</div></section>
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
    if (chapter.locked) return layout(hero({ eyebrow: "科研入门培训", title: chapter.title, lead: "该章节尚未开放。", actions: [{ label: "返回培训主页", href: "programs/training.html", primary: true }] }));
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
    return `<article class="card directory-project-card${open ? "" : " is-locked"}"><div class="card-kicker">Week ${esc(project.week)} · 项目 ${esc(project.no)}</div><h3>${esc(project.title)}</h3><p>${esc(project.short)}</p><div class="project-directory-meta"><span>时间：${esc(project.date || "项目开放期")}</span></div><div class="card-footer">${open ? `<a class="outline-btn" href="${rootHref(`experience/${project.id}.html`)}">查看详情</a>` : `<span class="outline-btn is-disabled" aria-disabled="true">${esc(status)}</span>`}</div></article>`;
  }

  function experience() {
    const e = data.experience;
    const directoryProjects = [...(data.projects || [])]
      .filter(isListedProject)
      .sort((a, b) => (a.week || 99) - (b.week || 99) || String(a.no || "").localeCompare(String(b.no || "")));
    layout(`${hero({ eyebrow: e.label, title: e.title, lead: e.lead, actions: [{ label: "查看项目目录", href: "#project-directory", primary: true }, { label: "返回项目与活动", href: "programs/index.html" }], note: e.date })}
    <section class="section"><div class="prose">${paragraphs(e.paragraphs)}</div></section>
    <section class="section">${sectionHead("体验版与进阶版", "体验版完成指定内容，进阶版自行设计方法并提交报告。", null)}<div class="project-level-grid">${(e.levels || []).map((level, index) => `<article class="project-level-card"><div class="mode-kicker">${esc(level.title)}</div><p>${esc(level.text)}</p>${index === 1 && e.advancedResources?.length ? `<div class="inline-doc-links">${e.advancedResources.map((item) => `<a href="${rootHref(item.href)}">${esc(item.title)}</a>`).join("")}</div>` : ""}</article>`).join("")}</div></section>
    <section class="section">${sectionHead("项目构成", null, null)}<div class="structure-grid">${e.structure.map((item) => `<article class="structure-card"><span class="number">${esc(item.no)}</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join("")}</div></section>
    <section class="section" id="project-directory">${sectionHead("项目目录", "开始实践前请先完成项目环境准备，再进入已开放的科研项目。", null)}<div class="directory-project-grid">${environmentProjectCard(e.environment, true)}${directoryProjects.map(projectDirectoryCard).join("")}</div></section>
    <section class="section"><div class="callout"><b>参与方式</b><p>${esc(e.participation)}</p><p>体验版完成指定内容后无需提交报告；进阶版需要完成实践并提交设计报告。对某个方向希望继续学习的同学，可以联系负责人了解对应课题组的后续安排。</p><p>${esc(e.access)}</p></div></section>${contactMarkup(e.contact)}`);
  }

  function weekPage() {
    const week = findWeek(body.dataset.week);
    if (!week) return layout(hero({ eyebrow: "科研体验项目", title: "周页面不存在", lead: "请返回科研体验项目主页选择项目周次。", actions: [{ label: "返回项目主页", href: "experience/index.html", primary: true }] }));
    if (!isWeekOpen(week)) return layout(hero({ eyebrow: "科研体验项目", title: `Week ${week.id}`, lead: "尚未开放。", actions: [{ label: "返回项目目录", href: "experience/index.html", primary: true }, { label: "项目与活动", href: "programs/index.html" }] }));
    const projects = week.projects.map(findProject).filter(isListedProject);
    if (!projects.length) return layout(hero({ eyebrow: `科研体验项目 / Week ${week.id}`, title: `Week ${week.id}`, lead: "本周项目尚未开放。", actions: [{ label: "返回项目目录", href: "experience/index.html", primary: true }, { label: "项目与活动", href: "programs/index.html" }] }));
    layout(`${hero({ eyebrow: `科研体验项目 / Week ${week.id}`, title: `Week ${week.id}`, lead: week.note, actions: [{ label: "返回项目目录", href: "experience/index.html", primary: true }, { label: "项目与活动", href: "programs/index.html" }], note: `${projects.length} 个项目` })}
    <section class="section">${sectionHead(`Week ${week.id}`, null, null)}<div class="week-projects">${projects.map(weekProjectPanel).join("")}</div></section>`);
  }

  function materialCard(title, type, text, href, options = {}) {
    const copy = text ? `<p class="${type === "实践" ? "material-practice-note" : ""}">${esc(text)}</p>` : "";
    const locked = Boolean(options.locked) || (isAdvancedPath(href) && !isAdvancedOpen());
    const displayTitle = title === "参考答案" ? ANSWER_LABEL : publicCopy(title);
    if (!href || locked) return `<article class="material-card${locked ? " is-locked" : " is-pending"}"><div class="material-type">${esc(type)}</div><h3>${esc(displayTitle)}</h3>${copy}<span class="material-status">尚未开放</span></article>`;
    const external = Boolean(options.external);
    const notebook = /\.ipynb(?:$|\?)/i.test(href);
    const mainLabel = external ? "进入 Kaggle" : "打开";
    const mainHref = external ? esc(href) : rootHref(href);
    const mainAttrs = external ? ' target="_blank" rel="noreferrer"' : notebook ? " download" : "";
    const actions = [`<a class="outline-btn" href="${mainHref}"${mainAttrs}>${esc(mainLabel)}</a>`];
    for (const action of (options.actions || [])) {
      actions.push(`<a class="material-secondary-link" href="${rootHref(action.href)}">${esc(action.label)}</a>`);
    }
    for (const action of (options.externalActions || [])) {
      if (!action?.href) continue;
      actions.push(`<a class="material-secondary-link" href="${esc(action.href)}" target="_blank" rel="noreferrer">${esc(action.label)}</a>`);
    }
    return `<article class="material-card"><div class="material-type">${esc(type)}</div><h3>${esc(displayTitle)}</h3>${copy}<div class="material-actions">${actions.join("")}</div></article>`;
  }

  function materialViewerHref(project, kind) {
    return "experience/material.html?project=" + encodeURIComponent(project.id) + "&kind=" + encodeURIComponent(kind);
  }

  function materialTitle(kind) {
    if (kind === "practice" || kind === "advanced-practice") return "实践项目";
    if (kind === "answer" || kind === "advanced-answer") return ANSWER_LABEL;
    return "教学项目";
  }

  function notebookSource(cell) {
    return Array.isArray(cell?.source) ? cell.source.join("") : String(cell?.source || "");
  }

  function markdownToHtml(markdownText) {
    const lines = String(markdownText || "").replace(/\r\n?/g, "\n").split("\n");
    const html = [];
    let paragraph = [];
    let list = [];
    const inlineCode = new RegExp(String.fromCharCode(96) + "([^" + String.fromCharCode(96) + "]+)" + String.fromCharCode(96), "g");
    const flushParagraph = () => {
      if (paragraph.length) {
        const text = esc(paragraph.join(" ")).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(inlineCode, "<code>$1</code>");
        html.push("<p>" + text + "</p>");
        paragraph = [];
      }
    };
    const flushList = () => {
      if (list.length) {
        html.push("<ul>" + list.map((item) => "<li>" + esc(item).replace(inlineCode, "<code>$1</code>") + "</li>").join("") + "</ul>");
        list = [];
      }
    };
    for (const line of lines) {
      const heading = line.match(/^(#{1,4})\s+(.+)$/);
      const bullet = line.match(/^\s*[-*]\s+(.+)$/);
      if (heading) {
        flushParagraph();
        flushList();
        const level = Math.min(4, heading[1].length) + 2;
        html.push("<h" + level + ">" + esc(heading[2]) + "</h" + level + ">");
      } else if (bullet) {
        flushParagraph();
        list.push(bullet[1]);
      } else if (!line.trim()) {
        flushParagraph();
        flushList();
      } else {
        flushList();
        paragraph.push(line.trim());
      }
    }
    flushParagraph();
    flushList();
    return html.join("");
  }

  function notebookOutputMarkup(outputs) {
    const blocks = [];
    for (const output of outputs || []) {
      if (output.output_type === "stream") {
        const text = Array.isArray(output.text) ? output.text.join("") : String(output.text || "");
        if (text) blocks.push("<pre>" + esc(text) + "</pre>");
        continue;
      }
      if (output.traceback) {
        const text = Array.isArray(output.traceback) ? output.traceback.join("\n") : String(output.traceback);
        blocks.push("<pre>" + esc(text) + "</pre>");
        continue;
      }
      const data = output.data || {};
      const text = data["text/plain"] || data["text/markdown"];
      if (text) blocks.push("<pre>" + esc(Array.isArray(text) ? text.join("") : text) + "</pre>");
      for (const [mime, prefix] of [["image/png", "data:image/png;base64,"], ["image/jpeg", "data:image/jpeg;base64,"], ["image/svg+xml", "data:image/svg+xml;base64,"]]) {
        const image = data[mime];
        if (!image) continue;
        const value = Array.isArray(image) ? image.join("") : String(image);
        blocks.push("<img class=\"notebook-output-image\" alt=\"Notebook 实际输出\" src=\"" + prefix + esc(value) + "\">");
      }
    }
    return blocks.length ? "<div class=\"notebook-output\"><span>Notebook 实际输出</span>" + blocks.join("") + "</div>" : "";
  }

  function notebookCellNeedsCompletion(cell, source) {
    if (cell.cell_type === "markdown") return /(?:^|\n)\s*(?:\*\*)?你的回答\s*(?:：|:)/m.test(source);
    return /TODO|待完成/.test(source) || /^\s*pass\s*(?:#.*)?$/m.test(source) || /^(?!\s*best_state\s*=)\s*(?:[A-Za-z_]\w*(?:\s*,\s*[A-Za-z_]\w*)*)\s*=\s*None\b/m.test(source) || /self\.[A-Za-z_]\w*\s*=\s*None\b/.test(source);
  }

  function practiceTaskGuideMarkup(project) {
    const guides = data.experience.practiceTaskGuides?.[project.id] || [];
    if (!guides.length) return "";
    const cards = guides.map((item) => `<article class="practice-task-guide-card"><h3>${esc(item.task)}</h3><dl><div><dt>需要填写</dt><dd>${esc(item.fill)}</dd></div><div><dt>如何确定</dt><dd>${esc(item.basis)}</dd></div><div><dt>完成后检查</dt><dd>${esc(item.check)}</dd></div></dl></article>`).join("");
    return `<section class="practice-task-guide"><div class="section-head"><div><h2>需要完成的实践任务</h2><p>标有“需要完成”的代码或文字单元格就是学生需要补全的位置。网页只能阅读；实际填写请在 Kaggle 中复制到自己的账户后进行。</p></div></div><div class="practice-task-guide-grid">${cards}</div></section>`;
  }

  function notebookCellsMarkup(notebook, referenceResults = []) {
    let taskIndex = -1;
    const usedResultSteps = new Set();
    return (notebook.cells || []).map((cell, index) => {
      const source = notebookSource(cell);
      const number = String(index + 1).padStart(2, "0");
      const needsCompletion = notebookCellNeedsCompletion(cell, source);
      const cellHead = (type) => `<div class="notebook-cell-head"><span>${type}</span><span class="notebook-cell-head-right">${needsCompletion ? "<span class=\"notebook-cell-status\">需要完成</span>" : ""}<span>${number}</span></span></div>`;
      if (cell.cell_type === "markdown") {
        const task = source.match(/(?:^|\n)\s*(?:#+\s*)?(?:任务|实践任务)\s*(?:[：:]?\s*)(\d+)\s*[：:]/m);
        if (task) {
          taskIndex = Number(task[1]) - 1;
        }
        return "<article class=\"notebook-cell notebook-markdown-cell\">" + cellHead("Markdown 单元格") + "<div class=\"notebook-markdown\">" + markdownToHtml(source) + "</div></article>";
      }
      const resultButtons = referenceResults.filter((result) => result && result.taskIndex === taskIndex && !usedResultSteps.has(result.stepIndex)).map((result) => {
        usedResultSteps.add(result.stepIndex);
        return "<button class=\"notebook-run\" type=\"button\" data-result-target=\"reference-result-" + result.stepIndex + "\">查看实际参考结果</button>";
      }).join("");
      return "<article class=\"notebook-cell notebook-code-cell\">" + cellHead("代码单元格") + "<pre class=\"notebook-code\"><code>" + esc(source) + "</code></pre>" + notebookOutputMarkup(cell.outputs) + resultButtons + "</article>";
    }).join("");
  }

  function referenceFigureMarkup(figure, index) {
    if (figure.getAttribute("data-reference-role") !== "result") return "";
    const image = figure.querySelector("img");
    if (!image) return "";
    const source = image.getAttribute("src") || "";
    const alt = image.getAttribute("alt") || "实践项目参考结果";
    const caption = figure.querySelector("figcaption")?.textContent?.trim() || alt;
    return "<figure class=\"reference-result-figure\"><img src=\"" + esc(source) + "\" alt=\"" + esc(alt) + "\"><figcaption>" + esc(caption) + "</figcaption></figure>";
  }

  function referenceResultsFromAssets(project) {
    const defaultTaskIndexes = { "project-01": [3, 4, 5], "project-02": [0, 3, 4], "project-03": [-1, 2, 2] };
    return (project.referenceResults || []).map((result, index) => {
      const image = result.image ? "<figure class=\"reference-result-figure\"><img src=\"" + rootHref(result.image) + "\" alt=\"" + esc(result.alt || result.caption || "实践项目实际参考输出") + "\"><figcaption>" + esc(result.caption || "实践项目实际参考输出") + "</figcaption></figure>" : "";
      const stepIndex = Number.isFinite(result.stepIndex) ? result.stepIndex : index;
      const taskIndex = Number.isFinite(result.taskIndex) ? result.taskIndex : (defaultTaskIndexes[project.id]?.[index] ?? stepIndex);
      return { taskIndex, stepIndex, title: result.title || "实际运行结果", figures: image ? [image] : [], text: result.text || "" };
    }).filter((result) => result.figures.length || result.text);
  }

  function referenceResultsFromAnswer(documentText, source) {
    const parsed = new DOMParser().parseFromString(documentText, "text/html");
    parsed.querySelectorAll("script, style, link").forEach((node) => node.remove());
    const baseUrl = new URL(rootHref(source), location.href);
    parsed.querySelectorAll("img[src]").forEach((image) => {
      const value = image.getAttribute("src");
      if (value && !/^(?:https?:|data:|#|mailto:)/i.test(value)) image.setAttribute("src", new URL(value, baseUrl).href);
    });
    const results = [];
    [...parsed.querySelectorAll(".page")].forEach((section, index) => {
      const title = section.querySelector("h1, h2")?.textContent?.trim() || "步骤 " + (index + 1);
      const figures = [...section.querySelectorAll("figure")].map((figure, figureIndex) => referenceFigureMarkup(figure, figureIndex)).filter(Boolean);
      if (!figures.length) return;
      const step = section.textContent.match(/步骤\s*(\d+)/)?.[1];
      const stepIndex = Math.max(0, Number(step || index + 1) - 1);
      results[stepIndex] = { taskIndex: stepIndex, stepIndex, title, figures };
    });
    return results;
  }

  function referenceResultsMarkup(results) {
    if (!results.length) return "";
    return "<section class=\"reference-results\" id=\"reference-results\"><div class=\"section-head\"><div><h2>实际参考输出</h2><p>以下图像和数值来自对应实践项目在 Kaggle 中保存的真实运行结果。</p></div></div><div class=\"reference-result-grid\">" + results.filter(Boolean).map((result) => "<article class=\"reference-result\" id=\"reference-result-" + result.stepIndex + "\"><div class=\"reference-result-title\"><span>步骤 " + (result.stepIndex + 1) + "</span><h3>" + esc(result.title) + "</h3></div>" + result.figures.join("") + (result.text ? "<pre class=\"reference-result-text\">" + esc(result.text) + "</pre>" : "") + "</article>").join("") + "</div></section>";
  }

  function bindReferenceResultButtons() {
    document.querySelectorAll(".notebook-run[data-result-target]").forEach((button) => button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.resultTarget);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }));
  }

  async function material() {
    const params = new URLSearchParams(location.search);
    const project = findProject(params.get("project"));
    const kind = params.get("kind") || "practice";
    const advanced = kind === "advanced-practice" || kind === "advanced-answer";
    if (!project || !isProjectOpen(project) || (advanced && !isAdvancedOpen())) {
      return layout(hero({ eyebrow: "科研体验项目", title: "材料尚未开放", lead: "该项目材料当前未开放。", actions: [{ label: "返回项目详情", href: project ? "experience/" + project.id + ".html" : "experience/index.html", primary: true, arrow: false }, { label: "返回项目主页", href: "experience/index.html", arrow: false }] }));
    }
    const practiceSource = project.experiencePractice || project.practice;
    const answerSource = project.experienceAnswer || project.answer || project.referenceAnswer;
    const source = kind === "practice" ? practiceSource : kind === "answer" ? answerSource : kind === "advanced-practice" ? project.advancedPractice : project.advancedAnswer;
    if (!source) return layout(hero({ eyebrow: "科研体验项目", title: "材料尚未准备", lead: "该项目材料尚未准备完成。", actions: [{ label: "返回项目详情", href: "experience/" + project.id + ".html", primary: true, arrow: false }] }));
    const downloadHref = kind.includes("practice") ? source : practiceSource;
    const title = materialTitle(kind);
    const downloadLabel = kind === "answer" || kind === "advanced-answer" ? "下载实践 Notebook" : "下载 Notebook";
    const viewerActions = [{ label: "返回项目详情", href: "experience/" + project.id + ".html", primary: true, arrow: false }, { label: downloadLabel, href: downloadHref, download: true, arrow: false }];
    const viewer = hero({ eyebrow: "科研体验项目 / 项目 " + project.no + " / " + title, title: project.title + " · " + title, lead: title === "实践项目" ? "阅读代码并查看实际参考输出" : "逐步阅读实践项目参考答案", actions: viewerActions });
    const note = data.experience.simulationNote || "网页中的运行按钮只定位到已保存的参考输出；需要得到自己的运行结果，请先在 Kaggle 中复制 Notebook 到自己的账户，再运行和修改代码。";
    const guide = data.experience.practiceGuidance || "实践项目优先在 Kaggle 中完成：复制到自己的账户后运行和修改，下载 Notebook 到电脑是补充方式。";
    const taskGuide = kind === "practice" || kind === "advanced-practice" ? practiceTaskGuideMarkup(project) : "";
    layout(viewer + "<section class=\"section\"><div class=\"notebook-viewer\" id=\"notebook-viewer\"><div class=\"callout simulation-note\"><b>模拟运行的注意事项</b><p>" + esc(note) + "</p></div><div class=\"callout kaggle-practice-note\"><b>实践入口</b><p>" + esc(guide) + "</p></div>" + taskGuide + "<div id=\"notebook-content\" class=\"notebook-content\"><p class=\"loading\">正在加载材料……</p></div></div></section>");
    const container = document.getElementById("notebook-content");
    try {
      const response = await fetch(rootHref(source));
      if (!response.ok) throw new Error("HTTP " + response.status);
      if (kind === "answer" || kind === "advanced-answer") {
        const documentText = await response.text();
        const parsed = new DOMParser().parseFromString(documentText, "text/html");
        parsed.querySelectorAll("script, style, link").forEach((node) => node.remove());
        const baseUrl = new URL(rootHref(source), location.href);
        parsed.querySelectorAll("[src], [href]").forEach((node) => {
          for (const attribute of ["src", "href"]) {
            const value = node.getAttribute(attribute);
            if (value && !/^(?:https?:|data:|#|mailto:)/i.test(value)) node.setAttribute(attribute, new URL(value, baseUrl).href);
          }
        });
        const sections = [...parsed.querySelectorAll(".page-intro, .page")];
        container.innerHTML = "<div class=\"notebook-answer-note\"><b>" + esc(ANSWER_LABEL) + "</b><p>以下内容按实践步骤展示参考代码、分析过程和已保存的实际结果。</p></div>" + sections.map((section) => "<article class=\"notebook-answer-section\">" + section.innerHTML + "</article>").join("");
      } else {
        const notebook = await response.json();
        let referenceResults = referenceResultsFromAssets(project);
        if (answerSource && /\.html(?:$|\?)/i.test(answerSource)) {
          const answerResponse = await fetch(rootHref(answerSource));
          if (answerResponse.ok && !referenceResults.length) referenceResults = referenceResultsFromAnswer(await answerResponse.text(), answerSource);
        }
        container.innerHTML = notebookCellsMarkup(notebook, referenceResults) + referenceResultsMarkup(referenceResults);
        bindReferenceResultButtons();
      }
    } catch (error) {
      container.innerHTML = "<div class=\"callout warn\"><b>材料加载失败</b><p>请稍后重试，或下载 Notebook 后在 Kaggle 中打开。</p></div>";
    }
  }

  function projectPage() {
    const project = findProject(body.dataset.project);
    if (!project) return layout(hero({ eyebrow: "科研体验项目", title: "项目不存在", lead: "请返回本科生科研入门体验项目主页选择方向。", actions: [{ label: "返回项目主页", href: "experience/index.html", primary: true }] }));
    const firstTeaching = project.teaching || project.experienceTeaching;
    if (!firstTeaching || !isProjectOpen(project)) return layout(hero({ eyebrow: `科研体验项目 / Week ${project.week}`, title: project.title, lead: `该项目等待 Week ${project.week} 开放。`, actions: [{ label: "返回项目目录", href: "experience/index.html", primary: true }, { label: "返回项目与活动", href: "programs/index.html" }] }));
    const answerHref = project.answer || project.referenceAnswer;
    const practiceHref = project.kaggle || project.practice;
    const singleTeaching = project.single ? (project.teaching || project.advanced) : null;
    const singlePractice = project.single ? materialViewerHref(project, "practice") : null;
    const singleAnswer = project.single ? materialViewerHref(project, "answer") : null;
    const experienceTeaching = project.experienceTeaching || null;
    const experiencePractice = project.experiencePractice ? materialViewerHref(project, "practice") : null;
    const experienceAnswer = project.experienceAnswer ? materialViewerHref(project, "answer") : null;
    const advancedTeaching = project.single ? null : project.advanced;
    const advancedPractice = project.advancedPractice ? materialViewerHref(project, "advanced-practice") : null;
    const advancedAnswer = project.advancedAnswer ? materialViewerHref(project, "advanced-answer") : null;
    const tier = (title, text, teachingHref, practiceLink, answerLink, options = {}) => {
      const tierText = options.locked ? "进阶项目当前尚未开放，开放后提供对应的教学项目、实践项目和实践项目参考答案。" : text;
      const practiceOptions = { locked: options.locked, external: /^https?:/i.test(practiceLink || ""), actions: options.practiceActions || [] };
      return `<article class="project-tier${options.locked ? " is-locked" : ""}"><div class="mode-kicker">${esc(title)}</div>${tierText ? `<p class="project-tier-text">${esc(tierText)}</p>` : ""}${options.locked ? `<span class="material-status">尚未开放</span>` : ""}<div class="material-grid">${materialCard("教学项目", "教学", "", teachingHref, { locked: options.locked })}${materialCard("实践项目", "实践", "", practiceLink, practiceOptions)}${materialCard(ANSWER_LABEL, "答案", "", answerLink, { locked: options.locked, actions: options.answerActions || [] })}</div></article>`;
    };
    const projectContent = project.single
      ? tier("项目", project.tierText || "", singleTeaching, singlePractice, singleAnswer)
      : `<div class="project-tier-grid">${tier("体验项目", project.tierText || "", experienceTeaching, experiencePractice, experienceAnswer)}${tier("进阶项目", project.advancedTierText || "", advancedTeaching, advancedPractice, advancedAnswer, { locked: !isAdvancedOpen(), practiceActions: project.advancedReportTemplate ? [{ label: "查看设计报告模板", href: project.advancedReportTemplate }] : [], answerActions: project.advancedReferenceReport ? [{ label: "查看参考设计报告", href: project.advancedReferenceReport }] : [] })}</div>`;
    const learningGuide = project.single
      ? `<article class="project-level-card single-project-guide"><div class="mode-kicker">完成顺序</div><p>先阅读教学项目，再在实践 Notebook 中完成指定内容，最后使用实践项目参考答案核对代码与分析过程。</p></article>`
      : `<div class="project-level-grid"><article class="project-level-card"><div class="mode-kicker">体验版</div><p>阅读基础教学项目，在实践 Notebook 中完成和补全指定代码或文字，完成后使用实践项目参考答案核对。体验版不要求提交报告。</p></article><article class="project-level-card"><div class="mode-kicker">进阶版</div><p>继续学习同一方向的方法与研究设计，自行设计或选择方法，完成实践并提交设计报告。报告需要说明方法选择、验证设计和结果解释。当前进阶项目尚未开放。</p></article></div>`;
    const kaggleAction = project.kaggle ? `<div class="project-practice-actions"><a class="solid-btn" href="${esc(project.kaggle)}" target="_blank" rel="noreferrer">在 Kaggle 中复制并运行</a></div>` : "";
    const practiceGuide = `<article class="project-practice-guide"><div class="mode-kicker">实践项目与参考答案</div><p>${esc(data.experience.practiceGuidance || "实践项目可以下载到自己的电脑上运行；如果还不熟悉代码，可以直接在 Kaggle 上打开对应项目，按单元格逐步运行。看不懂时，可以向 AI 询问当前单元格在做什么，再根据提示一步步尝试。逐步借助 AI 读懂并完成代码，已经是当前科研实践中的必备能力。即使暂时没有完成，也可以打开实践项目参考答案核对。")}</p>${kaggleAction}</article>`;
    layout(`${hero({ eyebrow: `科研体验项目 / Week ${project.week} / 项目 ${project.no}`, title: project.title, lead: project.short, actions: [{ label: "返回所属 Week", href: `experience/week-${String(project.week).padStart(2, "0")}.html`, primary: true }, { label: "返回项目与活动", href: "programs/index.html" }] })}
    <section class="section"><div class="project-page-meta"><span>时间：${esc(project.date || "项目开放期")}</span></div></section>
    <section class="section">${learningGuide}</section>
    <section class="section">${sectionHead("项目材料", null, null)}${projectContent}${practiceGuide}</section>`);
  }

  function professional() {
    const p = data.professional;
    layout(`${hero({ eyebrow: "资源中心 / 专业解读", title: "生物医学工程专业解读", lead: p.lead, actions: [{ label: "返回资源中心", href: "resources/index.html", primary: true }, { label: "查看专业答疑", href: "professional/faq.html" }, { label: "查看历年去向", href: "professional/destinations.html" }] })}
    <section class="section"><div class="callout professional-context"><p>${esc(p.contextNote || "")}</p></div><div class="prose">${paragraphs(p.intro)}</div></section>
    <section class="section"><div class="long-prose">${p.sections.map((item) => `<article class="prose-section"><h2>${esc(item.title)}</h2>${paragraphs(item.paragraphs)}</article>`).join("")}</div></section>`);
  }

  function professionalFaq() {
    const p = data.professional;
    const groups = ["专业本身", "升学与职业"].map((title) => ({ title, items: p.faq.filter((item) => item.group === title) }));
    const faqColumn = (group) => `<article class="faq-column"><h2>${esc(group.title)}</h2><div class="faq-stack">${group.items.map((item) => `<details class="fold"><summary>${esc(item.q)}</summary><div class="fold-body"><p>${esc(item.a)}</p></div></details>`).join("")}</div></article>`;
    layout(`${hero({ eyebrow: "专业解读 / 答疑", title: "生物医学工程专业答疑", lead: "左侧介绍专业本身，右侧整理升学与职业问题。", actions: [{ label: "返回专业解读", href: "professional/index.html", primary: true }, { label: "返回资源中心", href: "resources/index.html" }] })}
    <section class="section"><div class="callout professional-context"><p>${esc(p.contextNote || "")}</p></div><div class="faq-columns">${groups.map(faqColumn).join("")}</div></section>`);
  }

  function destinationDetailTable(entries) {
    if (!Array.isArray(entries) || !entries.length) return "";
    const rows = entries.map((entry) => `<tr><td>${esc(entry.school || entry.name || "")}</td><td>${esc(entry.college || entry.faculty || "")}</td><td>${esc(entry.major || entry.program || "")}</td><td>${esc(entry.count == null ? "" : `${entry.count} 人`)}</td></tr>`).join("");
    return `<div class="destination-table-wrap"><table class="destination-table"><thead><tr><th>拟录取学校</th><th>学院</th><th>专业</th><th>人数</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  function professionalDestinations() {
    const overview = data.professional.destinationOverview;
    if (!overview) return layout(hero({ eyebrow: "资源中心 / 专业解读", title: "历年去向表", lead: "去向内容尚未登记。", actions: [{ label: "返回专业解读", href: "professional/index.html", primary: true }] }));
    const destinationCard = (label, detail) => `<article class="card destination-overview-card"><div class="card-kicker">${esc(label)}</div><strong>${esc(detail.total || "")}</strong><p>${esc(detail.text || "")}</p>${destinationDetailTable(detail.entries)}</article>`;
    const yearCards = (overview.years || []).map((year) => `<section class="section destination-year-section"><div class="section-head"><div><h2>${esc(year.title)}</h2><p>按保研与申研分列。</p></div></div><div class="destination-overview-grid">${destinationCard("保研", year.recommendation || {})}${destinationCard("申研", year.application || {})}</div></section>`).join("");
    layout(`${hero({ eyebrow: "资源中心 / 专业解读 / 历年去向", title: overview.title, lead: overview.lead, actions: [{ label: "返回专业解读", href: "professional/index.html", primary: true }, { label: "返回资源中心", href: "resources/index.html" }] })}${yearCards}<section class="section"><div class="callout"><p>${esc(overview.note)}</p></div></section>`);
  }

  const renderers = { home, team, "team-section": teamSection, programs, module: modulePage, "sdu-lesson": sduLessonPage, "training-module": trainingModulePage, "training-plan": trainingPlanPage, resources, experience, "experience-week": weekPage, project: projectPage, material, professional, "professional-faq": professionalFaq, "professional-destinations": professionalDestinations };
  if (renderers[page]) renderers[page]();
  else home();
})();
