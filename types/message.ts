export interface IMessage {
    key?: string;
    type: 'info' | 'error';
    iconName?: IconName;
    content: string;
    duration?: number;
}
