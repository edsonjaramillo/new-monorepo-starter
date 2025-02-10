import { Card } from "@repo/ui/card";

export default function Page() {
  return (
    <div className="grid grid-cols-4 gap-2 w-responsive mx-auto ">
      {Array.from({ length: 10 }).map((_, index) => (
        <Card key={index} title={`Card ${index + 1}`}>
          <p>Card content</p>
        </Card>
      ))}
    </div>
  );
}
