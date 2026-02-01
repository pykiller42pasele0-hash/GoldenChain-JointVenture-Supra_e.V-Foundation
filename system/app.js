const RFOF_CORE = {
    version: "1.5",
    basePath: window.location.pathname.includes('/launch/') ? '../' : './',
    routes: {
        'home': 'README.md',
        'doku': 'content/whitepaper.md',
        'matrix': 'content/RFOF-GoldMatrix.md',
        'notary': 'RFOF-Golden-Explorer-notary/core_verification.log',
        'golden_ui': 'GOLDEN-Wallet/GOLDEN-Wallet-Core/frontend/index.html',
        'euro_ui': 'EuroChain/EURO-Wallet/frontend/index.html'
    }
};

async function loadPage(id) {
    const view = document.getElementById('content');
    const path = RFOF_CORE.routes[id] || `content/ebene${id}.md`;
    const fullPath = RFOF_CORE.basePath + path;

    try {
        const res = await fetch(fullPath);
        if(!res.ok) throw new Error();
        const text = await res.text();
        
        // Spezial-Handling für HTML-rApps (Iframes) oder Markdown
        if(path.endsWith('.html')) {
            view.innerHTML = `<iframe src="${fullPath}" style="width:100%; height:80vh; border:none; border-radius:8px; box-shadow: 0 0 20px #d4af37;"></iframe>`;
        } else {
            view.innerHTML = '<div class="markdown-body">' + (typeof marked !== 'undefined' ? marked.parse(text) : `<pre>${text}</pre>`) + '</div>';
        }
    } catch (e) {
        view.innerHTML = `<div style="color:#d4af37; padding:20px; border:1px solid #d4af37;"><h2>⚠️ Matrix Defizit</h2><p>Bauteil [${id}] unter ${fullPath} nicht gefunden.</p></div>`;
    }
}
window.addEventListener('load', () => loadPage('home'));
