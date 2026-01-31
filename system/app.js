const routes = {
    explorer: '../README.md',
    notariat: '../content/whitepaper.md',
    chain:    '../EuroChain/README.md',
    matrix:   '../content/ebene10_matrix.md'
};
let isLicense = false;
async function loadPage(id) {
    const content = document.getElementById('content');
    let url = routes[id];
    if (id === 'sites') {
        isLicense = !isLicense;
        url = isLicense ? '../LICENSE.rfof' : '../README.md';
        document.getElementById('btn-sites').textContent = isLicense ? 'SITES: LICENSE' : 'SITES: HOME';
    }
    try {
        const response = await fetch(url);
        const text = await response.text();
        content.innerHTML = marked.parse(text);
    } catch (e) { content.innerHTML = '<h1>Matrix Fehler</h1>'; }
}
window.addEventListener('load', () => loadPage('explorer'));
