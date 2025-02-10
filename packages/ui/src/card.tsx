import { type ReactNode } from 'react';

type CardProps = {
  title: string;
  children: ReactNode;
};

export function Card({ title, children }: CardProps) {
  return (
    <div className="flex w-1.5 flex-col gap-2 rounded p-2 shadow">
      <span className="text-success">{title}</span>
      {children}
    </div>
  );
}
