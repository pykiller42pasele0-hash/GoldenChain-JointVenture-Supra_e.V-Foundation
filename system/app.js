const routes = {
  home: { path: '../README.md', subs: ['Vision', 'Mission'] },
  doku: { path: '../content/whitepaper.md', subs: ['Ebene 1', 'Matrix'] },
  launch: { path: null, subs: ['Blockchain', 'Status'] }
};

async function loadPage(page) {
  const content = document.getElementById('content');
  const dropdown = document.getElementById('dynamic-dropdown');
  dropdown.innerHTML = '';
  routes[page].subs.forEach(sub => {
    let a = document.createElement('a');
    a.textContent = sub;
    a.href = '#';
    dropdown.appendChild(a);
  });

  if (page === 'launch') {
    content.innerHTML = '<h1 style="text-align:center;">GoldenChain</h1><p style="text-align:center;">System-Status: Online</p>';
    return;
  }

  try {
    const response = await fetch(routes[page].path);
    const markdown = await response.text();
    content.innerHTML = '<div class="markdown-body">' + marked.parse(markdown) + '</div>';
  } catch (e) {
    content.innerHTML = '<p>Inhalt konnte nicht geladen werden.</p>';
  }
}
window.addEventListener('load', () => loadPage('home'));
