import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "redux/action-creators/loading.action-creators";
import { setError } from "redux/action-creators/error.action-creators";
import { API_METHODS } from "constants/api.constants";
import api from "services/api.services";

export const useRequest = () => {
  const dispatch = useDispatch();
  const request = useCallback(
    async (
      url: string,
      method: string = API_METHODS.GET,
      params: { [key: string]: any }
    ) => {
      dispatch(setLoading(true));
      try {
        const data = await api[method](url, {
          params: { ...params },
        });

        return data;
      } catch (e: any) {
        dispatch(setError(true));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  return request;
};
