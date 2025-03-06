import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { FormProvider, useForm } from 'react-hook-form';
import type * as v from 'valibot';

import { $api } from '@repo/http/fetcher';
import type { SignInResponse } from '@repo/http/response/auth';
import { Button } from '@repo/ui/button';
import { Form } from '@repo/ui/form';
import { Input, InputError, InputGroup } from '@repo/ui/input';
import { Label } from '@repo/ui/text';
import { signInSchema } from '@repo/validation/auth';

import { useSession } from '../../web.context';

type SignInFormData = v.InferOutput<typeof signInSchema>;

export function SignInForm() {
  const form = useForm({ resolver: standardSchemaResolver(signInSchema) });
  const { formState } = form;
  const { setSession } = useSession();

  async function onSubmit(formData: SignInFormData) {
    const response = await $api.post<SignInResponse>('/auth/sign-in', formData);

    if (response.status === 'error') {
      return;
    }

    setSession(response.data.session);
  }

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
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
            autoComplete="current-password"
            required
          />
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
