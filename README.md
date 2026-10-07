# Default Styles

A shared CSS foundation for giving projects a consistent design starting point. It resets browser defaults, defines reusable design tokens, and styles semantic HTML elements so each app can build its own design on the same baseline.

The reset is intentionally broad. This repository is a test bed: the demo page shows what the foundation changes, and project-specific styles are meant to be layered on top.

## Use in an app

Install this repository as a dependency, then load its single CSS entry point from the app's stylesheet:

```sh
npm install github:jurgengjoncari/default-styles
```

```css
@import "@jurgengjoncari/default-styles/style.css";
```

Add the app's own styles after this import. The package keeps the shared baseline in one place, rather than requiring its files to be copied and maintained separately in every project.

For apps that use dependency update automation, configure it to update this dependency so baseline improvements can be proposed without manually checking for changes.

## Add the appearance panel

The optional appearance panel lets you tune an app while viewing it. It creates its own controls, so you do not need to copy markup or load separate helper scripts.

Keep the CSS foundation import from above, then import the panel once from your browser-side JavaScript entry point:

```js
import "@jurgengjoncari/default-styles/appearance-settings";
```

The panel can switch between system, light, and dark themes; change the primary color, corner radius, border width, font scale, and font family. Changes apply live to that page and are temporary; reloading restores the app's defaults. The primary color's text variants are adjusted for contrast automatically.

The panel is optional. Without that JavaScript import, the CSS foundation still works as the shared baseline.

## What's included

- `css/tokens.css`: shared colors, spacing, typography, and radii.
- `css/base/`: reset, normalization, theme, accessibility, and semantic element styles.
- `css/components/`: optional reusable CSS patterns.
- `index.css`: the single entry point that assembles the shared foundation.
- `index.html`: a demo page for checking the baseline and developing styles.

The base styles apply to semantic elements and common control types. Add classes for your app's own visual design and for optional composed patterns; the demo's appearance controls are only for testing.
