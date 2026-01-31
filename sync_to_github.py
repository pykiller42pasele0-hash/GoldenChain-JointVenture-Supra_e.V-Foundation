import os 
# 1. Online-Cache leeren 
os.system('git rm -r --cached .') 
# 2. Alles neu einlesen (Lokal = Gesetz) 
os.system('git add .') 
# 3. Commit und Force-Push auf MAIN 
os.system('git commit -m "Python Sync: Local 24-Image State is now Law"') 
os.system('git push origin main --force') 
# 4. GH-PAGES (Web-Ansicht) gleichschalten 
os.system('git checkout gh-pages') 
os.system('git reset --hard main') 
os.system('git push origin gh-pages --force') 
os.system('git checkout main') 
