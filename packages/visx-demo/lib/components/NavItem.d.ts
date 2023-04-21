import React from 'react';
declare type NavItemProps = {
    href: string;
    id?: string;
    className?: string;
    external?: boolean;
    children: React.ReactNode;
};
declare function NavItem({ id, href, children, className, external }: NavItemProps): JSX.Element;
export default NavItem;
