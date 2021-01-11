import { LocalStorageUtils } from "coveo-search-ui";

export class CompactViewStateProvider {
    private localStorage: LocalStorageUtils<string>;
    static states = {
        MINIMIZED: 'minimized',
        EXPANDED: 'expanded',
    };

    constructor() {
        this.localStorage = new LocalStorageUtils('Toggle');
    }
    
    public get() {
        return JSON.parse(this.localStorage.load());
    }

    public select(value) {
        this.localStorage.save(JSON.stringify(value));
    }

    public getToggleState(state: string, fallback: string) {
        if (!this.isValidState(state)) {
            if (!this.isValidState(fallback)) {
                throw new Error(`Fallback state '${fallback}' is not valid.`);
            }

            return fallback;
        }

        if (CompactViewStateProvider.states.MINIMIZED === state) {
            return CompactViewStateProvider.states.EXPANDED;
        }

        if (CompactViewStateProvider.states.EXPANDED === state) {
            return CompactViewStateProvider.states.MINIMIZED;
        }
    }

    public isValidState(state: string) {
        return Object.values(CompactViewStateProvider.states).includes(state);
    }
}

export const compactViewStateProvider = new CompactViewStateProvider();