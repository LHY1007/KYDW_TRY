(() => {
'use strict';
const $ = id => document.getElementById(id);
const toc = document.querySelector('.beginner-toc');
if(toc){const mq=matchMedia('(max-width:900px)');const resize=()=>{toc.open=!mq.matches;};resize();mq.addEventListener('change',resize);toc.addEventListener('click',e=>{if(e.target.closest('a')&&mq.matches)toc.open=false;});}
if($('query-output')){const update=()=>{$('query-output').textContent=['query-object','query-task','query-method'].map(id=>$(id).value.trim()).filter(Boolean).join(' ');};['query-object','query-task','query-method'].forEach(id=>$(id).addEventListener('input',update));update();}
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText($(b.dataset.copy).textContent);$('copy-status').textContent='已复制。';}catch{$('copy-status').textContent='请选中文字后按 Ctrl+C 复制。';}}));
  function slideSvg(aligned, font){
    const xs=aligned?[55,335,615]:[55,300,640], ys=aligned?[200,200,200]:[210,245,185];
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 506" role="img" aria-label="显微图像分析流程的排版示意"><rect width="900" height="506" fill="#fff"/><text x="55" y="76" font-size="32" font-family="Microsoft YaHei, sans-serif" fill="#17211d">显微图像分类流程</text><text x="55" y="118" font-size="18" font-family="Microsoft YaHei, sans-serif" fill="#5b6760">输入图像 → 分类预测 → 结果检查</text>${['显微图像','分类模型','有细胞 / 无细胞'].map((t,i)=>`<rect x="${xs[i]}" y="${ys[i]}" width="230" height="100" rx="9" fill="${i===1?'#e2eee5':'#f2f5f2'}" stroke="#39715a"/><text x="${xs[i]+115}" y="${ys[i]+57}" text-anchor="middle" font-family="Microsoft YaHei, sans-serif" font-size="${font}" fill="#17211d">${t}</text>`).join('')}${[0,1].map(i=>`<path d="M ${xs[i]+230} ${ys[i]+50} L ${xs[i+1]-10} ${ys[i+1]+50}" stroke="#39715a" stroke-width="2" fill="none" marker-end="url(#arrow)"/>`).join('')}<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#39715a"/></marker></defs><text x="55" y="410" font-family="Microsoft YaHei, sans-serif" font-size="17" fill="#5b6760">流程示意；不表示真实模型结构或实验结果。</text></svg>`;
  }

if($('slide-preview')){const update=()=>{$('slide-preview').innerHTML=slideSvg($('slide-align').checked,Number($('slide-font').value));};$('slide-align').addEventListener('change',update);$('slide-font').addEventListener('change',update);update();}
if($('data-practice')){
fetch('downloads/cell_practice.json').then(r=>{if(!r.ok)throw Error('data');return r.json();}).then(rows=>{
const update=()=>{const truth=$('truth-filter').value,model=$('model-filter').value,pred=$('prediction-filter').value;const shown=rows.filter(r=>(truth==='all'||r.truth===Number(truth))&&(pred==='all'||r['pred_'+model]===Number(pred)));$('data-body').replaceChildren();shown.forEach(r=>{const tr=document.createElement('tr');[r.image_id,r.truth,r.pred_A,r.pred_B].forEach(value=>{const td=document.createElement('td');td.textContent=value;tr.append(td);});$('data-body').append(tr);});if(!shown.length){const tr=document.createElement('tr'),td=document.createElement('td');td.colSpan=4;td.className='data-empty';td.textContent='没有符合当前条件的记录';tr.append(td);$('data-body').append(tr);}$('data-summary').textContent='当前显示 '+shown.length+' / '+rows.length+' 条模拟记录';};['truth-filter','model-filter','prediction-filter'].forEach(id=>$(id).addEventListener('change',update));update();
}).catch(()=>{$('data-summary').textContent='数据暂未读入，请刷新页面，或下载 CSV 查看。';});
}
})();
