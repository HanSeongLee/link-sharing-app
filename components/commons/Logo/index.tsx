import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Link from 'next/link';

interface IProps extends HTMLAttributes<HTMLAnchorElement>{
    size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<IProps> = ({ size='large', className, ...props }) => {
    return (
        <Link className={cn(styles.logo, {
            [styles.small]: size === 'small',
            [styles.medium]: size === 'medium',
            [styles.large]: size === 'large',
        }, className)}
              href={'/'}
              {...props}
        >
            <h1>
                <img src={`/logo-devlinks-${size === 'medium' ? 'large' : size}.svg`}
                     alt={'devlinks'}
                />
            </h1>
        </Link>
    );
};

export default Logo;
