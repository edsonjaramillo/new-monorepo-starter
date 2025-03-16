import { createAuthPopupContext } from '@repo/context/auth-popup';
import { createMenuContext } from '@repo/context/menu';
import { createSessionContext } from '@repo/context/session';

export const useAuthPopup = createAuthPopupContext();
export const useAdminNavigationMenu = createMenuContext();
export const useSession = createSessionContext();
