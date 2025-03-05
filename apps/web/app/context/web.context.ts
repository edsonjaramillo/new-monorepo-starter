import { createAuthPopupContext } from '@repo/context/auth-popup';
import { createSessionContext } from '@repo/context/session';

export const useSession = createSessionContext();
export const useAuthPopup = createAuthPopupContext();
