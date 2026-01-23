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
  },
  launch: { 
    path: null, 
    dropdown: [
      { name: 'SYSTEM STATUS', file: null },
      { name: 'BLOCKCHAIN NODE', file: null }
    ]
  }
};

function showNotariat(targetFile) {
    const content = document.getElementById('content');
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const hash = btoa(targetFile + timestamp).substring(0, 32);
    
    content.innerHTML = 
        <div class="notariat-explorer">
            <h2 style="color:#ffd700;">NOTARIAT EXPLORER</h2>
            <div style="background:#222; padding:20px; border-radius:5px; border-left: 5px solid #ffd700; text-align:left; font-family:monospace;">
                <p>> STATUS: PENDING / NOTARIZED</p>
                <p>> OBJECT: \</p>
                <p>> HASH: \</p>
                <p>> TIMESTAMP: \</p>
                <p>> AUTHORITY: Founder Justin Koch</p>
                <hr style="border:0; border-top:1px solid #444;">
                <p style="color:#aaa;">Dieses Modul ist privat oder befindet sich im Notarisierungsprozess. 
                Die Verifizierung erfolgt über die Blockchain-Infrastruktur der GoldenChain Foundation.</p>
                <p>Anfragen: <a href="mailto:info@rfof-bitcoin.org" style="color:#ffd700;">info@rfof-bitcoin.org</a></p>
            </div>
        </div>
    ;
}

async function loadPage(page, specificFile = null) {
  const content = document.getElementById('content');
  const dropdown = document.getElementById('dynamic-dropdown');
  
  // Pfad-Korrektur für den Direkt-Link (falls file=../LICENSE.rfof übergeben wird)
  let targetPath = specificFile || routes[page].path;

  dropdown.innerHTML = '';
  routes[page].dropdown.forEach(item => {
    let a = document.createElement('a');
    a.textContent = item.name;
    a.href = '#';
    a.onclick = (e) => { e.preventDefault(); loadPage(page, item.file); };
    dropdown.appendChild(a);
  });

  if (page === 'notariat') {
      showNotariat('Global System Audit');
      return;
  }

  try {
    const response = await fetch(targetPath);
    if (!response.ok) throw new Error();
    const markdown = await response.text();
    content.innerHTML = '<div class="markdown-body">' + marked.parse(markdown) + '</div>';
    window.scrollTo(0,0);
  } catch (e) {
    showNotariat(targetPath || 'Unknown Module');
  }
}

window.addEventListener('load', () => {
  const params = new URLSearchParams(window.location.search);
  const p = params.get('page') || 'home';
  const f = params.get('file');
  loadPage(p, f);
});
