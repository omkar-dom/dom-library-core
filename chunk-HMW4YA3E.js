import{l as C}from"./chunk-TMWNY7DT.js";import{Bb as w,Na as E,Ub as k,W as x,X as b,Ya as c,Za as p,ab as g,bb as f,gb as i,ha as u,hb as t,ib as m,kb as v,mb as y,nb as s,vb as _,wb as h,xb as e,yb as l,za as o,zb as S}from"./chunk-R5WYVA5Z.js";var M=(a,r)=>r.value;function F(a,r){if(a&1){let n=v();i(0,"button",10),y("click",function(){let N=x(n).$implicit,T=s();return b(T.active_tab.set(N.value))}),m(1,"i"),e(2),t()}if(a&2){let n=r.$implicit,d=s();_("border-indigo-600",d.active_tab()===n.value)("text-indigo-600",d.active_tab()===n.value)("dark:text-indigo-400",d.active_tab()===n.value)("dark:border-indigo-400",d.active_tab()===n.value)("border-transparent",d.active_tab()!==n.value)("text-slate-500",d.active_tab()!==n.value)("hover:text-slate-700",d.active_tab()!==n.value)("dark:hover:text-slate-350",d.active_tab()!==n.value),o(),h(w("fa-solid ",n.fa_icon," text-[11px]")),o(),S(" ",n.label," ")}}function P(a,r){if(a&1&&(i(0,"div",8)(1,"section",11)(2,"div",12)(3,"span",13),e(4,"1"),t(),i(5,"h3",14),e(6," Compile & Bundle the Core Package "),t()(),i(7,"p",15),e(8," The shared components are managed inside a dedicated sub-library config named "),i(9,"strong"),e(10,"dom-library-core"),t(),e(11," which utilizes "),i(12,"code"),e(13,"ng-packagr"),t(),e(14," to create an enterprise-grade distribution bundle suitable for public NPM or private enterprise package registries. "),t(),i(15,"div",16)(16,"pre",17)(17,"code"),e(18),t()()()(),i(19,"section",11)(20,"div",12)(21,"span",13),e(22,"2"),t(),i(23,"h3",14),e(24," Authenticate with NPM "),t()(),i(25,"p",15),e(26," Before uploading packages, ensure you are logged into your npm account (or your local private repository, such as Artifactory or Verdaccio). "),t(),i(27,"div",16)(28,"pre",17)(29,"code"),e(30),t()()()(),i(31,"section",11)(32,"div",12)(33,"span",13),e(34,"3"),t(),i(35,"h3",14),e(36," Publish Output to Registry "),t()(),i(37,"p",15),e(38," Navigate into the compiled folder (defined inside "),i(39,"code"),e(40,"angular.json"),t(),e(41," output path) and upload the packed library with public visibility. "),t(),i(42,"div",16)(43,"pre",17)(44,"code"),e(45),t()(),i(46,"div",18),m(47,"i",19),i(48,"div",20)(49,"strong"),e(50,"Important Note:"),t(),e(51," Ensure the version inside "),i(52,"code"),e(53,"src/app/shared/controls/package.json"),t(),e(54," is incremented (e.g. "),i(55,"code"),e(56,"1.0.1"),t(),e(57,") before each publish command, as NPM rejects re-publishing identical versions. "),t()()()()()),a&2){let n=s();o(18),l(n.snippets.pack),o(12),l(n.snippets.npm_login),o(15),l(n.snippets.npm_publish)}}function A(a,r){if(a&1&&(i(0,"div",8)(1,"section",11)(2,"h3",21),m(3,"i",22),e(4," 1. Install package from NPM "),t(),i(5,"p",23),e(6," Install the published package as a core dev dependency in any standard Angular application workspace. "),t(),i(7,"pre",17)(8,"code"),e(9),t()()(),i(10,"section",11)(11,"h3",21),m(12,"i",24),e(13," 2. Embed FontAwesome Icons Asset "),t(),i(14,"p",23),e(15," The custom icons on all dialogs, drawers, and form validation selectors are powered by standard FontAwesome CSS assets. Ensure FontAwesome is available in the target app. "),t(),i(16,"pre",17)(17,"code"),e(18),t()(),i(19,"p",23),e(20," Add FontAwesome styles to the build definition inside your application configuration: "),t(),i(21,"pre",17)(22,"code"),e(23),t()()(),i(24,"section",25)(25,"h3",21),m(26,"i",26),e(27," 3. Register in Tailwind Content Scanning Paths "),t(),i(28,"p",23),e(29," To ensure Tailwind preserves all specific utility colors, borders, and animations generated inside library components, register the source module folder in the Tailwind configuration scanning path depending on your Tailwind version: "),t(),i(30,"div",27)(31,"div",12)(32,"span",28),e(33,"Tailwind CSS v4 (Standard / PostCSS)"),t()(),i(34,"p",29),e(35," In Tailwind v4 (default in Angular 21 + "),i(36,"code"),e(37,"@tailwindcss/postcss"),t(),e(38,"), the configuration is CSS-first. Add the "),i(39,"code"),e(40,"@source"),t(),e(41," directive directly to your global "),i(42,"code"),e(43,"styles.css"),t(),e(44,": "),t(),i(45,"pre",17)(46,"code"),e(47),t()()(),i(48,"div",27)(49,"div",12)(50,"span",30),e(51,"Tailwind CSS v3 (Legacy)"),t()(),i(52,"p",29),e(53," If your project uses a legacy Javascript configuration file ("),i(54,"code"),e(55,"tailwind.config.js"),t(),e(56,"), add the directory path to the "),i(57,"code"),e(58,"content"),t(),e(59," array: "),t(),i(60,"pre",17)(61,"code"),e(62),t()()()()()),a&2){let n=s();o(9),l(n.snippets.npm_install),o(9),l(n.snippets.fontawesome_install),o(5),l(n.snippets.fontawesome_angular),o(24),l(n.snippets.tailwind_v4_config),o(15),l(n.snippets.tailwind_config)}}function j(a,r){if(a&1&&(i(0,"div",9)(1,"section",11)(2,"h3",21),m(3,"i",31),e(4," Import Standalone Controls & Wiring "),t(),i(5,"p",23),e(6," Since all elements are developed as "),i(7,"strong"),e(8,"fully standalone elements"),t(),e(9,", import the controls individually in your custom features without requiring heavy NgModules. "),t(),i(10,"pre",17)(11,"code"),e(12),t()()()()),a&2){let n=s();o(12),l(n.snippets.standalone_usage)}}var I=class a{active_tab=u("publish");is_dev_mode=u(k());tabs=[{label:"How to Publish",value:"publish",fa_icon:"fa-cloud-arrow-up"},{label:"Installation Guide",value:"install",fa_icon:"fa-download"},{label:"Global Usage",value:"usage",fa_icon:"fa-book-open"}];snippets={pack:`# Build the library using ng-packagr
npx ng build dom-library-core --configuration production`,npm_login:`# Log into your NPM registry (public NPM or private enterprise registry)
npm login`,npm_publish:`# Navigate to output directory and publish to NPM
cd dist/dom-library-core
npm publish --access public`,npm_install:`# Install the published component library in your project
npm install dom-library-core`,tailwind_config:`// For Tailwind CSS v3 (tailwind.config.js)
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
}`,tailwind_v4_config:`/* For Tailwind CSS v4 (styles.css / styles.scss) */
@import "tailwindcss";

/* Add the library components to the scanning paths */
@source "../node_modules/dom-library-core/**/*.{html,js,mjs}";`,fontawesome_install:`# Install FontAwesome Icons dependency
npm install @fortawesome/fontawesome-free`,fontawesome_angular:`// angular.json
"styles": [
  "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
  "src/styles.css"
]`,standalone_usage:`import { Component } from '@angular/core';
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
}`};static \u0275fac=function(n){return new(n||a)};static \u0275cmp=E({type:a,selectors:[["app-installation"]],decls:14,vars:3,consts:[[1,"w-full","mt-6","px-4","space-y-6"],[1,"border-b","border-slate-200","dark:border-slate-800","pb-6"],[1,"flex","items-center","gap-3"],[1,"text-2xl","font-extrabold","text-slate-800","dark:text-slate-100","tracking-tight","flex","items-center","gap-2"],[1,"fa-solid","fa-rocket","text-indigo-600","dark:text-indigo-500"],[1,"text-slate-500","dark:text-slate-400","text-xs","mt-1"],[1,"flex","border-b","border-slate-200","dark:border-slate-850","gap-6"],["type","button",1,"pb-2","text-xs","font-bold","transition-all","border-b-2","flex","items-center","gap-2","cursor-pointer","focus:outline-none",3,"border-indigo-600","text-indigo-600","dark:text-indigo-400","dark:border-indigo-400","border-transparent","text-slate-500","hover:text-slate-700","dark:hover:text-slate-350"],[1,"space-y-8","max-w-4xl"],[1,"space-y-6","max-w-4xl"],["type","button",1,"pb-2","text-xs","font-bold","transition-all","border-b-2","flex","items-center","gap-2","cursor-pointer","focus:outline-none",3,"click"],[1,"space-y-3"],[1,"flex","items-center","gap-2"],[1,"w-6","h-6","rounded-full","bg-indigo-50","dark:bg-indigo-950/40","text-indigo-650","dark:text-indigo-400","font-bold","flex","items-center","justify-center","text-xs"],[1,"text-sm","font-bold","text-slate-800","dark:text-slate-200"],[1,"text-xs","text-slate-500","dark:text-slate-400","leading-relaxed","pl-8"],[1,"pl-8"],[1,"bg-slate-900","text-green-300","text-xs","rounded-md","p-4","overflow-x-auto","font-mono","shadow-inner","border","border-slate-800/80"],[1,"mt-3","bg-amber-50","dark:bg-amber-950/20","border","border-amber-250","dark:border-amber-900/50","rounded-md","p-3.5","flex","gap-2.5"],[1,"fa-solid","fa-circle-exclamation","text-amber-600","dark:text-amber-500","text-xs","mt-0.5"],[1,"text-[11px]","text-amber-800","dark:text-amber-300","leading-relaxed"],[1,"text-sm","font-bold","text-slate-800","dark:text-slate-200","flex","items-center","gap-2"],[1,"fa-solid","fa-download","text-indigo-500"],[1,"text-xs","text-slate-500","dark:text-slate-400","leading-relaxed"],[1,"fa-solid","fa-icons","text-indigo-500"],[1,"space-y-4"],[1,"fa-brands","fa-css3","text-indigo-500"],[1,"space-y-2","pt-2"],[1,"px-2","py-0.5","rounded","text-[10px]","font-bold","bg-indigo-50","dark:bg-indigo-950","text-indigo-650","dark:text-indigo-400"],[1,"text-[11px]","text-slate-500","dark:text-slate-400","leading-relaxed"],[1,"px-2","py-0.5","rounded","text-[10px]","font-bold","bg-slate-100","dark:bg-slate-800","text-slate-700","dark:text-slate-350"],[1,"fa-solid","fa-code","text-indigo-500"]],template:function(n,d){n&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),m(4,"i",4),e(5," Publishing & Installation Guide "),t()(),i(6,"p",5),e(7," Learn how to compile, pack, and publish the zero-dependency library to NPM registries, and install it inside your workspace. "),t()(),i(8,"div",6),g(9,F,3,20,"button",7,M),t(),c(11,P,58,3,"div",8),c(12,A,63,5,"div",8),c(13,j,13,1,"div",9),t()),n&2&&(o(9),f(d.tabs),o(2),p(d.active_tab()==="publish"&&d.is_dev_mode()?11:-1),o(),p(d.active_tab()==="install"?12:-1),o(),p(d.active_tab()==="usage"?13:-1))},dependencies:[C],encapsulation:2})};export{I as InstallationComponent};
