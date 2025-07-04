import TableCell from "../partial";
import {
  ActionCellLayout,
  DeleteActionCell,
  EditActionCell,
} from "../partial/actionsCells";

export const supervisorColumns = (props) => [
  {
    key: "name",
    label: "اسم المشرف",
    render: (value) => <TableCell value={value} />,
  },
  {
    key: "phone",
    label: "رقم الهاتف",
    render: (value) => <TableCell value={value} />,
  },
  {
    key: "actions",
    label: "الإجراءات",
    moreRenders: true,
    render: (value) => (
      <ActionCellLayout>
        <EditActionCell
          onClick={() => {
            props.focusSupervisor(value.id);
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
