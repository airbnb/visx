import React from 'react';
import Link from 'next/link';

type NavItemProps = {
  href: string;
  className?: string;
  external?: boolean;
  children: React.ReactNode;
};

export default ({ href, children, className, external }: NavItemProps) => (
  <li className="Item">
    {external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    ) : (
      <Link href={href}>
        <a className={className}>{children}</a>
      </Link>
    )}

    <style jsx>{`
      .Item a {
        display: inline-block;
        padding: 10px;
        text-decoration: none;
        color: #fc2e1c;
        font-weight: 600;
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
