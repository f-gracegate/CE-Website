/**
 * Prayer wall store.
 *
 * Kept in memory, as in the original Express server: requests persist while
 * the server process is running and reset on restart or redeploy. Swap this
 * module for a database (e.g. Supabase or Firestore) to keep them permanently.
 */
export interface PrayerRequest {
  id: string;
  author: string;
  request: string;
  category: 'Healing' | 'Guidance' | 'Family' | 'Faith' | 'Other';
  createdAt: string;
  prayingCount: number;
}

const initialPrayers: PrayerRequest[] = [
  {
    id: 'prayer-1',
    author: 'Sister Margaret',
    request: 'Pray for our upcoming youth conference in South London, that many teens find their calling and community.',
    category: 'Faith',
    createdAt: 'Just now',
    prayingCount: 24,
  },
  {
    id: 'prayer-2',
    author: 'David K.',
    request: 'Requesting healing prayers for my father who is undergoing cardiac surgery this Friday morning.',
    category: 'Healing',
    createdAt: '2 hours ago',
    prayingCount: 42,
  },
  {
    id: 'prayer-3',
    author: 'The Thompson Family',
    request: 'Guidance as we relocate our family next month. Asking for doors to open for local fellowship and schooling.',
    category: 'Guidance',
    createdAt: '5 hours ago',
    prayingCount: 12,
  },
  {
    id: 'prayer-4',
    author: 'Hannah B.',
    request: 'Restore peace in my family relationship with my younger brother, that reconciliation and love prevail.',
    category: 'Family',
    createdAt: '1 day ago',
    prayingCount: 19,
  },
];

// Survive hot reloads in development by keeping the array on globalThis.
const g = globalThis as unknown as { __prayers?: PrayerRequest[] };
export const prayers: PrayerRequest[] = (g.__prayers ??= [...initialPrayers]);

export const CATEGORIES: PrayerRequest['category'][] = ['Healing', 'Guidance', 'Family', 'Faith', 'Other'];
