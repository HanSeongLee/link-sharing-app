import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import UserLinkForm from './index';
import { FormProvider, useForm } from 'react-hook-form';

const meta: Meta<typeof UserLinkForm> = {
    title: 'Components/Form/UserLinkForm',
    component: UserLinkForm,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof UserLinkForm>;

export const Default: Story = {
    args: {
    },
    decorators: [
        (Story: any) => {
            const form = useForm();
            return (
                <FormProvider {...form}>
                    <Story />
                </FormProvider>
            );
        },
    ],
};
