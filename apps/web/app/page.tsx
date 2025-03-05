import { H1, H2, H3, H4, Label, Paragraph, Span } from '@repo/ui/text';

import { ToastButtons } from '../components/design/ToastButtons';

export default function Page() {
  return (
    <div className="mx-auto flex w-responsive flex-col gap-12 py-8">
      <div className="flex flex-col gap-2">
        <H1>Header 1</H1>
        <H2>Header 2</H2>
        <H3>Header 3</H3>
        <H4>Header 4</H4>
        <Span>Span</Span>
        <Label>Label</Label>
        <Paragraph>Paragraph</Paragraph>
      </div>
      <ToastButtons />
    </div>
  );
}
