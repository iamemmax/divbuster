import * as React from 'react';
import { cn } from '@/utils/classNames';
import { Drawer as Drawermenu, DrawerContent as DrawerMenuContent, DrawerTrigger } from './Drawer';

type DrawerDirection = 'top' | 'right' | 'bottom' | 'left';
type SnapPoint = number | (string & {});

interface DrawerProps {
    shouldScaleBackground?: boolean;
    direction?: DrawerDirection;
    snapPoints?: SnapPoint[];
    activeSnapPoint?: SnapPoint;
    children: React.ReactNode;
    contentClass?: string;
    trigger: React.ReactNode;
    triggerClass?: string;
}

const DrawerMenu: React.FC<DrawerProps> = ({
    shouldScaleBackground = true,
    direction = 'bottom',
    snapPoints = [],
    activeSnapPoint,
    children,
    contentClass,
    trigger,
    triggerClass
}) => {
    const directionClass = React.useMemo(() => {
        switch (direction) {
            case 'top':
                return 'top-0';
            case 'right':
                return 'right-0';
            case 'bottom':
                return 'bottom-0';
            case 'left':
                return 'left-0';
            default:
                return 'right-0';
        }
    }, [direction]);

    const snapPointsProps = React.useMemo(() => {
        if (snapPoints.length === 0) {
            return {};
        }

        return {
            snapPoints,
            activeSnapPoint,
        };
    }, [snapPoints, activeSnapPoint]);

    return (
        <Drawermenu
            direction={direction}
            shouldScaleBackground={shouldScaleBackground}
            {...snapPointsProps}
        >
            {
                trigger &&
                <DrawerTrigger className={triggerClass} asChild>
                    {trigger}
                </DrawerTrigger>
            }
            <DrawerMenuContent
                className={cn(
                    `fixed inset-0 z-50 ${directionClass} flex h-auto flex-col`,
                    contentClass
                )}
            >
                {children}
            </DrawerMenuContent>
        </Drawermenu>
    );
};

export default DrawerMenu