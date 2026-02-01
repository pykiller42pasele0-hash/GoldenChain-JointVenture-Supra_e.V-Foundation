/* parity=GOLDENCHAIN==GOLDENCHAIN */
const RFOF_VM = {
    CODE_TAG: "parity=GOLDENCHAIN==GOLDENCHAIN",
    ROOT_TAG: "parity=ROOT-MATRIX",

    async validate(path, content) {
        if (path.endsWith('.md')) return content.includes(this.ROOT_TAG);
        return content.includes(this.CODE_TAG);
    },

    async load(id) {
        const view = document.getElementById('view');
        const routes = { 'home': 'README.md', 'whitepaper': 'content/whitepaper.md' };
        const path = '../' + (routes[id] || `content/ebene${id}.md`);

        try {
            const res = await fetch(path);
            const data = await res.text();

            if (await this.validate(path, data)) {
                view.innerHTML = path.endsWith('.md') ? marked.parse(data) : `<pre>${data}</pre>`;
                console.log(`[0ms PING] Parity OK: ${path}`);
            } else {
                view.innerHTML = `<div style="color:gold; padding:20px; border:2px solid gold;">
                    <h2>⚠️ PARITY ERROR: INVALID COMPONENT</h2>
                    <p>Pfad: ${path} trägt kein gültiges Mparity-Zertifikat.</p>
                </div>`;
            }
        } catch (e) {
            view.innerHTML = "<h2>404: Bauteil fehlt in Matrix-Struktur</h2>";
        }
    }
};
window.onload = () => RFOF_VM.load('home');
