import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Alert,
  Container,
  IconButton,
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
import { YesNoLabel } from '@/components/YesNoLabel/YesNoLabel';
import { useDebounce } from '@/hooks/useDebounce';

import { useQuestions } from '../api/getQuestions';
import { QuestionsTableSearch } from './QuestionsTableSearch';

export const QuestionsTable = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data, isLoading } = useQuestions({
    searchTerm: debouncedSearchTerm,
    limit: rowsPerPage,
  });

  const questions = data?.pages.flatMap((page) => page.questions) || [];
  const totalCount =
    data?.pages?.reduce((acc, page) => acc + page.questions.length, 0) || 0;

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
      cell: (info: { getValue: () => boolean }) =>
        info.getValue() ? <YesNoLabel truth /> : <YesNoLabel />,
    },
    {
      accessorKey: 'view',
      header: t('questions-table.header.view'),
      cell: () => (
        <IconButton color="secondary">
          <VisibilityIcon />
        </IconButton>
      ),
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

  if (questions.length === 0) {
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
              <TableRow
                key={row.id}
                sx={(theme) =>
                  i % 2 !== 0
                    ? {
                        backgroundColor: theme.palette.customNeutral[200],
                      }
                    : {}
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} align="center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
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
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) =>
          setRowsPerPage(parseInt(e.target.value, 10))
        }
        labelRowsPerPage={t('questions-table.pagination-label')}
      />
    </Container>
  );
};
