import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="relative min-h-screen bg-slate-950 py-24 flex items-center justify-center overflow-hidden antialiased"
    >
      <!-- Ambient background grid and glowing neon orbs -->
      <div
        class="absolute inset-0 opacity-[0.03]"
        style="background-image: linear-gradient(rgba(139, 92, 246, 0.4) 1.5px, transparent 1.5px),
                                    linear-gradient(90deg, rgba(139, 92, 246, 0.4) 1.5px, transparent 1.5px);
                  background-size: 50px 50px;"
      ></div>

      <!-- Purple orb -->
      <div
        class="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2
                  w-[400px] h-[400px] rounded-full opacity-20 blur-[120px]
                  bg-gradient-to-r from-violet-600 to-indigo-600 pointer-events-none animate-pulse-slow"
      ></div>

      <!-- Blue orb -->
      <div
        class="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2
                  w-[400px] h-[400px] rounded-full opacity-10 blur-[120px]
                  bg-gradient-to-r from-cyan-500 to-blue-600 pointer-events-none animate-pulse-slower"
      ></div>

      <div
        class="relative w-full max-w-5xl mx-auto px-6 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        <!-- Info Panel (5/12 column) -->
        <div class="lg:col-span-5 space-y-8 text-left">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-xs font-semibold uppercase tracking-wider border border-violet-500/20"
          >
            <span class="flex h-2 w-2 rounded-full bg-violet-400"></span>
            Reach the Creator
          </div>

          <h1 class="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
            Let's build <br />
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300"
              >something grand.</span
            >
          </h1>

          <p class="text-slate-400 text-base leading-relaxed max-w-md">
            Whether you want to contribute to the DOM Library Core engine, request custom control
            integrations, or inquire about commercial extensions—feel free to drop a line.
          </p>

          <!-- Contact Coordinates cards -->
          <div class="space-y-4">
            <!-- Email Card -->
            <div
              class="group flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-violet-500/40 hover:bg-slate-900 transition-all duration-300"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300"
                >
                  <i class="fa-solid fa-envelope text-violet-400 group-hover:text-white"></i>
                </div>
                <div>
                  <span class="text-xs text-slate-500 uppercase tracking-widest block font-bold"
                    >Email Address</span
                  >
                  <a
                    href="mailto:dandavateomkar@gmail.com"
                    class="text-sm font-semibold text-slate-200 hover:text-violet-300 transition-colors"
                    >dandavateomkar&#64;gmail.com</a
                  >
                </div>
              </div>
              <button
                (click)="copyText('dandavateomkar@gmail.com', 'email')"
                class="px-3 py-1.5 text-[10px] font-bold text-slate-400 hover:text-white bg-slate-950/60 border border-slate-800 rounded-lg hover:border-slate-700 transition-all"
              >
                {{ emailCopied() ? 'Copied' : 'Copy' }}
              </button>
            </div>

            <!-- Phone Card -->
            <div
              class="group flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-violet-500/40 hover:bg-slate-900 transition-all duration-300"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300"
                >
                  <i class="fa-solid fa-phone text-violet-400 group-hover:text-white"></i>
                </div>
                <div>
                  <span class="text-xs text-slate-500 uppercase tracking-widest block font-bold"
                    >Phone Number</span
                  >
                  <a
                    href="tel:+919961992133"
                    class="text-sm font-semibold text-slate-200 hover:text-violet-300 transition-colors"
                    >+91 9961992133</a
                  >
                </div>
              </div>
              <button
                (click)="copyText('+91 9961992133', 'phone')"
                class="px-3 py-1.5 text-[10px] font-bold text-slate-400 hover:text-white bg-slate-950/60 border border-slate-800 rounded-lg hover:border-slate-700 transition-all"
              >
                {{ phoneCopied() ? 'Copied' : 'Copy' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Form Panel (7/12 column) -->
        <div class="lg:col-span-7">
          <div
            class="relative bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-xl"
          >
            <!-- Subtle card top border accent -->
            <div
              class="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"
            ></div>

            <h3 class="text-xl font-extrabold text-slate-100 mb-6">Send an Instant Message</h3>

            <form (submit)="handleSubmit($event)" class="space-y-5">
              <!-- Grid of name & subject -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-400 uppercase tracking-wider"
                    >Your Name</label
                  >
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    required
                    class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-violet-500 focus:outline-none text-slate-200 placeholder-slate-600 text-sm transition-all"
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-400 uppercase tracking-wider"
                    >Your Email</label
                  >
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                    class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-violet-500 focus:outline-none text-slate-200 placeholder-slate-600 text-sm transition-all"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-xs font-bold text-slate-400 uppercase tracking-wider"
                  >Subject</label
                >
                <input
                  type="text"
                  name="subject"
                  placeholder="Project collaboration request"
                  required
                  class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-violet-500 focus:outline-none text-slate-200 placeholder-slate-600 text-sm transition-all"
                />
              </div>

              <div class="space-y-2">
                <label class="text-xs font-bold text-slate-400 uppercase tracking-wider"
                  >Message</label
                >
                <textarea
                  name="message"
                  placeholder="Tell us about your project or requests..."
                  rows="4"
                  required
                  class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-violet-500 focus:outline-none text-slate-200 placeholder-slate-600 text-sm transition-all resize-none"
                ></textarea>
              </div>

              <!-- Error Alert -->
              <div
                *ngIf="error()"
                class="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-left animate-fadeIn"
              >
                <i class="fa-solid fa-triangle-exclamation mr-1.5"></i>
                Transmission failed. Ensure your Formspree ID is set correctly in the component.
              </div>

              <!-- Submit button -->
              <button
                type="submit"
                [disabled]="submitting()"
                class="relative w-full group overflow-hidden flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-650 text-white font-bold text-sm tracking-widest uppercase rounded-xl shadow-lg shadow-violet-900/20 hover:shadow-violet-900/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-55 disabled:pointer-events-none transition-all duration-300"
              >
                <span class="relative z-10 flex items-center gap-2">
                  <span
                    *ngIf="submitting()"
                    class="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                  ></span>
                  {{
                    submitted()
                      ? 'Message Transmitted!'
                      : submitting()
                        ? 'Transmitting...'
                        : 'Transmit Message'
                  }}
                  <i
                    *ngIf="!submitting()"
                    class="fa-solid"
                    [class.fa-paper-plane]="!submitted()"
                    [class.fa-check-double]="submitted()"
                  ></i>
                </span>
                <span
                  class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      @keyframes pulse-slow {
        0%,
        100% {
          opacity: 0.2;
          transform: translate(-50%, -50%) scale(1);
        }
        50% {
          opacity: 0.25;
          transform: translate(-50%, -50%) scale(1.1);
        }
      }
      @keyframes pulse-slower {
        0%,
        100% {
          opacity: 0.1;
          transform: translate(50%, 50%) scale(1);
        }
        50% {
          opacity: 0.15;
          transform: translate(50%, 50%) scale(1.08);
        }
      }
      .animate-pulse-slow {
        animation: pulse-slow 8s infinite ease-in-out;
      }
      .animate-pulse-slower {
        animation: pulse-slower 12s infinite ease-in-out;
      }
    `,
  ],
})
export class ContactComponent {
  // Replace 'YOUR_FORMSPREE_ID' with your form ID from Formspree.io to link to your inbox.
  readonly formspreeId = signal<string>('mykvlayl');

  readonly emailCopied = signal(false);
  readonly phoneCopied = signal(false);
  readonly submitting = signal(false);
  readonly submitted = signal(false);
  readonly error = signal(false);

  copyText(text: string, type: 'email' | 'phone') {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'email') {
        this.emailCopied.set(true);
        setTimeout(() => this.emailCopied.set(false), 2000);
      } else {
        this.phoneCopied.set(true);
        setTimeout(() => this.phoneCopied.set(false), 2000);
      }
    });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    this.submitting.set(true);
    this.error.set(false);

    // If no Formspree ID is specified, run mock completion for immediate local confirmation
    if (this.formspreeId() === 'YOUR_MESSAGE_ID') {
      setTimeout(() => {
        this.submitting.set(false);
        this.submitted.set(true);
        form.reset();
        setTimeout(() => this.submitted.set(false), 5000);
      }, 1000);
      return;
    }

    fetch(`https://formspree.io/f/${this.formspreeId()}`, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        this.submitting.set(false);
        if (response.ok) {
          this.submitted.set(true);
          form.reset();
          setTimeout(() => this.submitted.set(false), 5000);
        } else {
          this.error.set(true);
        }
      })
      .catch(() => {
        this.submitting.set(false);
        this.error.set(true);
      });
  }
}
