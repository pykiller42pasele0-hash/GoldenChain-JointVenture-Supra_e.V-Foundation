@echo off
echo [AUTONOM-CHECK] Prüfe Dateien gegen die Parity-Regel...
findstr /s /m "parity=" *.*
echo [DONE] Nur diese Dateien sind im System aktiv.
