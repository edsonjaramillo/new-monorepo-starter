'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { redirect } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import type * as v from 'valibot';

import { Button } from '@repo/ui/button';
import { Form } from '@repo/ui/form';
import { Input, InputError, InputGroup } from '@repo/ui/input';
import { Label } from '@repo/ui/text';
import { toast } from '@repo/ui/toast';
import { signUpSchema } from '@repo/validation/auth';

import { signUpAction } from '../../actions/sign-up.actions';

type SignUpFormData = v.InferOutput<typeof signUpSchema>;

export function SignUpForm() {
  const form = useForm({ resolver: standardSchemaResolver(signUpSchema) });
  const { formState } = form;

  async function onSubmit(formData: SignUpFormData) {
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));

    const response = await signUpAction(fd);

    if (response.status === 'error') {
      toast({ status: response.status, title: response.message });
      return;
    }

    // handles if user already exists
    if (response.status === 'redirect') {
      toast({ status: 'info', title: response.message });
      redirect(response.data.path);
    }

    toast({ status: 'success', title: response.message });
    redirect('/');
  }

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <InputGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            field="name"
            placeholder="John Doe"
            autoComplete="name"
            required
          />
          <InputError field="name" />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            field="email"
            placeholder="john.doe@example.com"
            autoComplete="email"
            required
          />
          <InputError field="email" />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            field="password"
            placeholder="Password"
            autoComplete="new-password"
            required
          />
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
