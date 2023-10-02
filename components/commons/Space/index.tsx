import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    direction?: 'vertical' | 'horizontal';
    align?: 'start' | 'center' | 'end';
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
    gap?: number | {
        row: number;
        column: number;
    };
    responsiveGap?: {
        row?: {
            sm: number;
            md: number;
            lg: number;
        },
        column?: {
            sm: number;
            md: number;
            lg: number;
        };
    };
    wrap?: boolean;
}

const Space: React.FC<IProps> = ({
                                     direction = 'vertical', align, justify, gap,
                                     responsiveGap, wrap, className, children,
                                     ...props
                                 }) => {
    return (
        <div className={cn(styles.space, className)}
             style={{
                 flexDirection: direction === 'vertical' ? 'column' : 'row',
                 alignItems: align ? align : undefined,
                 justifyContent: justify ? justify : undefined,
                 gap: gap ?
                     typeof gap === 'number' ?
                         `${gap}px` : `${gap.row}px ${gap.column}px` : undefined,
                 flexWrap: wrap ? 'wrap' : undefined,
                 '--responsive-gap-row-sm': responsiveGap?.row?.sm ? `${responsiveGap.row.sm}px` : undefined,
                 '--responsive-gap-row-md': responsiveGap?.row?.md ? `${responsiveGap.row.md}px` : undefined,
                 '--responsive-gap-row-lg': responsiveGap?.row?.lg ? `${responsiveGap.row.lg}px` : undefined,
                 '--responsive-gap-column-sm': responsiveGap?.column?.sm ? `${responsiveGap.column.sm}px` : undefined,
                 '--responsive-gap-column-md': responsiveGap?.column?.md ? `${responsiveGap.column.md}px` : undefined,
                 '--responsive-gap-column-lg': responsiveGap?.column?.lg ? `${responsiveGap.column.lg}px` : undefined,
             } as React.CSSProperties}
             {...props}
        >
            {children}
        </div>
    );
};

export default Space;
