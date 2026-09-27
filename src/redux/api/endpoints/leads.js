import { api } from '../api.js';

/**
 * Leads endpoint — handles consultation form submission.
 *
 * submitLead(payload) fires the Google Apps Script webhook + email notification
 * via leadService.js. The queryFn delegates to leadService so this layer stays
 * thin and swappable.
 *
 * Result shape:
 *   { leadId, sent: { sheet: 'ok'|'failed'|'skipped', email: 'ok'|'failed'|'skipped' } }
 *
 * Real-backend swap: replace queryFn with a mutation() pointing to a REST endpoint.
 */
export const leadsApi = api.injectEndpoints({
  endpoints: (build) => ({
    submitLead: build.mutation({
      // eslint-disable-next-line no-unused-vars
      queryFn: async (payload, _queryApi, _extraOptions) => {
        try {
          // Lazy-import to avoid circular dependencies at module load time
          const { commitLead } = await import('@/services/leadService.js');
          const result = await commitLead(payload);
          return { data: result };
        } catch (err) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: err?.message ?? 'Lead submission failed',
            },
          };
        }
      },
      invalidatesTags: ['Leads'],
    }),
  }),
  overrideExisting: false,
});

export const { useSubmitLeadMutation } = leadsApi;
