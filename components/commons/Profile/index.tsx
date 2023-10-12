import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Avatar from 'components/commons/Avatar';
import { Paragraph, Title } from 'components/commons/Typography';
import Space from 'components/commons/Space';
import SocialButton from 'components/commons/SocialButton';
import { ISocialLink } from 'types/social-link';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    avatar?: string;
    firstName: string;
    lastName: string;
    email: string;
    socialLinks: ISocialLink[];
}

const Profile: React.FC<IProps> = ({
                                       avatar, firstName, lastName, email,
                                       socialLinks, className, ...props
                                   }) => {
    return (
        <Space className={cn(styles.profile)}
               gap={56}
               {...props}
        >
            <Space gap={25}
                   align={'center'}
            >
                {avatar && (
                    <Avatar src={avatar} />
                )}
                <Space gap={8}
                       align={'center'}
                >
                    {(firstName && lastName) && (
                        <Title level={1}
                           size={'large'}
                    >
                        {firstName} {lastName}
                    </Title>
                    )}
                    {email && (
                        <Paragraph>
                            {email}
                        </Paragraph>
                    )}
                </Space>
            </Space>
            {socialLinks.length > 0 && (
                <ul className={styles.socialButtonContainer}>
                    {socialLinks?.map(({ ...props }, index) => (
                        <li key={index}>
                            <SocialButton {...props} />
                        </li>
                    ))}
                </ul>
            )}
        </Space>
    );
};

export default Profile;
