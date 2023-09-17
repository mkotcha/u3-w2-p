const initialState = {
  defaultCity: {
    lat: "",
    lon: "",
  },
  favourites: {
    content: [],
  },
};

// const isFavourite = city => {
//   return city;
// };

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DEF_CITY":
      return {
        ...state,
        defaultCity: action.payload,
      };

    case "REMOVE_DEF_CITY":
      return {
        ...state,
        defaultCity: { lat: "", lon: "" },
      };

    case "ADD_TO_FAVOURITES":
      return {
        ...state,
        favourites: {
          ...state.favourites,
          content: [...state.favourites.content, action.payload],
        },
      };

    case "REMOVE_FROM_FAVOURITES":
      return {
        ...state,
        favourites: {
          ...state.favourites,
          content: state.favourites.content.filter(elm => elm !== action.payload),
        },
      };

    case "SET_FAVOURITES":
      return {
        ...state,
        favourites: {
          content: action.payload,
        },
      };

    default:
      return state;
  }
};

export default mainReducer;
