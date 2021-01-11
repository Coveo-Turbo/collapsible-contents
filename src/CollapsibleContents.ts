import { Component, IComponentBindings, ComponentOptions, $$, Dom } from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';
import { CompactViewStateProvider, compactViewStateProvider } from './utils';

const ARROW_UP = `<svg alt="Arrow Up" focusable="false" enable-background="new 0 0 10 6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg" class="coveo-field-table-toggle-up-svg  coveo-opened  coveo-opened"><g fill="currentColor"><path d="m5 .068c.222 0 .443.084.612.253l4.134 4.134c.338.338.338.886 0 1.224s-.886.338-1.224 0l-3.522-3.521-3.523 3.521c-.336.338-.886.338-1.224 0s-.337-.886.001-1.224l4.134-4.134c.168-.169.39-.253.612-.253z"></path></g></svg>`;
const ARROW_DOWN = `<svg alt="Arrow Down" focusable="false" enable-background="new 0 0 10 6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg" class="coveo-field-table-toggle-down-svg      "><g fill="currentColor"><path d="m5 5.932c-.222 0-.443-.084-.612-.253l-4.134-4.134c-.338-.338-.338-.886 0-1.224s.886-.338 1.224 0l3.522 3.521 3.523-3.521c.336-.338.886-.338 1.224 0s .337.886-.001 1.224l-4.135 4.134c-.168.169-.39.253-.611.253z"></path></g></svg>`;

export interface ICollapsibleContentsOptions {
    persistState: boolean;
    collapsedMaxHeight: string;
    collapseSymbol: string;
    expandSymbol: string;
    defaultState: string;
    toggleFloat: string;
}

@lazyComponent
export class CollapsibleContents extends Component {
    static ID = 'CollapsibleContents';
    static options: ICollapsibleContentsOptions = {
        persistState: ComponentOptions.buildBooleanOption({ defaultValue: true }),
        collapsedMaxHeight: ComponentOptions.buildStringOption({ defaultValue: '0px' }),
        collapseSymbol: ComponentOptions.buildStringOption({ defaultValue: ARROW_UP }),
        expandSymbol: ComponentOptions.buildStringOption({ defaultValue: ARROW_DOWN }),
        defaultState: ComponentOptions.buildStringOption({ defaultValue: CompactViewStateProvider.states.MINIMIZED }),
        toggleFloat: ComponentOptions.buildStringOption({ defaultValue: 'right' }),
    };

    protected contentContailer: Dom;

    constructor(public element: HTMLElement, public options: ICollapsibleContentsOptions, public bindings: IComponentBindings) {
        super(element, CollapsibleContents.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, CollapsibleContents, options);
        this.initialize();
    }

    protected initialize() {
        this.moveContents();
        const { collapseSymbol, expandSymbol, defaultState, persistState } = this.options;

        if (CompactViewStateProvider.states.MINIMIZED === defaultState) {
            this.minimize();
        }

        if ((persistState && CompactViewStateProvider.states.MINIMIZED === compactViewStateProvider.get())) {
            this.toggle();
        }

        this.createToggle(collapseSymbol, 'collapse');
        this.createToggle(expandSymbol, 'expand');
    }

    public toggle() {
        this.element.classList.toggle('contents-collapsed');
        
        const isCollapsed = this.element.classList.contains('contents-collapsed');

        this.contentContailer.el.style.maxHeight = isCollapsed ? this.options.collapsedMaxHeight : '';

        return isCollapsed;
    }

    public minimize() {
        if (this.isCollapsed()) {
            return;
        }

        return this.toggle();
    }

    public expand() {
        if (!this.isCollapsed()) {
            return;
        }

        return this.toggle();
    }

    public isCollapsed() {
        return this.element.classList.contains('contents-collapsed');
    }

    protected moveContents() {
        let contentContainer = $$('div', {className: 'contents-container'});
        while (this.element.childNodes.length) {
            contentContainer.el.appendChild(this.element.childNodes[0]);
        }

        this.contentContailer = contentContainer;
        this.element.appendChild(contentContainer.el);
    }

    protected createToggle(action: string, id: string) {
        const { toggleFloat } = this.options;
        const actionToggle = $$('span', {className: 'contents-toggle', id}, action);
        actionToggle.el.style.float = toggleFloat;
        actionToggle.el.addEventListener('click', (evt: MouseEvent) => {
            evt.preventDefault();

            this.toggle();
        });
        this.element.appendChild(actionToggle.el);
    }
}