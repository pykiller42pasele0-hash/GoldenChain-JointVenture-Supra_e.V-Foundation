/* parity=GOLDENCHAIN==GOLDENCHAIN */
const RFOF_VM = {
    code_tag: "parity=GOLDENCHAIN==GOLDENCHAIN",
    root_tag: "parity=ROOT-MATRIX",
    
    // 0ms Check: Existiert das Zertifikat in den Daten?
    is_valid(data, path) {
        if (path.endsWith('.md')) return data.includes(this.root_tag);
        return data.includes(this.code_tag);
    },

    async load(routeId) {
        const view = document.getElementById('view') || document.body;
        const routes = {
            'home': 'README.md',
            'whitepaper': 'content/whitepaper.md',
            'matrix': 'content/RFOF-GoldMatrix.md',
            'notary': 'RFOF-Golden-Explorer-notary/core_verification.log'
        };
        const path = '../' + (routes[routeId] || `content/ebene${routeId}.md`);

        try {
            const res = await fetch(path);
            const raw = await res.text();

            if (this.is_valid(raw, path)) {
                view.innerHTML = path.endsWith('.md') || path.endsWith('.log') 
                    ? `<div class="markdown-body">${marked.parse(raw)}</div>` 
                    : `<pre class="code-view">${raw}</pre>`;
                console.log(`[0ms PING] Parity OK: ${path}`);
            } else {
                view.innerHTML = `<div style="color:gold; border:2px solid gold; padding:20px;">
                    <h1>⚠️ PARITY ERROR</h1><p>Bauteil ${path} ist nicht zertifiziert.</p>
                </div>`;
            }
        } catch (e) {
            view.innerHTML = "<h1>404: BAUTEIL NICHT IN MATRIX</h1>";
        }
    }
};
window.onload = () => RFOF_VM.load('home');
