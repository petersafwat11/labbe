import TableCell from "../partial";
import {
  ActionCellLayout,
  DeleteActionCell,
  EditActionCell,
} from "../partial/actionsCells";

export const singleEventColumns = [
  {
    key: "name",
    label: "اسم الضيف",
    render: (value) => <TableCell value={value} />,
  },
  {
    key: "phone",
    label: "رقم الجوال",
    render: (value) => <TableCell value={value} />,
  },
  {
    key: "email",
    label: "البريد الإلكتروني",
    render: (value) => <TableCell value={value || "-"} />,
  },
  {
    key: "message",
    label: "رسالة من الضيف",
    render: (value) => <TableCell value={value} />,
  },
  {
    key: "reply",
    label: "الرد",
    render: (value) => <TableCell value={value} />,
  },
  {
    key: "time",
    label: "توقيت الرد",
    render: (value) => <TableCell value={value} />,
  },
  {
    key: "actions",
    label: "الإجراءات",
    render: () => (
      <ActionCellLayout>
        <EditActionCell onClick={() => {}} />
        <DeleteActionCell onClick={() => {}} />
      </ActionCellLayout>
    ),
  },
];

export const temporaryGuestColumns = (props) => [
  {
    key: "name",
    label: "اسم الضيف",
    render: (value) => <TableCell value={value} />,
  },
  {
    key: "phone",
    label: "رقم الجوال",
    render: (value) => <TableCell value={value || "-"} />,
  },
  {
    key: "email",
    label: "البريد الإلكتروني",
    render: (value) => <TableCell value={value || "-"} />,
  },
  {
    key: "actions",
    label: "الإجراءات",
    moreRenders: true,
    render: (value) => (
      <ActionCellLayout>
        <EditActionCell
          onClick={() => {
            props.focusGuest(value.id);
          }}
        />
        <DeleteActionCell
          onClick={() => {
            props.onDelete(value.id);
          }}
        />
      </ActionCellLayout>
    ),
  },
];
