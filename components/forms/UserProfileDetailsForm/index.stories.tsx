import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import UserProfileDetailsForm from './index';
import { FormProvider, useForm } from 'react-hook-form';

const meta: Meta<typeof UserProfileDetailsForm> = {
    title: 'Components/Form/UserProfileDetailsForm',
    component: UserProfileDetailsForm,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof UserProfileDetailsForm>;

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
