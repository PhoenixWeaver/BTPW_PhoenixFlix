# PhoenixFlix Database Documentation Generator
# This script runs SchemaSpy to generate database documentation

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PhoenixFlix - Database Documentation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if SchemaSpy is installed
$schemaspyJar = "tools\schemaspy.jar"
if (-not (Test-Path $schemaspyJar)) {
    Write-Host "✗ SchemaSpy not found!" -ForegroundColor Red
    Write-Host "Please run setup first: .\tools\setup-schemaspy.ps1" -ForegroundColor Yellow
    exit 1
}

# Check if PostgreSQL JDBC driver exists
$jdbcJar = "tools\postgresql-jdbc.jar"
if (-not (Test-Path $jdbcJar)) {
    Write-Host "✗ PostgreSQL JDBC driver not found!" -ForegroundColor Red
    Write-Host "Please run setup first: .\tools\setup-schemaspy.ps1" -ForegroundColor Yellow
    exit 1
}

# Check if config file exists
$configFile = "tools\schemaspy.properties"
if (-not (Test-Path $configFile)) {
    Write-Host "✗ Configuration file not found!" -ForegroundColor Red
    Write-Host "Please create: $configFile" -ForegroundColor Yellow
    exit 1
}

# Create output directory if it doesn't exist
$outputDir = "docs\database"
if (-not (Test-Path $outputDir)) {
    Write-Host "Creating output directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

# Run SchemaSpy
Write-Host "Generating database documentation..." -ForegroundColor Yellow
Write-Host ""

try {
    java -jar $schemaspyJar -configFile $configFile
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "✓ Documentation generated successfully!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "View documentation at:" -ForegroundColor Yellow
    Write-Host "  $outputDir\index.html" -ForegroundColor Cyan
    Write-Host ""
    
    # Ask if user wants to open the documentation
    $open = Read-Host "Open documentation in browser? (Y/n)"
    if ($open -eq "" -or $open -eq "Y" -or $open -eq "y") {
        Start-Process "$outputDir\index.html"
    }
    
} catch {
    Write-Host ""
    Write-Host "✗ Failed to generate documentation" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "1. Check database credentials in schemaspy.properties"
    Write-Host "2. Ensure PostgreSQL is running"
    Write-Host "3. Verify database name and schema are correct"
    Write-Host "4. Check firewall/network connectivity"
    exit 1
}

