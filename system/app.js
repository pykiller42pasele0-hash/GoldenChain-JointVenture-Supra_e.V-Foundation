const routes = {
  home: { path: '../README.md', subs: ['Vision', 'Mission', 'Team'] },
  doku: { path: '../content/whitepaper.md', subs: ['Ebene 1', 'Ebene 2', 'Ebene 3'] },
  launch: { path: null, subs: ['Blockchain', 'Nodes', 'Status'] }
};

async function loadPage(page) {
  const content = document.getElementById('content');
  const dropdown = document.getElementById('dynamic-dropdown');
  
  // Dropdown-Inhalt leeren und neu füllen
  dropdown.innerHTML = '';
  routes[page].subs.forEach(sub => {
    let a = document.createElement('a');
    a.textContent = sub;
    a.href = '#';
    dropdown.appendChild(a);
  });

  if (page === 'launch') {
    content.innerHTML = '<h1 style="text-align:center;">GoldenChain</h1><p style="text-align:center;">Die Funktions- und Systemebene wird geladen...</p>';
    return;
  }

  try {
    const response = await fetch(routes[page].path);
    const markdown = await response.text();
    // Zentrierte Markdown-Ausgabe
    content.innerHTML = '<div class="markdown-body">' + marked.parse(markdown) + '</div>';
  } catch (e) {
    content.innerHTML = '<p>Inhalt konnte nicht geladen werden.</p>';
  }
}
window.addEventListener('load', () => loadPage('home'));
