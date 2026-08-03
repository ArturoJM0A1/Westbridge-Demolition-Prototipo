# ============================================================
# Generates placeholder SVG "photography" for the frontend.
# Run once:  powershell -File scripts/generate-images.ps1
# Images are deterministic SVG scenes so the site never
# depends on external services during development.
# ============================================================

$ErrorActionPreference = 'Stop'
$outRoot = Join-Path $PSScriptRoot '..\public\images'
New-Item -ItemType Directory -Force -Path $outRoot | Out-Null

function New-Svg {
  param(
    [string]$File,
    [int]$Seed,
    [string]$Glyph,
    [string]$Label,
    [string]$Sub = ''
  )

  $rng = [System.Random]::new($Seed)

  # Deterministic hue variation across the industrial palette
  $hues = @(
    @{ a = '#1d2631'; b = '#07090c'; accent = '#f5b82e' },
    @{ a = '#222b38'; b = '#0b0f15'; accent = '#e8a90f' },
    @{ a = '#1a2230'; b = '#080b10'; accent = '#f7c34a' },
    @{ a = '#202a38'; b = '#0a0e14'; accent = '#e5a91c' },
    @{ a = '#242e3c'; b = '#0c1016'; accent = '#ffcb4d' }
  )
  $p = $hues[ $rng.Next(0, $hues.Count) ]

  # Random diagonal "shear" line positions for the scene
  $lines = @()
  for ($i = 0; $i -lt 5; $i++) {
    $x = $rng.Next(40, 760)
    $lines += "<line x1='$x' y1='0' x2='$($x - 160)' y2='520' stroke='rgba(255,255,255,0.05)' stroke-width='1'/>"
  }

  $squares = @()
  for ($i = 0; $i -lt 6; $i++) {
    $sx = $rng.Next(0, 720)
    $sy = $rng.Next(40, 440)
    $squares += "<rect x='$sx' y='$sy' width='80' height='60' fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1' transform='skewX(-12)'/>"
  }

  $svg = @"
<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675' viewBox='0 0 1200 675'>
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='$($p.a)'/>
      <stop offset='0.55' stop-color='$($p.b)'/>
      <stop offset='1' stop-color='#05070a'/>
    </linearGradient>
    <linearGradient id='glow' x1='0' y1='1' x2='0' y2='0'>
      <stop offset='0' stop-color='$($p.accent)' stop-opacity='0.22'/>
      <stop offset='1' stop-color='$($p.accent)' stop-opacity='0'/>
    </linearGradient>
  </defs>
  <rect width='1200' height='675' fill='url(#bg)'/>
  $lines
  $squares
  <rect x='0' y='0' width='1200' height='675' fill='url(#glow)'/>
  <g opacity='0.5'>
    <path d='M0 570 L1200 470 L1200 520 L0 620 Z' fill='$($p.accent)' opacity='0.08'/>
    <path d='M0 640 L1200 540 L1200 555 L0 655 Z' fill='$($p.accent)' opacity='0.14'/>
  </g>
  <g transform='translate(76 320) rotate(-90)' opacity='0.5'>
    <text font-family='Arial, sans-serif' font-size='120' font-weight='800' letter-spacing='18' fill='$($p.accent)'>$Glyph</text>
  </g>
  <g transform='translate(90 560)'>
    <text font-family='Arial, sans-serif' font-size='30' font-weight='700' letter-spacing='8' fill='#ffffff' opacity='0.92'>$Label</text>
    <text y='40' font-family='Arial, sans-serif' font-size='17' font-weight='400' letter-spacing='6' fill='#ffffff' opacity='0.45'>$Sub</text>
  </g>
</svg>
"@

  [System.IO.File]::WriteAllText((Join-Path $outRoot $File), $svg, [System.Text.Encoding]::UTF8)
}

# Hero, about, cta
New-Svg -File 'hero-home.svg' -Seed 11 -Glyph 'W' -Label 'WESTBRIDGE DEMOLITION' -Sub 'MIAMI · FORT LAUDERDALE · WPB'
New-Svg -File 'about-history.svg' -Seed 12 -Glyph 'W' -Label 'HISTORIA' -Sub 'DESDE 2003'
New-Svg -File 'about-operations.svg' -Seed 13 -Glyph 'W' -Label 'CAPACIDAD OPERATIVA' -Sub 'FLOTA PROPIA'
New-Svg -File 'cta.svg' -Seed 14 -Glyph 'W' -Label 'ESTIMADOS GRATUITOS' -Sub 'RESPUESTA EN 48 HORAS'
New-Svg -File 'safety-hero.svg' -Seed 15 -Glyph 'S' -Label 'CULTURA DE SEGURIDAD' -Sub 'CERO INCIDENTES'
New-Svg -File 'safety-culture.svg' -Seed 16 -Glyph 'S' -Label 'ENTRENAMIENTO CONTINUO' -Sub 'OSHA 30'

# Services
$svc = @(
  @{ n = 1; label = 'ESTRUCTURAL' },
  @{ n = 2; label = 'INTERIOR / STRIP-OUT' },
  @{ n = 3; label = 'SELECTIVA' },
  @{ n = 4; label = 'EXCAVACIÓN' },
  @{ n = 5; label = 'RECICLAJE' },
  @{ n = 6; label = 'REMEDIACIÓN' },
  @{ n = 7; label = 'APUNTALAMIENTO' }
)
foreach ($s in $svc) {
  New-Svg -File "service-$($s.n).svg" -Seed (20 + $s.n) -Glyph "$($s.n)" -Label $s.label -Sub 'WESTBRIDGE DEMOLITION'
}

# Projects (8 projects x 2 gallery variants)
for ($p = 1; $p -le 8; $p++) {
  New-Svg -File "project-$p-1.svg" -Seed (40 + $p) -Glyph "$p" -Label "PROYECTO $p" -Sub 'WESTBRIDGE DEMOLITION'
  New-Svg -File "project-$p-2.svg" -Seed (60 + $p) -Glyph "$p" -Label "PROYECTO $p" -Sub 'FASE OPERATIVA'
  New-Svg -File "project-$p-3.svg" -Seed (80 + $p) -Glyph "$p" -Label "PROYECTO $p" -Sub 'RESULTADOS'
}

Write-Host "Generadas $(Get-ChildItem $outRoot -Filter *.svg | Measure-Object | Select-Object -ExpandProperty Count) imágenes en $outRoot"
