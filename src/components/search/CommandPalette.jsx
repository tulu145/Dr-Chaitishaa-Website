import { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import {
  closeSearch,
  setSearchQuery,
  selectSearchOpen,
  selectSearchQuery,
  openBookingModal,
} from '@/redux/slices/uiSlice.js';
import { useGetSearchIndexQuery } from '@/redux/api/endpoints/catalog.js';
import useDebouncedValue from '@/hooks/useDebouncedValue.js';
import useHotkey from '@/hooks/useHotkey.js';
import { filterIndex, groupResults } from '@/utils/search.js';
import { Analytics } from '@/services/analytics.js';

const GROUP_LABELS = {
  pages: 'Pages',
  consultations: 'Book a Consultation',
  services: 'Services',
  faqs: 'Frequently Asked Questions',
};

export default function CommandPalette() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = useSelector(selectSearchOpen);
  const query = useSelector(selectSearchQuery);
  const debouncedQuery = useDebouncedValue(query, 300);
  const inputRef = useRef(null);

  const { data: index = [] } = useGetSearchIndexQuery();

  // Ctrl/Cmd+K opens; Escape closes (handled by cmdk internally too)
  const handleOpen = useCallback(() => {
    if (!open) {
      dispatch(setSearchQuery(''));
      Analytics.searchOpen();
    }
    // Toggle: if already open, close
    if (open) dispatch(closeSearch());
    else {
      // openSearch is handled by the parent (Header button or hotkey)
      // Here we just ensure closing works
    }
  }, [dispatch, open]);

  useHotkey('k', handleOpen, { ctrlOrMeta: true });

  // Focus input when palette opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = filterIndex(index, debouncedQuery, 30);
  const groups = groupResults(filtered);

  function handleSelect(item) {
    Analytics.searchSelect(item.id, item.type);
    dispatch(closeSearch());

    if (item.type === 'consultation') {
      // Extract type from href (/book?type=numerology)
      const typeParam = new URL(item.href, window.location.origin).searchParams.get('type');
      dispatch(openBookingModal(typeParam));
    } else {
      navigate(item.href);
    }
  }

  if (!open) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
      aria-label="Search dialog backdrop"
    >
      {/* Dim overlay */}
      <div
        className="absolute inset-0 bg-text/40 backdrop-blur-sm"
        onClick={() => dispatch(closeSearch())}
        aria-hidden="true"
      />

      {/* Palette panel */}
      <div
        className="relative w-full max-w-xl bg-bg border border-line rounded-xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Search and navigation"
      >
        <Command
          shouldFilter={false}
          onKeyDown={(e) => {
            if (e.key === 'Escape') dispatch(closeSearch());
          }}
        >
          <div className="flex items-center gap-2 border-b border-line px-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-text shrink-0" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <Command.Input
              ref={inputRef}
              value={query}
              onValueChange={(v) => dispatch(setSearchQuery(v))}
              placeholder="Search pages, services, consultations..."
              className="flex-1 py-4 bg-transparent text-text placeholder-muted-text text-base outline-none"
              aria-label="Search"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-text border border-line rounded px-1.5 py-0.5 font-mono">
              Esc
            </kbd>
          </div>

          <Command.List
            className="max-h-[60vh] overflow-y-auto py-2 px-2"
            aria-label="Search results"
          >
            <Command.Empty className="py-10 text-center text-muted-text text-sm">
              <p className="font-medium mb-2">No results found</p>
              <p className="mb-4 text-xs">Try "vastu", "numerology" or "book"</p>
              <button
                type="button"
                onClick={() => { dispatch(closeSearch()); dispatch(openBookingModal(null)); }}
                className="text-sm text-accent-text underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-accent-text"
              >
                Book a consultation
              </button>
            </Command.Empty>

            {Object.entries(groups).map(([groupKey, items]) => {
              if (!items.length) return null;
              return (
                <Command.Group
                  key={groupKey}
                  heading={GROUP_LABELS[groupKey]}
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-text [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider"
                >
                  {items.map((item) => (
                    <Command.Item
                      key={item.id}
                      value={item.id}
                      onSelect={() => handleSelect(item)}
                      className="flex flex-col px-3 py-2.5 rounded-lg cursor-pointer text-sm text-text aria-selected:bg-alt-surface gap-0.5 transition-colors"
                    >
                      <span className="font-medium leading-snug">{item.title}</span>
                      {item.excerpt && (
                        <span className="text-xs text-muted-text line-clamp-1">{item.excerpt}</span>
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>
              );
            })}
          </Command.List>

          {/* Footer hint */}
          <div className="border-t border-line px-4 py-2 flex gap-4 text-xs text-muted-text">
            <span><kbd className="font-mono">Enter</kbd> to select</span>
            <span><kbd className="font-mono">Esc</kbd> to close</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
