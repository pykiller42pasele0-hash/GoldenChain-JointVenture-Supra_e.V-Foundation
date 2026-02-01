/* parity=GOLDENCHAIN==GOLDENCHAIN */
const RFOF_VM = {
    rules: {
        code: "parity=GOLDENCHAIN==GOLDENCHAIN",
        root: "parity=ROOT-MATRIX"
    },
    routes: {
        'home': 'README.md',
        'docs': 'content/whitepaper.md',
        'explorer': 'RFOF-Golden-Explorer-notary/core_verification.log',
        'launch': 'launch/index.html',
        'sites': 'SITES-Pool/rfof-golden-status.md',
        'seed': 'GOLDEN-Wallet/GoldChain-Explorer-notary/SITES/democracy_log.md',
        'context': 'SITES-Pool/rfof-golden-node.md'
    },

    async navigate(id) {
        const view = document.getElementById('view') || document.getElementById('content');
        const path = '../' + (this.routes[id] || `content/ebene${id}.md`);

        try {
            const res = await fetch(path);
            const data = await res.text();

            // Autonome Validierung
            const isAuthorized = data.includes(this.rules.code) || data.includes(this.rules.root);

            if (isAuthorized) {
                if (path.endsWith('.md') || path.endsWith('.log')) {
                    view.innerHTML = typeof marked !== 'undefined' ? marked.parse(data) : `<pre>${data}</pre>`;
                } else {
                    view.innerHTML = `<iframe src="${path}" style="width:100%; height:85vh; border:none; box-shadow: 0 0 20px #d4af37;"></iframe>`;
                }
                console.log(`[0ms PING] ${id} verifiziert und geladen.`);
            } else {
                view.innerHTML = `<div style="color:#d4af37; padding:20px; border:2px solid #d4af37;"><h2>⚠️ PARITY VOID</h2><p>Bauteil ${id} besitzt kein gültiges Zertifikat.</p></div>`;
            }
        } catch (e) {
            view.innerHTML = "<h2>404: SITE NOT FOUND</h2>";
        }
    }
};
window.onload = () => RFOF_VM.navigate('home');
