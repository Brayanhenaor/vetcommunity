import { useEffect } from "react";

export const useInfiniteScroll = ({ hasNextPage, setPage, isFetching }) => {
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        console.log(hasNextPage && !isFetching)
    }, [hasNextPage,isFetching]);

    const handleNewPage = () => {
        console.log('get')
        if (hasNextPage && !isFetching)
            setPage(page => page + 1);
    }

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
        handleNewPage();
    }

    return isFetching;
}
