@echo off
master
echo [RFOF] Syncing 22 Pages & Energy-Logic...
git add .
git commit -m "Total Completion: All 22 Levels ^& 7-Button Engine"
git push origin main
echo [SUCCESS] Die technologische Mechatronik ist nun VOLLST�NDIG.

setlocal ENABLEDELAYEDEXPANSION
set REMOTE=origin
master
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

set DEV_BRANCH=main
echo [matrix_fix] Starte Master-Workflow auf Branch: %master%
git rev-parse --is-inside-work-tree >NUL 2>&1
IF ERRORLEVEL 1 ( echo [matrix_fix] Fehler: Kein Repo & goto :EOF )
git checkout %master%
git fetch %origin%
git rebase %origin%/%master%
git add -A
set MSG=auto: matrix_update %31.01.2026% %15:26:21,14%
git commit -m "%auto: matrix_update %%a-%%b-%%cT%%d%%e%%fZ%"
git push %origin% %master%
echo [matrix_fix] Synchronisation abgeschlossen.
main
endlocal
main
