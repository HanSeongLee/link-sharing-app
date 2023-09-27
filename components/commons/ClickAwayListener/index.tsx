import React, { HTMLAttributes, useEffect, useRef } from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    onClickAway: () => void;
}

const ClickAwayListener: React.FC<IProps> = ({ onClickAway, children, ...props }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickAway();
            }
        };

        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickAway]);

    return (
        <div {...props}
             ref={ref}
        >
            {children}
        </div>
    );
};

export default ClickAwayListener;
