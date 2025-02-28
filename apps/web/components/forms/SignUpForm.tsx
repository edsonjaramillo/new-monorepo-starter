'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { FormProvider, useForm } from 'react-hook-form';
import type * as v from 'valibot';

import { Button } from '@repo/ui/button';
import { Form } from '@repo/ui/form';
import { Input, InputError, InputGroup } from '@repo/ui/input';
import { Label } from '@repo/ui/text';
import { toast } from '@repo/ui/toast';
import { signupSchema } from '@repo/validation/auth';

import { signUpAction } from '../../app/actions/auth.actions';

type SignUpFormData = v.InferOutput<typeof signupSchema>;

export function SignUpForm() {
  const methods = useForm({
    resolver: standardSchemaResolver(signupSchema),
  });
  const { formState, handleSubmit } = methods;
  const { isSubmitting } = formState;

  async function onSubmit(data: SignUpFormData) {
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));
    const { status, message } = await signUpAction(formData);
    toast({ status, title: message });
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit" color="primary" className="ml-auto block" disabled={isSubmitting}>
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </Button>
      </Form>
    </FormProvider>
  );
}
