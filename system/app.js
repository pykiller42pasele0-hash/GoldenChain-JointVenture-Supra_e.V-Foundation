const RFOF_CORE = {
    version: "1.1",
    energyUnit: 0.33333333,
    routes: {
        1: 'README.md', 2: 'LICENSE.rfof', 3: 'content/whitepaper.md',
        4: 'content/ebene1.md', 5: 'content/ebene2.md', 6: 'content/ebene3.md',
        7: 'content/ebene4.md', 8: 'content/ebene5.md', 9: 'content/ebene6.md',
        10: 'content/ebene7.md', 11: 'content/ebene8.md', 12: 'content/ebene9.md',
        13: 'content/RFOF-GoldMatrix.md', 20: 'SITES-Pool/RFOF-TOKEN-LAUNCH.contract'
    }
};
async function loadPage(id) {
    const view = document.getElementById('view') || document.body;
    const path = RFOF_CORE.routes[id] || id;
    try {
        const res = await fetch(path);
        const text = await res.text();
        view.innerHTML = typeof marked !== 'undefined' ? marked.parse(text) : '<pre>' + text + '</pre>';
    } catch (e) { view.innerHTML = "<h1>Matrix Defizit " + id + "</h1>"; }
}
// Zusatz-Logik für Notariats-Zugriff
RFOF_CORE.routes[22] = 'RFOF-Golden-Explorer-notary/final_seal.log';
