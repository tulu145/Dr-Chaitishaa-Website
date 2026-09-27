import { api } from '../api.js';
import { servicesCatalog } from '@/data/services.js';
import { faqs } from '@/data/faqs.js';
import { pressCoverage } from '@/data/press.js';
import { buildSearchIndex } from '@/utils/search.js';

/**
 * Catalog endpoints — all read-only, backed by local data files.
 * Real-backend swap: replace each queryFn with query() pointing to a REST endpoint.
 *
 * Endpoints:
 *   getServices()     -> ServiceCatalog
 *   getFaqs()         -> FaqList
 *   getPress()        -> PressList
 *   getSearchIndex()  -> SearchIndexItem[]
 */
export const catalogApi = api.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query({
      queryFn: () => ({ data: servicesCatalog }),
      providesTags: ['Catalog'],
    }),

    getFaqs: build.query({
      queryFn: () => ({ data: faqs }),
      providesTags: ['Faqs'],
    }),

    getPress: build.query({
      queryFn: () => ({ data: pressCoverage }),
      providesTags: ['Catalog'],
    }),

    getSearchIndex: build.query({
      queryFn: () => ({ data: buildSearchIndex() }),
      providesTags: ['Catalog', 'Faqs'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetServicesQuery,
  useGetFaqsQuery,
  useGetPressQuery,
  useGetSearchIndexQuery,
} = catalogApi;
