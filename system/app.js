const routes = {
    home: { path: '../README.md', subs: [{n:'HOME ROOT', f:'../README.md'}, {n:'LICENSE (RFOF)', f:'../LICENSE.rfof'}] },
    doku: { path: '../content/whitepaper.md', subs: [
        {n:'WHITEPAPER', f:'../content/whitepaper.md'}, {n:'MATRIX', f:'../content/matrix.md'},
        {n:'EBENEN 1-9', f:'../content/README.md'}
    ]},
    notariat: { path: null, subs: [{n:'RECHTSRAUM', f:null}, {n:'URKUNDEN', f:null}] },
    explorer: { path: '../EuroChain/Explorer/data_stream.json', subs: [{n:'LIVE STREAM', f:'../EuroChain/Explorer/data_stream.json'}] },
    launch: { path: null, subs: [
        {n:'SYSTEM STATUS', f:null}, 
        {n:'EUROCHAIN CORE', f:'../EuroChain/README.md'},
        {n:'EURO-WALLET', f:'../EuroChain/EURO-Wallet/README.md'}
    ]}
};

// EUROCHAIN Button Logik (Rechte Ecke)
function injectEuroButton() {
    const nav = document.querySelector('.nav-right') || document.body;
    if (!document.getElementById('euro-trigger')) {
        let btn = document.createElement('div');
        btn.id = 'euro-trigger';
        btn.innerHTML = '<button onclick="loadPage(\'launch\')" style="background:#ffd700; color:#000; font-weight:bold; border:none; padding:10px; cursor:pointer; margin-left:20px;">EuroChain</button>';
        btn.style.float = 'right';
        document.querySelector('nav').appendChild(btn);
    }
}

async function loadPage(page, file = null) {
    const content = document.getElementById('content');
    const dropdown = document.getElementById('dynamic-dropdown');
    
    if (!routes[page]) page = 'home';
    const target = file || routes[page].path;

    // Dropdown füllen
    dropdown.innerHTML = '';
    routes[page].subs.forEach(sub => {
        let a = document.createElement('a'); a.textContent = sub.n; a.href = '#';
        a.onclick = (e) => { e.preventDefault(); loadPage(page, sub.f); };
        dropdown.appendChild(a);
    });

    if (page === 'notariat' || page === 'explorer') {
        content.innerHTML = '<div style="background:#000; color:#0f0; padding:30px; border:2px solid #ffd700; font-family:monospace;"><h2>>> SYSTEM_REINFORCED</h2><p>DATE: 2026-01-31</p><p>SYNC_ID: GC-EC-SYNC-2026-PZQQET</p><hr><p>Status: Synchronisiert mit EuroChain Core.</p></div>';
        return;
    }

    try {
        const response = await fetch(target);
        if (!response.ok) throw new Error();
        const markdown = await response.text();
        content.innerHTML = '<div class="markdown-body">' + marked.parse(markdown) + '</div>';
        window.scrollTo(0,0);
    } catch (e) {
        content.innerHTML = '<h1>INITIALIZING...</h1><p>Greife auf Root-Daten zu...</p>';
    }
}

window.loadPage = loadPage;
window.addEventListener('load', () => {
    loadPage('home');
    injectEuroButton();
});
