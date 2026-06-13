# Changelog

All notable changes to this project will be documented in this file.

## [2.0.2] - 2026-06-13

### Added
- **SEO & Search Index Optimization**: Added descriptive package metadata (keywords, search tags, author, and description) targeting Angular 22 and Signal Forms search queries, and updated the `README.md` to optimize Google indexing relevance.

## [2.0.1] - 2026-06-13

### Fixed
- Fixed raw text / single-paragraph rendering issues of `README.md` on npm by stripping corrupted trailing lines containing null bytes (`\0`).

## [2.0.0] - 2026-06-13

### Added
- **Angular 22 & Signal Forms Compatibility**: Complete codebase migration to Angular 22.0.0 and TypeScript 6.0.2.
- **Dual-Mode Form Control Bindings**: All 14 custom form controls now support both Angular 22 Signal Forms (`form` input binding) and legacy Angular Reactive Forms (`form_group` and `form_control` input binding).
- **`date` Value Format**: Added a new `'date'` format option to `dom-date-picker` and `dom-datetime-picker`. This permits storing and reading raw `Date` objects in the form model directly, facilitating compatibility with Angular's built-in `minDate` and `maxDate` validators.
- **Showcase Demo Form**: Refactored the employee registration playground showcase to utilize Signal Forms, illustrating complex validations (Verhoeff Aadhaar checksums, age constraint dynamics, nested contact lists, and conditional form fields).

### Fixed
- Fixed template warning compile warnings (`NG8113`) on unused standalone imports (`FormField`, `FormRoot`) across form components.
- Resolved type signature mismatches on `FieldTree` generic lookup defaults inside template elements.
- Fixed a `TypeError: date.getFullYear is not a function` error inside the custom age calculator/date validation logic by wrapping string-valued dates with `new Date(date)` before calculations.
