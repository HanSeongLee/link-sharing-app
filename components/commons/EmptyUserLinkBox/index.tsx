import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import { Paragraph, Title } from 'components/commons/Typography';
import Space from 'components/commons/Space';
import EmptyIllustration from 'public/img/illustration-empty.svg';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const EmptyUserLinkBox: React.FC<IProps> = ({ className, ...props }) => {
    return (
        <Space className={cn(styles.emptyUserLinkBox, className)}
               {...props}
        >
            <Space className={styles.container}
                   gap={24}
            >
                <EmptyIllustration className={styles.illustration} />
                <Title level={2}
                       size={'medium'}
                >
                    Let’s get you started
                </Title>
                <Paragraph>
                    Use the “Add new link” button to get started. Once you have more than one link, you can reorder and
                    edit them. We’re here to help you share your profiles with everyone!
                </Paragraph>
            </Space>
        </Space>
    );
};

export default EmptyUserLinkBox;
