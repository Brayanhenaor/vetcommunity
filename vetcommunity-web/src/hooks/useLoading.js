import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { type } from "../utils/types";

export const useLoading = () => {
  const dispatch = useDispatch();

  const setIsLoading = useCallback((loading) => {
    dispatch({
      type: loading ? type.startLoading : type.stopLoading,
    });
  }, [dispatch]);

  return setIsLoading;
};
