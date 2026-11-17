# Default Styles

A shared CSS foundation for giving projects a consistent design starting point. It resets browser defaults, defines reusable design tokens, and styles semantic HTML elements so each app can build its own design on the same baseline.

## Use in an app

Install this repository as a dependency:

    npm install github:jurgengjoncari/default-styles

Load its stylesheet from the app's stylesheet:

    @import "@jurgengjoncari/default-styles/style.css";

Add the app's own styles after this import. For apps that use dependency update automation, configure it to update this dependency so baseline improvements can be proposed without manually checking for changes.

## Add the appearance panel

The optional appearance panel lets you tune an app while viewing it. It creates its own controls, so you do not need to copy markup or load separate helper scripts.

Import the panel once from your browser-side JavaScript entry point:

    import "@jurgengjoncari/default-styles/appearance-settings";

The panel can switch between system, light, and dark color themes and between the elevation and outline theme styles for testing; change the primary color, control and surface radii, shadow offsets, blur, and spread, surface strength, font scale (up to 200%), and font family; and emulate increased text spacing, reduced motion, and higher contrast. At least one theme style must remain enabled, and both can be enabled together. Changes apply live to that page and are temporary; reloading restores the app's defaults. The primary color's text variants are adjusted for contrast automatically.

The panel is optional. Without that JavaScript import, the CSS foundation follows the browser's light/dark preference and uses the elevation theme style by default. Set `data-theme="light"` or `data-theme="dark"` on the document root to override the system preference. Set `data-theme-style="outline"` for the outline style, `data-theme-style="elevation"` for elevation, or `data-theme-style="elevation outline"` to combine them as an additive union. The elevation theme uses physics-based optical lighting across a 5-level scale (levels -1 to 3), off-white and off-black canvases, semi-transparent elevated surfaces, recessed inputs, and shadow-based focus states; Outline uses visible borders, geometric micro-interactions, focus outlines, and no shadows. Generic surfaces stay transparent in Outline, while dialogs use an opaque theme-colored fill. When combined, surfaces retain elevation's translucency and shadow while gaining Outline's border. The theme style is independent of the light/dark color theme.

## Macro Attributes & Classes

Instead of atomic/nuclear utility classes, this library uses a few high-impact HTML attributes and macro classes that produce consistent, system-wide visual changes:

### Root Attributes

Set these on `<html>` to control broad visual architecture:

| Attribute | Values | Description |
|---|---|---|
| `data-theme` | `"light"`, `"dark"` | Overrides system preference. Without elevation, light mode is pure white (`#ffffff`) and dark mode is pure black (`#000000`). |
| `data-theme-style` | `"elevation"` | **Elevation Theme (default):** Physics-based ambient elevation on an off-white/off-black canvas. Inputs and checkboxes are recessed wells (darker in light mode, sunken in dark mode) with inset shadows. Buttons and surfaces float with zero borders. |
| | `"outline"` | **Outline Theme:** Architectural stark white/black canvas, transparent generic surfaces, opaque theme-colored dialogs, razor-sharp hairline borders (`0.5px`), and tactile scale animations on hover/press. |
| | `"elevation outline"` | **Additive Union:** Combines semi-transparent elevated surfaces and shadows with hairline borders. |
| `data-control-padding` | `"default"`, `"expanded"` | Sets global control padding. The default uses extra-small block and small inline spacing; expanded uses small block and medium inline spacing. |
| `data-control-radius` | `"none"`, `"xs"`, `"s"`, `"md"`, `"lg"`, `"xl"`, `"round"` | Sets the global control corner radius using the matching radius token. |
| `data-surface-radius` | `"none"`, `"xxs"`, `"xs"`, `"s"`, `"md"`, `"lg"`, `"xl"`, `"xxl"` | Sets the global surface corner radius using the matching radius token. |
| `data-default-styles-contrast` | `"more"` | Emulates WCAG high-contrast mode with forced maximum contrast. |
| `data-default-styles-text-spacing` | (present) | Emulates WCAG text-spacing override rules. |

For example, set the color theme, visual style, and global control/surface sizing directly in the document markup:

```html
<html lang="en"
    data-theme="dark"
    data-theme-style="outline"
    data-control-padding="expanded"
    data-control-radius="lg"
    data-surface-radius="xl">
```

### Component Macro Classes

Apply these directly to native elements to switch their visual archetype:

- **Button archetypes:**
  - `<button>`: Standard control surface.
  - `<button class="is-filled">`: High-emphasis filled button (calibrated slate surface in light mode, elevated white in dark mode; never pitch black).
  - `<button class="is-outline">`: Ghost button with transparent background and a hairline border.
  - `<button class="is-transparent">`: Borderless flat text button.
  - `<div class="button-group">`: Connected segmented controls with unified borders and shadows.
