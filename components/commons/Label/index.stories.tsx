import { Meta, StoryObj } from '@storybook/react';
import Label from './index';

const meta: Meta<typeof Label> = {
    title: 'Components/Label',
    component: Label,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
    args: {
        children: 'Label',
    },
};

export const Required: Story = {
    args: {
        children: 'Label',
        required: true,
    },
};
