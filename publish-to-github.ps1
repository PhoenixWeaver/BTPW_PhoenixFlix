# ===============================================================================
# 🐦 PhoenixFlix - GitHub Publishing Script
# 🔥 Publish your clean codebase to GitHub
# ===============================================================================

Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host "PhoenixFlix - GitHub Publishing Script" -ForegroundColor Cyan
Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$repoUrl = "https://github.com/thephoenixflix/BTPW_thephoenixflix.git"
$branch = "master"

# Step 1: Check current status
Write-Host "[Step 1] Checking current git status..." -ForegroundColor Yellow
git status
Write-Host ""

# Step 2: Add all files
Write-Host "[Step 2] Adding all files to git..." -ForegroundColor Yellow
git add .
Write-Host "   [OK] Files staged for commit" -ForegroundColor Green
Write-Host ""

# Step 3: Create commit
Write-Host "[Step 3] Creating commit..." -ForegroundColor Yellow
$commitMessage = "feat: clean codebase with PhoenixFlix branding and remove comments"
git commit -m $commitMessage 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "   [OK] Commit created" -ForegroundColor Green
} else {
    Write-Host "   [INFO] No changes to commit (already committed)" -ForegroundColor Gray
}
Write-Host ""

# Step 4: Check/Set remote repository
Write-Host "[Step 4] Setting up remote repository..." -ForegroundColor Yellow

# Remove existing origin if it exists
git remote remove origin 2>$null

# Add new origin
git remote add origin $repoUrl
Write-Host "   [OK] Remote added: $repoUrl" -ForegroundColor Green
Write-Host ""

# Step 5: Authentication Check
Write-Host "[Step 5] Authentication Setup" -ForegroundColor Yellow
Write-Host "   [IMPORTANT] You need a Personal Access Token for private repos!" -ForegroundColor Yellow
Write-Host ""
Write-Host "   If you don't have a token yet:" -ForegroundColor Cyan
Write-Host "   1. Go to: https://github.com/settings/tokens/new" -ForegroundColor Gray
Write-Host "   2. Name: PhoenixFlix Push Access" -ForegroundColor Gray
Write-Host "   3. Expiration: Choose your preference" -ForegroundColor Gray
Write-Host "   4. Scopes: Check repo (full control)" -ForegroundColor Gray
Write-Host "   5. Click Generate token and COPY IT" -ForegroundColor Gray
Write-Host ""
Write-Host "   When Git asks for credentials:" -ForegroundColor Cyan
Write-Host "   - Username: thephoenixflix" -ForegroundColor Gray
Write-Host "   - Password: <paste your token>" -ForegroundColor Gray
Write-Host ""

$continue = Read-Host "   Press ENTER to continue with push (or type skip to cancel)"
if ($continue -eq "skip") {
    Write-Host ""
    Write-Host "[CANCELLED] Run this script again when ready." -ForegroundColor Yellow
    exit
}
Write-Host ""

# Step 6: Configure Git credential helper (Windows)
Write-Host "[Step 6] Configuring credential helper..." -ForegroundColor Yellow
git config --global credential.helper manager-core 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "   [OK] Credential helper configured (will remember your token)" -ForegroundColor Green
} else {
    git config --global credential.helper wincred 2>$null
    Write-Host "   [OK] Windows credential manager enabled" -ForegroundColor Green
}
Write-Host ""

# Step 7: Push to GitHub
Write-Host "[Step 7] Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "   Branch: $branch" -ForegroundColor Gray
Write-Host "   Remote: $repoUrl" -ForegroundColor Gray
Write-Host ""
Write-Host "   [NOTE] Git will now ask for your credentials..." -ForegroundColor Cyan
Write-Host ""

# First, try to fetch to test authentication
Write-Host "   Testing connection..." -ForegroundColor Gray
git fetch origin 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "   [OK] Authentication successful!" -ForegroundColor Green
    Write-Host ""
    
    # Now push
    git push -u origin $branch --force
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "===============================================================================" -ForegroundColor Green
        Write-Host "[SUCCESS] PhoenixFlix published to GitHub!" -ForegroundColor Green
        Write-Host "===============================================================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "[WEB] View your repository at:" -ForegroundColor Cyan
        Write-Host "   https://github.com/thephoenixflix/BTPW_thephoenixflix" -ForegroundColor White
        Write-Host ""
        Write-Host "[INFO] Repository is set to PRIVATE" -ForegroundColor Yellow
        Write-Host "   To make it public: Settings -> Danger Zone -> Change visibility" -ForegroundColor Gray
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "===============================================================================" -ForegroundColor Red
        Write-Host "[ERROR] Push failed!" -ForegroundColor Red
        Write-Host "===============================================================================" -ForegroundColor Red
        Write-Host ""
        Write-Host "[TIP] Try manual push:" -ForegroundColor Yellow
        Write-Host "   git push -u origin master --force" -ForegroundColor Gray
        Write-Host ""
    }
} else {
    Write-Host ""
    Write-Host "===============================================================================" -ForegroundColor Red
    Write-Host "[ERROR] Authentication failed!" -ForegroundColor Red
    Write-Host "===============================================================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "[SOLUTIONS]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Create a Personal Access Token" -ForegroundColor Cyan
    Write-Host "   1. Visit: https://github.com/settings/tokens/new" -ForegroundColor Gray
    Write-Host "   2. Select scope: repo (full control)" -ForegroundColor Gray
    Write-Host "   3. Generate and copy the token" -ForegroundColor Gray
    Write-Host "   4. Run this script again" -ForegroundColor Gray
    Write-Host "   5. Use token as password when prompted" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option 2: Use SSH instead" -ForegroundColor Cyan
    Write-Host "   git remote set-url origin git@github.com:thephoenixflix/thephoenixflix.git" -ForegroundColor Gray
    Write-Host "   git push -u origin master" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option 3: Use GitHub CLI" -ForegroundColor Cyan
    Write-Host "   gh auth login" -ForegroundColor Gray
    Write-Host "   git push -u origin master" -ForegroundColor Gray
    Write-Host ""
}

# check to change the branch name to main

# # Remove old remote
# git remote remove origin

# # Add with your GitHub username in the URL
# git remote add origin https://YOUR_GITHUB_USERNAME@github.com/thephoenixflix/thephoenixflix.git

# # Push (will ask for token)
# git push -u origin master

# # Step 1: Check status
# git status

# # Step 2: Add all files
# git add .

# # Step 3: Commit changes
# git commit -m "feat: clean codebase with PhoenixFlix branding and remove comments"

# # Step 4: Set remote (if not already set)
# git remote add origin https://github.com/thephoenixflix/BTPW_thephoenixflix.git
# # OR update existing remote:
# git remote set-url origin https://github.com/thephoenixflix/BTPW_thephoenixflix.git

# # Step 5: Push to GitHub
# git push -u origin master