- **Surface containers:**
  - `<div class="surface">`: Reusable themed surface with padding and rounded corners. Elevation gives it a semi-transparent fill and shadow; Outline keeps it transparent with a border; combining both applies the fill, shadow, and border.
  - `<div class="dialog-panel">` or `<dialog class="dialog-panel">`: Dialog-specific surface with theme-colored fill in Outline and backdrop filtering where enabled. Existing markup remains supported.

## Project structure

- css/style.css is the complete stylesheet entry point used by the demo and package.
- App-wide tokens, reset, normalization, accessibility, and print rules live at the root of css/. Shared theme rules live in css/themes/. Surface-specific elevation and outline variants live alongside the surface component; body defaults are in css/style.css.
- Component folders live under components/. Each component keeps its style.css with a separate normalize.css when it needs component-specific normalization. A component may also have an accessibility.css for rules specific to that component. Typography is grouped under components/typography/, with heading, link, code, blockquote, and separator subcomponents. Cascade layers order reset, normalization, tokens, theme, base, shared, component, accessibility, and print. App/demo styles remain unlayered so they can override the library.
- Related components are nested by context: button styles are under components/form/button/, and the floating panel and appearance settings are under components/dialog/.
- index.css forwards to css/style.css to preserve the package stylesheet entry point.
- index.html is a demo page for checking the baseline and developing styles.

The shared styles apply to semantic elements and common control types. Add classes for your app's own visual design and for optional composed patterns; the demo's appearance controls are only for testing.

## Tokens and classes

Custom properties used by the styles (including component and demo properties), grouped by purpose:

<details>
<summary>Colors</summary>

<blockquote>

<details>
<summary>Base colors</summary>

<blockquote>

  - `background-color`
  - `color`
  - `color-gray`
  - `color-emphasis`
  - `color-subtle`
  - `color-muted`
  - `outline-color`
  - `dialog-backdrop-color`

</blockquote>
</details>
<details>
<summary>Neutral palette</summary>

<blockquote>

  - `color-neutral-50`
  - `color-neutral-100`
  - `color-neutral-600`
  - `color-neutral-900`
  - `color-neutral-950`

</blockquote>
</details>
<details>
<summary>Surfaces</summary>

<blockquote>

  - `color-surface`
  - `color-surface-fill`
  - `color-surface-strength`
  - `color-surface-strength-control`
  - `surface-strength-adjusted`
  - `surface-strength-base`

</blockquote>
</details>
<details>
<summary>Primary colors</summary>

<blockquote>

  - `primary-color`
  - `primary-color-contrast`
  - `primary-text-light`
  - `primary-text-dark`

</blockquote>
</details>
<details>
<summary>Accent colors</summary>

<blockquote>

  - `blue-text`
  - `cyan-text`
  - `green-text`
  - `yellow-text`
  - `red-text`
  - `magenta-text`

</blockquote>
</details>
<details>
<summary>Accent backgrounds</summary>

<blockquote>

  - `blue-bg`
  - `cyan-bg`
  - `green-bg`
  - `yellow-bg`
  - `red-bg`
  - `magenta-bg`

</blockquote>
</details>
<details>
<summary>Button colors</summary>

<blockquote>

  - `button-bg`
  - `button-text`
  - `button-accessible-color`

</blockquote>
</details>

</blockquote>
</details>
<details>
<summary>Typography</summary>

<blockquote>

<details>
<summary>Font families</summary>

<blockquote>

  - `font-family-base`
  - `font-family-monospace`

</blockquote>
</details>
<details>
<summary>Font sizes</summary>

<blockquote>

  - `font-size-xs`
  - `font-size-sm`
  - `font-size-md`
  - `font-size-lg`
  - `font-size-xl`
  - `font-size-xxl`
  - `font-size-3xl`
  - `font-size-4xl`
  - `font-size-display`

</blockquote>
</details>
<details>
<summary>Font weights</summary>

<blockquote>

  - `font-weight-light`
  - `font-weight-normal`
  - `font-weight-medium`
  - `font-weight-bold`

</blockquote>
</details>
<details>
<summary>Line heights</summary>

<blockquote>

  - `line-height-tight`
  - `line-height-medium`
  - `line-height-loose`

</blockquote>
</details>

</blockquote>
</details>
<details>
<summary>Sizing and layout</summary>

<blockquote>

<details>
<summary>Spacing</summary>

<blockquote>

  - `size-none`
  - `size-3xs`
  - `size-xxs`
  - `size-xs`
  - `size-sm`
  - `size-md`
  - `size-lg`
  - `size-xl`
  - `size-xxl`
  - `size-touch-target`

