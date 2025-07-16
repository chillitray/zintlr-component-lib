import * as React from 'react';

// ===============================
// TOAST COMPONENTS
// ===============================

interface ToastWrapperProps {
    position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
    expand?: boolean;
    richColors?: boolean;
    closeButton?: boolean;
    [key: string]: any;
}

declare const ToastWrapper: React.FC<ToastWrapperProps>;

declare const toast: {
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

interface ProfileWrapperCardProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

declare const ProfileWrapperCard: React.FC<ProfileWrapperCardProps>;

// ===============================
// UTILITY COMPONENTS
// ===============================

interface ImageComponentProps {
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

declare const ImageComponent: React.FC<ImageComponentProps>;

interface TabItem {
    name: string;
    value?: string | any;
    icon?: React.ComponentType<any> | React.ReactNode;
    iconClassName?: string;
}

interface TabComponentProps {
    tabList: TabItem[];
    activeTab: string | any;
    setActiveTab: (value: string | any) => void;
    fixedTabWidth?: boolean;
    className?: string;
    titleClassName?: string;
    containerClassName?: string;
    [key: string]: any;
}

declare const TabComponent: React.FC<TabComponentProps>;

interface NumberInputProps {
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

declare const NumberInput: React.FC<NumberInputProps>;

interface ModalComponentProps {
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

declare const ModalComponent: React.FC<ModalComponentProps>;

interface BlurComponentProps {
    children: React.ReactNode;
    className?: string;
    childClass?: string;
}

declare const BlurComponent: React.FC<BlurComponentProps>;

interface ButtonProps {
    title: string;
    onClick?: () => void;
    className?: string;
    dark?: boolean;
    href?: string;
}

declare const Button: React.FC<ButtonProps>;

interface GifLoaderProps {
    src?: string;
    gifUrl: string;
    gif_alt: string;
    height: number;
    width: number;
    className?: string;
    priority?: boolean;
    [key: string]: any;
}

declare const GifLoader: React.FC<GifLoaderProps>;

interface LoadingButtonProps {
    text?: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    className?: string;
    bgColor?: string;
    onClick?: () => void;
    loaderClassName?: string;
}

declare const LoadingButton: React.FC<LoadingButtonProps>;

interface CheckOutsideClickProps {
    onClickOutside: () => void;
    children: React.ReactNode;
}

declare const CheckOutsideClick: React.FC<CheckOutsideClickProps>;

interface ReadMoreCompProps {
    paragraphToShow: string;
    max_length: number;
    isDisable?: boolean;
}

declare const ReadMoreComp: React.FC<ReadMoreCompProps>;

interface AnimatedDrawerProps {
    children: React.ReactNode;
    isDrawerOpen: boolean;
    onClose: () => void;
    ParentComponent?: React.ComponentType<any>;
    className?: string;
    parentClassName?: string;
    closeBtnNeeded?: boolean;
}

declare const AnimatedDrawer: React.FC<AnimatedDrawerProps>;

interface PurpleSwitchProps {
    selectedState: number;
    handleChange: () => void;
    disabled?: boolean;
}

declare const PurpleSwitch: React.FC<PurpleSwitchProps>;

interface CustomNameImageProps {
    name: string;
    circle?: boolean;
    className?: string;
}

declare const CustomNameImage: React.FC<CustomNameImageProps>;

interface PasswordInputFieldProps {
    label?: string;
    name?: string;
    placeholder?: string;
    eleRef?: React.RefObject<HTMLInputElement> | null;
    inputContainerClassName?: string;
    isRequired?: boolean;
    [key: string]: any;
}

declare const PasswordInputField: React.FC<PasswordInputFieldProps>;

interface SkeletonProps {
    className?: string;
    h?: string;
    w?: string;
}

declare const Skeleton: React.FC<SkeletonProps>;

interface SeeMoreCompProps {
    text: string;
    seeMoreClick?: () => void;
}

declare const SeeMoreComp: React.FC<SeeMoreCompProps>;

interface FloatToTopProps {
    children: React.ReactNode;
    enabled?: boolean;
}

declare const FloatToTop: React.FC<FloatToTopProps>;

interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
    className?: string;
    containerClass?: string;
    containerClassName?: string;
    variant?: 'white' | 'black';
}

declare const Loader: React.FC<LoaderProps>;

interface SpinnerProps {
    size?: string;
    colorClass?: string;
}

declare const Spinner: React.FC<SpinnerProps>;

interface TypingAnimationDivProps {
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

declare const TypingAnimationDiv: React.FC<TypingAnimationDivProps>;

// ===============================
// UTILITY FUNCTIONS
// ===============================

declare function cn(...inputs: any[]): string;

// ===============================
// HELPER FUNCTIONS
// ===============================

declare function fromBase64ToFile(base64String: string, filename: string): File;

declare function capitalizeFirstLetter(str: string): string;

declare function click_chat_fun(phoneNumber?: string): void;

declare function restructureData(allocated_limits: any, unallocated_limits: any): any[];

declare function downloadExcel(filename: string, data: Record<string, any[]>): void;

declare function downloadCSV(filename: string, array: any[]): void;

declare function readExcelCSV(file: File, callback?: (data: any[]) => void): void;

declare function get_remaining_days(date_to_differ: Date, date?: Date): number;

declare function get_combined_location(location: {
    city?: string;
    state?: string;
    country?: string;
}): string;

declare function filter_string(string_to_match: string, query: string): boolean;

declare function underscoresNormalText(input: string): string;

declare function formatCreditLimits(creditsTeam: any): any[];

declare function createImg(name: string, bgColor?: string | null): string;

declare function getInitials(name: string): string;

declare function isBrowser(): boolean;

declare function get_domain_name(url: string): string;

declare function checkCreditSumLimits(ignored: any[], updatedRows: any[]): boolean;

interface UserContextType {
    details?: any;
    isLoggedIn?: boolean;
    bannerData?: any;
}

declare const UserContext: React.Context<UserContextType>;

declare function useWindowSize(): { width: number | undefined; height: number | undefined };

declare function formatPhoneNumbers(data: any): [string, string[]][];

declare function formatEmails(data: any): [string, string[]][];

declare function formatContactDetails(data: any): any;

declare function getLockedUnlockProfiles(profiles?: any[], unlocked?: boolean): any[];

declare function checkIfProfileLocked(person_data: any): boolean;

declare function checkIfProfileUnLocked(person_data: any): boolean;

declare function combineTeamAndInviteData(allocated_limits: any, unallocated_limits: any): any[];

declare function get_formated_date(date: Date): string;

declare function get_days_to_month_years(days: number): string;

declare function getCookieValue(name: string): string;

declare function get_formated_url(url: string): string;

declare function updatePlural(count: number, text: string, postfix?: string): string;

declare function getIP(request: any): string;

declare function verify_and_decrypt_jwt(token: string, secret: string): any;

// ===============================
// REQUEST HANDLERS
// ===============================

declare function request_caller(options: any): Promise<any>;

declare function serverRequestHandler(options: any): Promise<any>;

// ===============================
// VALIDATION CONFIG
// ===============================

declare function setValidationConfig(config: any): void;

declare function getValidationSchema(key: string): any;

declare function getAllValidationSchemas(): any;

declare function isValidationConfigInitialized(): boolean;

declare function resetValidationConfig(): void;

// ===============================
// LOGGER
// ===============================

declare function withServerSideLogging<P extends object>(
    Component: React.ComponentType<P>
): React.ComponentType<P>;

declare function withInitialPropsLogging<P extends object>(
    Component: React.ComponentType<P>
): React.ComponentType<P>;

export { AnimatedDrawer, type AnimatedDrawerProps, BlurComponent, type BlurComponentProps, Button, type ButtonProps, CheckOutsideClick, type CheckOutsideClickProps, CustomNameImage, type CustomNameImageProps, FloatToTop, type FloatToTopProps, GifLoader, type GifLoaderProps, ImageComponent, type ImageComponentProps, Loader, type LoaderProps, LoadingButton, type LoadingButtonProps, ModalComponent, type ModalComponentProps, NumberInput, type NumberInputProps, PasswordInputField, type PasswordInputFieldProps, ProfileWrapperCard, type ProfileWrapperCardProps, PurpleSwitch, type PurpleSwitchProps, ReadMoreComp, type ReadMoreCompProps, SeeMoreComp, type SeeMoreCompProps, Skeleton, type SkeletonProps, Spinner, type SpinnerProps, TabComponent, type TabComponentProps, type TabItem, ToastWrapper, type ToastWrapperProps, TypingAnimationDiv, type TypingAnimationDivProps, UserContext, type UserContextType, capitalizeFirstLetter, checkCreditSumLimits, checkIfProfileLocked, checkIfProfileUnLocked, click_chat_fun, cn, combineTeamAndInviteData, createImg, downloadCSV, downloadExcel, filter_string, formatContactDetails, formatCreditLimits, formatEmails, formatPhoneNumbers, fromBase64ToFile, getAllValidationSchemas, getCookieValue, getIP, getInitials, getLockedUnlockProfiles, getValidationSchema, get_combined_location, get_days_to_month_years, get_domain_name, get_formated_date, get_formated_url, get_remaining_days, isBrowser, isValidationConfigInitialized, readExcelCSV, request_caller, resetValidationConfig, restructureData, serverRequestHandler, setValidationConfig, toast, underscoresNormalText, updatePlural, useWindowSize, verify_and_decrypt_jwt, withInitialPropsLogging, withServerSideLogging };
