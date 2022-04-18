import axios from "axios";
import { useEffect, useRef, useState } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));
    const getAsyncData = async () => {
      try {
        const dataGet = await axios.get(url);
        if (isMounted.current) {
          setState({
            error: null,
            data: dataGet?.data,
          });
        }
      } catch (error) {
        if (isMounted.current) {
          setState({
            error: error,
            data: null,
          });
        }
      } finally {
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
    };

    getAsyncData();
  }, [url, setState]);

  return { ...state, setState };
};
