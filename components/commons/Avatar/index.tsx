import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
    size?: number;
}

const Avatar: React.FC<IProps> = ({ alt, size=104, className, ...props }) => {
    return (
        <img className={cn(styles.avatar, className)}
             style={{
                 width: `${size}px`,
                 height: `${size}px`,
             }}
             alt={alt || 'Avatar'}
             {...props}
        />
    );
};

export default Avatar;
