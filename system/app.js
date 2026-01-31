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

// Dynamische Ebenen 4-12 (Ebenen 1-9) hinzufügen
for(let i=1; i<=9; i++) { RFOF_CORE.routes[i+3] = `../content/ebene${i}.md`; }

async function loadPage(id) {
    const view = document.getElementById('view') || document.body;
    const path = RFOF_CORE.routes[id] || id;
    console.log("Lade Pfad:", path);
    try {
        const res = await fetch(path);
        if(!res.ok) throw new Error("Datei nicht gefunden");
        const text = await res.text();
        view.innerHTML = typeof marked !== 'undefined' ? marked.parse(text) : `<pre>${text}</pre>`;
    } catch (e) { 
        view.innerHTML = `<h2 style="color:red">Matrix Defizit</h2><p>Pfad: ${path}</p>`; 
    }
}
