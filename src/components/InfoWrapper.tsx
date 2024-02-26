import { ReactNode, useState } from 'react';
import clsx from 'clsx';
import './InfoWrapper.css';

export interface InfoWrapperProps {
  info: ReactNode | string;
  children: ReactNode;
}

export function InfoWrapper({ info, children }: InfoWrapperProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="info-wrapper-container">
      <div className="info-wrapper-visible-container">
        <div>{children}</div>
        <div
          className={clsx('info-question-mark', expanded && 'expanded')}
          role="button"
          tabIndex={0}
          title={expanded ? 'Hide info' : 'Show info'}
          onClick={handleExpand}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleExpand();
            }
          }}
        >
          ?
        </div>
      </div>
      <div
        className={clsx('info-wrapper-hidden-container', !expanded && 'hidden')}
      >
        {info}
      </div>
    </div>
  );
}
