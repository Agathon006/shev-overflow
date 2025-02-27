import { Alert, Box, Container } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUsers } from '@/api/getUsers';
import { Spinner } from '@/components/Spinner';
import { useDebounce } from '@/hooks/useDebounce';

import { UserCard } from './UserCard';
import { UserListSearch } from './UserListSearch';

export const UsersList = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useUsers({
      searchTerm: debouncedSearchTerm,
    });

  const users = data ? data.pages.flatMap((page) => page.users) : [];

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? users.length + 1 : users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) return;

    if (
      lastItem.index >= users.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hasNextPage,
    fetchNextPage,
    users.length,
    isFetchingNextPage,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    rowVirtualizer.getVirtualItems(),
  ]);

  const items = rowVirtualizer.getVirtualItems();

  if (isLoading && !users.length) {
    return (
      <Container maxWidth="xl" disableGutters sx={{ width: '100%' }}>
        <UserListSearch search={searchTerm} setSearch={setSearchTerm} />
        <Spinner />
      </Container>
    );
  }

  if (!users.length) {
    return (
      <Container maxWidth="xl" disableGutters sx={{ width: '100%' }}>
        <UserListSearch search={searchTerm} setSearch={setSearchTerm} />
        <Alert severity="info">{t('users.user-list.no-users')}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" disableGutters sx={{ width: '100%' }}>
      <UserListSearch search={searchTerm} setSearch={setSearchTerm} />
      <Container
        ref={parentRef}
        maxWidth="xl"
        disableGutters
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
              const isLoaderRow = virtualRow.index >= users.length;
              const user = users[virtualRow.index];

              return (
                <Box
                  key={virtualRow.index}
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                >
                  {isLoaderRow ? (
                    t('users.user-list.extra-content')
                  ) : (
                    <UserCard user={user} />
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Container>
  );
};
