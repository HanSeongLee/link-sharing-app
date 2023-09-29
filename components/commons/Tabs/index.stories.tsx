import { Meta, StoryObj } from '@storybook/react';
import Tabs from './index';

const meta: Meta<typeof Tabs> = {
    title: 'Components/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
    args: {
        items: [
            {
                key: '1',
                iconName: 'link',
                label: 'Link',
            },
            {
                key: '2',
                iconName: 'profile-details-header',
                label: 'Profile Details',
            },
        ],
    },
};
