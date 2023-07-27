import * as requestFromServer from "./bannerCrud";

import { callTypes, bannerSlice } from "./bannerSlice";

const { actions } = bannerSlice;

export const fetchBanners = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllBanner(queryParams)
    .then((response) => {
      const { data, meta } = response.data;

      dispatch(
        actions.bannerList({
          data, meta
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const createBanner = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createBanner(values)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.bannerCreate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const deleteBanner = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBanner(id)
    .then((response) => {
      dispatch(actions.bannerDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete point";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBanner = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateBanner(values)
    .then((response) => {
      const { data } = response.data;
      dispatch(actions.bannerUpdate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
