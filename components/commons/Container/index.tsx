import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    size?: 'small' | 'large';
}

const Container: React.FC<IProps> = ({ size='large', className, children, ...props }) => {
    return (
        <div className={cn(styles.container, {
            [styles.small]: size === 'small',
            [styles.large]: size === 'large',
        }, className)}
             {...props}
        >
            {children}
        </div>
    );
};

export default Container;
