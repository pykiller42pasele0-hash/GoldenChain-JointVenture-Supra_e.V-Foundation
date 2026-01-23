const routes = {
  home: { 
    path: '../README.md', 
    dropdown: [
      { name: 'HOME ROOT', file: '../README.md' },
      { name: 'LICENSE (RFOF)', file: '../LICENSE.rfof' }
    ]
  },
  doku: { 
    path: '../content/whitepaper.md', 
    dropdown: [
      { name: 'WHITEPAPER', file: '../content/whitepaper.md' },
      { name: 'EBENE 1', file: '../content/ebene1.md' },
      { name: 'EBENE 2', file: '../content/ebene2.md' },
      { name: 'EBENE 3', file: '../content/ebene3.md' },
      { name: 'EBENE 4', file: '../content/ebene4.md' },
      { name: 'EBENE 5', file: '../content/ebene5.md' },
      { name: 'EBENE 6', file: '../content/ebene6.md' },
      { name: 'EBENE 7', file: '../content/ebene7.md' },
      { name: 'EBENE 8', file: '../content/ebene8.md' },
      { name: 'EBENE 9', file: '../content/ebene9.md' }
    ]
  }
};

function showNotariat(targetFile) {
    const content = document.getElementById('content');
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const hash = btoa(targetFile + timestamp).substring(0, 24).toUpperCase();
    
    content.innerHTML = \
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; font-family: 'Courier New', monospace;">
            <div style="border: 2px solid #ffd700; background: rgba(0,0,0,0.9); padding: 40px; border-radius: 5px; box-shadow: 0 0 30px rgba(255, 215, 0, 0.3); max-width: 800px; width: 90%;">
                <h1 style="color: #ffd700; margin-top: 0; letter-spacing: 5px; border-bottom: 1px solid #333; padding-bottom: 10px;">[!] NOTARIAT EXPLORER</h1>
                <div style="text-align: left; line-height: 1.6; color: #0f0;">
                    <p style="margin: 5px 0;"><span style="color: #888;">STATUS:</span> <span style="color: #fff; background: #c00; padding: 0 5px;">PENDING / PRIVATE</span></p>
                    <p style="margin: 5px 0;"><span style="color: #888;">ID:</span> \</p>
                    <p style="margin: 5px 0;"><span style="color: #888;">HASH:</span> \</p>
                    <p style="margin: 5px 0;"><span style="color: #888;">TIME:</span> \ GMT</p>
                    <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;">
                    <p style="color: #aaa; font-style: italic;">Dieses Modul ist urheberrechtlich geschützt oder befindet sich im Notarisierungsprozess der GoldenChain Foundation. Zugriff verweigert.</p>
                </div>
                <div style="margin-top: 30px;">
                    <a href="mailto:info@rfof-bitcoin.org" style="color: #000; background: #ffd700; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 3px;">ANTRAG STELLEN</a>
                </div>
            </div>
        </div>\;
}

async function loadPage(page, specificFile = null) {
  const content = document.getElementById('content');
  const dropdown = document.getElementById('dynamic-dropdown');
  
  if (!routes[page]) page = 'home';
  const targetPath = specificFile || routes[page].path;

  // Dropdown füllen
  dropdown.innerHTML = '';
  routes[page].dropdown.forEach(item => {
    let a = document.createElement('a');
    a.textContent = item.name; a.href = '#';
    a.onclick = (e) => { e.preventDefault(); loadPage(page, item.file); };
    dropdown.appendChild(a);
  });

  if (!targetPath) {
    showNotariat('ROOT_SYSTEM_ACCESS');
    return;
  }

  try {
    // Erzwinge Cache-Refresh bei Fetch
    const response = await fetch(targetPath, { cache: "no-cache" });
    if (!response.ok) throw new Error();
    const markdown = await response.text();
    content.innerHTML = '<div class="markdown-body">' + marked.parse(markdown) + '</div>';
    window.scrollTo(0,0);
  } catch (e) {
    showNotariat(targetPath);
  }
}

window.addEventListener('load', () => {
  const params = new URLSearchParams(window.location.search);
  const p = params.get('page') || 'home';
  const f = params.get('file');
  loadPage(p, f);
});
