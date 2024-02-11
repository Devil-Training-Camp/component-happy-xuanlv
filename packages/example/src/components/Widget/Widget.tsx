/* eslint-disable react/prop-types */
import React from 'react';
import clsx from 'clsx';

export function Widget({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        className,
        'mb-3 flex items-center gap-1.5 [&_>_:first-child]:min-w-[100px] [&_>_:first-child]:text-right',
      )}
      {...props}
    />
  );
}

export function PreviewBox({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(className, '[&_h4]:text-md pb-6 [&_h1]:mb-2 [&_h1]:text-lg [&_h4]:mb-3')}
      {...props}
    />
  );
}

export function PerformanceBox({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(className, 'mb-5 flex flex-wrap gap-2')} {...props} />;
}

export function Paragraph({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(className, 'my-3')} {...props} />;
}

export function SectionBox({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(className, 'mb-3 rounded border border-slate-200 p-4 last:mb-0')}
      {...props}
    />
  );
}

export function ButtonList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(className, 'mb-3 flex flex-wrap items-center gap-2.5')} {...props} />;
}
