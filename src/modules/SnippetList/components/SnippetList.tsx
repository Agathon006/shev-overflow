import { Alert, Box, Container } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Spinner } from '@/components/Spinner';
import { useDebounce } from '@/hooks/useDebounce';

import { useSnippets } from '../api/snippets';
import { SnippetCard } from './SnippetCard';
import { SnippetListSearch } from './SnippetListSearch';

export const SnippetList = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSnippets({
      searchTerm: debouncedSearchTerm,
    });

  const snippets = data ? data.pages.flatMap((page) => page.snippets) : [];

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? snippets.length + 1 : snippets.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) return;

    if (
      lastItem.index >= snippets.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hasNextPage,
    fetchNextPage,
    snippets.length,
    isFetchingNextPage,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    rowVirtualizer.getVirtualItems(),
  ]);

  const items = rowVirtualizer.getVirtualItems();

  let placeholderContent = null;

  if (isLoading && !snippets.length) {
    placeholderContent = <Spinner />;
  } else if (snippets.length === 0) {
    placeholderContent = (
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Alert severity="info">{t('snippet-list.no-snippets')}</Alert>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ width: '100%' }}>
        <SnippetListSearch search={searchTerm} setSearch={setSearchTerm} />
      </Container>

      {placeholderContent !== null ? (
        placeholderContent
      ) : (
        <Container
          ref={parentRef}
          maxWidth="xl"
          sx={{
            width: '100%',
            height: '75vh',
            overflow: 'auto',
            contain: 'strict',
          }}
        >
          <Box
            sx={{
              height: rowVirtualizer.getTotalSize(),
              width: '100%',
              position: 'relative',
            }}
          >
            <Box
              display={'flex'}
              flexDirection={'column'}
              gap={2}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${items[0]?.start ?? 0}px)`,
              }}
            >
              {items.map((virtualRow) => {
                const isLoaderRow = virtualRow.index >= snippets.length;
                const snippet = snippets[virtualRow.index];

                return (
                  <Box
                    key={virtualRow.index}
                    data-index={virtualRow.index}
                    ref={rowVirtualizer.measureElement}
                  >
                    {isLoaderRow ? (
                      t('snippet-list.extra-content')
                    ) : (
                      <SnippetCard snippet={snippet} searchTerm={searchTerm} />
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};
