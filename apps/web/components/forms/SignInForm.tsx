'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import type * as v from 'valibot';

import type { SignInResponse } from '@repo/http/response/auth';
import { Button } from '@repo/ui/button';
import { Form } from '@repo/ui/form';
import { Input, InputError, InputGroup } from '@repo/ui/input';
import { Label } from '@repo/ui/text';
import { toast } from '@repo/ui/toast';
import { signInSchema } from '@repo/validation/auth';

import { useSession } from '../../app/context/web.context';
import { $apiClientSide } from '../../app/web.connections';

type SignInFormData = v.InferOutput<typeof signInSchema>;

export function SignInForm() {
  const form = useForm({ resolver: standardSchemaResolver(signInSchema) });
  const { formState } = form;
  const router = useRouter();
  const { signIn } = useSession();

  async function onSubmit(formData: SignInFormData) {
    const response = await $apiClientSide.post<SignInResponse>('/auth/sign-in', formData);

    if (response.status === 'error') {
      toast({ status: response.status, title: response.message });
      return;
    }

    form.reset();
    router.push('/');
    signIn(response.data);

    toast({ status: 'success', title: response.message });
  }

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
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
