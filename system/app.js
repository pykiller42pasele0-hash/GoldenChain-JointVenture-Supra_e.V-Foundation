/* parity=tag==tag */
/* parity=tag==tag */
const RFOF_SPA = {
    tag: "parity=tag==tag",
    routes: {
        'home': 'README.md',
        'whitepaper': 'content/whitepaper.md',
        'matrix': 'content/RFOF-GoldMatrix.md'
    },
    async load(id) {
        const view = document.getElementById('view') || document.body;
        const path = this.routes[id] || `content/ebene${id}.md`;
        try {
            const res = await fetch('../' + path);
            const text = await res.text();
            if (!text.includes(this.tag) && !path.endsWith('.md')) throw new Error("Parity Defizit");
            view.innerHTML = path.endsWith('.md') ? marked.parse(text) : text;
            console.log("[0ms PING] Geladen:", path);
        } catch (e) {
            view.innerHTML = `<h2 style="color:#d4af37">PARITY ERROR</h2><p>${path} nicht verifiziert.</p>`;
        }
    }
};
window.onload = () => RFOF_SPA.load('home');
