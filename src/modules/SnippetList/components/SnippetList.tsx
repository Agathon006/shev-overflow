import { Box, Container } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { SnippetCard } from '@/components/SnippetCard';

import { useSnippets } from '../api/snippets';

export const SnippetList = () => {
  const { t } = useTranslation();
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
    hasNextPage,
    fetchNextPage,
    snippets.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);
  // What should i do with rowVirtualizer.getVirtualItems()
  // React Hook useEffect has a missing dependency: 'rowVirtualizer'. Either include it or remove the dependency array.eslintreact-hooks/exhaustive-deps
  // React Hook useEffect has a complex expression in the dependency array. Extract it to a separate variable so it can be statically checked.eslintreact-hooks/exhaustive-deps

  const items = rowVirtualizer.getVirtualItems();

  return (
    <Container
      ref={parentRef}
      maxWidth="xl"
      sx={{
        width: '100%',
        height: '80vh',
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
                  <SnippetCard
                    username={snippet?.user.username}
                    language={snippet?.language}
                    code={snippet?.code}
                    likes={
                      snippet?.marks?.filter((m) => m.type === 'like').length ??
                      0
                    }
                    dislikes={
                      snippet?.marks?.filter((m) => m.type === 'dislike')
                        .length ?? 0
                    }
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};
