const STORAGE = "SPX"
export default class StateLoader {

    loadState(initialState) {
        try {
            if (typeof window !== "undefined") {
                let serializedState = localStorage.getItem(STORAGE);
                if (serializedState === null) {
                    return this.initializeState(initialState);
                }
                return JSON.parse(serializedState);
            }
        }
        catch (err) {
            return this.initializeState();
        }
    }

    saveState(state) {
        try {
            if (typeof window !== "undefined"){
                let serializedState = JSON.stringify(state);
                localStorage.setItem(STORAGE, serializedState);
            }

        }
        catch (err) {
            throw err
        }
    }

    initializeState(initialState) {
        return initialState;
    };

}