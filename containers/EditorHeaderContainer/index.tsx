import React, { HTMLAttributes } from 'react';
import EditorHeader from 'components/commons/EditorHeader';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface IProp extends HTMLAttributes<HTMLDivElement> {

}

const EditorHeaderContainer: React.FC<IProp> = ({ children, ...props }) => {
    const router = useRouter();
    const { tab } = router.query;
    const { data: session } = useSession();
    const tabItems: ITabsItem[] = [
        {
            key: 'link',
            iconName: 'link',
            label: 'Link',
        },
        {
            key: 'profile-details',
            iconName: 'profile-details-header',
            label: 'Profile Details',
        },
    ];

    const handleTabChange = (key: string) => {
        router.push({
            query: {
                tab: key,
            },
        }, undefined, {
            shallow: true,
            scroll: true,
        });
    };

    const handleClickPreview = () => {
        if (!session) {
            return ;
        }

        const { id } = session.user;
        router.push(`/profiles/${id}`);
    };

    if (!router.isReady) {
        return null;
    }

    return (
        <div {...props}>
            <EditorHeader activeTabKey={tab as string}
                       onChangeTab={handleTabChange}
                       tabItems={tabItems}
                       onClickPreview={handleClickPreview}
            />
        </div>
    );
};

export default EditorHeaderContainer;
