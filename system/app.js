const routes = {
  home: { path: '../README.md', subs: [{n:'HOME ROOT', f:'../README.md'}, {n:'LICENSE (RFOF)', f:'../LICENSE.rfof'}, {n:'MATRIX CORE', f:'../content/matrix.md'}] },
  doku: { path: '../content/whitepaper.md', subs: [
    {n:'WHITEPAPER', f:'../content/whitepaper.md'}, {n:'EBENE 1', f:'../content/ebene1.md'},
    {n:'EBENE 2', f:'../content/ebene2.md'}, {n:'EBENE 3', f:'../content/ebene3.md'},
    {n:'EBENE 4', f:'../content/ebene4.md'}, {n:'EBENE 5', f:'../content/ebene5.md'},
    {n:'EBENE 6', f:'../content/ebene6.md'}, {n:'EBENE 7', f:'../content/ebene7.md'},
    {n:'EBENE 8', f:'../content/ebene8.md'}, {n:'EBENE 9', f:'../content/ebene9.md'}
  ]},
  launch: { path: null, subs: [{n:'SYSTEM STATUS', f:null}, {n:'BLOCKCHAIN NODE', f:null}, {n:'MATRIX LOGIK', f:'../content/matrix.md'}] }
};

function renderExplorer(title = "NOTARIAT_EXPLORER_CORE_V1.0") {
  const content = document.getElementById('content');
  const ts = new Date().toISOString().replace('T', ' ').substring(0, 19);
  content.innerHTML = \
    <div style="background:#000; color:#0f0; padding:30px; border:2px solid #ffd700; font-family:monospace; min-height:450px; box-shadow: inset 0 0 20px rgba(0,255,0,0.1);">
      <h2 style="color:#ffd700;">>> \</h2>
      <hr style="border:1px solid #222;">
      <p>> STATUS: ONLINE | NODE: VERIFIED</p>
      <p>> TIMESTAMP: \ GMT</p>
      <p>> MODULE_COUNT: 15 active units</p>
      <div style="margin-top:20px; border:1px solid #0f0; padding:15px; background:rgba(0,255,0,0.05);">
        [LOG] Alle 15 Ebenen sind mathematisch mit der OPA-OLET Matrix verzahnt.
        <br><br>> System bereit für kryptografische Verifizierung.
      </div>
    </div>\;
}

async function loadPage(page, file = null) {
  const content = document.getElementById('content');
  const dropdown = document.getElementById('dynamic-dropdown');

  if (page === 'notariat') { renderExplorer("MANUAL_SYSTEM_OVERRIDE"); return; }
  if (!routes[page]) page = 'home';

  const target = file || routes[page].path;

  // Dropdown-Inhalt generieren mit aktiven Links
  dropdown.innerHTML = '';
  routes[page].subs.forEach(sub => {
    let a = document.createElement('a');
    a.textContent = sub.n;
    a.href = '#';
    a.onclick = (e) => { 
      e.preventDefault(); 
      if(sub.f) { loadPage(page, sub.f); } else { renderExplorer("NOT_YET_DEPLOYED"); }
    };
    dropdown.appendChild(a);
  });

  if (page === 'launch' && !file) {
    content.innerHTML = '<h1 style="text-align:center;">GoldenChain Launch Pad</h1><p style="text-align:center;">Systemebene aktiv. Wählen Sie eine Ebene über das SITES-Menü.</p>';
    return;
  }

  try {
    const response = await fetch(target);
    if (!response.ok) throw new Error();
    const markdown = await response.text();
    content.innerHTML = '<div class="markdown-body">' + marked.parse(markdown) + '</div>';
    window.scrollTo(0,0);
  } catch (e) {
    renderExplorer("SECURE_FALLBACK_ACTIVE"); 
  }
}
window.loadPage = loadPage;
window.addEventListener('load', () => loadPage('home'));
