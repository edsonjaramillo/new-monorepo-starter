import { Button } from '@repo/ui/button';
import { Form } from '@repo/ui/form';
import { Input, InputGroup } from '@repo/ui/input';
import { Label } from '@repo/ui/text';

export default function SignUpPage() {
  return (
    <div className="mx-auto w-responsive border py-8">
      <Form>
        <InputGroup>
          <Label htmlFor="name">Name</Label>
          <Input placeholder="Name" type="text" required />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input placeholder="Email" type="email" required />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input placeholder="Password" type="password" required />
        </InputGroup>
        <Button type="submit" color="primary" className="ml-auto block">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}
