import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Space from './index';

const meta: Meta<typeof Space> = {
    title: 'Components/Space',
    component: Space,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof Space>;

const Box: React.FC = ({ children, ...props }) => {
    return (
        <div {...props}
             style={{
                 width: '100px',
                 height: '100px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 color: 'white',
                 backgroundColor: 'red',
             }}
        >
            {children}
        </div>
    );
};

export const Default: Story = {
    args: {
        children: (
            <>
                <Box>1</Box>
                <Box>2</Box>
                <Box>3</Box>
                <Box>4</Box>
            </>
        ),
        direction: 'horizontal',
        gap: 24,
    },
};

export const Responsive: Story = {
    args: {
        children: (
            <>
                <Box>1</Box>
                <Box>2</Box>
                <Box>3</Box>
                <Box>4</Box>
                <Box>5</Box>
                <Box>6</Box>
                <Box>7</Box>
                <Box>8</Box>
                <Box>9</Box>
            </>
        ),
        direction: 'horizontal',
        responsiveGap: {
            row: {
                sm: 16,
                md: 24,
                lg: 32,
            },
            column: {
                sm: 16,
                md: 24,
                lg: 32,
            }
        },
        wrap: true,
    },
};
