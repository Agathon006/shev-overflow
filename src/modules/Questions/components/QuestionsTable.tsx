import {
  Alert,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Spinner } from '@/components/Spinner';
import { useDebounce } from '@/hooks/useDebounce';

import { useQuestions } from '../api/getQuestions';
import { QuestionsTableSearch } from './QuestionsTableSearch';
import { QuestionsTableRow } from './QuestionTableRow';

export const QuestionsTable = () => {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState('');
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, isLoading, fetchNextPage } = useQuestions({
    searchTerm: debouncedSearchTerm,
    limit: rowsPerPage,
    page: page + 1,
  });

  const questions = data?.pages?.[0]?.questions || [];
  const totalCount = data?.pages?.[0]?.totalCount ?? 0;

  const columns = [
    { accessorKey: 'id', header: t('questions-table.header.id') },
    { accessorKey: 'user.username', header: t('questions-table.header.user') },
    { accessorKey: 'title', header: t('questions-table.header.title') },
    {
      accessorKey: 'description',
      header: t('questions-table.header.description'),
    },
    {
      accessorKey: 'answers.length',
      header: t('questions-table.header.answers'),
    },
    {
      accessorKey: 'isResolved',
      header: t('questions-table.header.is-resolved'),
    },
    {
      accessorKey: 'actions',
      header: t('questions-table.header.actions'),
    },
  ];

  const table = useReactTable({
    data: questions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    rowCount: totalCount,
  });

  if (isLoading && !questions.length) {
    return (
      <Container maxWidth="xl" sx={{ width: '100%' }}>
        <QuestionsTableSearch search={searchTerm} setSearch={setSearchTerm} />
        <Spinner />
      </Container>
    );
  }

  if (!questions.length) {
    return (
      <Container maxWidth="xl" sx={{ width: '100%' }}>
        <QuestionsTableSearch search={searchTerm} setSearch={setSearchTerm} />
        <Alert severity="info">{t('questions-table.no-questions')}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ width: '100%' }}>
      <QuestionsTableSearch search={searchTerm} setSearch={setSearchTerm} />
      <TableContainer sx={{ border: '1px solid' }}>
        <Table>
          <TableHead
            sx={(theme) => ({
              backgroundColor: theme.palette.customNeutral[400],
            })}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id} align="center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row, i) => (
              <QuestionsTableRow key={row.original.id} row={row} index={i} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => {
          setPage(newPage);
          if (
            newPage > page &&
            data?.pages?.[data.pages.length - 1]?.nextPage
          ) {
            fetchNextPage();
          }
        }}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        labelRowsPerPage={t('questions-table.pagination-label')}
      />
    </Container>
  );
};
