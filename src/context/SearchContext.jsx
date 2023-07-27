import React, { useMemo, useReducer } from 'react';

const INIT_STATE = {
    name: '',
};

const Context = React.createContext(undefined);

function reducer(state, action) {
    if (action.type === 'set-name') {
        return {
            ...state,
            name: action.payload,
        };
    }
    if (action.type === 'reset-name') {
        return {
            ...state,
            name: '',
        };
    }
    return state;
}

const SearchProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const memoizedValue = useMemo(
        () => ({
            state,
            dispatch,
        }),
        [state, dispatch]
    );

    return <Context.Provider value={memoizedValue}>{children}</Context.Provider>;
};

const useSearchContext = () => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new Error('useNameContext must be used within a NameProvider');
    }
    return context;
};

export { SearchProvider, useSearchContext };
