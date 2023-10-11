import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Avatar from 'components/commons/Avatar';
import SocialButton from 'components/commons/SocialButton';
import { ISocialLink } from 'types/social-link';

interface IProp extends HTMLAttributes<HTMLDivElement> {
    avatar?: string;
    firstName: string;
    lastName: string;
    email: string;
    socialLinks: ISocialLink[];
    hideSocialLinkEmptyBox?: boolean;
}

const Preview: React.FC<IProp> = ({
                                      avatar, firstName, lastName, email,
                                      socialLinks, hideSocialLinkEmptyBox=false, className,
                                      ...props
                                  }) => {
    return (
        <div className={cn(styles.preview, {
            [styles.hideSocialLinkEmptyBox]: hideSocialLinkEmptyBox,
        })}
             {...props}
        >
            <div className={styles.mockup}>
                {avatar && (
                    <Avatar className={styles.avatar}
                            src={avatar}
                            size={96}
                    />
                )}
                {(firstName && lastName) && (
                    <div className={styles.name}>
                        {firstName} {lastName}
                    </div>
                )}
                {email && (
                    <div className={styles.email}>
                        {email}
                    </div>
                )}

                <ul className={styles.socialButtonContainer}>
                    {socialLinks?.slice(0, 5).map((props, index) => (
                        <li key={index}>
                            <SocialButton className={styles.socialButton}
                                          {...props}
                                          size={'small'}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Preview;
