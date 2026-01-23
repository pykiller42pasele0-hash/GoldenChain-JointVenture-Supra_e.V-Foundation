const routes = {
  home: { 
    path: 'README.md', 
    dropdown: [
      { name: 'HOME ROOT', file: 'README.md' },
      { name: 'LICENSE (RFOF)', file: 'LICENSE.rfof' }
    ]
  },
  doku: { 
    path: 'content/whitepaper.md', 
    dropdown: [
      { name: 'WHITEPAPER', file: 'content/whitepaper.md' },
      { name: 'EBENE 1', file: 'content/ebene1.md' },
      { name: 'EBENE 2', file: 'content/ebene2.md' },
      { name: 'EBENE 3', file: 'content/ebene3.md' },
      { name: 'EBENE 4', file: 'content/ebene4.md' },
      { name: 'EBENE 5', file: 'content/ebene5.md' },
      { name: 'EBENE 6', file: 'content/ebene6.md' },
      { name: 'EBENE 7', file: 'content/ebene7.md' },
      { name: 'EBENE 8', file: 'content/ebene8.md' },
      { name: 'EBENE 9', file: 'content/ebene9.md' }
    ]
  }
};

function showNotariat(targetFile) {
    const content = document.getElementById('content');
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const hash = btoa(targetFile + timestamp).substring(0, 32).toUpperCase();
    
    content.innerHTML = \
        <div class="notariat-explorer" style="text-align:center; margin-top:50px;">
            <h2 style="color:#ffd700; font-family:monospace;">[!] NOTARIAT EXPLORER ACTIVE</h2>
            <div style="background:#111; color:#0f0; padding:30px; border-radius:10px; border: 1px solid #ffd700; text-align:left; font-family:monospace; display:inline-block; min-width:80%;">
                <p style="color:#ffd700;">> OBJECT_ID: \</p>
                <p>> VALIDATION_HASH: \</p>
                <p>> STATUS: <span style="color:#fff; background:red; padding:2px 5px;">NOTARIZATION PENDING</span></p>
                <hr style="border:0; border-top:1px solid #333; margin:20px 0;">
                <p style="color:#888;">Dieses Modul ist privat oder wird gerade notarisiert.</p>
                <p>Kontakt: <a href="mailto:info@rfof-bitcoin.org" style="color:#ffd700; text-decoration:none;">info@rfof-bitcoin.org</a></p>
            </div>
        </div>\;
}

async function loadPage(page, specificFile = null) {
  const content = document.getElementById('content');
  const dropdown = document.getElementById('dynamic-dropdown');
  
  // Pfad-Logik: Wir gehen immer vom Hauptverzeichnis (Root) aus
  let targetFile = specificFile || (routes[page] ? routes[page].path : null);
  let fetchPath = targetFile ? window.location.origin + window.location.pathname.replace('launch/index.html', '') + targetFile : null;

  // Dropdown Menü bauen
  dropdown.innerHTML = '';
  if (routes[page]) {
    routes[page].dropdown.forEach(item => {
      let a = document.createElement('a');
      a.textContent = item.name;
      a.href = '#';
      a.onclick = (e) => { e.preventDefault(); loadPage(page, item.file); };
      dropdown.appendChild(a);
    });
  }

  if (page === 'notariat' || !fetchPath) {
    showNotariat(targetFile || 'Launch_System');
    return;
  }

  try {
    const response = await fetch(fetchPath);
    if (!response.ok) throw new Error();
    const markdown = await response.text();
    content.innerHTML = '<div class="markdown-body">' + marked.parse(markdown) + '</div>';
    window.scrollTo(0,0);
  } catch (e) {
    showNotariat(targetFile);
  }
}

window.addEventListener('load', () => {
  const params = new URLSearchParams(window.location.search);
  loadPage(params.get('page') || 'home', params.get('file'));
});
