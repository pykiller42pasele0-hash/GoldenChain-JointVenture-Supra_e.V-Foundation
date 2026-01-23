const routes = {
  home: { title: 'HOME', file: '../README.md' },
  doku: { title: 'DOKU', folder: '../content/' },
  launch: { title: 'LAUNCH', content: '<h1 style="text-align:center;">GoldenChain</h1><p style="text-align:center;">Math-Engine: ± × ÷ v x² ? 8</p>' }
};

async function loadPage(page) {
  const content = document.getElementById('content');
  const dropdown = document.getElementById('dynamic-dropdown');
  dropdown.innerHTML = '';

  if (page === 'doku') {
    // Hier definieren wir deine 9 Slots (Ebene 1-9)
    // In einer echten Web-Umgebung würde man den Ordner via API listen, 
    // hier nutzen wir eine Liste deiner Dateien:
    const files = ['whitepaper', 'matrix', 'vision', 'ebene4', 'ebene5']; // Hier einfach Namen ergänzen
    
    files.slice(0, 9).forEach((file, index) => {
      let a = document.createElement('a');
      a.textContent = 'Ebene ' + (index + 1) + ' : ' + file.toUpperCase();
      a.onclick = () => renderMarkdown('../content/' + file + '.md');
      dropdown.appendChild(a);
    });
  }

  if (page === 'home') {
    renderMarkdown(routes.home.file);
  } else if (page === 'launch') {
    content.innerHTML = routes.launch.content;
  }
}

async function renderMarkdown(url) {
  const content = document.getElementById('content');
  try {
    const response = await fetch(url);
    const text = await response.text();
    // Marked mit Math-Support (einfaches Rendering)
    content.innerHTML = '<div class="markdown-body">' + marked.parse(text) + '</div>';
  } catch (e) {
    content.innerHTML = '<p>Datei nicht gefunden.</p>';
  }
}

window.addEventListener('load', () => loadPage('home'));
