'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { redirect } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import type * as v from 'valibot';

import { Button } from '@repo/ui/button';
import { Form } from '@repo/ui/form';
import { Input, InputError, InputGroup } from '@repo/ui/input';
import { Label } from '@repo/ui/text';
import { signInSchema } from '@repo/validation/auth';

import { signInAction } from '../../actions/sign-in.actions';
import { useSession } from '../../app/context/web.context';

type SignInFormData = v.InferOutput<typeof signInSchema>;

export function SignInForm() {
  const form = useForm({ resolver: standardSchemaResolver(signInSchema) });
  const { formState } = form;
  const { signIn } = useSession();

  async function onSubmit(formData: SignInFormData) {
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
    const response = await signInAction(fd);

    if (response.status === 'error') {
      return;
    }

    signIn(response.data.session);

    redirect('/');
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
          {formState.isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </Form>
    </FormProvider>
  );
}
