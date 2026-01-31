$git = Resolve-Path 'C:\Users\CC-Student\AppData\Local\GitHubDesktop\app-*\resources\app\git\cmd\git.exe' | Select-Object -ExpandProperty Path
Write-Host "[SYSTEM] Nutze Git-Pfad: $git" -ForegroundColor Cyan

& $git add -A
& $git commit -m "Mathematics Force Sync: 2026-01-23 23:26:35"
& $git push origin main --force

Write-Host "[SYSTEM] Erzeuge Druck auf Branch: gh-pages" -ForegroundColor Yellow
if (& $git branch --list "gh-pages") { & $git branch -D gh-pages }
& $git checkout -b gh-pages
& $git push origin gh-pages --force

& $git checkout main
Write-Host "[SYSTEM] SYNCHRONISATION ZU 100% ABGESCHLOSSEN" -ForegroundColor Green
