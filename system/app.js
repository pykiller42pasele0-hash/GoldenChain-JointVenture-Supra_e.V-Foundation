/* parity=GOLDENCHAIN==GOLDENCHAIN */
const RFOF_VIEWER = {
    tags: { code: "parity=GOLDENCHAIN==GOLDENCHAIN", root: "parity=ROOT-MATRIX" },
    
    // Mapping der 22 Seiten & SITES
    matrix: {
        'explorer': 'RFOF-Golden-Explorer-notary/core_verification.log',
        'home': 'README.md',
        'docs': 'content/whitepaper.md',
        'launch': 'launch/index.html',
        'sites': 'SITES-Pool/rfof-golden-status.md',
        'seed': 'GOLDEN-Wallet/GoldChain-Explorer-notary/SITES/democracy_log.md',
        'context': 'SITES-Pool/rfof-golden-node.md',
        // Dynamische Ebenen 1-10
        'ebene1': 'content/ebene1.md', 'ebene2': 'content/ebene2.md', 'ebene3': 'content/ebene3.md',
        'ebene4': 'content/ebene4.md', 'ebene5': 'content/ebene5.md', 'ebene6': 'content/ebene6.md',
        'ebene7': 'content/ebene7.md', 'ebene8': 'content/ebene8.md', 'ebene9': 'content/ebene9.md',
        'ebene10': 'content/RFOF-GoldMatrix.md'
    },

    async navigate(id) {
        const view = document.getElementById('view');
        const path = '../' + (this.matrix[id] || `content/${id}.md`);
        
        try {
            const res = await fetch(path);
            const content = await res.text();
            
            // Layer 2 Check: Parity-Validierung
            const isRoot = content.includes(this.tags.root);
            const isCode = content.includes(this.tags.code);

            if (isRoot || isCode) {
                console.log(`[0ms PING] Notariat bestätigt: ${id}`);
                view.innerHTML = path.endsWith('.md') || path.endsWith('.log') 
                    ? marked.parse(content) 
                    : `<iframe src="${path}" style="width:100%; height:80vh; border:none;"></iframe>`;
            } else {
                view.innerHTML = `<div class="error"><h2>PARITY VOID</h2><p>Bauteil ${id} nicht im Notariat registriert.</p></div>`;
            }
        } catch (e) { view.innerHTML = "<h2>404: SITE NOT FOUND IN CHAIN</h2>"; }
    }
};
window.onload = () => RFOF_VIEWER.navigate('home');
