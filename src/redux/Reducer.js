const initialState = {layout: false, labels: []};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'Change_Layout':
      return {
        ...state,
        layout: !state.layout,
      };
    case 'Label_Data':
      return {
        ...state,
        labels: action.payload,
      };
    default:
      return state;
  }
};
