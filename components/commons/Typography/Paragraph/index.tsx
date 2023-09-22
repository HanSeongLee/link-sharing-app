import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLParagraphElement> {
    size?: 'medium' | 'small';
}

const Paragraph: React.FC<IProps> = ({ size='medium', className, children, ...props }) => {
    return (
        <p className={cn(styles.paragraph, {
            [styles.medium]: size === 'medium',
            [styles.small]: size === 'small',
        }, className)}
           {...props}
        >
            {children}
        </p>
    );
};

export default Paragraph;
