const routes = {
  home: { path: '../README.md', dropdown: [{ name: 'HOME ROOT', file: '../README.md' }, { name: 'LICENSE (RFOF)', file: '../LICENSE.rfof' }] },
  doku: { path: '../content/whitepaper.md', dropdown: [{ name: 'WHITEPAPER', file: '../content/whitepaper.md' }, { name: 'EBENE 1', file: '../content/ebene1.md' }, { name: 'EBENE 2', file: '../content/ebene2.md' }, { name: 'EBENE 3', file: '../content/ebene3.md' }, { name: 'EBENE 4', file: '../content/ebene4.md' }, { name: 'EBENE 5', file: '../content/ebene5.md' }, { name: 'EBENE 6', file: '../content/ebene6.md' }, { name: 'EBENE 7', file: '../content/ebene7.md' }, { name: 'EBENE 8', file: '../content/ebene8.md' }, { name: 'EBENE 9', file: '../content/ebene9.md' }] },
  launch: { path: null, dropdown: [{ name: 'SYSTEM STATUS', file: null }, { name: 'BLOCKCHAIN NODE', file: null }] }
};

function showNotariatExplorer() {
    const content = document.getElementById('content');
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const sessionHash = btoa(Math.random()).substring(0, 16).toUpperCase();
    
    content.innerHTML = \
        <div class="explorer-fullscreen" style="font-family: 'Courier New', monospace; color: #0f0; background: #050505; padding: 20px; border: 1px solid #ffd700; height: 100%; box-sizing: border-box; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #ffd700; padding-bottom: 10px; margin-bottom: 20px;">
                <h2 style="color: #ffd700; margin: 0;">>> NOTARIAT_EXPLORER_V1.0</h2>
                <span style="color: #888;">SESSION: \</span>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="border: 1px solid #333; padding: 15px; background: rgba(255, 215, 0, 0.05);">
                    <h3 style="color: #ffd700;">SYSTEM_METRICS</h3>
                    <p>> NODE_STATUS: <span style="color: #fff; background: green; padding: 0 5px;">ACTIVE</span></p>
                    <p>> LATENCY: 0ms (MATH_SYNC)</p>
                    <p>> ARCHITECTURE: C++/PYTHON/JS</p>
                </div>
                <div style="border: 1px solid #333; padding: 15px; background: rgba(255, 215, 0, 0.05);">
                    <h3 style="color: #ffd700;">SECURITY_LOG</h3>
                    <p>> LAST_VERIFICATION: \</p>
                    <p>> ENCRYPTION: RFOF_ULTRA_SECURE</p>
                    <p>> AUTHORITY: JUSTIN KOCH (FOUNDER)</p>
                </div>
            </div>
            <div style="margin-top: 20px; border: 1px solid #333; padding: 15px;">
                <h3 style="color: #ffd700;">BLOCKCHAIN_FEED</h3>
                <div id="log-feed" style="font-size: 12px; color: #0a0;">
                    <p>[INFO] Initializing Blockchain Interface...</p>
                    <p>[OK] Mathematical Grid Synced (0ms)</p>
                    <p>[WARN] Unauthorized access to Ebene 1-9 blocked by Notariat.</p>
                </div>
            </div>
        </div>\;
}

async function loadPage(page, specificFile = null) {
  const content = document.getElementById('content');
  const dropdown = document.getElementById('dynamic-dropdown');
  
  if (page === 'notariat') {
      showNotariatExplorer();
      return;
  }

  const targetPath = specificFile || (routes[page] ? routes[page].path : null);
  dropdown.innerHTML = '';
  if (routes[page]) {
    routes[page].dropdown.forEach(item => {
      let a = document.createElement('a');
      a.textContent = item.name; a.href = '#';
      a.onclick = (e) => { e.preventDefault(); loadPage(page, item.file); };
      dropdown.appendChild(a);
    });
  }

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
    content.innerHTML = '<div class="markdown-body"><h1>Inhalt folgt</h1><p>Dieses Modul wird derzeit notarisiert oder ist privat.</p></div>';
  }
}

window.addEventListener('load', () => {
  const params = new URLSearchParams(window.location.search);
  loadPage(params.get('page') || 'home', params.get('file'));
});
