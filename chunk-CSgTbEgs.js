import {k as ks,ad as uO,V as Vv,o as oe,ae as ec,af as kf,K as KI,ag as tc,B as dI,j as aI,p as ry,J as fI,s as cI,t as vI,ah as jf,u as Rl,x as DI,z as kl,q as Uf,W as VI,Y as eE,L as oc,Z as Zf}from'./main-R77LFNZ4.js';var M=(a,r)=>r.value;function F(a,r){if(a&1){let i=vI();ec(0,"button",10),jf("click",function(){let N=Rl(i).$implicit,T=DI();return kl(T.active_tab.set(N.value))}),kf(1,"i"),KI(2),tc();}if(a&2){let i=r.$implicit,d=DI();Uf("border-indigo-600",d.active_tab()===i.value)("text-indigo-600",d.active_tab()===i.value)("dark:text-indigo-400",d.active_tab()===i.value)("dark:border-indigo-400",d.active_tab()===i.value)("border-transparent",d.active_tab()!==i.value)("text-slate-500",d.active_tab()!==i.value)("hover:text-slate-700",d.active_tab()!==i.value)("dark:hover:text-slate-350",d.active_tab()!==i.value),ry(),VI(eE("fa-solid ",i.fa_icon," text-[11px]")),ry(),oc(" ",i.label," ");}}function P(a,r){if(a&1&&(ec(0,"div",8)(1,"section",11)(2,"div",12)(3,"span",13),KI(4,"1"),tc(),ec(5,"h3",14),KI(6," Compile & Bundle the Core Package "),tc()(),ec(7,"p",15),KI(8," The shared components are managed inside a dedicated sub-library config named "),ec(9,"strong"),KI(10,"dom-library-core"),tc(),KI(11," which utilizes "),ec(12,"code"),KI(13,"ng-packagr"),tc(),KI(14," to create an enterprise-grade distribution bundle suitable for public NPM or private enterprise package registries. "),tc(),ec(15,"div",16)(16,"pre",17)(17,"code"),KI(18),tc()()()(),ec(19,"section",11)(20,"div",12)(21,"span",13),KI(22,"2"),tc(),ec(23,"h3",14),KI(24," Authenticate with NPM "),tc()(),ec(25,"p",15),KI(26," Before uploading packages, ensure you are logged into your npm account (or your local private repository, such as Artifactory or Verdaccio). "),tc(),ec(27,"div",16)(28,"pre",17)(29,"code"),KI(30),tc()()()(),ec(31,"section",11)(32,"div",12)(33,"span",13),KI(34,"3"),tc(),ec(35,"h3",14),KI(36," Publish Output to Registry "),tc()(),ec(37,"p",15),KI(38," Navigate into the compiled folder (defined inside "),ec(39,"code"),KI(40,"angular.json"),tc(),KI(41," output path) and upload the packed library with public visibility. "),tc(),ec(42,"div",16)(43,"pre",17)(44,"code"),KI(45),tc()(),ec(46,"div",18),kf(47,"i",19),ec(48,"div",20)(49,"strong"),KI(50,"Important Note:"),tc(),KI(51," Ensure the version inside "),ec(52,"code"),KI(53,"src/app/shared/controls/package.json"),tc(),KI(54," is incremented (e.g. "),ec(55,"code"),KI(56,"1.0.1"),tc(),KI(57,") before each publish command, as NPM rejects re-publishing identical versions. "),tc()()()()()),a&2){let i=DI();ry(18),Zf(i.snippets.pack),ry(12),Zf(i.snippets.npm_login),ry(15),Zf(i.snippets.npm_publish);}}function A(a,r){if(a&1&&(ec(0,"div",8)(1,"section",11)(2,"h3",21),kf(3,"i",22),KI(4," 1. Install package from NPM "),tc(),ec(5,"p",23),KI(6," Install the published package as a core dev dependency in any standard Angular application workspace. "),tc(),ec(7,"pre",17)(8,"code"),KI(9),tc()()(),ec(10,"section",11)(11,"h3",21),kf(12,"i",24),KI(13," 2. Embed FontAwesome Icons Asset "),tc(),ec(14,"p",23),KI(15," The custom icons on all dialogs, drawers, and form validation selectors are powered by standard FontAwesome CSS assets. Ensure FontAwesome is available in the target app. "),tc(),ec(16,"pre",17)(17,"code"),KI(18),tc()(),ec(19,"p",23),KI(20," Add FontAwesome styles to the build definition inside your application configuration: "),tc(),ec(21,"pre",17)(22,"code"),KI(23),tc()()(),ec(24,"section",25)(25,"h3",21),kf(26,"i",26),KI(27," 3. Register in Tailwind Content Scanning Paths "),tc(),ec(28,"p",23),KI(29," To ensure Tailwind preserves all specific utility colors, borders, and animations generated inside library components, register the source module folder in the Tailwind configuration scanning path depending on your Tailwind version: "),tc(),ec(30,"div",27)(31,"div",12)(32,"span",28),KI(33,"Tailwind CSS v4 (Standard / PostCSS)"),tc()(),ec(34,"p",29),KI(35," In Tailwind v4 (default in Angular 21 + "),ec(36,"code"),KI(37,"@tailwindcss/postcss"),tc(),KI(38,"), the configuration is CSS-first. Add the "),ec(39,"code"),KI(40,"@source"),tc(),KI(41," directive directly to your global "),ec(42,"code"),KI(43,"styles.css"),tc(),KI(44,": "),tc(),ec(45,"pre",17)(46,"code"),KI(47),tc()()(),ec(48,"div",27)(49,"div",12)(50,"span",30),KI(51,"Tailwind CSS v3 (Legacy)"),tc()(),ec(52,"p",29),KI(53," If your project uses a legacy Javascript configuration file ("),ec(54,"code"),KI(55,"tailwind.config.js"),tc(),KI(56,"), add the directory path to the "),ec(57,"code"),KI(58,"content"),tc(),KI(59," array: "),tc(),ec(60,"pre",17)(61,"code"),KI(62),tc()()()()()),a&2){let i=DI();ry(9),Zf(i.snippets.npm_install),ry(9),Zf(i.snippets.fontawesome_install),ry(5),Zf(i.snippets.fontawesome_angular),ry(24),Zf(i.snippets.tailwind_v4_config),ry(15),Zf(i.snippets.tailwind_config);}}function j(a,r){if(a&1&&(ec(0,"div",9)(1,"section",11)(2,"h3",21),kf(3,"i",31),KI(4," Import Standalone Controls & Wiring "),tc(),ec(5,"p",23),KI(6," Since all elements are developed as "),ec(7,"strong"),KI(8,"fully standalone elements"),tc(),KI(9,", import the controls individually in your custom features without requiring heavy NgModules. "),tc(),ec(10,"pre",17)(11,"code"),KI(12),tc()()()()),a&2){let i=DI();ry(12),Zf(i.snippets.standalone_usage);}}var I=class a{active_tab=ks("publish");is_dev_mode=ks(uO());tabs=[{label:"Installation Guide",value:"install",fa_icon:"fa-download"},{label:"Global Usage",value:"usage",fa_icon:"fa-book-open"}];snippets={pack:`# Build the library using ng-packagr
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
}`};ngOnInit(){this.is_dev_mode()&&this.tabs.unshift({label:"How to Publish",value:"publish",fa_icon:"fa-cloud-arrow-up"});}static \u0275fac=function(i){return new(i||a)};static \u0275cmp=Vv({type:a,selectors:[["app-installation"]],decls:14,vars:3,consts:[[1,"w-full","mt-6","px-4","space-y-6"],[1,"border-b","border-slate-200","dark:border-slate-800","pb-6"],[1,"flex","items-center","gap-3"],[1,"text-2xl","font-extrabold","text-slate-800","dark:text-slate-100","tracking-tight","flex","items-center","gap-2"],[1,"fa-solid","fa-rocket","text-indigo-600","dark:text-indigo-500"],[1,"text-slate-500","dark:text-slate-400","text-xs","mt-1"],[1,"flex","border-b","border-slate-200","dark:border-slate-850","gap-6"],["type","button",1,"pb-2","text-xs","font-bold","transition-all","border-b-2","flex","items-center","gap-2","cursor-pointer","focus:outline-none",3,"border-indigo-600","text-indigo-600","dark:text-indigo-400","dark:border-indigo-400","border-transparent","text-slate-500","hover:text-slate-700","dark:hover:text-slate-350"],[1,"space-y-8","max-w-4xl"],[1,"space-y-6","max-w-4xl"],["type","button",1,"pb-2","text-xs","font-bold","transition-all","border-b-2","flex","items-center","gap-2","cursor-pointer","focus:outline-none",3,"click"],[1,"space-y-3"],[1,"flex","items-center","gap-2"],[1,"w-6","h-6","rounded-full","bg-indigo-50","dark:bg-indigo-950/40","text-indigo-650","dark:text-indigo-400","font-bold","flex","items-center","justify-center","text-xs"],[1,"text-sm","font-bold","text-slate-800","dark:text-slate-200"],[1,"text-xs","text-slate-500","dark:text-slate-400","leading-relaxed","pl-8"],[1,"pl-8"],[1,"bg-slate-900","text-green-300","text-xs","rounded-md","p-4","overflow-x-auto","font-mono","shadow-inner","border","border-slate-800/80"],[1,"mt-3","bg-amber-50","dark:bg-amber-950/20","border","border-amber-250","dark:border-amber-900/50","rounded-md","p-3.5","flex","gap-2.5"],[1,"fa-solid","fa-circle-exclamation","text-amber-600","dark:text-amber-500","text-xs","mt-0.5"],[1,"text-[11px]","text-amber-800","dark:text-amber-300","leading-relaxed"],[1,"text-sm","font-bold","text-slate-800","dark:text-slate-200","flex","items-center","gap-2"],[1,"fa-solid","fa-download","text-indigo-500"],[1,"text-xs","text-slate-500","dark:text-slate-400","leading-relaxed"],[1,"fa-solid","fa-icons","text-indigo-500"],[1,"space-y-4"],[1,"fa-brands","fa-css3","text-indigo-500"],[1,"space-y-2","pt-2"],[1,"px-2","py-0.5","rounded","text-[10px]","font-bold","bg-indigo-50","dark:bg-indigo-950","text-indigo-650","dark:text-indigo-400"],[1,"text-[11px]","text-slate-500","dark:text-slate-400","leading-relaxed"],[1,"px-2","py-0.5","rounded","text-[10px]","font-bold","bg-slate-100","dark:bg-slate-800","text-slate-700","dark:text-slate-350"],[1,"fa-solid","fa-code","text-indigo-500"]],template:function(i,d){i&1&&(ec(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),kf(4,"i",4),KI(5," Publishing & Installation Guide "),tc()(),ec(6,"p",5),KI(7," Learn how to compile, pack, and publish the zero-dependency library to NPM registries, and install it inside your workspace. "),tc()(),ec(8,"div",6),dI(9,F,3,20,"button",7,M),tc(),aI(11,P,58,3,"div",8),aI(12,A,63,5,"div",8),aI(13,j,13,1,"div",9),tc()),i&2&&(ry(9),fI(d.tabs),ry(2),cI(d.active_tab()==="publish"&&d.is_dev_mode()?11:-1),ry(),cI(d.active_tab()==="install"?12:-1),ry(),cI(d.active_tab()==="usage"?13:-1));},dependencies:[oe],encapsulation:2})};export{I as InstallationComponent};