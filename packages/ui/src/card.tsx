import { type ReactNode } from 'react';

type CardProps = {
  title: string;
  children: ReactNode;
};

export function Card({ title, children }: CardProps) {
  return (
    <div className="bg-primary-light flex flex-col gap-2 rounded p-2 shadow">
      <span className="text-primary">{title}</span>
      {children}
      <span className="text-primary-dark">description</span>
    </div>
  );
}
