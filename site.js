const PROJECTS = [
  {id:0,title:"基础编程与人工智能",tag:"入门铺垫",desc:"从数据、代码和模型的基本动作开始，走完一条完整但不过度深入的 AI 项目流程。",ready:true},
  {id:1,title:"MRI 肿瘤图像分割",tag:"医学影像",desc:"从 MRI 图像和标注出发，观察分割任务中的数据处理、模型训练与结果分析。",ready:true},
  {id:2,title:"X 射线图像重建",tag:"图像生成",desc:"围绕 X 射线图像重建任务，认识从输入图像到生成结果的基本研究链条。",ready:true},
  {id:3,title:"病理癌症分级",tag:"图像分类",desc:"通过数字病理图像分类，理解图像特征如何支持癌症分级判断。",ready:true},
  {id:4,title:"遗传风险与影像组学结合的脑疾病预测",tag:"多模态预测",desc:"把遗传风险信息与影像组学特征放在同一预测任务中，体验交叉数据分析。",ready:true},
  {id:5,title:"空间转录组学图像超分辨",tag:"空间组学",desc:"从组织空间图像与表达信息出发，观察超分辨方法如何补充空间细节。",ready:true},
  {id:6,title:"基于空间转录组学的细胞通讯",tag:"空间组学",desc:"待新材料接入：从空间位置和基因表达关系探索细胞之间的通讯。",ready:false},
  {id:7,title:"基于传感器的人类活动识别",tag:"信号分类",desc:"待新材料接入：使用传感器信号体验人类活动识别任务。",ready:false},
  {id:8,title:"组织学图像虚拟染色",tag:"图像翻译",desc:"待新材料接入：观察组织学图像在虚拟染色任务中的转换过程。",ready:false},
  {id:9,title:"人体生理信号分析",tag:"待定方向",desc:"方向和实践内容待后续公布。",ready:false},
  {id:10,title:"后续方向 11",tag:"待补充",desc:"后续方向陆续公布。",ready:false},
  {id:11,title:"后续方向 12",tag:"待补充",desc:"后续方向陆续公布。",ready:false},
  {id:12,title:"后续方向 13",tag:"待补充",desc:"后续方向陆续公布。",ready:false},
  {id:13,title:"后续方向 14",tag:"待补充",desc:"后续方向陆续公布。",ready:false},
  {id:14,title:"后续方向 15",tag:"待补充",desc:"后续方向陆续公布。",ready:false}
];

const WEEKS = [
  {id:1,title:"第 1 周｜从代码动作到医学图像",summary:"先建立数据和人工智能的直观认识，再进入两类医学影像任务。此分组是当前框架，可按最终发布顺序调整。",projects:[0,1,2]},
  {id:2,title:"第 2 周｜从图像判断到交叉预测",summary:"从数字病理图像分类进入遗传风险与影像组学结合的预测任务，再观察空间组学图像处理。此分组是当前框架，可按最终发布顺序调整。",projects:[3,4,5]},
  {id:3,title:"第 3 周｜空间关系与细胞通讯",summary:"空间转录组学方向的后续体验入口，具体内容等待新材料接入。",projects:[6,7,8]},
  {id:4,title:"第 4 周｜生理信号与待定方向",summary:"信号分析和后续方向的预留周，具体项目陆续公布。",projects:[9,10,11]},
  {id:5,title:"第 5 周｜后续方向陆续公布",summary:"为第 13–15 个方向保留统一入口，发布时只需补充项目数据和教学链接。",projects:[12,13,14]}
];

function esc(value){return String(value).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));}
function projectCard(project){
  const action=project.ready?'<span>教学页待新材料</span>':'<span>内容待公布</span>';
  return `<article class="project-card"><span class="project-number">PROJECT ${String(project.id).padStart(2,'0')}</span><h3>${esc(project.title)}</h3><p>${esc(project.desc)}</p><div class="card-bottom"><span class="status">${esc(project.tag)}</span>${action}</div></article>`;
}
function renderNav(){
  const nav=document.querySelector('[data-site-nav]');
  if(!nav)return;
  const current=document.body.dataset.page||'home';
  nav.innerHTML='<a href="index.html" '+(current==='home'?'aria-current="page"':'')+'>项目首页</a>'+WEEKS.map(w=>`<a href="${current==='home'?'weeks/':''}week-${String(w.id).padStart(2,'0')}.html" ${current==='week-'+w.id?'aria-current="page"':''}>第${w.id}周</a>`).join('')+'<a href="'+(current==='home'?'lessons/':'../lessons/')+'index.html">教学材料</a>';
  const toggle=document.querySelector('.nav-toggle');
  if(toggle)toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));});
}
function renderHome(){const target=document.querySelector('[data-home-projects]');if(target)target.innerHTML=WEEKS.slice(0,2).flatMap(w=>w.projects.map(id=>PROJECTS[id])).map(projectCard).join('');}
function renderWeek(){
  const id=Number(document.body.dataset.week);const week=WEEKS.find(w=>w.id===id);if(!week)return;
  const heading=document.querySelector('[data-week-heading]');if(heading)heading.textContent=week.title;
  const summary=document.querySelector('[data-week-summary]');if(summary)summary.textContent=week.summary;
  const meta=document.querySelector('[data-week-meta]');if(meta)meta.innerHTML=`<span class="pill">每周 3 个体验项目</span><span class="pill">线上自主学习</span><span class="pill">当前为框架版本</span>`;
  const target=document.querySelector('[data-week-projects]');if(target)target.innerHTML=week.projects.map(id=>projectCard(PROJECTS[id])).join('');
}
document.addEventListener('DOMContentLoaded',()=>{renderNav();renderHome();renderWeek();document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());});
