import React from 'react';
import { IMessage } from 'types/message';
import Stack from 'components/commons/Stack';
import Message from 'components/commons/Message';
import { v4 as uuid } from 'uuid';

export const useMessage = (): [{
    addMessage: (message: IMessage) => void;
    infoMessage: ({ iconName, content }: { iconName?: IconName, content: string }) => void;
    errorMessage: ({ iconName, content }: { iconName?: IconName, content: string }) => void;
},
    JSX.Element
] => {
    const [messages, setMessages] = React.useState<IMessage[]>([]);

    const addMessage = (message: IMessage) => {
        const key = message.key ? message.key : uuid();
        const duration = message.duration ? message.duration * 1000 : 3000;
        setMessages((prev) => [...prev, {
            ...message,
            key,
            duration,
        }]);

        setTimeout(() => {
            removeMessage(key);
        }, duration);
    };

    const infoMessage = ({ iconName, content }: { iconName?: IconName, content: string }) => {
        addMessage({
            type: 'info',
            iconName,
            content,
        });
    };

    const errorMessage = ({ iconName, content }: { iconName?: IconName, content: string }) => {
        addMessage({
            type: 'error',
            iconName,
            content,
        });
    };

    const removeMessage = (key: string) => {
        setMessages((prev) => prev.filter((message) => message.key !== key));
    };

    const messageApi = {
        addMessage,
        infoMessage,
        errorMessage,
    };

    const contextHolder = React.useMemo(() => {
        return (
            <Stack items={messages.map(({ key, ...props }) => {
                return {
                    key: key || '',
                    children: (
                        <Message {...props} />
                    ),
                };
            })}
                   float
                   gap={8}
                   position={'bottom-center'}
            />
        );
    }, [messages]);

    return [messageApi, contextHolder];
};
