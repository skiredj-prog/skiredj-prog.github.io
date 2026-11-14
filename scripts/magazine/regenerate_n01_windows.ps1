$ErrorActionPreference = "Stop"

# Run from the repository root on Windows. The generator intentionally uses
# C:\Windows\Fonts unless TENIR_FONTS_DIR is explicitly supplied.
$repo = Resolve-Path (Join-Path $PSScriptRoot "../..")
Set-Location $repo

if ($env:OS -ne "Windows_NT") {
  throw "This release script must run on Windows with the official system fonts."
}

$env:TENIR_FONTS_DIR = if ($env:TENIR_FONTS_DIR) { $env:TENIR_FONTS_DIR } else { Join-Path $env:WINDIR "Fonts" }

python -m pip install -r scripts/magazine/requirements.txt
python scripts/magazine/print_n01.py

$pdfDir = "public/magazine/n01"
$files = @("TENIR-N01-FR.pdf", "TENIR-N01-EN.pdf", "TENIR-N01-AR.pdf")
$sizes = $files | ForEach-Object { (Get-Item (Join-Path $pdfDir $_)).Length }
$lines = @("# Tailles : FR $($sizes[0]) octets, EN $($sizes[1]) octets, AR $($sizes[2]) octets.")
foreach ($file in $files) {
  $hash = (Get-FileHash (Join-Path $pdfDir $file) -Algorithm SHA256).Hash.ToLowerInvariant()
  $lines += "$hash  $file"
}
Set-Content -Path (Join-Path $pdfDir "SHA256SUMS.txt") -Value $lines -Encoding utf8

python scripts/magazine/verify_n01_release.py
Write-Host "PDF regeneration and release verification completed with $env:TENIR_FONTS_DIR"
