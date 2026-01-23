const routes = {
  home: { path: '../README.md', dropdown: [{ name: 'HOME ROOT', file: '../README.md' }, { name: 'LICENSE (RFOF)', file: '../LICENSE.rfof' }] },
  doku: { path: '../content/whitepaper.md', dropdown: [{ name: 'WHITEPAPER', file: '../content/whitepaper.md' }, { name: 'EBENE 1', file: '../content/ebene1.md' }, { name: 'EBENE 2', file: '../content/ebene2.md' }, { name: 'EBENE 3', file: '../content/ebene3.md' }, { name: 'EBENE 4', file: '../content/ebene4.md' }, { name: 'EBENE 5', file: '../content/ebene5.md' }, { name: 'EBENE 6', file: '../content/ebene6.md' }, { name: 'EBENE 7', file: '../content/ebene7.md' }, { name: 'EBENE 8', file: '../content/ebene8.md' }, { name: 'EBENE 9', file: '../content/ebene9.md' }] },
  launch: { path: 'SYSTEM_START', dropdown: [{ name: 'SYSTEM STATUS', file: 'STATUS_OFFLINE' }, { name: 'BLOCKCHAIN NODE', file: 'NODE_ENCRYPTED' }] }
};

function renderExplorerInterface(title = "NOTARIAT_EXPLORER_V1.0", detail = "SYSTEM_SYNC_ACTIVE") {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const sessionHash = btoa(timestamp).substring(0, 12).toUpperCase();
    return \
        <div style="font-family: 'Courier New', monospace; color: #0f0; background: #000; padding: 30px; border: 2px solid #ffd700; min-height: 450px; box-shadow: inset 0 0 20px rgba(0,255,0,0.1);">
            <h2 style="color: #ffd700; border-bottom: 1px solid #ffd700; padding-bottom: 10px;">>> \</h2>
            <div style="margin-top:20px; line-height: 1.8;">
                <p>> STATUS: <span style="background:#0f0; color:#000; padding:0 5px; font-weight:bold;">ONLINE</span></p>
                <p>> OBJECT_ID: \</p>
                <p>> AUTH_HASH: \</p>
                <p>> TIMESTAMP: \ GMT</p>
                <hr style="border:0; border-top: 1px solid #222; margin: 20px 0;">
                <p style="color: #ffd700;">[SYSTEM_LOG]: Alle 15 Module (inkl. Explorer-Core) sind mathematisch verzahnt.</p>
                <div style="background: rgba(255, 215, 0, 0.1); padding: 15px; border: 1px solid #333; margin-top: 20px;">
                    <p style="color: #fff;">>> Dieser Bereich dient der kryptografischen Verifizierung der Foundation-Inhalte.</p>
                </div>
            </div>
        </div>\;
}

async function loadPage(page, specificFile = null) {
  const content = document.getElementById('content');
  const dropdown = document.getElementById('dynamic-dropdown');
  
  // 15. Modul: Manueller Explorer Aufruf
  if (page === 'notariat') {
    content.innerHTML = renderExplorerInterface("MANUAL_SYSTEM_OVERRIDE", "EXPLORER_CORE_ACCESS");
    dropdown.innerHTML = '<a href="#" onclick="loadPage(\'home\')">ZURÜCK ZUM ROOT</a>';
    return;
  }

  if (!routes[page]) page = 'home';
  const targetPath = specificFile || routes[page].path;

  // Dropdown Rendering
  dropdown.innerHTML = '';
  routes[page].dropdown.forEach(item => {
    let a = document.createElement('a');
    a.textContent = item.name; a.href = '#';
    a.onclick = (e) => { e.preventDefault(); loadPage(page, item.file); };
    dropdown.appendChild(a);
  });

  try {
    const response = await fetch(targetPath);
    if (!response.ok) throw new Error();
    const markdown = await response.text();
    content.innerHTML = '<div class="markdown-body">' + marked.parse(markdown) + '</div>';
    window.scrollTo(0,0);
  } catch (e) {
    // Automatischer Explorer-Schutz bei fehlenden Dateien
    content.innerHTML = renderExplorerInterface("NOTARIAT_PROTECTION_ACTIVE", targetPath);
  }
}

window.loadPage = loadPage;

window.addEventListener('load', () => {
  const params = new URLSearchParams(window.location.search);
  loadPage(params.get('page') || 'home', params.get('file'));
});
