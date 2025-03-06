import { createAuthPopupContext } from '@repo/context/auth-popup';
import { createSessionContext } from '@repo/context/session';

export const useAuthPopup = createAuthPopupContext();
export const useSession = createSessionContext();
