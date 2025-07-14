import * as React from 'react';

// ===============================
// TOAST COMPONENTS
// ===============================

export interface ToastWrapperProps {
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    expand?: boolean;
    richColors?: boolean;
    closeButton?: boolean;
    [key: string]: any;
}

export const ToastWrapper: React.FC<ToastWrapperProps>;

export const toast: {
    success: (message: string, options?: any) => void;
    error: (message: string, options?: any) => void;
    info: (message: string, options?: any) => void;
    warning: (message: string, options?: any) => void;
    loading: (message: string, options?: any) => void;
    custom: (jsx: React.ReactNode, options?: any) => void;
    promise: <T>(promise: Promise<T>, options: any) => void;
    dismiss: (id?: string | number) => void;
};

// ===============================
// WRAPPER COMPONENTS
// ===============================

export interface ProfileWrapperCardProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export const ProfileWrapperCard: React.FC<ProfileWrapperCardProps>;

// ===============================
// UTILITY COMPONENTS
// ===============================

export interface ImageComponentProps {
    src: string;
    width: number;
    height: number;
    alt: string;
    className?: string;
    id?: string;
    layout?: 'intrinsic' | 'fixed' | 'fill' | 'responsive' | 'raw';
    onClick?: (event: React.MouseEvent) => void;
    priority?: boolean;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    objectPosition?: string;
    bgColor?: string | null;
    blurEffect?: boolean;
    onLoadingComplete?: (result: any) => void;
}

export const ImageComponent: React.FC<ImageComponentProps>;

export interface TabItem {
    name: string;
    value?: string | any;
    icon?: React.ComponentType<any> | React.ReactNode;
    iconClassName?: string;
}

export interface TabComponentProps {
    tabList: TabItem[];
    activeTab: string | any;
    setActiveTab: (value: string | any) => void;
    fixedTabWidth?: boolean;
    className?: string;
    titleClassName?: string;
    containerClassName?: string;
    [key: string]: any;
}

export const TabComponent: React.FC<TabComponentProps>;

export interface NumberInputProps {
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    max: number;
    min?: number;
    className?: string;
    autoFocus?: boolean;
    ariaLabel?: string;
    [key: string]: any;
}

export const NumberInput: React.FC<NumberInputProps>;

export interface ModalComponentProps {
    children: React.ReactNode;
    title?: string;
    setShowModal?: (show: boolean) => void;
    className?: string;
    contentClassName?: string;
    ClosingComponent?: React.ComponentType<any> | null;
    isOutSideClickAllowed?: boolean;
    showHeader?: boolean;
    bodyClassName?: string;
}

export const ModalComponent: React.FC<ModalComponentProps>;

export interface BlurComponentProps {
    children: React.ReactNode;
    className?: string;
    childClass?: string;
}

export const BlurComponent: React.FC<BlurComponentProps>;

export interface ButtonProps {
    title: string;
    onClick?: () => void;
    className?: string;
    dark?: boolean;
    href?: string;
}

export const Button: React.FC<ButtonProps>;

export interface GifLoaderProps {
    src?: string;
    gifUrl: string;
    gif_alt: string;
    height: number;
    width: number;
    className?: string;
    priority?: boolean;
    [key: string]: any;
}

export const GifLoader: React.FC<GifLoaderProps>;

export interface LoadingButtonProps {
    text?: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    className?: string;
    bgColor?: string;
    onClick?: () => void;
    loaderClassName?: string;
}

export const LoadingButton: React.FC<LoadingButtonProps>;

export interface CheckOutsideClickProps {
    onClickOutside: () => void;
    children: React.ReactNode;
}

export const CheckOutsideClick: React.FC<CheckOutsideClickProps>;

export interface ReadMoreCompProps {
    paragraphToShow: string;
    max_length: number;
    isDisable?: boolean;
}

export const ReadMoreComp: React.FC<ReadMoreCompProps>;

export interface AnimatedDrawerProps {
    children: React.ReactNode;
    isDrawerOpen: boolean;
    onClose: () => void;
    ParentComponent?: React.ComponentType<any>;
    className?: string;
    parentClassName?: string;
    closeBtnNeeded?: boolean;
}

export const AnimatedDrawer: React.FC<AnimatedDrawerProps>;

export interface PurpleSwitchProps {
    selectedState: number;
    handleChange: () => void;
    disabled?: boolean;
}

export const PurpleSwitch: React.FC<PurpleSwitchProps>;

export interface CustomNameImageProps {
    name: string;
    circle?: boolean;
    className?: string;
}

