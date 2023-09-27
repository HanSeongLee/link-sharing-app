import { Meta, StoryObj } from '@storybook/react';
import Select from './index';

const meta: Meta<typeof Select> = {
    title: 'Components/Select',
    component: Select,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
    args: {
        defaultValue: '1',
        options: [
            {
                value: '1',
                label: 'Item 1',
                iconName: 'github',
            },
            {
                value: '2',
                label: 'Item 2',
                iconName: 'youtube',
            },
            {
                value: '3',
                label: 'Item 3',
                iconName: 'linkedin',
            },
        ],
    },
};
