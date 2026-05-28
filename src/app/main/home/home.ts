import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <!-- Hero Section -->
    <section class="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden antialiased">
      
      <!-- Interactive Grid Backdrop -->
      <div class="absolute inset-0 opacity-[0.04]"
           style="background-image: linear-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(139, 92, 246, 0.4) 1px, transparent 1px);
                  background-size: 60px 60px;">
      </div>

      <!-- Glowing Neon Orbs -->
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                  w-[500px] h-[500px] rounded-full opacity-20 blur-[130px]
                  bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 pointer-events-none animate-pulse-slow"></div>

      <!-- Side Accent Lighting -->
      <div class="absolute top-0 right-0 w-px h-full bg-gradient-to-b
                  from-transparent via-violet-500/25 to-transparent opacity-40"></div>

      <div class="relative max-w-6xl mx-auto px-6 pt-32 pb-24 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        <!-- Left: Branding & Core Headline (7/12 width) -->
        <div class="lg:col-span-7 text-left space-y-8">
          <!-- Tag Badge -->
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-xs font-bold uppercase tracking-wider border border-violet-500/20 animate-fadeIn">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Angular 21 · Standalone Core
          </div>

          <!-- Major Headline -->
          <h1 class="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight animate-slideUp">
            Futuristic Controls. <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-teal-300">
              Zero Performance Lag.
            </span>
          </h1>

          <!-- Detailed Subtitle -->
          <p class="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl animate-slideUpDelay">
            DOM Library Core is a state-of-the-art Angular standalone component package. Built completely zoneless with signals change detection, dynamic animations, and built-in Tailwind CSS.
          </p>

          <!-- CTAs -->
          <div class="flex flex-wrap gap-4 pt-2 animate-slideUpDelay">
            <a
              routerLink="/documentation"
              class="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-650 text-white
                     font-extrabold text-xs tracking-widest uppercase rounded-xl
                     shadow-lg shadow-violet-900/25 hover:shadow-violet-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Get Started
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                   fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
            </a>
            <a
              routerLink="/contact"
              class="flex items-center gap-3 px-8 py-4 border border-slate-800 bg-slate-900/40 text-slate-300
                     font-extrabold text-xs tracking-widest uppercase rounded-xl backdrop-blur-sm
                     hover:border-slate-600 hover:text-white hover:bg-slate-900/80 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>

        <!-- Right: Modern Visuals / Floating Stats (5/12 width) -->
        <div class="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center">
          <div class="relative w-full max-w-sm">
            <!-- Neon background glow for cards -->
            <div class="absolute -inset-1 rounded-3xl bg-gradient-to-br from-violet-500 to-teal-400 opacity-20 blur-xl"></div>
            
            <div class="relative bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-6">
              <h3 class="text-sm font-extrabold tracking-widest text-slate-400 uppercase">Engine Benchmarks</h3>
              
              <div class="space-y-4">
                @for (stat of stats; track stat.label) {
                  <div class="group flex items-center justify-between p-4 bg-slate-950/60 border border-slate-850 rounded-2xl hover:border-violet-500/30 transition-all duration-300">
                    <div class="text-left">
                      <span class="text-xs text-slate-500 uppercase tracking-wider block">{{ stat.label }}</span>
                      <span class="text-sm font-bold text-slate-300 mt-0.5 block">{{ stat.desc }}</span>
                    </div>
                    <div class="text-2xl font-black text-violet-400 group-hover:text-violet-300 transition-colors">
                      {{ stat.value }}
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Scroll Down Badge -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-50">
        <span class="text-slate-500 text-[10px] font-extrabold tracking-widest uppercase">Overview</span>
        <div class="w-px h-10 bg-gradient-to-b from-slate-700 to-transparent"></div>
      </div>
    </section>

    <!-- Features Overview -->
    <section class="relative bg-slate-900/60 py-24 border-t border-slate-900 overflow-hidden">
      <!-- Grid accent overlay -->
      <div class="absolute inset-0 opacity-[0.01]"
           style="background-image: linear-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(139, 92, 246, 0.4) 1px, transparent 1px);
                  background-size: 80px 80px;">
      </div>

      <div class="relative max-w-6xl mx-auto px-6 z-10">
        
        <!-- Section Header -->
        <div class="mb-16 text-left">
          <p class="text-violet-400 text-xs font-bold uppercase tracking-wider mb-2">
            Why Choose DOM?
          </p>
          <h2 class="text-3xl md:text-4xl font-black text-white tracking-tight">
            Designed for the Professional.
          </h2>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (feature of features; track feature.title) {
            <div class="group relative bg-slate-950/40 border border-slate-850 p-8 rounded-2xl hover:border-violet-500/40 hover:bg-slate-950/80 transition-all duration-300">
              <!-- Glow accent border hover -->
              <div class="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-500/0 group-hover:via-violet-500/40 to-transparent transition-all duration-300"></div>

              <div class="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20
                          flex items-center justify-center mb-6 text-2xl
                          group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">
                <span class="text-violet-400 group-hover:text-white">{{ feature.icon }}</span>
              </div>
              <h3 class="text-white font-bold text-lg mb-2 text-left">
                {{ feature.title }}
              </h3>
              <p class="text-slate-400 text-sm leading-relaxed text-left">
                {{ feature.desc }}
              </p>
            </div>
          }
        </div>

      </div>
    </section>

    <!-- Bottom Call-To-Action -->
    <section class="relative py-20 bg-gradient-to-r from-violet-600 via-indigo-650 to-indigo-700 overflow-hidden shadow-2xl">
      <div class="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0))]"></div>
      <div class="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 z-10">
        <div class="text-left">
          <h2 class="text-white text-3xl font-black tracking-tight leading-tight">
            Ready to upgrade your interface?
          </h2>
          <p class="text-violet-100 text-sm mt-2 font-medium">Explore standard components, layouts, and input models today.</p>
        </div>
        <a
          routerLink="/documentation"
          class="flex items-center gap-3 px-8 py-4 bg-white text-slate-950
                 font-extrabold text-xs tracking-widest uppercase rounded-xl
                 shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 shrink-0"
        >
          Explore Docs
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
          </svg>
        </a>
      </div>
    </section>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); }
      50% { opacity: 0.22; transform: translate(-50%, -50%) scale(1.08); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-slideUp {
      animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-slideUpDelay {
      opacity: 0;
      animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
    }
    .animate-pulse-slow {
      animation: pulse-slow 10s infinite ease-in-out;
    }
  `]
})
export class Home {
  readonly stats = [
    { value: 'v21',    label: 'Framework Core', desc: 'Native Angular 21 Support' },
    { value: '0ms',   label: 'Detection Lag',  desc: 'Zoneless Change Detection' },
    { value: '100%',  label: 'Modular Design', desc: 'Fully Standalone Controls' },
  ];

  readonly features = [
    {
      icon: '⚡',
      title: 'Zoneless Signals',
      desc: 'Harness the pure reactive power of Angular Signals. Zero Zone.js runtime checking overhead.',
    },
    {
      icon: '◈',
      title: 'Modular Standalone Controls',
      desc: 'Import only what you need. Zero NgModule configuration boilerplate. Clean, tree-shakeable inputs.',
    },
    {
      icon: '✦',
      title: 'Tailwind CSS Built-in',
      desc: 'Seamless styling matching your exact system aesthetics. Optimized compilation footprints.',
    },
  ];
}
