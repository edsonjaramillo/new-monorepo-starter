import { Button } from '@repo/ui/button';

export default function Page() {
  return (
    <div className="w-responsive mx-auto flex gap-2">
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
  );
}
