const routes = {
  home: { path: '../README.md', subs: [{n:'HOME ROOT', f:'../README.md'}, {n:'LICENSE (RFOF)', f:'../LICENSE.rfof'}] },
  doku: { path: '../content/whitepaper.md', subs: [
    {n:'WHITEPAPER', f:'../content/whitepaper.md'}, {n:'EBENE 1', f:'../content/ebene1.md'},
    {n:'EBENE 2', f:'../content/ebene2.md'}, {n:'EBENE 3', f:'../content/ebene3.md'},
    {n:'EBENE 4', f:'../content/ebene4.md'}, {n:'EBENE 5', f:'../content/ebene5.md'},
    {n:'EBENE 6', f:'../content/ebene6.md'}, {n:'EBENE 7', f:'../content/ebene7.md'},
    {n:'EBENE 8', f:'../content/ebene8.md'}, {n:'EBENE 9', f:'../content/ebene9.md'}
  ]},
  launch: { path: null, subs: [{n:'SYSTEM STATUS', f:null}, {n:'BLOCKCHAIN NODE', f:null}] }
};

function renderExplorer() {
    const content = document.getElementById('content');
    const ts = new Date().toISOString().replace('T', ' ').substring(0, 19);
    content.innerHTML = \
        <div style="background:#000; color:#0f0; padding:30px; border:2px solid #ffd700; font-family:monospace; min-height:400px;">
            <h2 style="color:#ffd700;">>> NOTARIAT_EXPLORER_CORE_V1.0</h2>
            <hr style="border:1px solid #222;">
            <p>> NODE: VERIFIED</p>
            <p>> SESSION_START: \</p>
            <p>> 15_MODULE_LOGIC: ACTIVE</p>
            <div style="margin-top:20px; border:1px solid #0f0; padding:10px;">
                [INFO] Alle 15 Untersites sind mathematisch verzahnt.
            </div>
        </div>\;
}

async function loadPage(page, file = null) {
  const content = document.getElementById('content');
  const dropdown = document.getElementById('dynamic-dropdown');
  
  if (page === 'notariat') { renderExplorer(); return; }
  if (!routes[page]) page = 'home';
  
  const target = file || routes[page].path;
  dropdown.innerHTML = '';
  routes[page].subs.forEach(sub => {
    let a = document.createElement('a'); a.textContent = sub.n; a.href = '#';
    a.onclick = (e) => { e.preventDefault(); loadPage(page, sub.f); };
    dropdown.appendChild(a);
  });

  if (page === 'launch' && !file) {
    content.innerHTML = '<h1>GoldenChain Launch Pad</h1><p>System bereit.</p>';
    return;
  }

  try {
    const response = await fetch(target);
    if (!response.ok) throw new Error();
    const markdown = await response.text();
    content.innerHTML = '<div class="markdown-body">' + marked.parse(markdown) + '</div>';
  } catch (e) {
    renderExplorer(); // Fallback zum Explorer bei fehlenden Dateien
  }
}
window.loadPage = loadPage;
window.addEventListener('load', () => loadPage('home'));
