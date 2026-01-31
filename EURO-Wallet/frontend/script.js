// Local deterministic state (0ms, no server)
const state = {
    eurBalance: 0,
    eurStaked: 0,
    claimableReward: 0,
    stakedReward: 0,
    activity: []
};

function render() {
    document.getElementById('total-available').textContent = state.eurBalance.toFixed(2);
    document.getElementById('eur-balance').textContent = state.eurBalance.toFixed(2);
    document.getElementById('eur-value').textContent = state.eurBalance.toFixed(2);
    document.getElementById('swap-max-eur').textContent = state.eurBalance.toFixed(2);
    document.getElementById('claimable-reward').textContent = state.claimableReward.toFixed(2);
    document.getElementById('total-staked').textContent = state.eurStaked.toFixed(2);
    document.getElementById('staked-reward').textContent = state.stakedReward.toFixed(2);

    const list = document.getElementById('activity-list');
    if (!state.activity.length) {
        list.className = 'empty-state';
        list.textContent = 'No recent transaction history';
    } else {
        list.className = '';
        list.innerHTML = state.activity.map(a => `
            <div class="activity-row">
                <div>${a.type}</div>
                <div>€${a.amount.toFixed(2)}</div>
            </div>
        `).join('');
    }
}

function log(type, amount) {
    state.activity.unshift({ type, amount, ts: Date.now() });
}

// Local mathematical backend
function deposit(a) { state.eurBalance += a; log("Deposit", a); render(); }
function buy(a) { state.eurBalance += a; log("Buy", a); render(); }
function send(a) { a = Math.min(a, state.eurBalance); state.eurBalance -= a; log("Send", -a); render(); }
function stake(a) { a = Math.min(a, state.eurBalance); state.eurBalance -= a; state.eurStaked += a; state.stakedReward += a * 0.01; log("Stake", a); render(); }
function claimAvailable() { const c = state.claimableReward; state.eurBalance += c; state.claimableReward = 0; log("Claim Available", c); render(); }
function claimStaked() { const c = state.stakedReward; state.eurBalance += c; state.stakedReward = 0; log("Claim Staked", c); render(); }
function swap(a, t) { a = Math.min(a, state.eurBalance); state.eurBalance -= a; log(`Swap EUR→${t}`, a); render(); }

// UI bindings
document.getElementById('btn-deposit').onclick = () => deposit(10);
document.getElementById('btn-buy').onclick = () => buy(5);
document.getElementById('btn-send').onclick = () => send(2);
document.getElementById('btn-claim-all').onclick = () => claimAvailable();
document.getElementById('btn-stake').onclick = () => stake(3);
document.getElementById('btn-claim-staked').onclick = () => claimStaked();
document.getElementById('btn-swap').onclick = () => {
    const a = parseFloat(document.getElementById('swap-from-amount').value || '0');
    const t = document.getElementById('swap-to-asset').value || 'ASSET';
    if (a > 0) swap(a, t);
};

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.target;
        document.querySelectorAll('.tab-content').forEach(sec => sec.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    };
});

// Tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.onclick = () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        document.querySelectorAll('.tab-content').forEach(sec => sec.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    };
});

// Browser simulation
document.getElementById('btn-open-url').onclick = () => {
    const url = document.getElementById('browser-url').value;
    document.getElementById('browser-view').textContent =
        url ? `Simulated loading of: ${url}` : 'No page loaded.';
};

render();
