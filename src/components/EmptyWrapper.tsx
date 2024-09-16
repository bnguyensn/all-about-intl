import { ReactNode } from 'react';
import './EmptyWrapper.css';

export interface EmptyWrapperProps {
  children?: ReactNode;
}

export function EmptyWrapper({ children }: EmptyWrapperProps) {
  return <div className="empty-wrapper-container">{children}</div>;
}
