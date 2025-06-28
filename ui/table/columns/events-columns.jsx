import TableCell from '../partial';
import {
  ActionCellLayout,
  DeleteActionCell,
  LinkActionCell,
} from '../partial/actionsCells';
import StatusCell from '../partial/StatusCell';

export const eventsColumns = [
  {
    key: 'eventName',
    label: 'اسم الحفل',
    render: (value) => <TableCell value={value} />,
  },
  {
    key: 'eventType',
    label: 'نوع الحفل',
    render: (value) => <TableCell value={value} />,
  },
  {
    key: 'attendance',
    label: 'الحضور',
    render: (value) => <TableCell value={value} />,
  },
  {
    key: 'confirmed',
    label: 'الحضور',
    render: (value) => <TableCell value={value} />,
  },
  {
    key: 'apologies',
    label: 'الاعتذار',
    render: (value) => <TableCell value={value} />,
  },
  {
    key: 'noReply',
    label: 'لم يرد',
    render: (value) => <TableCell value={value} />,
  },
  {
    key: 'status',
    label: 'حالة المناسبة',
    render: (value) => <StatusCell value={value} />,
  },
  {
    key: 'actions',
    label: 'الإجراءات',
    render: () => (
      <ActionCellLayout>
        <LinkActionCell href="/events/1" title="معاينة" />
        <DeleteActionCell onClick={() => {}} />
      </ActionCellLayout>
    ),
  },
];
