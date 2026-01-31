const RFOF_CORE = {
    version: "1.3",
    routes: {
        home: '../README.md',
        doku: '../content/whitepaper.md',
        matrix: '../content/matrix.md',
        notary: '../RFOF-Golden-Explorer-notary/final_seal.log'
    }
};

async function loadPage(id) {
    const content = document.getElementById('content');
    const path = RFOF_CORE.routes[id] || `../content/ebene${id}.md`;
    
    try {
        const response = await fetch(path);
        if(!response.ok) throw new Error();
        const markdown = await response.text();
        // Nutzt marked.js für das Rendering
        content.innerHTML = '<div class="markdown-body">' + marked.parse(markdown) + '</div>';
    } catch (e) {
        content.innerHTML = `<h2 style="color:#d4af37">Matrix Defizit</h2><p>Pfad ${id} nicht erreichbar.</p>`;
    }
}
window.addEventListener('load', () => loadPage('home'));
