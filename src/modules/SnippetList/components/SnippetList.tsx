import { Box, Container } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Spinner } from '@/components/Spinner';
import { queryClient } from '@/lib/react-query';
import { User } from '@/schemas/user';

import { useSnippets } from '../api/snippets';
import { SnippetCard } from './SnippetCard';
import { SnippetListSearch } from './SnippetListSearch';

export const SnippetList = () => {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState<string>('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSnippets({
      searchTerm,
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
  const currentUser: User | undefined = queryClient.getQueryData([
    'currentUser',
  ]);

  return (
    <>
      <Container maxWidth="xl" sx={{ width: '100%' }}>
        <SnippetListSearch
          onSearchChange={(newSearchTerm) => setSearchTerm(newSearchTerm)}
        />
      </Container>
      {isLoading && !snippets.length ? (
        <Spinner />
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
                      <SnippetCard
                        id={snippet.id}
                        searchTerm={searchTerm}
                        username={snippet.user.username}
                        language={snippet.language}
                        code={snippet.code}
                        likes={
                          snippet.marks?.filter((m) => m.type === 'like')
                            .length ?? 0
                        }
                        likesActive={
                          !!snippet.marks
                            ?.filter((m) => m.type === 'like')
                            .find((mark) => mark.user.id === currentUser?.id)
                        }
                        dislikes={
                          snippet.marks?.filter((m) => m.type === 'dislike')
                            .length ?? 0
                        }
                        dislikesActive={
                          !!snippet.marks
                            ?.filter((m) => m.type === 'dislike')
                            .find((mark) => mark.user.id === currentUser?.id)
                        }
                        comments={snippet.comments?.length ?? 0}
                      />
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
