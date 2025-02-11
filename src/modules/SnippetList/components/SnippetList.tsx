import { Box, Container } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';

import { SnippetCard } from '@/components/SnippetCard';

import { useSnippets } from '../api/snippets';

export const SnippetList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSnippets();

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
  }, [
    snippets.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    rowVirtualizer,
  ]);

  return (
    <Container ref={parentRef} maxWidth="xl">
      <Box
        sx={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index >= snippets.length;
          const snippet = snippets[virtualRow.index];

          return (
            <Box
              key={virtualRow.index}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {isLoaderRow ? 'Loading more...' : <SnippetCard {...snippet} />}
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};
