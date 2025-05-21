# NaviCampus Prototype Preparation Script
Write-Host "Starting NaviCampus prototype preparation..." -ForegroundColor Cyan

# Clean npm cache and node_modules
Write-Host "Cleaning npm cache and node_modules..." -ForegroundColor Yellow
npm cache clean --force
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# Verify critical dependencies
Write-Host "Verifying critical dependencies..." -ForegroundColor Yellow
$packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
$hasReactNativeSafeAreaContext = $false
$hasReactNativeScreens = $false

foreach ($dep in $packageJson.dependencies.PSObject.Properties) {
    if ($dep.Name -eq "react-native-safe-area-context") {
        $hasReactNativeSafeAreaContext = $true
    }
    if ($dep.Name -eq "react-native-screens") {
        $hasReactNativeScreens = $true
    }
}

if (-not $hasReactNativeSafeAreaContext) {
    Write-Host "Installing react-native-safe-area-context..." -ForegroundColor Yellow
    npx expo install react-native-safe-area-context
}

if (-not $hasReactNativeScreens) {
    Write-Host "Installing react-native-screens..." -ForegroundColor Yellow
    npx expo install react-native-screens
}

# Start the application in expo
Write-Host "Starting Expo development server..." -ForegroundColor Green
Write-Host "Your prototype should be ready for testing!" -ForegroundColor Cyan
Write-Host "Run 'npx expo start' to launch the app" -ForegroundColor Cyan
