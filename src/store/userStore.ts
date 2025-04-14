
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SocialConnection {
  platform: 'twitter' | 'linkedin' | 'facebook';
  connected: boolean;
  username?: string;
  profileImage?: string;
  lastTokenRefresh?: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  defaultPlatforms: ('twitter' | 'linkedin' | 'facebook')[];
  notificationsEnabled: boolean;
  timeZone: string;
}

interface UserState {
  isAuthenticated: boolean;
  user: {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
  };
  connections: SocialConnection[];
  preferences: UserPreferences;
  
  setUser: (user: UserState['user']) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  updateConnection: (connection: Partial<SocialConnection> & { platform: SocialConnection['platform'] }) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: {},
      connections: [
        { platform: 'twitter', connected: false },
        { platform: 'linkedin', connected: false },
        { platform: 'facebook', connected: false },
      ],
      preferences: {
        theme: 'system',
        defaultPlatforms: ['twitter', 'linkedin', 'facebook'],
        notificationsEnabled: true,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      
      setUser: (user) => set({ user }),
      
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      
      updateConnection: (connection) => set((state) => ({
        connections: state.connections.map((c) =>
          c.platform === connection.platform ? { ...c, ...connection } : c
        ),
      })),
      
      updatePreferences: (preferences) => set((state) => ({
        preferences: { ...state.preferences, ...preferences },
      })),
      
      logout: () => set({
        isAuthenticated: false,
        user: {},
      }),
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;
