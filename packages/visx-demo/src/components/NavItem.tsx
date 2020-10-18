import React from 'react';
import Link from 'next/link';

type NavItemProps = {
  href: string;
  id?: string;
  className?: string;
  external?: boolean;
  children: React.ReactNode;
};

const NavItem = ({ id, href, children, className, external }: NavItemProps) => (
  <li className="Item">
    {external ? (
      <a id={id} href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    ) : (
      <Link href={href}>
        <a id={id} className={className}>
          {children}
        </a>
      </Link>
    )}

    <style jsx>{`
      .Item a {
        display: inline-block;
        padding: 10px;
        text-decoration: none;
        color: #272727;
        font-weight: 400;
        font-size: 18px;
      }
      .Item .github {
        font-weight: 600;
        color: #fc2e1c;
      }

      @media (max-width: 600px) {
        .Item {
          display: block;
          float: left;
        }

        .Item .github {
          margin-top: 0;
        }
      }
    `}</style>
  </li>
);
export default NavItem;
