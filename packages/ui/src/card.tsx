import { type ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
};

export function Card({ title, children }: CardProps) {
  return (
    <div className="flex flex-col gap p-2 border">
      <span>{title}</span>
      {children}
    </div>
  );
}
