export const initialState = {
  filterState: {
    activeTab: "all",
  },
  dispatch: (value) => {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        filterState: {
          activeTab: state.filterState.activeTab,
          ...action.payload,
        },
      };
    default:
      return { ...state };
  }
};

export default reducer;
