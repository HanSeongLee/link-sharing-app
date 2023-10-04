import { Meta, StoryObj } from '@storybook/react';
import ImageUpload from './index';

const meta: Meta<typeof ImageUpload> = {
    title: 'Components/ImageUpload',
    component: ImageUpload,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof ImageUpload>;

export const Default: Story = {
    args: {
    },
};
