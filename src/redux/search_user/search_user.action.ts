import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import {
  GET_SEARCH_USER_ALL_DETAIL_REQUEST,
  GET_SEARCH_USER_ALL_DETAIL_REQUEST_SUCCESS,
} from "./search_user.actionTypes";
import axios from "axios";

export const getUserAllDetailAction = (
  id: any
): ThunkAction<void, {}, {}, Action<string>> => {
  return async (dispatch) => {
    try {
      const userResponse = await axios.get(
        `${process.env.REACT_APP_PORT}/users/single/${id}`
      );
      const postResponse = await axios.get(
        `${process.env.REACT_APP_PORT}/posts/${id}`
      );
      const followResponse = await axios.get(
        `${process.env.REACT_APP_PORT}/followers/${id}`
      );
      // console.log(followResponse);
      dispatch({
        type: GET_SEARCH_USER_ALL_DETAIL_REQUEST_SUCCESS,
        payload: {
          userResponse: userResponse.data,
          postResponse: postResponse.data,
          followers: followResponse.data.Followers,
          following: followResponse.data.Following,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const onFollowAction = (
  _id: any
): ThunkAction<void, {}, {}, Action<string>> => {
  return async (dispatch) => {
    const header: { Authorization: string } = {
      Authorization:
        `Bearer ${process.env.REACT_APP_TOKEN}`,
    };
    // console.log(_id)
    console.log(header);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PORT}/followers/${_id}`,
        {},
        {
          headers: header,
        }
      );
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
};
export const getLoginUserFollowing = (
  id: any
): ThunkAction<void, {}, {}, Action<string>> => {
  return async (dispatch) => {
    const header: { Authorization: string } = {
      Authorization:
        `Bearer ${process.env.REACT_APP_TOKEN}` ,
    };
    // console.log(_id)
    // console.log(header);
    try {
      const followResponse = await axios.get(
        `${process.env.REACT_APP_PORT}/followers/${id}`
      );
      console.log(followResponse.data);
      dispatch({type:"LOGIN_USER_FOLLOWING",payload:followResponse.data.userFollowingIds})
    } catch (error) {
      console.log(error);
    }
  };
};
