@echo off
setlocal ENABLEDELAYEDEXPANSION
set REMOTE=origin
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
endlocal
