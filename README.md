# CollapsibleContents

This package comes with two components:

* `CollapsibleContents`: A component which makes contents in its child elements collapsible
* `CompactView`: A component that acts as a global state toggle

This package also comes with a utility responsible for managing the state when the components are used together.

* `CompactViewStateProvider`

Disclaimer: This component was built by the community at large and is not an official Coveo JSUI Component. Use this component at your own risk.

## Getting Started

1. Install the component into your project.

```
npm i @coveops/collapsible-contents
```

2. Use the Component or extend it

Typescript:

```javascript
import { CollapsibleContents, ICollapsibleContentsOptions } from '@coveops/collapsible-contents';
```

Javascript

```javascript
const CollapsibleContents = require('@coveops/collapsible-contents').CollapsibleContents;
```

3. You can also expose the component alongside other components being built in your project.

```javascript
export * from '@coveops/collapsible-contents'
```

4. Or for quick testing, you can add the script from unpkg

```html
<script src="https://unpkg.com/@coveops/collapsible-contents@latest/dist/index.min.js"></script>
```

> Disclaimer: Unpkg should be used for testing but not for production.

5. Include the CSS in the root `index.scss`

```css
@import './../node_modules/@coveops/collapsible-contents/dist/css/index.css';
```

Or for quick testing, you can add the styles from unpkg

```css
 <link rel="stylesheet" href="https://unpkg.com/@coveops/collapsible-contents@latest/dist/css/index.css" />
```

6. Include the component in your template as follows:

Place the CollapsibleContents component in your markup:

```html
<div class="CoveoCollapsibleContents"></div>
```

### Options

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| persistState | boolean | true | Toggles whether the global toggled state should be synchronized with localstorage. |
| collapsedMaxHeight | string | 0px | Sets the max height to use when the contents are minimized. To achieve a toggle based on number of lines, you can pass `calc(1.25em * 2)` where 1.25 is the line-height and 2 is the number of lines that are desired when the component is minimized. |
| collapseSymbol | string | svg: arrow up | The symbol to use to indicate the user can collapse the contents. |
| expandSymbol | string | svg: arrow down | The symbol to use to indicate the user can expand the contents. |
| defaultState | string | minimized | The default state to use when a new user loads the UX for the first time. |
| toggleFloat | string | right | The default placement of the toggle. Takes values compatible with the float css property. |

Place the CompactView component in your markup:

```html
<div class="CoveoCompactView"></div>
```

### Options

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| minimizedByDefault | boolean | true | Allows default behavior to be tweaked to initialize the component. |
| expandedCaption | string | Compact View | The caption to use to indicate the user can collapse all CollapsibleContents components. |
| minimizedCaption | string | Default View | The caption to use to indicate the user can expand all CollapsibleContents components. |
| target | string | .CoveoCollapsibleContents | The target class to search for in the code, ideally unique to the group that uses this toggle. By default, the component will toggle all CollapsibleContents elements on the page - even nested ones. |

See `pages/index.html`

## Extending

Extending the component can be done as follows:

```javascript
import { CollapsibleContents, ICollapsibleContentsOptions } from "@coveops/collapsible-contents";

export interface IExtendedCollapsibleContentsOptions extends ICollapsibleContentsOptions {}

export class ExtendedCollapsibleContents extends CollapsibleContents {}
```

## Contribute

1. Clone the project
2. Copy `.env.dist` to `.env` and update the COVEO_ORG_ID and COVEO_TOKEN fields in the `.env` file to use your Coveo credentials and SERVER_PORT to configure the port of the sandbox - it will use 8080 by default.
3. Build the code base: `npm run build`
4. Serve the sandbox for live development `npm run serve`