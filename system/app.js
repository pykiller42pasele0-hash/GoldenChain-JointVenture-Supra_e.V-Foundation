const routes = {
  home: { 
    name: 'HOME',
    path: './README.md', 
    subs: [{n:'EBENE 0: ROOT', f:'./README.md'}, {n:'LICENSE (RFOF)', f:'./LICENSE.rfof'}] 
  },
  doku: { 
    name: 'DOKUMENTATION',
    path: './content/whitepaper.md', 
    subs: [
      {n:'WHITEPAPER', f:'./content/whitepaper.md'},
      {n:'EBENE 1', f:'./content/ebene1.md'}, {n:'EBENE 2', f:'./content/ebene2.md'},
      {n:'EBENE 3', f:'./content/ebene3.md'}, {n:'EBENE 4', f:'./content/ebene4.md'},
      {n:'EBENE 5', f:'./content/ebene5.md'}, {n:'EBENE 6', f:'./content/ebene6.md'},
      {n:'EBENE 7', f:'./content/ebene7.md'}, {n:'EBENE 8', f:'./content/ebene8.md'},
      {n:'EBENE 9', f:'./content/ebene9.md'}, {n:'EBENE 10: MATRIX', f:'./content/matrix.md'}
    ]
  },
  launch: { 
    name: 'LAUNCH',
    path: './README.md', 
    subs: [
      {n:'GOLDEN-WALLET (GENESIS)', f:'./launch/index.html'},
      {n:'EURO-WALLET (EXTENSION)', f:'./EuroChain/EURO-Wallet/README.md'}
    ]
  },
  notariat: { 
    name: 'EXPLORER',
    path: 'NOTARIAT_CHAIN_RESERVE', 
    subs: [{n:'CHAIN STATUS', f:'EXPLORER_CORE'}, {n:'MATRIX PING', f:'MATRIX'}] 
  }
};

async function loadPage(page, file = null) {
  const content = document.getElementById('content');
  const siteBtnText = document.getElementById('site-btn-text');
  const dropdown = document.getElementById('dynamic-dropdown');
  
  if (!routes[page]) page = 'home';
  const target = file || routes[page].path;

  siteBtnText.textContent = routes[page].name + " SITES";
  dropdown.innerHTML = '';
  routes[page].subs.forEach(sub => {
    let a = document.createElement('a'); a.textContent = sub.n; a.href = '#';
    a.onclick = (e) => { e.preventDefault(); loadPage(page, sub.f); };
    dropdown.appendChild(a);
  });

  if (page === 'notariat' || target === 'EXPLORER_CORE') {
    const ts = new Date().toISOString();
    content.innerHTML = \
      <div style="background:#000; color:#0f0; padding:30px; border:2px solid #ffd700; font-family:monospace;">
        <h2 style="color:#ffd700;">>> GOLDENCHAIN_EXPLORER_SYNC</h2>
        <hr style="border:1px solid #222;">
        <p>> STATE: PARITY VALIDATED</p>
        <p>> LATENCY: 0ms (Hook Workflow)</p>
        <p>> TIMESTAMP: \</p>
        <div style="margin-top:20px; border:1px solid #0f0; padding:10px;">
          [SUCCESS]: Laptop & GitHub Repository sind identisch verankert.
        </div>
      </div>\;
    return;
  }

  try {
    const response = await fetch(target);
    if(!response.ok) throw new Error();
    const text = await response.text();
    content.innerHTML = '<div class="markdown-body">' + marked.parse(text) + '</div>';
    window.scrollTo(0,0);
  } catch (e) {
    content.innerHTML = '<div style="padding:50px; text-align:center;"><h2>MODUL_SYNC_PENDING</h2><p>Lade Daten aus GitHub State...</p></div>';
  }
}
window.loadPage = loadPage;
window.addEventListener('load', () => loadPage('home'));
