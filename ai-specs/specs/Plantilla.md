<!DOCTYPE html>

<html class="light" lang="es"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100;200;300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "inverse-surface": "#332f31",
                        "inverse-primary": "#e9bacd",
                        "primary-container": "#f8c8dc",
                        "on-secondary-fixed": "#251720",
                        "error-container": "#ffdad6",
                        "primary-fixed": "#ffd8e7",
                        "on-background": "#1e1b1c",
                        "error": "#ba1a1a",
                        "surface-container-low": "#faf1f4",
                        "on-secondary-container": "#705d68",
                        "surface-dim": "#e0d8da",
                        "surface-bright": "#fff7f9",
                        "background": "#fff7f9",
                        "on-tertiary": "#ffffff",
                        "on-primary": "#ffffff",
                        "surface-container-lowest": "#ffffff",
                        "tertiary-fixed-dim": "#d8c0cb",
                        "on-error-container": "#93000a",
                        "surface": "#fff7f9",
                        "secondary-fixed": "#f5dce9",
                        "surface-container-high": "#eee6e8",
                        "on-surface-variant": "#4f4448",
                        "surface-container": "#f4ecee",
                        "tertiary-container": "#e7ced9",
                        "surface-tint": "#795465",
                        "on-primary-container": "#765162",
                        "primary-fixed-dim": "#e9bacd",
                        "tertiary-fixed": "#f5dce7",
                        "on-error": "#ffffff",
                        "tertiary": "#6c5962",
                        "outline": "#817478",
                        "on-tertiary-fixed": "#25171f",
                        "on-surface": "#1e1b1c",
                        "on-primary-fixed": "#2e1221",
                        "on-primary-fixed-variant": "#5f3c4d",
                        "surface-container-highest": "#e9e0e3",
                        "inverse-on-surface": "#f7eff1",
                        "on-secondary": "#ffffff",
                        "secondary": "#6c5964",
                        "primary": "#795465",
                        "on-tertiary-container": "#695660",
                        "surface-variant": "#e9e0e3",
                        "on-tertiary-fixed-variant": "#53424b",
                        "secondary-container": "#f2d9e6",
                        "secondary-fixed-dim": "#d8c0cd",
                        "outline-variant": "#d2c3c7",
                        "on-secondary-fixed-variant": "#53424c"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "unit": "4px",
                        "md": "16px",
                        "gutter": "24px",
                        "lg": "24px",
                        "sm": "8px",
                        "xs": "4px",
                        "xl": "48px",
                        "margin": "32px"
                    },
                    "fontFamily": {
                        "headline-sm": ["Lexend"],
                        "headline-md": ["Lexend"],
                        "label-sm": ["Lexend"],
                        "body-lg": ["Lexend"],
                        "label-lg": ["Lexend"],
                        "headline-lg": ["Lexend"],
                        "body-md": ["Lexend"]
                    },
                    "fontSize": {
                        "headline-sm": ["20px", {"lineHeight": "1.4", "letterSpacing": "0em", "fontWeight": "500"}],
                        "headline-md": ["28px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "400"}],
                        "label-sm": ["12px", {"lineHeight": "1", "letterSpacing": "0.1em", "fontWeight": "600"}],
                        "body-lg": ["18px", {"lineHeight": "1.6", "letterSpacing": "0em", "fontWeight": "300"}],
                        "label-lg": ["14px", {"lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "500"}],
                        "headline-lg": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "300"}],
                        "body-md": ["16px", {"lineHeight": "1.6", "letterSpacing": "0em", "fontWeight": "400"}]
                    }
                }
            }
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .stave-line {
            height: 1px;
            background-color: #EAD1DC;
            width: 100%;
        }
        body {
            background-color: #fff7f9;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="font-body-md text-on-surface selection:bg-primary-container">
<!-- Top Navigation Bar -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin h-16 bg-[#FDF6F9] border-b border-[#EAD1DC]">
<button class="flex items-center justify-center w-10 h-10 hover:bg-[#F8C8DC]/20 transition-colors duration-200">
<span class="material-symbols-outlined text-[#332F31]" data-icon="menu">menu</span>
</button>
<div class="font-['Lexend'] text-lg font-light tracking-[0.2em] text-[#332F31] uppercase">
            CONSERVATORIO PRO
        </div>
<div class="flex items-center gap-sm">
<button class="flex items-center justify-center w-10 h-10 hover:bg-[#F8C8DC]/20 transition-colors duration-200">
<span class="material-symbols-outlined text-[#332F31]" data-icon="settings">settings</span>
</button>
</div>
</header>
<main class="pt-24 pb-32 px-margin max-w-7xl mx-auto">
<!-- Hero Section: Continuar practicando -->
<section class="relative overflow-hidden mb-xl rounded-lg border border-[#EAD1DC] bg-surface-container-lowest group">
<div class="flex flex-col md:flex-row min-h-[320px]">
<div class="w-full md:w-1/2 p-lg flex flex-col justify-center space-y-md">
<span class="font-label-sm text-primary tracking-widest uppercase">EN CURSO</span>
<h1 class="font-headline-lg text-inverse-surface">Continuar practicando</h1>
<p class="font-body-lg text-on-surface-variant max-w-md">Retoma tu lección de Armonía III: Estructura de la Sonata en Do mayor.</p>
<div class="pt-md">
<button class="bg-[#F8C8DC] text-[#332F31] font-label-lg px-xl py-md rounded-sm border border-[#EAD1DC] hover:bg-primary-container active:opacity-70 transition-all uppercase tracking-widest">
                            Reanudar curso
                        </button>
</div>
</div>
<div class="w-full md:w-1/2 relative min-h-[200px] md:min-h-full">
<img alt="Classical Piano" class="absolute inset-0 w-full h-full object-cover" data-alt="Elegant close-up of a grand piano keyboard in a sunlit music hall with soft dust motes and warm pinkish highlights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWS-Jw10Kroofw48HlCH58mZhXCAafkCJz0QG2iWrCyNRnLuqH_DdwEfo2j6hqMeYOKml1nFWWp4Wdd6RoVjsZeKYxfQLitXu3T-F5Q6pMGmksv_I77DSgBLvpuTFh3z-8O6A1u3UrqYhcxl6q7HwZpcaxhxhOXhfdD53LfmLSYTKU0AueB_fdVyfUMU79_JQIvZ_YFndV4uqQkxSXcYEzcnCmNAWsYGm0lVUnvxpFtkx0QAM6d6Yy8WBwcp7DoepOb6na9mfzYygc"/>
<div class="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
</div>
</div>
</section>
<!-- Main Content Grid -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
<!-- Category Grid (Left 8 Columns) -->
<div class="lg:col-span-8 space-y-lg">
<div class="flex items-center justify-between">
<h2 class="font-headline-sm text-inverse-surface tracking-wide">BIBLIOTECA ACADÉMICA</h2>
</div>
<div class="grid grid-cols-2 sm:grid-cols-3 gap-md">
<!-- Category Cards -->
<div class="bg-surface-container-low border border-[#EAD1DC] p-lg flex flex-col items-center text-center space-y-md hover:bg-[#F8C8DC]/10 transition-colors cursor-pointer group">
<span class="material-symbols-outlined text-4xl text-primary" data-icon="menu_book">menu_book</span>
<h3 class="font-label-lg tracking-widest text-[#332F31]">TEORÍA</h3>
</div>
<div class="bg-surface-container-low border border-[#EAD1DC] p-lg flex flex-col items-center text-center space-y-md hover:bg-[#F8C8DC]/10 transition-colors cursor-pointer">
<span class="material-symbols-outlined text-4xl text-primary" data-icon="music_note">music_note</span>
<h3 class="font-label-lg tracking-widest text-[#332F31]">LECTURA</h3>
</div>
<div class="bg-surface-container-low border border-[#EAD1DC] p-lg flex flex-col items-center text-center space-y-md hover:bg-[#F8C8DC]/10 transition-colors cursor-pointer">
<span class="material-symbols-outlined text-4xl text-primary" data-icon="straighten">straighten</span>
<h3 class="font-label-lg tracking-widest text-[#332F31]">INTERVALOS</h3>
</div>
<div class="bg-surface-container-low border border-[#EAD1DC] p-lg flex flex-col items-center text-center space-y-md hover:bg-[#F8C8DC]/10 transition-colors cursor-pointer">
<span class="material-symbols-outlined text-4xl text-primary" data-icon="exposure_plus_1">exposure_plus_1</span>
<h3 class="font-label-lg tracking-widest text-[#332F31]">ESCALAS MAYORES</h3>
</div>
<div class="bg-surface-container-low border border-[#EAD1DC] p-lg flex flex-col items-center text-center space-y-md hover:bg-[#F8C8DC]/10 transition-colors cursor-pointer">
<span class="material-symbols-outlined text-4xl text-primary" data-icon="exposure_neg_1">exposure_neg_1</span>
<h3 class="font-label-lg tracking-widest text-[#332F31]">ESCALAS MENORES</h3>
</div>
<div class="bg-surface-container-low border border-[#EAD1DC] p-lg flex flex-col items-center text-center space-y-md hover:bg-[#F8C8DC]/10 transition-colors cursor-pointer">
<span class="material-symbols-outlined text-4xl text-primary" data-icon="key">key</span>
<h3 class="font-label-lg tracking-widest text-[#332F31]">TONALIDADES</h3>
</div>
<div class="bg-surface-container-low border border-[#EAD1DC] p-lg flex flex-col items-center text-center space-y-md hover:bg-[#F8C8DC]/10 transition-colors cursor-pointer col-span-2 sm:col-span-1">
<span class="material-symbols-outlined text-4xl text-primary" data-icon="library_music">library_music</span>
<h3 class="font-label-lg tracking-widest text-[#332F31]">ACORDES</h3>
</div>
</div>
</div>
<!-- Sidebar (Right 4 Columns) -->
<aside class="lg:col-span-4 space-y-lg">
<!-- Metronome Widget -->
<div class="bg-surface-bright border border-[#EAD1DC] p-lg space-y-md">
<div class="flex items-center justify-between">
<h3 class="font-label-sm tracking-widest uppercase text-primary">METRÓNOMO</h3>
<span class="font-headline-sm text-[#332F31]">120 <small class="text-xs uppercase tracking-tighter">BPM</small></span>
</div>
<div class="flex flex-col space-y-4">
<div class="relative h-1 bg-secondary-container w-full">
<div class="absolute top-0 left-0 h-full bg-primary w-[60%]"></div>
<div class="absolute top-1/2 left-[60%] -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-2 border-white"></div>
</div>
<div class="flex justify-between items-center px-md">
<button class="w-10 h-10 flex items-center justify-center hover:bg-[#F8C8DC]/20"><span class="material-symbols-outlined">remove</span></button>
<button class="w-14 h-14 rounded-full bg-[#F8C8DC] flex items-center justify-center text-[#332F31] shadow-lg border border-[#EAD1DC]">
<span class="material-symbols-outlined text-3xl">play_arrow</span>
</button>
<button class="w-10 h-10 flex items-center justify-center hover:bg-[#F8C8DC]/20"><span class="material-symbols-outlined">add</span></button>
</div>
</div>
<div class="pt-sm border-t border-[#EAD1DC] flex justify-center space-x-gutter">
<span class="font-label-sm text-on-surface-variant">4/4 TIME</span>
<span class="font-label-sm text-on-surface-variant">MODERATO</span>
</div>
</div>
<!-- Weekly Progress Bar -->
<div class="bg-surface-container-low border border-[#EAD1DC] p-lg space-y-md">
<div class="flex items-center justify-between mb-sm">
<h3 class="font-label-sm tracking-widest uppercase text-primary">PROGRESO SEMANAL</h3>
<span class="font-label-sm text-[#332F31]">75%</span>
</div>
<div class="space-y-sm">
<div class="flex items-end justify-between h-24 gap-1">
<div class="w-full bg-[#F8C8DC]/40 h-1/2 rounded-t-sm" title="Mon"></div>
<div class="w-full bg-[#F8C8DC]/40 h-3/4 rounded-t-sm" title="Tue"></div>
<div class="w-full bg-[#F8C8DC]/40 h-2/3 rounded-t-sm" title="Wed"></div>
<div class="w-full bg-primary h-full rounded-t-sm" title="Thu"></div>
<div class="w-full bg-[#F8C8DC]/40 h-1/3 rounded-t-sm" title="Fri"></div>
<div class="w-full bg-[#F8C8DC]/40 h-1/2 rounded-t-sm" title="Sat"></div>
<div class="w-full bg-[#F8C8DC]/40 h-0 rounded-t-sm" title="Sun"></div>
</div>
<div class="flex justify-between font-label-sm text-[10px] text-on-surface-variant px-1">
<span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
</div>
</div>
<div class="pt-md border-t border-[#EAD1DC]">
<p class="font-label-sm text-[11px] leading-tight text-on-surface-variant">Has completado 4.5 horas de práctica esta semana. Mantén el ritmo.</p>
</div>
</div>
<!-- Small Aesthetic Musical Accent -->
<div class="opacity-30 pointer-events-none py-lg">
<div class="space-y-1">
<div class="stave-line"></div>
<div class="stave-line"></div>
<div class="stave-line"></div>
<div class="stave-line"></div>
<div class="stave-line"></div>
</div>
</div>
</aside>
</div>
</main>
<!-- Bottom Navigation Bar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-20 bg-[#FDF6F9] border-t border-[#EAD1DC]">
<!-- Home (Active) -->
<a class="flex flex-col items-center justify-center text-[#332F31] bg-[#F8C8DC] rounded-sm px-6 py-1 active:scale-95 transition-transform duration-150" href="#">
<span class="material-symbols-outlined" data-icon="home" style="font-variation-settings: 'FILL' 1;">home</span>
<span class="font-['Lexend'] text-[10px] tracking-[0.15em] font-medium uppercase mt-1">HOME</span>
</a>
<!-- Progress -->
<a class="flex flex-col items-center justify-center text-[#A6919A] px-4 py-1 hover:text-[#332F31] transition-all" href="#">
<span class="material-symbols-outlined" data-icon="equalizer">equalizer</span>
<span class="font-['Lexend'] text-[10px] tracking-[0.15em] font-medium uppercase mt-1">PROGRESS</span>
</a>
<!-- Profile -->
<a class="flex flex-col items-center justify-center text-[#A6919A] px-4 py-1 hover:text-[#332F31] transition-all" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="font-['Lexend'] text-[10px] tracking-[0.15em] font-medium uppercase mt-1">PROFILE</span>
</a>
</nav>
</body></html>