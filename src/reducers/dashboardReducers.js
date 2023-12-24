import {
  GET_CARDS_REQUEST,
  GET_CARDS_SUCCESS,
  GET_CARDS_FAIL,
  GET_TOP_ORDER_REQUEST,
  GET_TOP_ORDER_SUCCESS,
  GET_TOP_ORDER_FAIL,
  GET_LAST_ORDER_REQUEST,
  GET_LAST_ORDER_SUCCESS,
  GET_LAST_ORDER_FAIL,
  GET_PRODUCT_TRENDING_FAIL,
  GET_PRODUCT_TRENDING_REQUEST,
  GET_PRODUCT_TRENDING_SUCCESS,
  GET_CATE_TRENDING_FAIL,
  GET_CATE_TRENDING_REQUEST,
  GET_CATE_TRENDING_SUCCESS,

} from "../constants/dashboardConstant.js";

export const cardsReducer = (state = { cards: [] }, action) => {
  switch (action.type) {
    case GET_CARDS_REQUEST:
      return { loading: true };
    case GET_CARDS_SUCCESS:
      return {
        loading: false,
        cards: action.payload,
      };
    case GET_CARDS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const topOrderReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_TOP_ORDER_REQUEST:
      return { loading: true };
    case GET_TOP_ORDER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case GET_TOP_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const lastOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_LAST_ORDER_REQUEST:
      return { loading: true };
    case GET_LAST_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case GET_LAST_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productTrendingReducer = (
  state = { productTrendings: [] },
  action
) => {
  switch (action.type) {
    case GET_PRODUCT_TRENDING_REQUEST:
      return { loading: true };
    case GET_PRODUCT_TRENDING_SUCCESS:
      return {
        loading: false,
        productTrendings: action.payload,
      };
    case GET_PRODUCT_TRENDING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cateTrendingReducer = (state = { cateTrendings: [] }, action) => {
  switch (action.type) {
    case GET_CATE_TRENDING_REQUEST:
      return { loading: true };
    case GET_CATE_TRENDING_SUCCESS:
      return {
        loading: false,
        cateTrendings: action.payload,
      };
    case GET_CATE_TRENDING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
