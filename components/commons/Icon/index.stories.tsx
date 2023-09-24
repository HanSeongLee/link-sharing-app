import { Meta, StoryObj } from '@storybook/react';
import Icon from 'components/commons/Icon/index';

const meta: Meta<typeof Icon> = {
    title: 'Components/Icon',
    component: Icon,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
    args: {
        name: 'arrow-right',
        color: 'default',
        size: 16,
    },
};
