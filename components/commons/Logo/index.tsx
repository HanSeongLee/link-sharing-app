import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import Link from 'next/link';

interface IProps extends HTMLAttributes<HTMLAnchorElement>{
    size?: 'small' | 'large';
}

const Logo: React.FC<IProps> = ({ size='large', className, ...props }) => {
    return (
        <Link className={styles.logo}
              href={'/'}
              {...props}
        >
            <h1>
                <img src={`/logo-devlinks-${size}.svg`}
                     alt={'devlinks'}
                />
            </h1>
        </Link>
    );
};

export default Logo;
