import type { ReactNode } from 'react';

type CardProps = {
  title: string;
  children: ReactNode;
};

export function Card({ title, children }: CardProps) {
  return (
    <div className="bg-primary-light rounded shadow flex flex-col gap-2 p-2">
      <span className="text-primary">{title}</span>
      {children}
      <span className="text-primary-dark">description</span>
    </div>
  );
}
