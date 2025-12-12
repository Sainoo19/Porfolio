/**
 * @fileoverview Component prop type definitions
 * @description Reusable component prop interfaces
 */

import type { ReactNode, HTMLAttributes } from 'react';

export interface BaseComponentProps {
    readonly className?: string;
    readonly id?: string;
    readonly children?: ReactNode;
}

export interface SectionProps extends BaseComponentProps {
    readonly title?: string;
    readonly subtitle?: string;
    readonly fullHeight?: boolean;
}

export interface ButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'type'> {
    readonly variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    readonly size?: 'sm' | 'md' | 'lg';
    readonly isLoading?: boolean;
    readonly disabled?: boolean;
    readonly leftIcon?: ReactNode;
    readonly rightIcon?: ReactNode;
    readonly type?: 'button' | 'submit' | 'reset';
}

export interface CardProps extends BaseComponentProps {
    readonly hoverable?: boolean;
    readonly bordered?: boolean;
    readonly gradient?: boolean;
}

export interface ModalProps extends BaseComponentProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly title?: string;
    readonly size?: 'sm' | 'md' | 'lg' | 'full';
}

export interface NavItem {
    readonly label: string;
    readonly href: string;
    readonly icon?: ReactNode;
}

export interface TimelineItem {
    readonly date: string;
    readonly title: string;
    readonly subtitle: string;
    readonly description: string | string[];
    readonly icon?: ReactNode;
}
