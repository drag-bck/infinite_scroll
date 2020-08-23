import React, { createContext, useReducer, useContext } from "react";

import reducer, { initialState } from "./reducer";

const StoreContext = createContext({
  ...initialState,
  dispatch: (value) => {},
});

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
