export interface TabProps {
    openTab: number;
    onTabChange?: (tabIndex: number, tabLabel: string) => void;
    tabs?: string[];
}
