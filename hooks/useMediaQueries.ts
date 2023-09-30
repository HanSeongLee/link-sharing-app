import { useMediaQuery } from 'usehooks-ts';

export const useMediaQueries = () => {
    const mobileQuery = useMediaQuery('(max-width: 767px)');
    const tabletQuery = useMediaQuery('(min-width: 767px) and (max-width: 1339px)');
    const desktopQuery = useMediaQuery('(min-width: 1339px)');

    return {
        mobileQuery,
        tabletQuery,
        desktopQuery,
    };
};
