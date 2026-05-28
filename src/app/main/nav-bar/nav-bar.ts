import { Component, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header
      class="transition-all duration-500 bg-slate-950 border-b border-amber-500 border-opacity-20"
    >
      <nav class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <!-- Logo -->
        <a routerLink="/" class="flex items-center gap-2 group">
          <span class="w-7 h-7 rounded-sm bg-amber-500 flex items-center justify-center
                        group-hover:rotate-12 transition-transform duration-300">
            <svg class="w-4 h-4 text-slate-950" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </span>
          <span class=" font-bold tracking-widest text-sm uppercase">Apex</span>
        </a>

        <!-- Desktop Links -->
        <ul class="hidden md:flex items-center gap-1">
          @for (link of navLinks; track link.path) {
            <li>
              <a
                [routerLink]="link.path"
                routerLinkActive="text-amber-400 font-semibold"
                [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                class="relative px-4 py-2 text-sm tracking-wider uppercase text-slate-50
                       hover:text-blue-500 transition-colors duration-200 group"
              >
                <span class="relative z-10">{{ link.label }}</span>
                <!-- Hover underline -->
                <span class="absolute bottom-0 left-4 right-4 h-px bg-amber-500
                             scale-x-0 group-hover:scale-x-100 origin-left
                             transition-transform duration-300"></span>
              </a>
            </li>
          }
        </ul>

        <!-- CTA -->
        <a
          routerLink="/demo"
          class="hidden md:flex items-center gap-2 px-5 py-2 text-xs tracking-widest
                 uppercase font-bold border border-amber-500 text-amber-400
                 hover:bg-amber-500 hover:text-slate-950
                 transition-all duration-200 rounded-sm"
        >
          Get Started
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>

        <!-- Mobile Menu Button -->
        <button
          (click)="toggleMenu()"
          class="md:hidden flex flex-col gap-1.5 p-2 group"
          aria-label="Toggle menu"
        >
          <span class="w-6 h-px bg-white transition-all duration-300"
                [class.rotate-45]="menuOpen()"
                [class.translate-y-2]="menuOpen()"></span>
          <span class="w-4 h-px bg-amber-500 transition-all duration-300"
                [class.opacity-0]="menuOpen()"></span>
          <span class="w-6 h-px bg-white transition-all duration-300"
                [class.-rotate-45]="menuOpen()"
                [class.-translate-y-2]="menuOpen()"></span>
        </button>
      </nav>

      <!-- Mobile Menu Dropdown -->
      <div
        class="md:hidden overflow-hidden transition-all duration-500 bg-slate-950 border-t border-slate-800"
        [class.max-h-64]="menuOpen()"
        [class.max-h-0]="!menuOpen()"
      >
        <ul class="px-6 py-4 flex flex-col gap-1">
          @for (link of navLinks; track link.path) {
            <li>
              <a
                [routerLink]="link.path"
                routerLinkActive="text-amber-400"
                [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                (click)="menuOpen.set(false)"
                class="block py-3 text-sm tracking-widest uppercase text-slate-400
                       hover:text-white border-b border-slate-800 transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          }
          <li class="pt-3">
            <a
              routerLink="/contact"
              (click)="menuOpen.set(false)"
              class="inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-widest
                     uppercase font-bold bg-amber-500 text-slate-950 rounded-sm w-full justify-center"
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
  scrolled = signal(false);
  menuOpen = signal(false);

  navLinks = [
    { label: 'Home',    path: '/'        },
    { label: 'Documentation', path: '/documentation' },
    { label: 'Contact', path: '/contact' },
  ];

  // @HostListener('window:scroll')
  // onScroll() {
  //   this.scrolled.set(window.scrollY > 20);
  // }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }
}
