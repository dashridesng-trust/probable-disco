import React, { createContext, useContext, useEffect } from 'react';
import { useAuth, useUser, useClerk } from '@clerk/clerk-react';
import type { AuthProvider } from '@refinedev/core';
import { setAuthTokenGetter } from '../api/client';

export interface ClerkAuthContextType {
  isAdmin: boolean;
  isLoading: boolean;
}

const ClerkAuthContext = createContext<ClerkAuthContextType>({
  isAdmin: false,
  isLoading: true,
});

export const RouticClerkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    setAuthTokenGetter(async () => {
      if (!isSignedIn) return null;
      return getToken();
    });
  }, [getToken, isSignedIn]);

  const role = user?.publicMetadata?.['role'] as string | undefined;
  const isAdmin = isSignedIn && (role === 'ADMIN' || role === 'admin');

  return (
    <ClerkAuthContext.Provider value={{ isAdmin: !!isAdmin, isLoading: !isLoaded }}>
      {children}
    </ClerkAuthContext.Provider>
  );
};

export const useRouticAuth = () => useContext(ClerkAuthContext);

export const createClerkAuthProvider = (
  clerk: ReturnType<typeof useClerk>,
  user: ReturnType<typeof useUser>['user'],
  _getToken: ReturnType<typeof useAuth>['getToken'],
  isSignedIn: boolean | undefined,
): AuthProvider => {
  return {
    login: async () => {
      clerk.openSignIn();
      return { success: true };
    },
    logout: async () => {
      await clerk.signOut();
      return { success: true, redirectTo: '/login' };
    },
    check: async () => {
      if (!isSignedIn) {
        return {
          authenticated: false,
          redirectTo: '/login',
          logout: true,
        };
      }

      // Check for Admin role in Clerk public metadata
      const role = user?.publicMetadata?.['role'] as string | undefined;
      const isAdmin = role === 'ADMIN' || role === 'admin';

      if (!isAdmin) {
        return {
          authenticated: false,
          redirectTo: '/unauthorized',
          logout: false,
          error: {
            name: 'Unauthorized',
            message: 'Your Clerk account has not been approved as an Administrator.',
          },
        };
      }

      return {
        authenticated: true,
      };
    },
    onError: async (error) => {
      if (error?.status === 401 || error?.statusCode === 401) {
        return {
          logout: true,
          redirectTo: '/login',
        };
      }
      if (error?.status === 403 || error?.statusCode === 403) {
        return {
          logout: false,
          redirectTo: '/unauthorized',
        };
      }
      return { error };
    },
    getPermissions: async () => {
      const role = user?.publicMetadata?.['role'] as string | undefined;
      return role ? [role] : [];
    },
    getIdentity: async () => {
      if (!user) return null;
      return {
        id: user.id,
        name: user.fullName || user.firstName || 'Admin User',
        email: user.primaryEmailAddress?.emailAddress,
        avatar: user.imageUrl,
      };
    },
  };
};
