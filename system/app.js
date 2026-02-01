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
