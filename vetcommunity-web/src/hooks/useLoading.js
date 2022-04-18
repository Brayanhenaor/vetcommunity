import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { types } from "../helpers/types";

export const useLoading = () => {
  const dispatch = useDispatch();

  const setIsLoading = useCallback((loading) => {
    dispatch({
      type: loading ? types.loading : types.stopLoading,
    });
  }, [dispatch]);

  return setIsLoading;
};
