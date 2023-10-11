import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Container from 'components/commons/Container';
import Button from 'components/commons/Button';
import Link from 'next/link';
import { useMessage } from 'hooks/useMessage';
import { INFO_MESSAGES } from 'constants/messages';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    link: string;
}

const ProfileHeader: React.FC<IProps> = ({ link, className, ...props }) => {
    const [messageApi, contextHolder] = useMessage();

    const onClickShare = () => {
        handleCopy(link);
        messageApi.infoMessage({
            iconName: 'link',
            content: INFO_MESSAGES.COPY_LINK,
        });
    };

    const handleCopy = (text: string) => {
        const elememnt = document.createElement('textarea');
        document.body.appendChild(elememnt);
        elememnt.value = text;
        elememnt.select();
        document.execCommand('copy');
        document.body.removeChild(elememnt);
    };

    return (
        <div className={cn(styles.profileHeader, className)}
             {...props}
        >
            {contextHolder}
            <Container className={styles.container}>
                <Link href={'/editor'}>
                    <Button variant={'secondary'}>
                        Back to Editor
                    </Button>
                </Link>

                <Button onClick={onClickShare}>
                    Share Link
                </Button>
            </Container>
        </div>
    );
};

export default ProfileHeader;
