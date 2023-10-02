import { Meta, StoryObj } from '@storybook/react';
import Alert from './index';

const meta: Meta<typeof Alert> = {
    title: 'Components/Alert',
    component: Alert,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Error: Story = {
    args: {
        message: 'Error Text',
        type: 'error',
    },
};
