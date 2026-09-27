import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * RTK Query base API.
 *
 * Uses fakeBaseQuery() so every endpoint uses `queryFn` — a real backend
 * swap changes ONLY the endpoint file: replace fakeBaseQuery() with
 * fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }) and convert
 * each queryFn to query()/mutation().
 *
 * tagTypes drive cache invalidation:
 *   Catalog  — services and press data (long-lived)
 *   Faqs     — FAQ list
 *   Leads    — lead submissions (mutated by submitLead)
 */
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Catalog', 'Faqs', 'Leads'],
  keepUnusedDataFor: 3600, // 1 hour for catalog data
  endpoints: () => ({}),
});
