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

// MATHEMATISCHE NOTARIAT-FUNKTION (Erzeugt den Schutz-Inhalt)
function showNotariat(targetFile) {
    const content = document.getElementById('content');
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const hash = btoa(targetFile + timestamp).substring(0, 24).toUpperCase();
    content.innerHTML = '<div class="markdown-body"><h1>[!] NOTARIAT EXPLORER</h1><p>Status: <b>PENDING / PRIVATE</b></p><p>ID: '+targetFile+'</p><p>Hash: '+hash+'</p><hr><p>Dieses Modul wird derzeit notarisiert oder ist privat.</p></div>';
}

async function loadPage(page, specificFile = null) {
  const content = document.getElementById('content');
  const dropdown = document.getElementById('dynamic-dropdown');
  
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

  if (page === 'notariat' || (page === 'launch' && !specificFile)) {
    showNotariat(specificFile || 'Launch_Pad_Core');
    return;
  }

  try {
    const response = await fetch(targetPath);
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
