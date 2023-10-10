import { Meta, StoryObj } from '@storybook/react';
import Avatar from './index';

const meta: Meta<typeof Avatar> = {
    title: 'Components/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
    args: {
        src: 'https://unsplash.com/photos/d2MSDujJl2g/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjk1ODA5NzUwfA&force=true&w=640',
    },
};

export const Empty: Story = {
    args: {
    },
};