</blockquote>
</details>
<details>
<summary>Breakpoints and layout</summary>

<blockquote>

  - `breakpoint-sm`
  - `breakpoint-md`
  - `breakpoint-lg`
  - `breakpoint-xl`
  - `floating-panel-width`
  - `root-font-scale`

</blockquote>
</details>

</blockquote>
</details>
<details>
<summary>Borders</summary>

<blockquote>

<details>
<summary>Border widths</summary>

<blockquote>

  - `border-width-none` (`0px`)
  - `border-width-xs` (`0.5px`)
  - `border-width-sm` (`1px`)
  - `border-width-md` (`2px`)
  - `border-width-lg` (`4px`)

</blockquote>
</details>
<details>
<summary>Border styles</summary>

<blockquote>

  - `border-style-solid`
  - `border-style-dotted`
  - `border-style-dashed`

</blockquote>
</details>
<details>
<summary>Radii</summary>

<blockquote>

  - `radius-control-none`
  - `radius-control-xs`
  - `radius-control-s`
  - `radius-control-md`
  - `radius-control-lg`
  - `radius-control-xl`
  - `radius-control-round`
  - `radius-surface-none`
  - `radius-surface-xs`
  - `radius-surface-s`
  - `radius-surface-md`
  - `radius-surface-lg`
  - `radius-surface-xl`
  - `radius-surface-xxl`
  - `radius-control`
  - `radius-surface`

</blockquote>
</details>

</blockquote>
</details>
<details>
<summary>Effects</summary>

<blockquote>

<details>
<summary>Effects and interaction</summary>

<blockquote>

  - `component-transition-duration`
  - `frosty-glass`
  - `interaction-hover`
  - `interaction-active`

</blockquote>
</details>
<details>
<summary>Shadows</summary>

<blockquote>

  - `shadow-color`
  - `shadow-color-strong`
  - `shadow-offset-none`
  - `shadow-offset-sm`
  - `shadow-offset-md`
  - `shadow-offset-lg`
  - `shadow-control-hover-offset`
  - `shadow-control-hover-blur`
  - `shadow-control-hover-spread`
  - `shadow-spread-none`
  - `shadow-spread-xs`
  - `shadow-spread-sm`
  - `shadow-spread-md`
  - `shadow-spread-lg`
  - `shadow-spread-xl`
  - `blur-none`
  - `blur-xs`
  - `blur-sm`
  - `blur-md`
  - `blur-lg`
  - `blur-xl`
  - `shadow-control-offset`
  - `shadow-control-blur`
  - `shadow-control-spread`
  - `shadow-control`
  - `shadow-control-hover`
  - `shadow-control-unfilled-hover`
  - `shadow-control-inset`
  - `shadow-control-unfilled-active`
  - `shadow-surface-offset`
  - `shadow-surface-blur`
  - `shadow-surface-spread`
  - `shadow-surface`

</blockquote>
</details>

</blockquote>
</details>

Classes used by the project:

<details>
<summary>Components</summary>

<blockquote>

<details>
<summary>Floating panel</summary>

<blockquote>

  - `floating-panel`
  - `floating-panel__trigger`
  - `floating-panel__icon`
  - `floating-panel__content`
  - `floating-panel__header`

</blockquote>
</details>
<details>
<summary>Settings panel</summary>

<blockquote>

  - `settings-panel`
  - `settings-panel__item`

</blockquote>
</details>
<details>
<summary>Form fields</summary>

<blockquote>

  - `form-field`
  - `form-field--group`
  - `form-field--color`
  - `form-field--select`
  - `form-field--suffix`
  - `form-field__row`
  - `form-field__label`
  - `form-field__output`
  - `form-field__suffix`

</blockquote>
</details>
<details>
<summary>Buttons and controls</summary>

<blockquote>

  - `button-group`
  - `button-group__option`
  - `button--custom-color`
  - `select-wrapper`
  - `input`

</blockquote>
</details>

</blockquote>
</details>
<details>
<summary>States and accessibility</summary>

<blockquote>

<details>
<summary>States</summary>

<blockquote>

  - `is-open`
  - `is-active`
  - `is-filled`
  - `is-focused`
  - `is-hovered`
  - `is-outline`
  - `is-transparent`
  - `error`

</blockquote>
</details>
<details>
<summary>Accessibility</summary>

<blockquote>

  - `sr-only`
  - `skip-to-main`

</blockquote>
</details>

</blockquote>
</details>
<details>
<summary>Demo</summary>

<blockquote>

  - `button-demo`
  - `button-demo__row`
  - `dynamic-button-demo`
  - `demo-settings-icon`

</blockquote>
</details>
