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
- Component folders live beside css/. Each component keeps its style.css with a separate normalize.css when it needs component-specific normalization. A component may also have an accessibility.css for rules specific to that component. Cascade layers order reset, normalization, tokens, theme, base, shared, component, accessibility, and print. App/demo styles remain unlayered so they can override the library.
- Related components are nested by context: button styles are under form/button/, and the floating panel and appearance settings are under dialog/.
- index.css forwards to css/style.css to preserve the package stylesheet entry point.
- index.html is a demo page for checking the baseline and developing styles.

The shared styles apply to semantic elements and common control types. Add classes for your app's own visual design and for optional composed patterns; the demo's appearance controls are only for testing.