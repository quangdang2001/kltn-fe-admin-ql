import axios from 'axios'
import { URL } from '../apis/axios.js'
import {
  GET_CARDS_REQUEST,
  GET_CARDS_SUCCESS,
  GET_CARDS_FAIL,
  GET_LAST_ORDER_REQUEST,
  GET_LAST_ORDER_SUCCESS,
  GET_LAST_ORDER_FAIL,
  GET_TOP_ORDER_REQUEST,
  GET_TOP_ORDER_SUCCESS,
  GET_TOP_ORDER_FAIL,
  GET_PRODUCT_TRENDING_FAIL,
  GET_PRODUCT_TRENDING_REQUEST,
  GET_PRODUCT_TRENDING_SUCCESS,
  GET_CATE_TRENDING_FAIL,
  GET_CATE_TRENDING_REQUEST,
  GET_CATE_TRENDING_SUCCESS
} from '../constants/dashboardConstant.js'
export const getCards = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CARDS_REQUEST,
    })
    const { data } = await axios.get(`${URL}/dashBoard`)
    dispatch({
      type: GET_CARDS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_CARDS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const getTopOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_TOP_ORDER_REQUEST,
    })
    const { data } = await axios.get(`${URL}/dashBoard/topOrders`)
    dispatch({
      type: GET_TOP_ORDER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_TOP_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const getLastOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_LAST_ORDER_REQUEST,
    })
    const { data } = await axios.get(`${URL}/dashBoard/lastOrders`)
    dispatch({
      type: GET_LAST_ORDER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_LAST_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getProductTrending = (lastDate=7) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCT_TRENDING_REQUEST,
    })
    const { data } = await axios.get(`${URL}/dashBoard/productTrending?lastDate=${lastDate}`)
    dispatch({
      type: GET_PRODUCT_TRENDING_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_TRENDING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCategoryTrending = (lastDate=9999) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CATE_TRENDING_REQUEST,
    })
    const { data } = await axios.get(`${URL}/dashBoard/cateTrending?lastDate=${lastDate}`)
    console.log("Get cate trending", data)
    dispatch({
      type: GET_CATE_TRENDING_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_CATE_TRENDING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }

}
