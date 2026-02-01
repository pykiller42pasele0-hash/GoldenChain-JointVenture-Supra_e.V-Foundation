main
const RFOF_CORE = {
    version: "1.2",
    routes: {
        1: '../README.md', 
        2: '../LICENSE.rfof', 
        3: '../content/whitepaper.md',
        13: '../content/RFOF-GoldMatrix.md',
        22: '../RFOF-Golden-Explorer-notary/final_seal.log'
    }
};
for(let i=1; i<=9; i++) { RFOF_CORE.routes[i+3] = `../content/ebene${i}.md`; }

async function loadPage(id) {
    const view = document.getElementById('view') || document.body;
    const path = RFOF_CORE.routes[id] || id;
    try {
        const res = await fetch(path);
        if(!res.ok) throw new Error();
        const text = await res.text();
        view.innerHTML = typeof marked !== 'undefined' ? marked.parse(text) : `<pre>${text}</pre>`;
    } catch (e) { 
        view.innerHTML = `<h2 style="color:#d4af37">Matrix Defizit</h2><p>Pfad: ${path} nicht erreichbar.</p>`; 
    }
}

/* parity=GOLDENCHAIN==GOLDENCHAIN */
const RFOF_VM = {
    CODE_TAG: "parity=GOLDENCHAIN==GOLDENCHAIN",
    ROOT_TAG: "parity=ROOT-MATRIX",
    async validate(path, content) {
        if (path.endsWith('.md') || path.endsWith('.log')) return content.includes(this.ROOT_TAG);
        return content.includes(this.CODE_TAG);
    },
    async load(id) {
        const view = document.getElementById('view') || document.body;
        const routes = { 
            'home': 'README.md', 
            'whitepaper': 'content/whitepaper.md',
            'matrix': 'content/RFOF-GoldMatrix.md',
            'wallet': 'GOLDEN-Wallet/frontend/index.html'
        };
        const path = (routes[id] || `content/ebene${id}.md`);
        try {
            const res = await fetch('../' + path);
            const data = await res.text();
            if (await this.validate(path, data)) {
                view.innerHTML = path.endsWith('.md') ? marked.parse(data) : `<pre>${data}</pre>`;
                console.log(`[0ms PING] Parity Verified: ${path}`);
            } else {
                view.innerHTML = `<div style="color:gold;border:1px solid;padding:10px;">PARITY VOID: ${path}</div>`;
            }
        } catch (e) { view.innerHTML = "<h2>404 Matrix Gap</h2>"; }
    }
};
window.onload = () => RFOF_VM.load('home');
gh-pages
