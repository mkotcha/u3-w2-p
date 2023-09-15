const initialState = {
  city: {
    lat: "",
    lon: "",
  },
  favourites: {
    content: [],
  },
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CITY":
      return {
        ...state,
        city: action.payload,
      };

    case "ADD_TO_FAVOURITE":
      return {
        ...state,
        favourites: {
          ...state.favourites,
          content: [...state.favourites.content, action.payload],
        },
      };

    case "REMOVE_FROM_FAVOURITE":
      return {
        ...state,
        favourites: {
          ...state.favourites,
          content: state.favourites.content.filter(elm => elm !== action.payload),
        },
      };

    default:
      return state;
  }
};

export default mainReducer;
