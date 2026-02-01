/* parity=GOLDENCHAIN==GOLDENCHAIN */
const RFOF_AUTONOMY = {
    rules: {
        code: "parity=GOLDENCHAIN==GOLDENCHAIN",
        root: "parity=ROOT-MATRIX"
    },

    async init() {
        console.log("[SYSTEM] Autonome Regel-Prüfung aktiv.");
        this.render('home'); // Startet immer mit der Haupt-README
    },

    async render(id) {
        const display = document.getElementById('view') || document.getElementById('content');
        const routes = {
            'home': 'README.md',
            'matrix': 'content/RFOF-GoldMatrix.md',
            'explorer': 'RFOF-Golden-Explorer-notary/core_verification.log'
        };
        
        // Pfad-Logik: Nutzt das Manifest oder baut den Pfad autonom
        const path = '../' + (routes[id] || `content/ebene${id}.md`);

        try {
            const res = await fetch(path);
            if (!res.ok) throw new Error("Pfad nicht in Matrix");
            const raw = await res.text();

            // DIE REGEL: Aussortieren, was keine Parity hat
            const isValid = raw.includes(this.rules.root) || raw.includes(this.rules.code);

            if (isValid) {
                // Altes Rendering: MD zu HTML, Rest als Pre/Iframe
                display.innerHTML = path.endsWith('.md') ? marked.parse(raw) : `<pre>${raw}</pre>`;
                console.log(`[OK] ${id} integriert.`);
            } else {
                console.warn(`[AUSGESORTIERT] ${id} besitzt keine gültige Parity.`);
                display.innerHTML = "<h2>403 - REGEL-KONFLIKT</h2><p>Bauteil nicht zertifiziert.</p>";
            }
        } catch (e) {
            display.innerHTML = "<h2>404 - MATRIX-DEFIZIT</h2>";
        }
    }
};
window.onload = () => RFOF_AUTONOMY.init();
