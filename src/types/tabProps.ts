export interface TabProps {
    openTab: number;
    onTabChange?: (tabIndex: number) => void;
    tabs?: string[];
}
