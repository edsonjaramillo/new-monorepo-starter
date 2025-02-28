'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import type * as v from 'valibot';

import { Button } from '@repo/ui/button';
import { Form } from '@repo/ui/form';
import { Input, InputError, InputGroup } from '@repo/ui/input';
import { Label } from '@repo/ui/text';
import { toast } from '@repo/ui/toast';
import { signupSchema } from '@repo/validation/auth';

import { $apiClientSide } from '../../app/web.connections';

type SignUpFormData = v.InferOutput<typeof signupSchema>;

export function SignUpForm() {
  const form = useForm({ resolver: standardSchemaResolver(signupSchema) });
  const { formState } = form;
  const router = useRouter();

  async function onSubmit(data: SignUpFormData) {
    const response = await $apiClientSide.post('/auth/sign-up', data);

    if (response.status === 'error') {
      toast({ status: 'error', title: 'Something went wrong.' });
      return;
    }

    if (response.status === 'info') {
      toast({ status: 'info', title: response.message });
      router.push('/auth/sign-in');
      return;
    }

    toast({ status: response.status, title: response.message });
    form.reset();
    router.push('/');
  }

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <InputGroup>
          <Label htmlFor="name">Name</Label>
          <Input field="name" placeholder="John Doe" type="text" required />
          <InputError field="name" />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input field="email" placeholder="john.doe@example.com" type="email" required />
          <InputError field="email" />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input field="password" placeholder="Password" type="password" required />
          <InputError field="password" />
        </InputGroup>
        <Button
          type="submit"
          color="primary"
          className="ml-auto block"
          disabled={formState.isSubmitting}>
          {formState.isSubmitting ? 'Signing up...' : 'Sign Up'}
        </Button>
      </Form>
    </FormProvider>
  );
}
