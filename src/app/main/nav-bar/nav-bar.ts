import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header
      class="fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md shadow-lg"
    >
      <nav class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <!-- Logo: DOM Library Core -->
        <a routerLink="/" class="flex items-center gap-3 group">
          <div
            class="relative w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-900/40 group-hover:scale-105 transition-transform duration-300"
          >
            <!-- Glowing background aura -->
            <div
              class="absolute inset-0 rounded-xl bg-violet-400 blur opacity-40 group-hover:opacity-75 transition-opacity"
            ></div>
            <svg
              class="relative z-10 w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
              />
            </svg>
          </div>
          <div class="flex flex-col text-left">
            <span
              class="text-lg font-black tracking-wider text-white leading-none uppercase font-sans"
            >
              DOM
            </span>
            <span class="text-[9px] font-extrabold tracking-widest text-slate-400 uppercase mt-0.5">
              Library Core
            </span>
          </div>
        </a>

        <!-- Desktop Links -->
        <ul class="hidden md:flex items-center gap-1">
          @for (link of navLinks; track link.path) {
            <li>
              <a
                [routerLink]="link.path"
                routerLinkActive="text-violet-400 font-bold"
                [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                class="relative px-4 py-2 text-xs tracking-widest uppercase font-semibold text-slate-300
                       hover:text-white transition-colors duration-300 group"
              >
                <span class="relative z-10">{{ link.label }}</span>
                <!-- Hover underline -->
                <span
                  class="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500
                             scale-x-0 group-hover:scale-x-100 origin-left
                             transition-transform duration-300"
                ></span>
              </a>
            </li>
          }
        </ul>

        <!-- CTA Button -->
        <a
          routerLink="/documentation"
          class="hidden md:flex items-center gap-2 px-6 py-2.5 text-xs tracking-widest
                 uppercase font-extrabold bg-gradient-to-r from-violet-600 to-indigo-650 text-white
                 hover:shadow-lg hover:shadow-violet-900/30 hover:scale-[1.02] active:scale-[0.98]
                 transition-all duration-300 rounded-xl"
        >
          Get Started
          <svg
            class="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </a>

        <!-- Mobile Menu Button -->
        <button
          (click)="toggleMenu()"
          class="md:hidden flex flex-col gap-1.5 p-2 group"
          aria-label="Toggle menu"
        >
          <span
            class="w-6 h-0.5 bg-white transition-all duration-300"
            [class.rotate-45]="menuOpen()"
            [class.translate-y-2]="menuOpen()"
          ></span>
          <span
            class="w-4 h-0.5 bg-violet-400 transition-all duration-300"
            [class.opacity-0]="menuOpen()"
          ></span>
          <span
            class="w-6 h-0.5 bg-white transition-all duration-300"
            [class.-rotate-45]="menuOpen()"
            [class.-translate-y-2]="menuOpen()"
          ></span>
        </button>
      </nav>

      <!-- Mobile Menu Dropdown -->
      <div
        class="md:hidden overflow-hidden transition-all duration-500 bg-slate-950 border-t border-slate-900"
        [class.max-h-64]="menuOpen()"
        [class.max-h-0]="!menuOpen()"
      >
        <ul class="px-6 py-4 flex flex-col gap-1 text-left">
          @for (link of navLinks; track link.path) {
            <li>
              <a
                [routerLink]="link.path"
                routerLinkActive="text-violet-400 font-bold"
                [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                (click)="menuOpen.set(false)"
                class="block py-3 text-xs tracking-widest uppercase text-slate-400
                       hover:text-white border-b border-slate-900 transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          }
          <li class="pt-3">
            <a
              routerLink="/documentation"
              (click)="menuOpen.set(false)"
              class="inline-flex items-center gap-2 px-5 py-3 text-xs tracking-widest
                     uppercase font-extrabold bg-gradient-to-r from-violet-600 to-indigo-650 text-white rounded-xl w-full justify-center"
            >
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </header>
  `,
})
export class NavBar {
  menuOpen = signal(false);

  navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Documentation', path: '/documentation' },
    { label: 'Contact Us', path: '/contact' },
  ];

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }
}
