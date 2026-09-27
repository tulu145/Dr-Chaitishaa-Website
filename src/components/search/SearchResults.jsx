/**
 * SearchResults — inline search results used on the 404 page.
 * Accepts a query string, filters the search index locally, and renders
 * grouped results as clickable links.
 *
 * Props:
 *   query   string   search query (controlled by parent)
 */
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetSearchIndexQuery } from '@/redux/api/endpoints/catalog.js';
import useDebouncedValue from '@/hooks/useDebouncedValue.js';
import { filterIndex } from '@/utils/search.js';
import { openBookingModal } from '@/redux/slices/uiSlice.js';
import { Analytics } from '@/services/analytics.js';

const TYPE_BADGE = {
  page: 'Page',
  service: 'Service',
  consultation: 'Consultation',
  faq: 'FAQ',
};

const BADGE_STYLES = {
  page: 'bg-alt-surface text-muted-text',
  service: 'bg-accent-text/10 text-accent-text',
  consultation: 'bg-brand-btn-bg/10 text-brand-btn-bg dark:text-brand-btn-text',
  faq: 'bg-rose-text/10 text-rose-text',
};

export default function SearchResults({ query }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const debouncedQuery = useDebouncedValue(query, 300);
  const { data: index = [] } = useGetSearchIndexQuery();

  const results = filterIndex(index, debouncedQuery, 10);

  function handleClick(item) {
    Analytics.searchSelect(item.id, item.type);
    if (item.type === 'consultation') {
      const typeParam = new URL(item.href, window.location.origin).searchParams.get('type');
      dispatch(openBookingModal(typeParam));
    } else {
      navigate(item.href);
    }
  }

  if (!debouncedQuery) return null;

  return (
    <div aria-live="polite" aria-label={`${results.length} search results`}>
      {results.length === 0 ? (
        <p className="text-sm text-muted-text mt-4">
          No results found for &ldquo;{debouncedQuery}&rdquo;. Try a different term.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-line rounded-xl border border-line overflow-hidden">
          {results.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleClick(item)}
                className="w-full text-left px-4 py-3 hover:bg-alt-surface transition-colors focus-visible:outline-2 focus-visible:outline-accent-text focus-visible:outline-offset-2"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-text">{item.title}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${BADGE_STYLES[item.type] ?? BADGE_STYLES.page}`}
                  >
                    {TYPE_BADGE[item.type] ?? item.type}
                  </span>
                </div>
                {item.excerpt && (
                  <p className="text-xs text-muted-text mt-0.5 line-clamp-1">{item.excerpt}</p>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
