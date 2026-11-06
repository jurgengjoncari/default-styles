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

The panel can switch between system, light, and dark themes; change the primary color, corner radius, border width, font scale, and font family. Changes apply live to that page and are temporary; reloading restores the app's defaults. The primary color's text variants are adjusted for contrast automatically.

The panel is optional. Without that JavaScript import, the CSS foundation still works as the shared baseline.

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
<summary>Base colors</summary>

  - `background-color`
  - `color`
  - `color-gray`
  - `color-emphasis`
  - `color-subtle`
  - `color-muted`
  - `outline-color`

</details>
<details>
<summary>Surfaces</summary>

  - `color-surface`
  - `color-surface-fill`
  - `color-surface-strength`
  - `color-surface-strength-control`
  - `surface-strength-adjusted`
  - `surface-strength-base`

</details>
<details>
<summary>Primary colors</summary>

  - `primary-color`
  - `primary-color-contrast`
  - `primary-text-light`
  - `primary-text-dark`

</details>
<details>
<summary>Accent colors</summary>

  - `blue-text`
  - `cyan-text`
  - `green-text`
  - `yellow-text`
  - `red-text`
  - `magenta-text`

</details>
<details>
<summary>Accent backgrounds</summary>

  - `blue-bg`
  - `cyan-bg`
  - `green-bg`
  - `yellow-bg`
  - `red-bg`
  - `magenta-bg`

</details>
<details>
<summary>Button colors</summary>

  - `button-bg`
  - `button-text`
  - `button-accessible-color`

</details>
<details>
<summary>Font families</summary>

  - `font-family-base`
  - `font-family-monospace`

</details>
<details>
<summary>Font sizes</summary>

  - `font-size-xs`
  - `font-size-sm`
  - `font-size-md`
  - `font-size-lg`
  - `font-size-xl`
  - `font-size-xxl`
  - `font-size-3xl`
  - `font-size-4xl`
  - `font-size-display`

</details>
<details>
<summary>Font weights</summary>

  - `font-weight-light`
  - `font-weight-normal`
  - `font-weight-medium`
  - `font-weight-bold`

</details>
<details>
<summary>Line heights</summary>

  - `line-height-tight`
  - `line-height-medium`
  - `line-height-loose`

</details>
<details>
<summary>Spacing</summary>

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

</details>
<details>
<summary>Breakpoints and layout</summary>

  - `breakpoint-sm`
  - `breakpoint-md`
  - `breakpoint-lg`
  - `breakpoint-xl`
  - `floating-panel-width`
  - `root-font-scale`

</details>
<details>
<summary>Border widths</summary>

  - `border-width-none`
  - `border-width-thin`
  - `border-width-thick`
  - `border-width-thicker`

</details>
<details>
<summary>Border styles</summary>

  - `border-style-solid`
  - `border-style-dotted`
  - `border-style-dashed`

</details>
<details>
<summary>Radii</summary>

  - `radius-none`
  - `radius-xxs`
  - `radius-xs`
  - `radius-s`
  - `radius-md`
  - `radius-lg`
  - `radius-xl`
  - `radius-xxl`
  - `radius-round`
  - `radius-control`

</details>
<details>
<summary>Effects and interaction</summary>

  - `component-transition-duration`
  - `frosty-glass`
  - `interaction-hover`
  - `interaction-active`

</details>
<details>
<summary>Shadows</summary>

  - `shadow-color`
  - `shadow-color-strong`
  - `shadow-sm`
  - `shadow-md`
  - `shadow-lg`

</details>

Classes used by the project:

<details>
<summary>Floating panel</summary>

  - `floating-panel`
  - `floating-panel__trigger`
  - `floating-panel__icon`
  - `floating-panel__content`
  - `floating-panel__header`

</details>
<details>
<summary>Settings panel</summary>

  - `settings-panel`
  - `settings-panel__item`

</details>
<details>
<summary>Form fields</summary>

  - `form-field`
  - `form-field--group`
  - `form-field--color`
  - `form-field--select`
  - `form-field--suffix`
  - `form-field__row`
  - `form-field__label`
  - `form-field__output`
  - `form-field__suffix`

</details>
<details>
<summary>Buttons and controls</summary>

  - `button-group`
  - `button-group__option`
  - `button--custom-color`
  - `select-wrapper`
  - `input`

</details>
<details>
<summary>States</summary>

  - `is-open`
  - `is-active`
  - `is-filled`
  - `is-focused`
  - `is-hovered`
  - `is-outline`
  - `is-transparent`
  - `error`

</details>
<details>
<summary>Accessibility</summary>

  - `sr-only`
  - `skip-to-main`

</details>
<details>
<summary>Demo</summary>

  - `button-demo`
  - `button-demo__row`
  - `dynamic-button-demo`
  - `demo-settings-icon`

</details>