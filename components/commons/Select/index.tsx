import React, { InputHTMLAttributes, useMemo, useState } from 'react';
import styles from './style.module.scss';
import Input from 'components/commons/Input';
import Icon from 'components/commons/Icon';
import cn from 'classnames';
import ClickAwayListener from 'components/commons/ClickAwayListener';

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    defaultValue?: string;
    options: IOption[];
    onChange?: (value: string) => void;
}

const Select: React.FC<IProps> = ({
                                      defaultValue, options, onChange, className,
                                      children, ...props
                                  }) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = useState<string | undefined>(defaultValue);
    const currentOption = useMemo(() => {
        return options?.find(({ value: _value }) => _value === value)
    }, [value]);

    const toggleOpen = () => {
        setOpen(!open);
    };

    const close = () => {
        setOpen(false);
    };

    const handleChange = (value: string) => {
        onChange?.(value);
        setValue(value);
        toggleOpen();
    };

    return (
        <ClickAwayListener className={cn(styles.select, {
            [styles.open]: open,
        })}
                           onClickAway={close}
        >
            <Input className={styles.input}
                   name={props?.id}
                   icon={currentOption?.iconName ? {
                       name: currentOption.iconName,
                       color: 'grey',
                   } : undefined}
                   value={currentOption?.label}
                   onClick={toggleOpen}
                   active={open}
                   readOnly
            />

            <div className={styles.listWrapper}>
                <ul className={styles.list}>
                    {options?.map(({ value: _value, label, iconName }) => (
                        <li className={cn(styles.item, {
                            [styles.selected]: _value === value,
                        })}
                            onClick={() => handleChange(_value)}
                            key={_value}
                        >
                            {iconName && (
                                <Icon className={styles.icon}
                                      name={iconName}
                                      color={'grey'}
                                />
                            )}
                            {label}{_value === value && ' (Selected)'}
                        </li>
                    ))}
                </ul>
            </div>

            <Input hidden
                   value={value}
                   {...props}
            />
        </ClickAwayListener>
    );
};

export default Select;
