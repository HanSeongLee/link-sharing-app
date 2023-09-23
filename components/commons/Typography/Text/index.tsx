import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLSpanElement> {
    type?: 'primary' | 'danger';
    size?: 'small' | 'medium';
}

const Text: React.FC<IProps> = ({
                                    type, size = 'medium', className, children,
                                    ...props
                                }) => {
    return (
        <span className={cn(styles.text, {
            // Types
            [styles.primary]: type === 'primary',
            [styles.danger]: type === 'danger',

            // Sizes
            [styles.small]: size === 'small',
            [styles.medium]: size === 'medium',
        }, className)}
              {...props}
        >
            {children}
        </span>
    );
};

export default Text;
