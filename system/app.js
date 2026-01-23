// Steuert, welche Seite im Rahmen angezeigt wird
const routes = {
  home: '../README.md',
  doku: '../content/whitepaper.md',
  launch: null
};

async function loadPage(page) {
  const content = document.getElementById('content');
  if (page === 'launch' || !routes[page]) {
    content.innerHTML = '<h1>LAUNCH</h1><p>Hier beginnt die Funktions- und Systemebene.</p>';
    return;
  }
  try {
    const response = await fetch(routes[page]);
    const html = await response.text();
    content.innerHTML = html;
  } catch (e) {
    content.innerHTML = '<p>Inhalt konnte nicht geladen werden.</p>';
  }
}
window.addEventListener('load', () => loadPage('launch'));
