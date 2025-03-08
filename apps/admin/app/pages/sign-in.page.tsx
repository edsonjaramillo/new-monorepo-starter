import { useNavigate } from '@tanstack/react-router';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

import { toast } from '@repo/ui/toast';

import { SignInForm } from '../components/forms/sign-in.form';

export function SignInPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const hasSession = Cookies.get('auto-sign-in');
    if (hasSession) {
      toast({ status: 'info', title: 'Already signed in.' });
      navigate({ to: '/' });
    }
  }, [navigate]);

  return <SignInForm />;
}
