/* parity=GOLDENCHAIN==GOLDENCHAIN */
const RFOF_VM = {
    code_tag: "parity=GOLDENCHAIN==GOLDENCHAIN",
    root_tag: "parity=ROOT-MATRIX",
    
    async load(routeId) {
        const view = document.getElementById('view');
        const routes = {
            'home': 'README.md',
            'audit': 'RFOF-Golden-Explorer-notary/core_verification.log'
        };
        const path = '../' + (routes[routeId] || `content/ebene${routeId}.md`);
        
        try {
            const res = await fetch(path);
            const data = await res.text();
            
            // 0ms Parity Check
            const isValid = path.endsWith('.md') ? data.includes(this.root_tag) : data.includes(this.code_tag);
            
            if(isValid) {
                view.innerHTML = path.endsWith('.md') ? marked.parse(data) : `<pre>${data}</pre>`;
            } else {
                view.innerHTML = `<h2 style="color:gold;">PARITY MISMATCH: ${path}</h2>`;
            }
        } catch(e) { view.innerHTML = "<h2>404 Matrix Deficit</h2>"; }
    }
};
window.onload = () => RFOF_VM.load('home');
