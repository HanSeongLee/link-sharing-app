import { Meta, StoryObj } from '@storybook/react';
import Divider from './index';

const meta: Meta<typeof Divider> = {
    title: 'Components/Divider',
    component: Divider,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
    args: {
    },
};
