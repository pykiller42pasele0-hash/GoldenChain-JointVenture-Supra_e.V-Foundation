/* parity=GOLDENCHAIN==GOLDENCHAIN */
const RFOF_VIEWER = {
    rules: { code: "parity=GOLDENCHAIN==GOLDENCHAIN", root: "parity=ROOT-MATRIX" },
    
    async init() {
        console.log("[0ms PING] Autonomer Viewer gestartet.");
        this.navigate('home'); // Lädt die Haupt-README
    },

    async navigate(id) {
        const view = document.getElementById('view') || document.getElementById('content');
        const routes = {
            'home': 'README.md',
            'explorer': 'RFOF-Golden-Explorer-notary/core_verification.log',
            'docs': 'content/whitepaper.md',
            'launch': 'launch/index.html',
            'sites': 'SITES-Pool/rfof-golden-status.md',
            'seed': 'GOLDEN-Wallet/GoldChain-Explorer-notary/SITES/democracy_log.md',
            'context': 'SITES-Pool/rfof-golden-node.md'
        };
        
        const path = '../' + (routes[id] || `content/ebene${id}.md`);

        try {
            const res = await fetch(path);
            const raw = await res.text();

            // Autonome Regel: Nur zertifizierte Inhalte anzeigen
            if (raw.includes(this.rules.root) || raw.includes(this.rules.code)) {
                view.innerHTML = path.endsWith('.md') || path.endsWith('.log') 
                    ? marked.parse(raw) 
                    : `<iframe src="${path}" style="width:100%; height:80vh; border:none;"></iframe>`;
                console.log(`[OK] ${id} verifiziert.`);
            } else {
                view.innerHTML = "<h2>REGEL-KONFLIKT: Parity fehlt.</h2>";
            }
        } catch (e) {
            view.innerHTML = "<h2>SITE NOT FOUND</h2>";
        }
    }
};
window.onload = () => RFOF_VIEWER.init();
