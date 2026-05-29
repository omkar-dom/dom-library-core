import { Component, isDevMode, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

type InstallTab = 'publish' | 'install' | 'usage';

@Component({
  selector: 'app-installation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './installation.html',
})
export class InstallationComponent {
  readonly active_tab = signal<InstallTab>('publish');
  readonly is_dev_mode = signal(isDevMode());

  readonly tabs: { label: string; value: InstallTab; fa_icon: string }[] = [
    { label: 'Installation Guide', value: 'install', fa_icon: 'fa-download' },
    { label: 'Global Usage', value: 'usage', fa_icon: 'fa-book-open' },
  ];

  readonly snippets = {
    pack: `# Build the library using ng-packagr
npx ng build dom-library-core --configuration production`,
    npm_login: `# Log into your NPM registry (public NPM or private enterprise registry)
npm login`,
    npm_publish: `# Navigate to output directory and publish to NPM
cd dist/dom-library-core
npm publish --access public`,
    npm_install: `# Install the published component library in your project
npm install dom-library-core`,
    tailwind_config: `// For Tailwind CSS v3 (tailwind.config.js)
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    // Add library components to content scanning path to preserve styles:
    "./node_modules/dom-library-core/**/*.{html,js,mjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
    tailwind_v4_config: `/* For Tailwind CSS v4 (styles.css / styles.scss) */
@import "tailwindcss";

/* Add the library components to the scanning paths */
@source "../node_modules/dom-library-core/**/*.{html,js,mjs}";`,
    fontawesome_install: `# Install FontAwesome Icons dependency
npm install @fortawesome/fontawesome-free`,
    fontawesome_angular: `// angular.json
"styles": [
  "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
  "src/styles.css"
]`,
    standalone_usage: `import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { 
  DomInputComponent, 
  DomMobileNumberComponent, 
  DomNameBuddyComponent 
} from 'dom-library-core';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DomInputComponent,
    DomMobileNumberComponent,
    DomNameBuddyComponent
  ],
  template: \`
    <form [formGroup]="form">
      <dom-name-buddy
        [form_group]="form"
        first_name_control="firstName"
        last_name_control="lastName"
        label="Full Name Identity"
      />
      
      <dom-mobile-number
        [form_group]="form"
        form_control="mobile"
        label="Mobile Number"
      />
    </form>
  \`
})
export class FeatureComponent {
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    mobile: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}
}`,
  };

  ngOnInit() {
    if (this.is_dev_mode()) {
      this.tabs.unshift({
        label: 'How to Publish',
        value: 'publish',
        fa_icon: 'fa-cloud-arrow-up',
      });
    }
  }
}
