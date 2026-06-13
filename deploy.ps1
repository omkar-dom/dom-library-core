# To run this script: powershell -ExecutionPolicy Bypass -File .\deploy.ps1
# Input your NPM publish token here
$NPM_TOKEN = "YOUR_NPM_TOKEN_HERE"

if ($NPM_TOKEN -eq "YOUR_NPM_TOKEN_HERE" -or $NPM_TOKEN -eq "") {
    Write-Error "Please update deploy.ps1 with your actual npm token before running."
    exit 1
}

# 1. Build the production package
Write-Host "Building dom-library-core package..." -ForegroundColor Cyan
npx ng build dom-library-core --configuration production
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed!"
    exit $LASTEXITCODE
}

# 2. Copy documentation files
Write-Host "Copying documentation assets..." -ForegroundColor Cyan
Copy-Item README.md, CHANGELOG.md dist/dom-library-core/ -Force

# 3. Configure .npmrc with the raw token
Write-Host "Configuring authentication token..." -ForegroundColor Cyan
$npmrcPath = "dist/dom-library-core/.npmrc"
"//registry.npmjs.org/:_authToken=$NPM_TOKEN" | Out-File -FilePath $npmrcPath -Encoding ascii -Force

# 4. Publish to the NPM registry
Write-Host "Publishing to NPM registry..." -ForegroundColor Cyan
Push-Location dist/dom-library-core
npm publish
$publishResult = $LASTEXITCODE
Pop-Location

# 5. Clean up the token from .npmrc for security
Write-Host "Cleaning up authentication details..." -ForegroundColor Cyan
if (Test-Path $npmrcPath) {
    Remove-Item $npmrcPath -Force
}

if ($publishResult -eq 0) {
    Write-Host "Successfully published to npm!" -ForegroundColor Green
} else {
    Write-Error "Publish failed!"
    exit $publishResult
}
