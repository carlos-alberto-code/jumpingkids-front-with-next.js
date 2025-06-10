import ActionButton, { ActionButtonProps } from '../common/ActionButton';

export interface QuickActionCardProps extends Omit<ActionButtonProps, 'paperProps'> {
    route: string;
    onNavigate: (route: string) => void;
}

export default function QuickActionCard({
    route,
    onNavigate,
    enabled = true,
    ...actionButtonProps
}: QuickActionCardProps) {
    const handleClick = () => {
        if (enabled) {
            onNavigate(route);
        }
    };

    return (
        <ActionButton
            {...actionButtonProps}
            enabled={enabled}
            onClick={handleClick}
            paperProps={{
                elevation: 1,
            }}
        />
    );
}
