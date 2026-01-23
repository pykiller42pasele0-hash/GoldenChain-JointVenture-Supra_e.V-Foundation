const routes = {
  home: { path: '../README.md', subs: ['Vision', 'Mission'] },
  doku: { path: '../content/whitepaper.md', subs: ['Matrix', 'Protokoll'] },
  matrix: { path: '../content/matrix.md', subs: ['OPA-OLET', 'Logik'] },
  launch: { path: null, subs: ['Blockchain', 'Nodes'] }
};

async function loadPage(page) {
  const content = document.getElementById('content');
  const dropdown = document.getElementById('dynamic-dropdown');
  dropdown.innerHTML = '';
  routes[page].subs.forEach(sub => {
    let a = document.createElement('a'); a.textContent = sub; a.href = '#';
    dropdown.appendChild(a);
  });
  if (page === 'launch') {
    content.innerHTML = '<h1 style="text-align:center;">GoldenChain</h1><p style="text-align:center;">Systemebene aktiv.</p>';
    return;
  }
  try {
    const response = await fetch(routes[page].path);
    const markdown = await response.text();
    content.innerHTML = '<div class="markdown-body">' + marked.parse(markdown) + '</div>';
  } catch (e) {
    content.innerHTML = '<p>Fehler beim Laden von ' + page + '</p>';
  }
}
window.addEventListener('load', () => loadPage('home'));
