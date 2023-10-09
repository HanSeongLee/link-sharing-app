import React, { HTMLAttributes, ReactNode } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    items: {
        key: string;
        children: ReactNode;
    }[];
    float?: boolean;
    gap?: number;
    position?:
        'top-left' | 'top-center' | 'top-right' | 'bottom-left' |
        'bottom-center' | 'bottom-right';
}

const Stack: React.FC<IProps> = ({
                                     items, float, gap, position,
                                     className, ...props
                                 }) => {
    return (
        <TransitionGroup className={cn(styles.stack, {
            [styles.float]: float,
            [styles.topLeft]: position === 'top-left',
            [styles.topCenter]: position === 'top-center',
            [styles.topRight]: position === 'top-right',
            [styles.bottomLeft]: position === 'bottom-left',
            [styles.bottomCenter]: position === 'bottom-center',
            [styles.bottomRight]: position === 'bottom-right',
        }, className)}
                         style={{
                             gap: `${gap}px`,
                         }}
                         {...props}
        >
            {items.map(({ key, children }) => (
                <CSSTransition key={key}
                               timeout={1000}
                               classNames={{
                                   enter: styles.enter,
                                   enterActive: styles.enterActive,
                                   exit: styles.exit,
                                   exitActive: styles.exitActive,
                               }}
                >
                    {children}
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
};

export default Stack;
