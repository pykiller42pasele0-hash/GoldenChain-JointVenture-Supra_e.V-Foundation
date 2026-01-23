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
    const markdown = await response.text();
    
    // Nutzt Marked.js um das Markdown in schönes HTML umzuwandeln
    content.innerHTML = marked.parse(markdown);
    
    // Optional: Styling für das gerenderte Markdown hinzufügen
    content.style.lineHeight = "1.6";
    content.style.fontFamily = "sans-serif";
  } catch (e) {
    content.innerHTML = '<p>Inhalt konnte nicht geladen werden.</p>';
  }
}
window.addEventListener('load', () => loadPage('launch'));
