import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { FormProvider, useForm } from 'react-hook-form';
import type * as v from 'valibot';

import { $api } from '@repo/http/fetcher';
import type { SignUpResponse } from '@repo/http/response/auth';
import { Button } from '@repo/ui/button';
import { Form } from '@repo/ui/form';
import { Input, InputColumns, InputError, InputGroup } from '@repo/ui/input';
import { Label } from '@repo/ui/text';
import { toast } from '@repo/ui/toast';
import { signUpSchema } from '@repo/validation/auth';

type SignUpFormData = v.InferOutput<typeof signUpSchema>;

async function onSubmit(formData: SignUpFormData) {
  const response = await $api.post<SignUpResponse>('/auth/sign-up', formData);

  if (response.status === 'error') {
    toast({ status: response.status, title: response.message });
    return;
  }

  // handles if user already exists
  if (response.status === 'redirect') {
    toast({ status: 'info', title: response.message });
  }

  toast({ status: 'success', title: response.message });
}

export function SignUpForm() {
  const form = useForm({ resolver: standardSchemaResolver(signUpSchema) });
  const { formState } = form;

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <InputColumns>
          <InputGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              field="firstName"
              placeholder="John"
              autoComplete="given-name"
              required
            />
            <InputError field="firstName" />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              field="lastName"
              placeholder="Doe"
              autoComplete="family-name"
              required
            />
            <InputError field="lastName" />
          </InputGroup>
        </InputColumns>
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
