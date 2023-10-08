import { Meta, StoryObj } from '@storybook/react';
import FieldBox from './index';
import Space from 'components/commons/Space';
import Select from 'components/commons/Select';
import Label from 'components/commons/Label';
import Input from 'components/commons/Input';
import { SOCIAL_LINKS } from 'constants/social-links';
import { SocialPlatform } from 'types/social-link';

const meta: Meta<typeof FieldBox> = {
    title: 'Components/FieldBox',
    component: FieldBox,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof FieldBox>;

export const SocialLinkFieldBox: Story = {
    args: {
        title: 'Link #1',
        children: (
            <>
                <Space gap={4}>
                    <Label htmlFor={'platform'}>
                        Platform
                    </Label>
                    <Select id={'platform'}
                            name={'platform'}
                            defaultValue={'github'}
                            options={Object.keys(SOCIAL_LINKS)
                                .map((key) => {
                                    return {
                                        value: key,
                                        label: SOCIAL_LINKS[key as SocialPlatform].name,
                                        iconName: key as IconName,
                                    };
                                })}

                    />
                </Space>
                <Space gap={4}>
                    <Label htmlFor={'link'}>
                        Link
                    </Label>
                    <Input id={'link'}
                           name={'ink'}
                           type={'url'}
                           icon={{
                               name: 'link',
                           }}
                           placeholder={'e.g. https://www.github.com/johnappleseed'}
                    />
                </Space>
            </>
        ),
    },
};
