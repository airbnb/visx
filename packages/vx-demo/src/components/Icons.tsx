export const ExpandChevron = ({ expand } = { expand: true }) => {
  return (
    <span className="tree-item__chevron">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width={16}
        height={16}
      >
        {expand ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        )}
      </svg>
    </span>
  );
};

export const ExpandFolder = ({ expand } = { expand: true }) => {
  if (expand) {
    return (
      <svg
        style={{ marginLeft: '.25rem' }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="var(--blue-darker)"
        fill="none"
        width={24}
        height={24}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
    );
  }
  return (
    <svg
      style={{ marginLeft: '.25rem' }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="var(--blue)"
      width={24}
      height={24}
    >
      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
    </svg>
  );
};

interface IconProps {
  children: React.ReactNode;
}
export const Icon = ({ children }: IconProps) => {
  return (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      width={24}
      height={24}
    >
      {children}
    </svg>
  );
};

export const IconBookmark = () => {
  return (
    <Icon>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      />
    </Icon>
  );
};

export const IconGallery = () => {
  return (
    <Icon>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
      />
    </Icon>
  );
};

export const IconClipboardList = () => {
  return (
    <Icon>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      />
    </Icon>
  );
};

export const IconJustice = () => {
  return (
    <Icon>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
      />
    </Icon>
  );
};

export const Label = ({ label }: { label: string }) => {
  return (
    <span className="ml-2 select-none font-normal">
      {label}
      <style jsx>{`
        .ml-2 {
          margin-left: 0.5rem;
          user-select: none;
          font-size: 300;
        }
      `}</style>
    </span>
  );
};
