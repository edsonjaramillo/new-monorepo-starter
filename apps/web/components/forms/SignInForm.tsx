'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import type * as v from 'valibot';

import type { SignUpResponse } from '@repo/http/response/auth';
import { Button } from '@repo/ui/button';
import { Form } from '@repo/ui/form';
import { Input, InputError, InputGroup } from '@repo/ui/input';
import { Label } from '@repo/ui/text';
import { toast } from '@repo/ui/toast';
import { signInSchema } from '@repo/validation/auth';

import { $apiClientSide } from '../../app/web.connections';

type SignInFormData = v.InferOutput<typeof signInSchema>;

export function SignInForm() {
  const form = useForm({ resolver: standardSchemaResolver(signInSchema) });
  const { formState } = form;
  const router = useRouter();

  async function onSubmit(formData: SignInFormData) {
    const response = await $apiClientSide.post<SignUpResponse>('/auth/sign-in', formData);

    if (response.status === 'error') {
      toast({ status: response.status, title: response.message });
      return;
    }

    if (response.status === 'redirect') {
      toast({ status: 'info', title: response.message });
      router.push(response.data.path);
      return;
    }

    toast({ status: 'success', title: response.message });
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
