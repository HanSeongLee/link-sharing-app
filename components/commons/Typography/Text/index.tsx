import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLSpanElement> {
    type?: 'primary' | 'danger' | 'default';
    size?: 'small' | 'medium';
    strong?: boolean;
}

const Text: React.FC<IProps> = ({
                                    type, size = 'medium', strong=false, className,
                                    children, ...props
                                }) => {
    return (
        <span className={cn(styles.text, {
            // Types
            [styles.primary]: type === 'primary',
            [styles.danger]: type === 'danger',
            [styles.default]: type === 'default',

            // Sizes
            [styles.small]: size === 'small',
            [styles.medium]: size === 'medium',

            // Strong
            [styles.strong]: strong,
        }, className)}
              {...props}
        >
            {children}
        </span>
    );
};

export default Text;
