import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLHeadingElement> {
    level: 1 | 2 | 3 | 4 | 5;
    size: 'large' | 'medium' | 'small';
}

const Title: React.FC<IProps> = ({
                             level, size, className, children,
                             ...props
                         }) => {
    return React.createElement(`h${level}`, {
        className: cn({
            [styles.large]: size === 'large',
            [styles.medium]: size === 'medium',
            [styles.small]: size === 'small',
        }, className),
        ...props,
    }, children);
};

export default Title;
