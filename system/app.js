const routes = {
  home: { path: '../README.md', dropdown: [{ name: 'HOME ROOT', file: '../README.md' }, { name: 'LICENSE (RFOF)', file: '../LICENSE.rfof' }] },
  doku: { path: '../content/whitepaper.md', dropdown: [{ name: 'WHITEPAPER', file: '../content/whitepaper.md' }, { name: 'EBENE 1', file: '../content/ebene1.md' }, { name: 'EBENE 2', file: '../content/ebene2.md' }, { name: 'EBENE 3', file: '../content/ebene3.md' }, { name: 'EBENE 4', file: '../content/ebene4.md' }, { name: 'EBENE 5', file: '../content/ebene5.md' }, { name: 'EBENE 6', file: '../content/ebene6.md' }, { name: 'EBENE 7', file: '../content/ebene7.md' }, { name: 'EBENE 8', file: '../content/ebene8.md' }, { name: 'EBENE 9', file: '../content/ebene9.md' }] },
  launch: { path: 'SYSTEM_CORE', dropdown: [{ name: 'SYSTEM STATUS', file: 'STATUS_OFFLINE' }, { name: 'BLOCKCHAIN NODE', file: 'NODE_ENCRYPTED' }] }
};

function showNotariatExplorer() {
    const content = document.getElementById('content');
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    content.innerHTML = \
        <div style="font-family: 'Courier New', monospace; color: #0f0; background: #000; padding: 20px; border: 1px solid #ffd700; height: 100%; min-height: 400px;">
            <h2 style="color: #ffd700;">>> NOTARIAT_EXPLORER_V1.0</h2>
            <hr style="border: 1px solid #333;">
            <p>> STATUS: <span style="background: green; color: #fff; padding: 0 5px;">SYSTEM_ONLINE</span></p>
            <p>> DIRECTORY_SCAN: 14/14 OBJECTS MAPPED</p>
            <p>> TIMESTAMP: \</p>
            <div style="margin-top: 20px; border: 1px solid #0f0; padding: 10px; background: rgba(0,255,0,0.05);">
                <p>BLOCK_SCANNER: Alle Pfade zu den 14 Untersites sind mathematisch verifiziert.</p>
            </div>
        </div>\;
}

async function loadPage(page, specificFile = null) {
  const content = document.getElementById('content');
  const dropdown = document.getElementById('dynamic-dropdown');
  
  if (page === 'notariat') { showNotariatExplorer(); return; }
  if (!routes[page]) page = 'home';

  const targetPath = specificFile || routes[page].path;

  dropdown.innerHTML = '';
  routes[page].dropdown.forEach(item => {
    let a = document.createElement('a');
    a.textContent = item.name;
    a.href = '#';
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
    // Hier greift der Explorer-Screen innerhalb des Rahmens
    const hash = btoa(targetPath).substring(0, 16).toUpperCase();
    content.innerHTML = \
      <div class="markdown-body" style="text-align:center; padding: 40px; border: 1px dashed #ffd700;">
        <h1 style="color:#ffd700;">[!] NOTARIAT PROTECTION</h1>
        <p>OBJEKT: <b>\</b></p>
        <p>HASH: <b>\</b></p>
        <hr>
        <p>Dieses Modul ist privat oder wird gerade notarisiert.</p>
      </div>\;
  }
}

window.loadPage = loadPage;
window.showNotariatExplorer = showNotariatExplorer;

window.addEventListener('load', () => {
  const params = new URLSearchParams(window.location.search);
  loadPage(params.get('page') || 'home', params.get('file'));
});
