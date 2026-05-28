import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

type CDTab = 'overview' | 'commands' | 'monitoring' | 'local-mode';

@Component({
  selector: 'app-deploy-steps',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-6xl mx-auto px-4 py-8 antialiased">
      <!-- Header Banner -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-700 p-8 md:p-12 shadow-2xl mb-10">
        <div class="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0))]"></div>
        <div class="relative z-10 max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/30 text-violet-100 text-xs font-semibold uppercase tracking-wider mb-4 border border-violet-400/20">
            <span class="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Local Development Exclusive Mode
          </div>
          <h1 class="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Core Library <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-emerald-300">Deployment Dashboard</span>
          </h1>
          <p class="mt-4 text-base md:text-lg text-violet-100/90 leading-relaxed font-medium">
            This deployment engine and interactive guide is active <strong>only locally</strong>. It is completely stripped from the production build to secure proprietary workflow steps.
          </p>
        </div>
      </div>

      <!-- Main Columns -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left: Steps Completed Timeline (1/3 width) -->
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <h2 class="text-lg font-bold text-slate-100 flex items-center gap-2 mb-6">
              <i class="fa-solid fa-list-check text-emerald-400"></i>
              Completed Setup Steps
            </h2>
            
            <div class="relative pl-6 border-l border-slate-800 space-y-8">
              <!-- Step 1 -->
              <div class="relative">
                <span class="absolute -left-[31px] top-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 text-xs font-bold">
                  ✓
                </span>
                <h3 class="text-sm font-semibold text-slate-100">SSH Authentication Resolved</h3>
                <p class="text-xs text-slate-400 mt-1 leading-relaxed">
                  Configured Git to communicate with Windows OpenSSH client, successfully matching user keys loaded in <code>ssh-agent</code>.
                </p>
              </div>

              <!-- Step 2 -->
              <div class="relative">
                <span class="absolute -left-[31px] top-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 text-xs font-bold">
                  ✓
                </span>
                <h3 class="text-sm font-semibold text-slate-100">Clean Commit History</h3>
                <p class="text-xs text-slate-400 mt-1 leading-relaxed">
                  Rewrote local commit authors to <code>dandavateomkar&#64;gmail.com</code> and force-updated remote origin.
                </p>
              </div>

              <!-- Step 3 -->
              <div class="relative">
                <span class="absolute -left-[31px] top-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 text-xs font-bold">
                  ✓
                </span>
                <h3 class="text-sm font-semibold text-slate-100">CI/CD Engine Deployed</h3>
                <p class="text-xs text-slate-400 mt-1 leading-relaxed">
                  Engineered <code>deploy.yml</code> GitHub Actions workflow to build and push Angular 21 assets to <code>gh-pages</code>.
                </p>
              </div>

              <!-- Step 4 -->
              <div class="relative">
                <span class="absolute -left-[31px] top-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 text-xs font-bold">
                  ✓
                </span>
                <h3 class="text-sm font-semibold text-slate-100">SPA Routing Protection</h3>
                <p class="text-xs text-slate-400 mt-1 leading-relaxed">
                  Implemented automatic <code>404.html</code> fallbacks to keep subpages active when deep routes are refreshed on GitHub Pages.
                </p>
              </div>
            </div>
          </div>

          <!-- Alert Box -->
          <div class="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
            <h4 class="text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2 mb-2">
              <i class="fa-solid fa-triangle-exclamation"></i>
              Security Protocol
            </h4>
            <p class="text-xs text-slate-300 leading-relaxed">
              When executing <code>npm run build</code>, Angular's compilation step tree-shakes the lazy routes referencing this component entirely out of the production package.
            </p>
          </div>
        </div>

        <!-- Right: Interactive Guides (2/3 width) -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <!-- Tabs Menu -->
            <div class="flex border-b border-slate-800 bg-slate-950/60 p-2 overflow-x-auto gap-1">
              <button 
                *ngFor="let tab of tabs" 
                (click)="active_tab.set(tab.value)"
                [class]="active_tab() === tab.value 
                  ? 'bg-violet-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'"
                class="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 whitespace-nowrap">
                <i [class]="'fa-solid ' + tab.fa_icon"></i>
                {{ tab.label }}
              </button>
            </div>

            <!-- Tab Content -->
            <div class="p-6 md:p-8">
              
              <!-- Tab: Overview -->
              <div *ngIf="active_tab() === 'overview'" class="space-y-6 animate-fadeIn">
                <h3 class="text-xl font-bold text-slate-100">Automatic Continuous Deployment</h3>
                <p class="text-sm text-slate-300 leading-relaxed">
                  You now have a fully automated pipeline. You no longer need to manually copy built files, run SFTP transfers, or deploy anything manually. The entire lifecycle is fully integrated into your Git commands.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="bg-slate-950 border border-slate-850 p-4 rounded-xl">
                    <span class="text-xs font-extrabold text-violet-400 uppercase tracking-widest block mb-1">Local Serve Route</span>
                    <p class="text-xs text-slate-400 leading-relaxed">
                      This page is routed at <code>/dev-deploy-steps</code>. It is configured dynamically to render only during development.
                    </p>
                  </div>
                  <div class="bg-slate-950 border border-slate-850 p-4 rounded-xl">
                    <span class="text-xs font-extrabold text-emerald-400 uppercase tracking-widest block mb-1">Live URL</span>
                    <p class="text-xs text-slate-400 leading-relaxed">
                      Your production website will deploy live and clean directly at <a href="https://Dom-21.github.io/dom-library-core/" target="_blank" class="text-emerald-400 underline hover:text-emerald-300">Dom-21.github.io/dom-library-core/</a>.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Tab: Commands -->
              <div *ngIf="active_tab() === 'commands'" class="space-y-6 animate-fadeIn">
                <h3 class="text-xl font-bold text-slate-100">Everyday Workflow Commands</h3>
                <p class="text-sm text-slate-300">
                  To push updates to the live site, simply run these standard commands in your local directory terminal:
                </p>
                
                <div class="relative bg-slate-950 rounded-xl border border-slate-850 p-5 mt-2">
                  <button 
                    (click)="copyCode(snippets.push)" 
                    class="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-[10px] font-bold text-slate-300 hover:text-white transition-all">
                    <i class="fa-regular" [class.fa-copy]="!copied()" [class.fa-circle-check]="copied()"></i>
                    {{ copied() ? 'Copied!' : 'Copy Code' }}
                  </button>
                  <pre class="text-xs text-emerald-400 font-mono leading-relaxed overflow-x-auto select-all pr-12">{{ snippets.push }}</pre>
                </div>

                <div class="flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl text-slate-300 text-xs">
                  <i class="fa-solid fa-circle-info text-indigo-400 text-base"></i>
                  <span>The deployment process triggers entirely on GitHub servers automatically. Your local terminal is freed up immediately!</span>
                </div>
              </div>

              <!-- Tab: Monitoring -->
              <div *ngIf="active_tab() === 'monitoring'" class="space-y-6 animate-fadeIn">
                <h3 class="text-xl font-bold text-slate-100">Monitoring Your Deployments</h3>
                <p class="text-sm text-slate-300 leading-relaxed">
                  Every time you push a commit, a GitHub Actions runner starts building and testing your app. You can monitor the real-time build progress and view full console logs.
                </p>
                <div class="bg-slate-950 border border-slate-850 p-6 rounded-xl space-y-4">
                  <div class="flex items-start gap-4">
                    <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600/20 text-violet-400 font-bold border border-violet-500/20">1</div>
                    <div>
                      <h4 class="text-sm font-bold text-slate-200">Go to your GitHub Actions Hub</h4>
                      <p class="text-xs text-slate-400 mt-1">
                        Navigate to <a href="https://github.com/Dom-21/dom-library-core/actions" target="_blank" class="text-violet-400 underline hover:text-violet-300">github.com/Dom-21/dom-library-core/actions</a>.
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start gap-4">
                    <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600/20 text-violet-400 font-bold border border-violet-500/20">2</div>
                    <div>
                      <h4 class="text-sm font-bold text-slate-200">Inspect the Run</h4>
                      <p class="text-xs text-slate-400 mt-1">
                        Click on the top-most active workflow run (indicated by a yellow spinning wheel when building, green check when deployed successfully).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tab: Local Mode -->
              <div *ngIf="active_tab() === 'local-mode'" class="space-y-6 animate-fadeIn">
                <h3 class="text-xl font-bold text-slate-100">How the Exclusion Works</h3>
                <p class="text-sm text-slate-300 leading-relaxed">
                  We use the Angular framework’s runtime environment boundaries inside <code>app.routes.ts</code> to ensure this dashboard is completely stripped from production build trees.
                </p>
                
                <div class="relative bg-slate-950 rounded-xl border border-slate-850 p-5">
                  <button 
                    (click)="copyCode(snippets.excludeCode)" 
                    class="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-[10px] font-bold text-slate-300 hover:text-white transition-all">
                    <i class="fa-regular" [class.fa-copy]="!copied()" [class.fa-circle-check]="copied()"></i>
                    {{ copied() ? 'Copied!' : 'Copy' }}
                  </button>
                  <pre class="text-xs text-violet-400 font-mono leading-relaxed overflow-x-auto select-all pr-12">{{ snippets.excludeCode }}</pre>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class DeployStepsComponent {
  readonly active_tab = signal<CDTab>('overview');
  readonly copied = signal<boolean>(false);

  readonly tabs: { label: string; value: CDTab; fa_icon: string }[] = [
    { label: 'Deployment Overview', value: 'overview', fa_icon: 'fa-gauge' },
    { label: 'Continuous CD Commands', value: 'commands', fa_icon: 'fa-terminal' },
    { label: 'Build Monitoring', value: 'monitoring', fa_icon: 'fa-chart-line' },
    { label: 'Exclusion Engine', value: 'local-mode', fa_icon: 'fa-shield-halved' }
  ];

  readonly snippets = {
    push: `# Stage all modified/new files in the repository
git add .

# Commit changes with a clean, informative message
git commit -m "feat: built custom components and optimized layout"

# Push to origin main (triggers deployment runner immediately)
git push origin main`,

    excludeCode: `// src/app/app.routes.ts
import { isDevMode } from '@angular/core';

export const routes: Routes = [
  // ... Standard routes
];

// Conditionally append local developer routes
if (isDevMode()) {
  routes.push({
    path: 'dev-deploy-steps',
    loadComponent: () =>
      import('./documentation/components/deploy-steps/deploy-steps').then((m) => m.DeployStepsComponent),
  });
}`
  };

  copyCode(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
