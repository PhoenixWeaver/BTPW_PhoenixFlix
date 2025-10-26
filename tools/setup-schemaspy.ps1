# PhoenixFlix SchemaSpy Setup Script
# This script downloads and sets up SchemaSpy for database documentation

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PhoenixFlix - SchemaSpy Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Create tools directory if it doesn't exist
$toolsDir = "tools"
if (-not (Test-Path $toolsDir)) {
    Write-Host "Creating tools directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $toolsDir | Out-Null
}

Set-Location $toolsDir

# Check if Java is installed
Write-Host "Checking for Java installation..." -ForegroundColor Yellow
try {
    $javaVersion = java -version 2>&1 | Select-Object -First 1
    Write-Host "✓ Java found: $javaVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Java not found!" -ForegroundColor Red
    Write-Host "Please install Java 11 or higher from:" -ForegroundColor Red
    Write-Host "https://adoptium.net/" -ForegroundColor Yellow
    exit 1
}

# Download SchemaSpy
$schemaspyUrl = "https://github.com/schemaspy/schemaspy/releases/download/v6.2.4/schemaspy-6.2.4.jar"
$schemaspyJar = "schemaspy.jar"

if (Test-Path $schemaspyJar) {
    Write-Host "✓ SchemaSpy already downloaded" -ForegroundColor Green
} else {
    Write-Host "Downloading SchemaSpy..." -ForegroundColor Yellow
    try {
        Invoke-WebRequest -Uri $schemaspyUrl -OutFile $schemaspyJar -UseBasicParsing
        Write-Host "✓ SchemaSpy downloaded successfully" -ForegroundColor Green
    } catch {
        Write-Host "✗ Failed to download SchemaSpy" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
        exit 1
    }
}

# Download PostgreSQL JDBC Driver
$jdbcUrl = "https://jdbc.postgresql.org/download/postgresql-42.7.1.jar"
$jdbcJar = "postgresql-jdbc.jar"

if (Test-Path $jdbcJar) {
    Write-Host "✓ PostgreSQL JDBC driver already downloaded" -ForegroundColor Green
} else {
    Write-Host "Downloading PostgreSQL JDBC driver..." -ForegroundColor Yellow
    try {
        Invoke-WebRequest -Uri $jdbcUrl -OutFile $jdbcJar -UseBasicParsing
        Write-Host "✓ PostgreSQL JDBC driver downloaded successfully" -ForegroundColor Green
    } catch {
        Write-Host "✗ Failed to download JDBC driver" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
        exit 1
    }
}

Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Edit tools/schemaspy.properties with your database credentials"
Write-Host "2. Run: .\tools\generate-docs.ps1"
Write-Host "3. Open: docs\database\index.html"
Write-Host ""
Write-Host "Happy documenting! 📊" -ForegroundColor Cyan

