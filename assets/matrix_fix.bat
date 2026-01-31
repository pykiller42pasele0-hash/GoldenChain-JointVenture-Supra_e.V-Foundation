@echo off
setlocal ENABLEDELAYEDEXPANSION
set REMOTE=origin
set DEV_BRANCH=main
echo [matrix_fix] Starte Master-Workflow...
git rev-parse --is-inside-work-tree >NUL 2>&1
IF ERRORLEVEL 1 ( echo [matrix_fix] Fehler & goto :EOF )
git checkout %%DEV_BRANCH%%
git fetch %%REMOTE%%
git rebase %%REMOTE%%/%%DEV_BRANCH%%
git add -A
set MSG=auto: matrix_update %31.01.2026%
git commit -m "%%MSG%%"
git push %%REMOTE%% %%DEV_BRANCH%%
endlocal
