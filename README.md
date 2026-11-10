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

The panel can switch between system, light, and dark themes for testing; change the primary color, control and surface radii, surface strength, font scale (up to 200%), and font family; and emulate increased text spacing, reduced motion, and higher contrast. Changes apply live to that page and are temporary; reloading restores the app's defaults. The primary color's text variants are adjusted for contrast automatically.

The panel is optional. Without that JavaScript import, the CSS foundation follows the browser's light/dark preference by default. Set `data-theme="light"` or `data-theme="dark"` on the document root to override the system preference.

## Project structure

- css/style.css is the complete stylesheet entry point used by the demo and package.
- App-wide tokens, reset, normalization, theme, accessibility, and print rules live at the root of css/. The body defaults are in css/style.css.
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

  - `border-width-none`
  - `border-width-thin`
  - `border-width-thick`
  - `border-width-thicker`

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
  - `shadow-sm`
  - `shadow-md`
  - `shadow-lg`

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
