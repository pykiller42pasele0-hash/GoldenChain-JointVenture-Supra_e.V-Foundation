const routes = {
  home: { path: '../README.md', subs: [{n:'HOME ROOT', f:'../README.md'}, {n:'LICENSE (RFOF)', f:'../LICENSE.rfof'}] },
  doku: { path: '../content/whitepaper.md', subs: [
    {n:'WHITEPAPER', f:'../content/whitepaper.md'}, {n:'MATRIX', f:'../content/matrix.md'},
    {n:'EBENE 1', f:'../content/ebene1.md'}, {n:'EBENE 2', f:'../content/ebene2.md'},
    {n:'EBENE 3', f:'../content/ebene3.md'}, {n:'EBENE 4', f:'../content/ebene4.md'},
    {n:'EBENE 5', f:'../content/ebene5.md'}, {n:'EBENE 6', f:'../content/ebene6.md'},
    {n:'EBENE 7', f:'../content/ebene7.md'}, {n:'EBENE 8', f:'../content/ebene8.md'},
    {n:'EBENE 9', f:'../content/ebene9.md'}
  ]},
  launch: { path: null, subs: [
    {n:'SYSTEM STATUS', f:null}, 
    {n:'EUROCHAIN CORE', f:'../EuroChain/README.md'},
    {n:'EURO-WALLET', f:'../EuroChain/EURO-Wallet/README.md'}
  ]}
};

async function loadPage(page, file = null) {
  const content = document.getElementById('content');
  const dropdown = document.getElementById('dynamic-dropdown');
  
  // Spezial-Logik für Notariat-Explorer (EuroChain Extension)
  if (page === 'notariat') {
    try {
      const response = await fetch('../EuroChain/Explorer/data_stream.json');
      const data = await response.json();
      content.innerHTML = \
        <div style="background:#000; color:#0f0; padding:30px; border:2px solid #ffd700; font-family:monospace;">
          <h2 style="color:#ffd700;">>> NOTARIAT_EXPLORER_v2.0</h2>
          <p>> LINKED_CHAIN: \</p>
          <p>> PARITY_STATUS: \</p>
          <hr style="border:1px solid #222;">
          <p>> 0ms MATHE-UNIT: ACTIVE</p>
          <p style="color:#ffd700;">[SYSTEM OK] EuroChain-Extension erfolgreich gekoppelt.</p>
        </div>\;
    } catch (e) {
      content.innerHTML = '<div style="background:#000; color:red; padding:30px;"><h2>>> NOTARIAT_ERROR</h2><p>EuroChain Explorer-Daten nicht gefunden.</p></div>';
    }
    return;
  }

  if (!routes[page]) page = 'home';
  const target = file || routes[page].path;

  // Dropdown-SITES Generation
  dropdown.innerHTML = '';
  routes[page].subs.forEach(sub => {
    let a = document.createElement('a'); a.textContent = sub.n; a.href = '#';
    a.onclick = (e) => { e.preventDefault(); loadPage(page, sub.f); };
    dropdown.appendChild(a);
  });

  try {
    const response = await fetch(target);
    if (!response.ok) throw new Error();
    const markdown = await response.text();
    content.innerHTML = '<div class="markdown-body">' + marked.parse(markdown) + '</div>';
  } catch (e) {
    content.innerHTML = '<h1 style="text-align:center;">SYSTEM INITIALIZING...</h1>';
  }
}
window.loadPage = loadPage;
window.addEventListener('load', () => loadPage('home'));
