'use client';

import { Button } from '@repo/ui/button';
import { toast } from '@repo/ui/toast';

export function ToastButtons() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        color="success"
        onClick={() => toast({ status: 'success', title: 'Success' })}>
        Success
      </Button>
      <Button type="button" color="info" onClick={() => toast({ status: 'info', title: 'Info' })}>
        Info
      </Button>
      <Button
        type="button"
        color="warning"
        onClick={() => toast({ status: 'warning', title: 'Warning' })}>
        Warning
      </Button>
      <Button
        type="button"
        color="danger"
        onClick={() => toast({ status: 'error', title: 'Error' })}>
        Error
      </Button>
    </div>
  );
}
