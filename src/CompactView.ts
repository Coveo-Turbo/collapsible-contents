import {
    $$,
    ResultListEvents,
    IChangeLayoutEventArgs,
    Component,
    IComponentBindings,
    ComponentOptions
} from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';
import { CollapsibleContents } from './CollapsibleContents';
import { CompactViewStateProvider, compactViewStateProvider } from './utils';

export interface ICompactViewOptions {
    minimizedByDefault?: boolean;
    expandedCaption?: string;
    minimizedCaption?: string;
    target: string;
}

@lazyComponent
export class CompactView extends Component {
    static ID = 'CompactView';
    static options: ICompactViewOptions = {
        minimizedByDefault: ComponentOptions.buildBooleanOption({ defaultValue: true }),
        expandedCaption: ComponentOptions.buildLocalizedStringOption({ defaultValue: 'Compact View' }),
        minimizedCaption: ComponentOptions.buildLocalizedStringOption({ defaultValue: 'Default View' }),
        target: ComponentOptions.buildStringOption({ defaultValue: '.CoveoCollapsibleContents' }),
    };

    private currentToggleStatus: string;

    constructor(public element: HTMLElement, public options: ICompactViewOptions, public bindings: IComponentBindings) {
        super(element, CompactView.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, CompactView, options);
        this.bind.onRootElement(ResultListEvents.newResultsDisplayed, (args: IChangeLayoutEventArgs) => this.handleNewResultsDisplayed(args));
        this.initialize();
    }

    protected initialize() {
        this.element.appendChild(this.build());
        this.toggle(compactViewStateProvider.get() || this.getDefaultState());
    }

    private minimizeAll() {
        const { target } = this.options;
        _.each(document.querySelectorAll(target), element => {
            let collapsibleContents = <CollapsibleContents>Coveo.get(<HTMLElement>element, 'CollapsibleContents');
            collapsibleContents.minimize();
        });
    };

    private expandAll() {
        const { target } = this.options;
        _.each(document.querySelectorAll(target), element => {
            let collapsibleContents = <CollapsibleContents>Coveo.get(<HTMLElement>element, 'CollapsibleContents');
            collapsibleContents.expand();
        });
    };

    public toggle(fallback?: string) {
        let toggleButton = $$(this.element).findClass('coveo-toggle-all-field-tables')[0];
        this.currentToggleStatus = compactViewStateProvider.getToggleState(this.currentToggleStatus, fallback);

        compactViewStateProvider.select(this.currentToggleStatus);

        $$(toggleButton).toggleClass(CompactViewStateProvider.states.MINIMIZED, CompactViewStateProvider.states.MINIMIZED === this.currentToggleStatus);
        $$(toggleButton).toggleClass(CompactViewStateProvider.states.EXPANDED, CompactViewStateProvider.states.EXPANDED === this.currentToggleStatus);

        $$(toggleButton).text(CompactViewStateProvider.states.EXPANDED === this.currentToggleStatus ? this.options.expandedCaption : this.options.minimizedCaption);

        this.applyToggle();
    }

    protected applyToggle() {
        if (CompactViewStateProvider.states.EXPANDED === this.currentToggleStatus) {
            this.expandAll();
        }

        if (CompactViewStateProvider.states.MINIMIZED === this.currentToggleStatus) {
            this.minimizeAll();
        }
    }

    private handleClick() {
        this.toggle();
    };

    public build(): HTMLElement {
        const element = $$('span', { className: 'coveo-toggle-all-field-tables ' });
        element.on('click', () => this.handleClick());

        return element.el;
    }

    protected handleNewResultsDisplayed(data: IChangeLayoutEventArgs) {
        this.applyToggle();
    }

    private getDefaultState() {
        return this.options.minimizedByDefault ? CompactViewStateProvider.states.MINIMIZED : CompactViewStateProvider.states.EXPANDED;
    }
}