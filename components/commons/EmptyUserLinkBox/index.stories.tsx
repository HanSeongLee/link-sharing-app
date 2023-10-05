import { Meta, StoryObj } from '@storybook/react';
import EmptyUserLinkBox from './index';

const meta: Meta<typeof EmptyUserLinkBox> = {
    title: 'Components/EmptyUserLinkBox',
    component: EmptyUserLinkBox,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof EmptyUserLinkBox>;

export const Default: Story = {
    args: {
    },
};
