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
for(let i=1; i<=9; i++) { RFOF_CORE.routes[i+3] = \`../content/ebene\${i}.md\`; }

async function loadPage(id) {
    const view = document.getElementById('view') || document.body;
    const path = RFOF_CORE.routes[id] || id;
    try {
        const res = await fetch(path);
        if(!res.ok) throw new Error();
        const text = await res.text();
        view.innerHTML = typeof marked !== 'undefined' ? marked.parse(text) : \`<pre>\${text}</pre>\`;
    } catch (e) { 
        view.innerHTML = \`<h2 style="color:#d4af37">Matrix Defizit</h2><p>Pfad: \${path} nicht erreichbar.</p>\`; 
    }
}
