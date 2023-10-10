import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Icon from 'components/commons/Icon';
import { SOCIAL_LINKS } from 'constants/social-links';
import { ISocialLink } from 'types/social-link';

interface IProps extends HTMLAttributes<HTMLAnchorElement>, ISocialLink {
    size?: 'small' | 'large';
}

const SocialButton: React.FC<IProps> = ({
                                            platform, link, size = 'large', className,
                                            ...props
                                        }) => {
    return (
        <a className={cn(styles.socialButton, {
            [styles.frontendMentor]: platform === 'frontend-mentor',
            [styles.small]: size === 'small',
        }, className)}
           style={{
               backgroundColor: SOCIAL_LINKS[platform].color,
           }}
           href={link}
           {...props}
        >
            <Icon name={platform}
                  color={platform === 'frontend-mentor' ? 'default' : 'white'}
                  size={size === 'small' ? 16 : 20}
            />
            <span className={styles.name}>
                {SOCIAL_LINKS[platform].name}
            </span>
            <Icon name={'arrow-right'}
                  color={platform === 'frontend-mentor' ? 'grey' : 'white'}
                  size={16}
            />
        </a>
    );
};

export default SocialButton;
