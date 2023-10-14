import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useWarnIfUnsavedChanges = (unsavedChanges: boolean, callback: () => boolean) => {
    const router = useRouter();

    useEffect(() => {
        if (unsavedChanges) {
            window.onbeforeunload = () => true;
        } else {
            window.onbeforeunload = null;
        }
    }, [unsavedChanges]);

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (unsavedChanges) {
                if (!callback()) {
                    router.events.emit('routeChangeError');
                    throw 'routeChange aborted.';
                }
            }
        };

        router.events.on('routeChangeStart', handleRouteChange);
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [unsavedChanges]);
};
