import type { SignInResponse } from '@repo/http/response/auth';
import type * as v from 'valibot';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { $api } from '@repo/http/fetcher';
import { Button } from '@repo/ui/button';
import { Form } from '@repo/ui/form';
import { Input, InputError, InputGroup } from '@repo/ui/input';
import { Label } from '@repo/ui/text';
import { toast } from '@repo/ui/toast';
import { signInSchema } from '@repo/validation/auth';
import { useNavigate } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { useSession } from '../../admin.context';

type SignInFormData = v.InferOutput<typeof signInSchema>;

export function SignInForm() {
  const form = useForm({ resolver: standardSchemaResolver(signInSchema) });
  const { formState } = form;
  const { setSession } = useSession();
  const navigate = useNavigate();

  async function onSubmit(formData: SignInFormData) {
    const response = await $api.post<SignInResponse>('/auth/sign-in', formData);

    if (response.status === 'error') {
      toast({ status: 'error', title: response.message });
      return;
    }

    toast({ status: 'success', title: 'Signed in successfully' });
    navigate({ to: '/' });

    setSession(response.payload);
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
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </Form>
    </FormProvider>
  );
}
