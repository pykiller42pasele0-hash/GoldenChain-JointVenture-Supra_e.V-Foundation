// ============================================================
// GOLDEN-CHAIN STATE MACHINE (0ms DETERMINISTIC CORE)
// ============================================================

const state = {
    eurBalance: 1000.00,
    eurStaked: 0.00,
    claimableReward: 0.00,
    stakedReward: 0.00,
    currentSite: 'HOME',
    currentLevel: 0,
    activity: []
};

// --- CORE LOGIK (MATHEMATIK) ---
function log(type, amount) {
    state.activity.unshift({ type, amount, ts: new Date().toLocaleTimeString() });
}

const engine = {
    deposit: (a) => { state.eurBalance += a; log("Einzahlung", a); updateUI(); },
    stake: (a) => { 
        if(state.eurBalance >= a) {
            state.eurBalance -= a; 
            state.eurStaked += a; 
            state.stakedReward += a * 0.01; 
            log("Staking", a); 
            updateUI(); 
        }
    },
    claimStaked: () => {
        const c = state.stakedReward;
        state.eurBalance += c;
        state.stakedReward = 0;
        log("Claim Reward", c);
        updateUI();
    }
};

// --- NAVIGATION & SITES LOGIC ---
const routes = {
    'HOME': { title: 'Genesis Home', path: '../index.html' },
    'LICENSE': { title: 'Lizenzierung', path: '../LICENSE.rfof' },
    'WHITE': { title: 'Whitepaper', path: '../content/whitepaper.md' },
    'E1': { title: 'Ebene 1', path: '../content/ebene1.md' },
    'E10': { title: 'Matrix Abschluss', path: '../content/ebene10_matrix.md' },
    'GOLD': { title: 'Golden Wallet', path: '../GOLDEN-Wallet/frontend/index.html' },
    'EURO': { title: 'Euro Wallet (Extension)', path: '../EuroChain/EURO-Wallet/frontend/index.html' }
};

function switchSite(siteKey) {
    state.currentSite = siteKey;
    console.log("Switching to Site:", routes[siteKey].title);
    // Hier würde die DOM-Manipulation für das Iframe oder Content-Fenster stattfinden
    updateUI();
}

// --- UI UPDATER (SYNCHRONISIERT ALLES) ---
function updateUI() {
    // Links oben: Explorer/Notariat Logik
    const statusBox = document.getElementById('matrix-status');
    if(statusBox) statusBox.textContent = `LEVEL: ${state.currentLevel} | SITE: ${state.currentSite}`;

    // Wallet Anzeige (Parity für Euro & Golden)
    const balDisplay = document.querySelectorAll('.eur-balance');
    balDisplay.forEach(el => el.textContent = state.eurBalance.toFixed(2) + " €");

    const stakedDisplay = document.getElementById('total-staked');
    if(stakedDisplay) stakedDisplay.textContent = state.eurStaked.toFixed(2) + " €";
}

// --- EVENT BINDINGS (DETEKTIERT DIE 5 BUTTONS) ---
window.onload = () => {
    // Top Left: Explorer/Notariat/Chain/Matrix Buttons
    const navButtons = ['explorer', 'notariat', 'chain', 'matrix'];
    navButtons.forEach((id, index) => {
        const btn = document.getElementById(`btn-${id}`);
        if(btn) btn.onclick = () => { state.currentLevel = index; updateUI(); };
    });

    // Top Right: SITES Button (Switchable Home/License etc)
    const sitesBtn = document.getElementById('btn-sites');
    if(sitesBtn) {
        sitesBtn.onclick = () => {
            const next = state.currentSite === 'HOME' ? 'LICENSE' : 'HOME';
            switchSite(next);
        };
    }

    updateUI();
};