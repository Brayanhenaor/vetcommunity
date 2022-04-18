import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { orderBy } from "../helpers/validations";

export const usePost = (url, dataPost) => {
    const [state, setState] = useState({ data: null, loading: true, error: null });
    const isMounted = useRef(true);

    useEffect(() => {
        setState(prevState => ({ ...prevState, loading: true }))

        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        const getAsyncData = async () => {
            try {
                const dataGet = await axios.post(url, dataPost);

                if (isMounted.current) {
                    setState({
                        error: null,
                        data: dataGet?.data
                    });
                }
            } catch (error) {
                console.log(error)
                if (isMounted.current) {
                    setState({
                        error: error,
                        data: null
                    });
                }
            } finally {
                setState(prevState => ({ ...prevState, loading: false }));
            }
        }
        getAsyncData();
    }, [url, dataPost, setState, sortBy, arrayName]);

    return { ...state, setState };
}