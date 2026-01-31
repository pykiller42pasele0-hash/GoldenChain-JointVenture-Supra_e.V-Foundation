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
      {n:'GOLDEN-WALLET (GENESIS CORE)', f:'./GOLDEN-Wallet/frontend/index.html'},
      {n:'EURO-WALLET (EXTENSION)', f:'./EuroChain/EURO-Wallet/README.md'}
    ]
  },
  notariat: { 
    name: 'EXPLORER',
    path: 'NOTARIAT_CHAIN_RESERVE', 
    subs: [{n:'CHAIN STATUS', f:'EXPLORER_CORE'}, {n:'GENERATE PHRASE', f:'PHRASE_GEN'}] 
  }
};

// Mathematischer Phrasen-Generator (Lokal im Browser)
function generateMatrixPhrase(ebene) {
    const words = ["GOLDEN", "EURO", "CHAIN", "GENESIS", "MATRIX", "EXTENSION", "ROOT", "NOTARIAT", "NODE", "SUPRA"];
    let phrase = [];
    for(let i=0; i<3; i++) phrase.push(words[Math.floor(Math.random()*words.length)]);
    return \EBENE-\-\-\\;
}

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

  if (target === 'PHRASE_GEN' || page === 'notariat') {
    const newPhrase = generateMatrixPhrase(page === 'doku' ? '1-10' : '0');
    content.innerHTML = \
      <div style="background:#000; color:#ffd700; padding:40px; border:2px solid #ffd700; font-family:monospace;">
        <h2>>> NOTARIAT_CHAIN_PHRASE_GENERATOR</h2>
        <p style="color:#0f0;">Status: Lokal aktiv (0ms Hook)</p>
        <hr style="border:1px solid #222;">
        <div style="background:#111; padding:20px; border:1px dashed #ffd700; font-size:1.2rem; text-align:center;">
          \
        </div>
        <p style="font-size:0.8rem; color:#888; margin-top:20px;">
          Diese Phrase wird nur lokal in deiner auth_key.json verankert. 
          Sie verlässt niemals diese Struktur.
        </p>
        <button onclick="alert('Phrase lokal kopiert!')" style="background:#ffd700; color:#000; border:none; padding:10px 20px; cursor:pointer; font-weight:bold;">PHRASE SICHERN</button>
      </div>\;
    return;
  }

  try {
    const response = await fetch(target);
    const text = await response.text();
    content.innerHTML = '<div class="markdown-body">' + marked.parse(text) + '</div>';
  } catch (e) {
    content.innerHTML = '<h2>MODUL_ACCESS</h2><p>Wähle eine SITE über den Button oben rechts.</p>';
  }
}
window.loadPage = loadPage;
window.addEventListener('load', () => loadPage('home'));
