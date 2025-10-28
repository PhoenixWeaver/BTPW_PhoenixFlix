git status
& "C:\Program Files\Git\bin\git.exe" status
Set-Alias -Name git -Value "C:\Program Files\Git\bin\git.exe"
git add .
git commit -m "Major update: Migrated from BTPF.go to main.go, added comprehensive documentation, enhanced frontend with service layer, and improved project structure"
git config user.email "thephoenixflix@gmail.com"
git commit --amend --reset-author --no-edit
git config user.name "PhoenixWeaver"
git status
git commit -m "Major update: Migrated from BTPF.go to main.go, added comprehensive documentation, enhanced frontend with service layer, and improved project structure"
git push origin master --force

git commit -m "Remove BT_public_noNotes folder from repository (kept locally)"
git push origin master
