import { Meta, StoryObj } from '@storybook/react';
import ClickAwayListener from './index';

const meta: Meta<typeof ClickAwayListener> = {
    title: 'Components/ClickAwayListener',
    component: ClickAwayListener,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof ClickAwayListener>;

export const Default: Story = {
    args: {
        children: 'ClickAwayListener',
        style: {
            width: '200px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            backgroundColor: 'red',
        }
    },
};
