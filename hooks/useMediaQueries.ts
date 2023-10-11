import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export const useMediaQueries = () => {
    const [isClient, setIsClient] = useState(false)
    const mobileQuery = useMediaQuery('(max-width: 767px)');
    const tabletQuery = useMediaQuery('(min-width: 767px) and (max-width: 1399px)');
    const desktopQuery = useMediaQuery('(min-width: 1399px)');

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return {
            mobileQuery: false,
            tabletQuery: false,
            desktopQuery: false,
        };
    }

    return {
        mobileQuery,
        tabletQuery,
        desktopQuery,
    };
};
