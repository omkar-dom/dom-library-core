import { Component, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- ─── Hero ─────────────────────────────────────────────── -->
    <section class="relative min-h-screen bg-slate-950 flex items-center overflow-hidden">

      <!-- Background grid -->
      <div class="absolute inset-0 opacity-10"
           style="background-image: linear-gradient(rgba(245,158,11,0.4) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(245,158,11,0.4) 1px, transparent 1px);
                  background-size: 60px 60px;">
      </div>

      <!-- Glow orb -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  w-[600px] h-[600px] rounded-full opacity-10 blur-3xl
                  bg-amber-500 pointer-events-none"></div>

      <!-- Diagonal accent line -->
      <div class="absolute top-0 right-0 w-px h-full bg-gradient-to-b
                  from-transparent via-amber-500 to-transparent opacity-30"></div>

      <div class="relative max-w-6xl mx-auto px-6 pt-24 pb-20 w-full">
        <div class="max-w-3xl">

          <!-- Tag -->
          <div class="inline-flex items-center gap-2 px-3 py-1 border border-amber-500/40
                      rounded-sm mb-8 animate-fade-in">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span class="text-amber-400 text-xs tracking-widest uppercase font-medium">
              Angular 21 · Zoneless
            </span>
          </div>

          <!-- Headline -->
          <h1 class="font-black text-white leading-none mb-6"
              style="font-size: clamp(3rem, 8vw, 6rem); font-family: 'Georgia', serif; letter-spacing: -0.02em;">
            Build things<br>
            <span class="text-amber-400">that matter.</span>
          </h1>

          <!-- Sub -->
          <p class="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl"
             style="font-family: 'Georgia', serif;">
            A minimal, performant Angular 21 starter — zoneless change detection,
            standalone components, and Tailwind CSS out of the box.
          </p>

          <!-- CTAs -->
          <div class="flex flex-wrap gap-4">
            <a
              routerLink="/counter"
              class="group flex items-center gap-3 px-7 py-3.5 bg-amber-500 text-slate-950
                     font-bold text-sm tracking-widest uppercase rounded-sm
                     hover:bg-amber-400 transition-colors duration-200"
            >
              Try Counter
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a
              routerLink="/contact"
              class="flex items-center gap-3 px-7 py-3.5 border border-slate-700 text-slate-300
                     font-bold text-sm tracking-widest uppercase rounded-sm
                     hover:border-slate-500 hover:text-white transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>

        <!-- Floating stat cards (desktop) -->
        <div class="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2
                    flex-col gap-4 w-52">
          @for (stat of stats; track stat.label) {
            <div class="bg-slate-900 border border-slate-800 rounded-sm p-4
                        hover:border-amber-500/40 transition-colors duration-300 group">
              <div class="text-2xl font-black text-white mb-1 group-hover:text-amber-400
                          transition-colors" style="font-family: 'Georgia', serif;">
                {{ stat.value }}
              </div>
              <div class="text-xs text-slate-500 tracking-widest uppercase">{{ stat.label }}</div>
            </div>
          }
        </div>
      </div>

      <!-- Scroll hint -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span class="text-slate-600 text-xs tracking-widest uppercase">Scroll</span>
        <div class="w-px h-10 bg-gradient-to-b from-slate-600 to-transparent"></div>
      </div>
    </section>

    <!-- ─── Features ──────────────────────────────────────────── -->
    <section class="bg-slate-900 py-24 border-t border-slate-800">
      <div class="max-w-6xl mx-auto px-6">

        <div class="mb-16">
          <p class="text-amber-400 text-xs tracking-widest uppercase mb-3 font-medium">
            What's included
          </p>
          <h2 class="text-3xl font-black text-white" style="font-family: 'Georgia', serif;">
            Everything you need.
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-800">
          @for (feature of features; track feature.title) {
            <div class="bg-slate-900 p-8 group hover:bg-slate-800/50 transition-colors duration-300">
              <div class="w-10 h-10 rounded-sm bg-amber-500/10 border border-amber-500/20
                          flex items-center justify-center mb-6
                          group-hover:bg-amber-500/20 transition-colors">
                <span class="text-amber-400 text-xl">{{ feature.icon }}</span>
              </div>
              <h3 class="text-white font-bold text-lg mb-3 tracking-tight"
                  style="font-family: 'Georgia', serif;">
                {{ feature.title }}
              </h3>
              <p class="text-slate-500 text-sm leading-relaxed">{{ feature.desc }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ─── CTA Banner ─────────────────────────────────────────── -->
    <section class="bg-amber-500 py-16">
      <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row
                  items-center justify-between gap-8">
        <div>
          <h2 class="text-slate-950 text-3xl font-black" style="font-family: 'Georgia', serif;">
            Ready to build?
          </h2>
          <p class="text-slate-800 text-sm mt-1">Start your journey with Apex today.</p>
        </div>
        <a
          routerLink="/contact"
          class="flex items-center gap-3 px-8 py-4 bg-slate-950 text-white
                 font-bold text-sm tracking-widest uppercase rounded-sm
                 hover:bg-slate-800 transition-colors duration-200 shrink-0"
        >
          Get In Touch
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </div>
    </section>
  `,
  styles: [`
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fade-in 0.6s ease both; }
  `]
})
export class Home {
  stats = [
    { value: '21',    label: 'Angular version' },
    { value: '0ms',   label: 'Zone overhead'   },
    { value: '100%',  label: 'Standalone'       },
  ];

  features = [
    {
      icon: '⚡',
      title: 'Zoneless Detection',
      desc:  'Angular 21 ships with signals-first change detection — no Zone.js, no overhead.',
    },
    {
      icon: '◈',
      title: 'Standalone Components',
      desc:  'Each component is fully self-contained with its own imports — no NgModule boilerplate.',
    },
    {
      icon: '✦',
      title: 'Tailwind CSS',
      desc:  'Utility-first styling with zero unused CSS in production. Fast to write, easy to maintain.',
    },
  ];
}
