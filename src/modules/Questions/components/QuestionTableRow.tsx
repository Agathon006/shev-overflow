import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { flexRender } from '@tanstack/react-table';
import { Row } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/api/auth';
import { useConfirmationDialog } from '@/components/ConfirmationDialog';
import { YesNoLabel } from '@/components/YesNoLabel';
import { QuestionSchema } from '@/schemas/question';
import { notify } from '@/utils/notify';

import { useDeleteQuestion } from '../api/deleteQuestion';
import { useUpdateQuestion } from '../api/updateQuestion';
import { QuestionEditSchema } from '../schemas/questionEdit';
import { useQuestionFormDialog } from './DialogQuestionForm';

type QuestionTableRowProps = {
  row: Row<
    Omit<QuestionSchema, 'answers'> & {
      answers: {
        id: string;
        content: string;
        isCorrect: boolean;
      }[];
    }
  >;
  index: number;
};

export const QuestionsTableRow = ({ row, index }: QuestionTableRowProps) => {
  const { t } = useTranslation();
  const { data: currentUser } = useAuth();
  const isCurrentUser = currentUser?.id === row.original.user.id;

  const [openConfirmationDialog] = useConfirmationDialog();
  const [openQuestionFormDialog] = useQuestionFormDialog();

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
        },
      },
    });

  const handleSubmit = (
    data: QuestionEditSchema,
    setIsEditing?: (value: boolean) => void,
    reset?: () => void,
  ) => {
    updateQuestion(
      { questionId: row.original.id, content: data },
      {
        onSuccess: () => {
          setIsEditing?.(false);
          reset?.();
        },
      },
    );
  };

  const handleDeleteClick = () => {
    openConfirmationDialog({
      onConfirm: () => {
        deleteQuestion({ id: row.original.id });
      },
    });
  };

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
          {(() => {
            if (cell.column.id === 'isResolved') {
              return cell.getValue() ? <YesNoLabel truth /> : <YesNoLabel />;
            }

            if (cell.column.id === 'actions') {
              return (
                <>
                  <IconButton
                    onClick={() =>
                      openQuestionFormDialog({
                        questionId: row.original.id,
                        isCurrentUser,
                        onSubmit: handleSubmit,
                      })
                    }
                    disabled={deleteIsPending || updateIsPending}
                    color="secondary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  {isCurrentUser && (
                    <IconButton
                      onClick={handleDeleteClick}
                      disabled={deleteIsPending || updateIsPending}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </>
              );
            }

            return flexRender(cell.column.columnDef.cell, cell.getContext());
          })()}
        </TableCell>
      ))}
    </TableRow>
  );
};
