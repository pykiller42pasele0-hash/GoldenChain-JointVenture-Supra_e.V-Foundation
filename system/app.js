const routes = {
  home: { 
    name: 'HOME',
    path: '../README.md', 
    subs: [{n:'EBENE 0: ROOT', f:'../README.md'}, {n:'LICENSE (RFOF)', f:'../LICENSE.rfof'}] 
  },
  doku: { 
    name: 'DOKUMENTATION',
    path: '../content/whitepaper.md', 
    subs: [
      {n:'WHITEPAPER', f:'../content/whitepaper.md'},
      {n:'EBENE 1', f:'../content/ebene1.md'}, {n:'EBENE 2', f:'../content/ebene2.md'},
      {n:'EBENE 3', f:'../content/ebene3.md'}, {n:'EBENE 4', f:'../content/ebene4.md'},
      {n:'EBENE 5', f:'../content/ebene5.md'}, {n:'EBENE 6', f:'../content/ebene6.md'},
      {n:'EBENE 7', f:'../content/ebene7.md'}, {n:'EBENE 8', f:'../content/ebene8.md'},
      {n:'EBENE 9', f:'../content/ebene9.md'}, {n:'EBENE 10: MATRIX', f:'../content/matrix.md'}
    ]
  },
  launch: { 
    name: 'LAUNCH',
    path: null, 
    subs: [
      {n:'GOLDENCHAIN (GENESIS)', f:'../README.md'},
      {n:'GOLDEN-WALLET', f:'../launch/wallet.md'},
      {n:'EUROCHAIN (EXTENSION)', f:'../EuroChain/README.md'},
      {n:'EURO-WALLET', f:'../EuroChain/EURO-Wallet/README.md'}
    ]
  },
  notariat: { 
    name: 'EXPLORER',
    path: 'NOTARIAT_CHAIN_RESERVE', 
    subs: [{n:'CHAIN STATUS', f:'EXPLORER_CORE'}, {n:'RE-VERIFY', f:'RE-VERIFY'}] 
  }
};

function renderExplorer(target = "SYSTEM") {
    const content = document.getElementById('content');
    content.innerHTML = \
        <div style="background:#000; color:#0f0; padding:30px; border:2px solid #ffd700; font-family:monospace; min-height:400px;">
            <h2 style="color:#ffd700;">>> NOTARIAT_CHAIN_EXPLORER</h2>
            <hr style="border:1px solid #222;">
            <p>> ADDR: \</p>
            <p>> STATUS: <span style="background:red; color:#fff; padding:0 5px;">LOCKED</span></p>
            <p>> SYNC: GC-EC-SYNC-2026-PZQQET</p>
        </div>\;
}

async function loadPage(page, file = null) {
  const content = document.getElementById('content');
  const dropdown = document.getElementById('dynamic-dropdown');
  const siteBtnText = document.getElementById('site-btn-text');
  
  if (!routes[page]) page = 'home';
  const target = file || routes[page].path;

  // Update SITES Button Text & Dropdown
  siteBtnText.textContent = routes[page].name + " SITES";
  dropdown.innerHTML = '';
  routes[page].subs.forEach(sub => {
    let a = document.createElement('a'); a.textContent = sub.n; a.href = '#';
    a.onclick = (e) => { e.preventDefault(); loadPage(page, sub.f); };
    dropdown.appendChild(a);
  });

  if (page === 'notariat' || target === 'EXPLORER_CORE') {
    renderExplorer(target);
    return;
  }

  try {
    const response = await fetch(target);
    if (!response.ok) throw new Error();
    const markdown = await response.text();
    content.innerHTML = '<div class="markdown-body">' + marked.parse(markdown) + '</div>';
    window.scrollTo(0,0);
  } catch (e) {
    renderExplorer(target);
  }
}
window.loadPage = loadPage;
window.addEventListener('load', () => loadPage('home'));
