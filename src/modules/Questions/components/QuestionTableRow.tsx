import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { flexRender } from '@tanstack/react-table';
import { Row } from '@tanstack/react-table';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/api/auth';
import { Spinner } from '@/components/Spinner';
import { YesNoLabel } from '@/components/YesNoLabel';
import { QuestionSchema } from '@/schemas/question';
import { notify } from '@/utils/notify';

import { useDeleteQuestion } from '../api/deleteQuestion';
import { useQuestionById } from '../api/getQuestionById';
import { useUpdateQuestion } from '../api/updateQuestion';
import { ModalQuestionForm } from './ModalQuestionForm';

type QuestionTableRowProps = {
  row: Row<QuestionSchema>;
  index: number;
};

export const QuestionsTableRow = ({ row, index }: QuestionTableRowProps) => {
  const { t } = useTranslation();

  const { data: currentUser } = useAuth();
  const isCurrentUser = currentUser?.id === row.original.user.id;

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const { data: question, isLoading } = useQuestionById({
    id: row.original.id ?? '',
  });

  const { mutate: deleteQuestion, isPending: deleteIsPending } =
    useDeleteQuestion({
      id: row.original.id,
      mutationConfig: {
        onSuccess: () => {
          notify({ type: 'info', title: t('questions-table.delete-success') });
        },
      },
    });

  const { mutate: updateQuestion, isPending: updateIsPending } =
    useUpdateQuestion({
      id: row.original.id,
      mutationConfig: {
        onSuccess: () => {
          notify({
            type: 'success',
            title: t('questions-table.edit-success'),
          });
          handleCloseModal();
        },
      },
    });

  const handleSubmit = (
    data: Pick<QuestionSchema, 'title' | 'description' | 'attachedCode'>,
  ) => {
    updateQuestion({ questionId: row.original.id, content: data });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <TableRow
      sx={(theme) =>
        index % 2 !== 0
          ? { backgroundColor: theme.palette.customNeutral[200] }
          : {}
      }
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} align="center">
          {cell.column.id === 'isResolved' ? (
            cell.getValue() ? (
              <YesNoLabel truth />
            ) : (
              <YesNoLabel />
            )
          ) : cell.column.id === 'actions' ? (
            <>
              <IconButton
                onClick={handleOpenModal}
                disabled={deleteIsPending}
                color="secondary"
              >
                <VisibilityIcon />
              </IconButton>
              <ModalQuestionForm
                open={modalOpen}
                onClose={handleCloseModal}
                question={row.original}
                isCurrentUser={isCurrentUser}
                defaultValues={question}
                isSubmitting={updateIsPending}
                onSubmit={handleSubmit}
              />
              {isCurrentUser && (
                <IconButton
                  onClick={() => deleteQuestion({ id: row.original.id })}
                  disabled={deleteIsPending}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </>
          ) : (
            flexRender(cell.column.columnDef.cell, cell.getContext())
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};
