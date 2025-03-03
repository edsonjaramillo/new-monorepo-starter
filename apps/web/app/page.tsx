import Link from 'next/link';

import { Button } from '@repo/ui/button';
import { H1, H2, H3, H4, Label, Paragraph, Span } from '@repo/ui/text';

export default function Page() {
  return (
    <div className="mx-auto flex w-responsive flex-col gap-12 py-8">
      <Link href="/auth/sign-up">Sign Up</Link>
      <Link href="/auth/sign-in">Sign In</Link>
      <div className="flex flex-col gap-2">
        <H1>Header 1</H1>
        <H2>Header 2</H2>
        <H3>Header 3</H3>
        <H4>Header 4</H4>
        <Span>Span</Span>
        <Label>Label</Label>
        <Paragraph>Paragraph</Paragraph>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="button" color="primary">
          Primary
        </Button>
        <Button type="button" color="secondary">
          Secondary
        </Button>
        <Button type="button" color="success">
          Success
        </Button>
        <Button type="button" color="info">
          Info
        </Button>
        <Button type="button" color="danger">
          Danger
        </Button>
        <Button type="button" color="warning">
          Warning
        </Button>
        <Button type="button" color="neutral">
          Neutral
        </Button>
        <Button type="button" disabled>
          Disabled
        </Button>
      </div>
    </div>
  );
}
