# Default Styles

A framework-free collection of reusable CSS foundations and UI components, with `index.html` serving as a visual reference and demo page.

## Reusable layers

- `css/tokens.css` defines design tokens such as colors, spacing, typography, and radii.
- `css/base/` contains reset, normalization, theme, accessibility, and semantic element styles.
- `css/components/` contains reusable button, button-group, form-field, form-control, floating-panel, and settings-panel styles. `css/components.css` collects them.
- `js/components/` contains reusable behavior, including floating panels, theme selection, dialog controls, color controls and previews, and CSS-variable controls.
- `js/utilities/` contains shared helpers used by components and examples.
- `js/examples/` and `examples/` contain page-specific demo behavior and presentation.

Include `index.css` for the shared CSS foundation. Load only the component scripts needed by a page, after its markup; `theme-selector.js` is loaded in the document head to apply the system theme before first paint. The color preview component requires `js/utilities/color.js`.

Base styles apply to semantic HTML elements and control types automatically, so common buttons, lists, and form controls do not need presentation classes. Use component classes when opting into a composed layout or feature, and demo/state classes only for variants that are not the default.

Component styling uses generic classes such as `.button-group`, `.form-field`, and `.floating-panel`; behavior uses attributes such as `data-floating-panel`, `data-theme-selector`, and `data-css-variable`. Component variants are opt-in through modifier classes or `data-*` attributes.

Components are framework-free and can be copied into a project. An npm package can be added later once the public APIs and packaging needs are established.

`index.html` demonstrates semantic text, links, tables, forms, interactive elements, media, and the appearance controls.

For example, a floating panel can be used with its generic classes and behavior attributes:

```html
<div class="floating-panel" data-floating-panel>
    <button class="floating-panel__trigger" data-floating-panel-trigger
        aria-controls="panel-content" aria-expanded="false">
        Open
    </button>
    <section class="floating-panel__content" id="panel-content"
        data-floating-panel-content aria-hidden="true" inert>
        <header class="floating-panel__header" data-floating-panel-drag-handle>
            Panel
        </header>
        Content
    </section>
</div>
<script src="js/components/floating-panel.js"></script>
```
