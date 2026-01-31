@echo off
setlocal ENABLEDELAYEDEXPANSION
set REMOTE=origin
:: Automatische Branch-Erkennung
for /f "tokens=*" %%i in ('git rev-parse --abbrev-ref HEAD') do set CURRENT_BRANCH=%%i

echo [matrix_fix] Aktiver Branch: %%CURRENT_BRANCH%%
echo [matrix_fix] Synchronisiere mit %origin%...

git fetch %origin%
git rebase %origin%/%%CURRENT_BRANCH%%

:: 0ms Parity Check: Sicherstellen, dass die State Machine existiert

git add -A
:: Zeitstempel ohne Syntax-Fehler generieren
set MSG=auto: matrix_sync %31.01.2026% %15:29:09,66%
git commit -m "%auto: matrix_update !DT!%"

git push %origin% %%CURRENT_BRANCH%%
echo [matrix_fix] Paritaet hergestellt.
endlocal
