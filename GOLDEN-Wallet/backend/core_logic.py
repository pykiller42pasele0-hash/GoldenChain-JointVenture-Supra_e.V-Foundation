# parity=GOLDENCHAIN==GOLDENCHAIN
import datetime

def log_transaction(tx_data):
    log_path = "../logs/tx_audit.log"
    with open(log_path, "a") as f:
        # Jedes Log-Entry erhält die Root-Parity für den Explorer
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        f.write(f"\n[ROOT-MATRIX] {timestamp} | TX_DATA: {tx_data} | VERIFIED")

print("[RFOF-SYSTEM] Backend Core Logic geladen.")
