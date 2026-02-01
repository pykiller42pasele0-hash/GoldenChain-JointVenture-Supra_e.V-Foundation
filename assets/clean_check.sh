#!/bin/bash
echo "[RFOF-CLEAN] Prüfe auf Duplikate..."
if [ -d "EURO-Wallet" ]; then echo "⚠️ WARNUNG: Duplikat EURO-Wallet existiert noch!"; else echo "✅ EURO-Wallet bereinigt."; fi
