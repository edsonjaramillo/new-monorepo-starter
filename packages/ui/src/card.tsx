import { type ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
};

export function Card({ title, children }: CardProps) {
  return (
    <div className="flex flex-col gap-2 p-2 rounded shadow">
      <span className="text-success-default">{title}</span>
      {children}
    </div>
  );
}