export const CustomNameImage: React.FC<CustomNameImageProps>;

export interface PasswordInputFieldProps {
    label?: string;
    name?: string;
    placeholder?: string;
    eleRef?: React.RefObject<HTMLInputElement> | null;
    inputContainerClassName?: string;
    isRequired?: boolean;
    [key: string]: any;
}

export const PasswordInputField: React.FC<PasswordInputFieldProps>;

export interface SkeletonProps {
    className?: string;
    h?: string;
    w?: string;
}

export const Skeleton: React.FC<SkeletonProps>;

export interface SeeMoreCompProps {
    text: string;
    seeMoreClick?: () => void;
}

export const SeeMoreComp: React.FC<SeeMoreCompProps>;

export interface FloatToTopProps {
    children: React.ReactNode;
    enabled?: boolean;
}

export const FloatToTop: React.FC<FloatToTopProps>;

export interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
    className?: string;
    containerClass?: string;
    containerClassName?: string;
    variant?: 'white' | 'black';
}

export const Loader: React.FC<LoaderProps>;

export interface SpinnerProps {
    size?: string;
    colorClass?: string;
}

export const Spinner: React.FC<SpinnerProps>;

export interface TypingAnimationDivProps {
    text: string;
    className?: string;
    speed?: number;
    startDelay?: number;
    cursor?: boolean;
    repeat?: number;
    deletionSpeed?: number;
    typingDelay?: number;
    sequence?: string[];
}

export const TypingAnimationDiv: React.FC<TypingAnimationDivProps>;

// ===============================
// UTILITY FUNCTIONS
// ===============================

export function cn(...inputs: any[]): string;

// ===============================
// HELPER FUNCTIONS
// ===============================

export function fromBase64ToFile(base64String: string, filename: string): File;

export function capitalizeFirstLetter(str: string): string;

export function click_chat_fun(phoneNumber?: string): void;

export function restructureData(allocated_limits: any, unallocated_limits: any): any[];

export function downloadExcel(filename: string, data: Record<string, any[]>): void;

export function downloadCSV(filename: string, array: any[]): void;

export function readExcelCSV(file: File, callback?: (data: any[]) => void): void;

export function get_remaining_days(date_to_differ: Date, date?: Date): number;

export function get_combined_location(location: { city?: string; state?: string; country?: string }): string;

export function filter_string(string_to_match: string, query: string): boolean;

export function underscoresNormalText(input: string): string;

export function formatCreditLimits(creditsTeam: any): any[];

export function createImg(name: string, bgColor?: string | null): string;

export function getInitials(name: string): string;

export function isBrowser(): boolean;

export function get_domain_name(url: string): string;

export function checkCreditSumLimits(ignored: any[], updatedRows: any[]): boolean;

export interface UserContextType {
    details?: any;
    isLoggedIn?: boolean;
    bannerData?: any;
}

export const UserContext: React.Context<UserContextType>;

export function useWindowSize(): { width: number | undefined; height: number | undefined };

export function formatPhoneNumbers(data: any): [string, string[]][];

export function formatEmails(data: any): [string, string[]][];

export function formatContactDetails(data: any): any;

export function getLockedUnlockProfiles(profiles?: any[], unlocked?: boolean): any[];

export function checkIfProfileLocked(person_data: any): boolean;

export function checkIfProfileUnLocked(person_data: any): boolean;

export function combineTeamAndInviteData(allocated_limits: any, unallocated_limits: any): any[];

export function get_formated_date(date: Date): string;

export function get_days_to_month_years(days: number): string;

export function getCookieValue(name: string): string;

export function get_formated_url(url: string): string;

export function updatePlural(count: number, text: string, postfix?: string): string;

export function getIP(request: any): string;

export function verify_and_decrypt_jwt(token: string, secret: string): any;

// ===============================
// REQUEST HANDLERS
// ===============================

export function request_caller(options: any): Promise<any>;

export function serverRequestHandler(options: any): Promise<any>;

// ===============================
// VALIDATION CONFIG
// ===============================

export function setValidationConfig(config: any): void;

export function getValidationSchema(key: string): any;

export function getAllValidationSchemas(): any;

export function isValidationConfigInitialized(): boolean;

export function resetValidationConfig(): void;

// ===============================
// LOGGER
// ===============================

export function withServerSideLogging<P extends object>(
    Component: React.ComponentType<P>
): React.ComponentType<P>;

export function withInitialPropsLogging<P extends object>(
    Component: React.ComponentType<P>
): React.ComponentType<P>;

declare class BaseApiHandler {
    static wrap(handler: any): any;
}
