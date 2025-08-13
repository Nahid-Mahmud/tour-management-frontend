export interface ISidebarItem {
  title: string;
  url: string;
  items?: {
    title: string;
    url: string;
    element: React.ReactNode;
  }[];
}
