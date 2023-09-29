import React, { HTMLAttributes, useState } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Icon from 'components/commons/Icon';

interface IProps extends Omit<HTMLAttributes<HTMLUListElement>, 'onChange'> {
    items: ITabsItem[];
    activeKey?: string;
    onChange?: (key: string) => void;
}

const Tabs: React.FC<IProps> = ({
                                    items, activeKey, onChange, className,
                                    ...props
                                }) => {
    const [tempActiveKey, setTempActiveKey] = useState<string | undefined>(items.length > 0 ? items[0].key : undefined);

    const handleTabClick = (key: string) => {
        setTempActiveKey(key);
        onChange?.(key);
    };

    return (
        <ul className={cn(styles.tabs, className)}
            {...props}
        >
            {items?.map(({ key, iconName, label }) => (
                <li className={cn(styles.item, {
                    [styles.active]: key === (activeKey ? activeKey : tempActiveKey),
                })}
                    key={key}
                >
                    <button className={styles.tabButton}
                            type={'button'}
                            onClick={() => handleTabClick(key)}
                            aria-label={label}
                    >
                        <Icon name={iconName}
                              color={key === (activeKey ? activeKey : tempActiveKey) ? 'primary' : 'grey'}
                              size={20}
                        />

                        <span className={styles.label}>
                            {label}
                        </span>
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default Tabs;
