const routes = {
  home: { path: '../README.md', dropdown: [{ name: 'HOME ROOT', file: '../README.md' }, { name: 'LICENSE (RFOF)', file: '../LICENSE.rfof' }] },
  doku: { path: '../content/whitepaper.md', dropdown: [{ name: 'WHITEPAPER', file: '../content/whitepaper.md' }, { name: 'EBENE 1', file: '../content/ebene1.md' }, { name: 'EBENE 2', file: '../content/ebene2.md' }, { name: 'EBENE 3', file: '../content/ebene3.md' }, { name: 'EBENE 4', file: '../content/ebene4.md' }, { name: 'EBENE 5', file: '../content/ebene5.md' }, { name: 'EBENE 6', file: '../content/ebene6.md' }, { name: 'EBENE 7', file: '../content/ebene7.md' }, { name: 'EBENE 8', file: '../content/ebene8.md' }, { name: 'EBENE 9', file: '../content/ebene9.md' }] },
  launch: { path: null, dropdown: [{ name: 'SYSTEM STATUS', file: null }, { name: 'BLOCKCHAIN NODE', file: null }] }
};

// Diese Funktion wird vom linken oberen Button aufgerufen
function showNotariatExplorer() {
    const content = document.getElementById('content');
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    content.innerHTML = \
        <div style="font-family: 'Courier New', monospace; color: #0f0; background: #000; padding: 20px; border: 1px solid #ffd700; height: 100%;">
            <h2 style="color: #ffd700;">>> NOTARIAT_EXPLORER_V1.0</h2>
            <hr style="border: 1px solid #333;">
            <p>> STATUS: <span style="background: green; color: #fff; padding: 0 5px;">SYSTEM_ONLINE</span></p>
            <p>> FOUNDER: JUSTIN KOCH</p>
            <p>> PROJECT: GOLDENCHAIN JOINT VENTURE</p>
            <p>> TIMESTAMP: \</p>
            <div style="margin-top: 20px; border: 1px solid #0f0; padding: 10px; background: rgba(0,255,0,0.05);">
                <p>BLOCK_SCANNER: Alle 14 Module (Home, Doku, Launch) sind mathematisch verzahnt.</p>
            </div>
        </div>\;
}

async function loadPage(page, specificFile = null) {
  const content = document.getElementById('content');
  const dropdown = document.getElementById('dynamic-dropdown');
  
  // Fallback falls Seite nicht existiert
  if (!routes[page] && page !== 'notariat') page = 'home';

  // Dropdown-Logik für alle 14 Untersites
  dropdown.innerHTML = '';
  if (routes[page] && routes[page].dropdown) {
    routes[page].dropdown.forEach(item => {
      let a = document.createElement('a');
      a.textContent = item.name;
      a.href = '#';
      a.onclick = (e) => { 
        e.preventDefault(); 
        if (item.file) { loadPage(page, item.file); } 
        else { showNotariatExplorer(); }
      };
      dropdown.appendChild(a);
    });
  }

  // Content-Wechsel
  if (page === 'notariat') {
    showNotariatExplorer();
    return;
  }

  const targetPath = specificFile || (routes[page] ? routes[page].path : null);

  if (page === 'launch' && !specificFile) {
    content.innerHTML = '<div class="markdown-body"><h1>GoldenChain Launch Pad</h1><p>Gehebelte Umsetzung unter info@rfof-bitcoin.org</p></div>';
    return;
  }

  try {
    const response = await fetch(targetPath);
    if (!response.ok) throw new Error();
    const markdown = await response.text();
    content.innerHTML = '<div class="markdown-body">' + marked.parse(markdown) + '</div>';
    window.scrollTo(0,0);
  } catch (e) {
    // Wenn Datei fehlt (Ebene 1-9), zeige Notariat-Meldung im Inhaltsfenster
    content.innerHTML = '<div class="markdown-body"><h1>Inhalt folgt</h1><p>Dieses Modul [\] wird derzeit notarisiert.</p></div>';
  }
}

// Globaler Export damit die Buttons in der HTML sie finden
window.loadPage = loadPage;
window.showNotariatExplorer = showNotariatExplorer;

window.addEventListener('load', () => {
  const params = new URLSearchParams(window.location.search);
  loadPage(params.get('page') || 'home', params.get('file'));
});
