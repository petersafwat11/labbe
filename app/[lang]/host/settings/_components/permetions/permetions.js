"use client";
import React, { useState } from "react";
import DynamicTable from "@/ui/commen/table";
import TableCell from "@/ui/commen/table/partial";
import {
  ActionCellLayout,
  DeleteActionCell,
  EditActionCell,
} from "@/ui/commen/table/partial/actionsCells";
import ToggleInput from "@/ui/commen/inputs/toggelInput/ToggelInput";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./permetions.module.css";

// Schema for toggle states
const toggleSchema = z.object({
  supervisorStatus: z.record(z.boolean()),
});

const Permissions = () => {
  // Sample data - replace with actual data from your API
  const [supervisorsData, setSupervisorsData] = useState([
    {
      id: 1,
      name: "أحمد محمد",
      phone: "+966 50 123 4567",
      eventName: "مؤتمر التقنية السنوي",
      status: true,
    },
    {
      id: 2,
      name: "فاطمة أحمد",
      phone: "+966 55 987 6543",
      eventName: "معرض الكتاب الدولي",
      status: false,
    },
    {
      id: 3,
      name: "محمد علي",
      phone: "+966 56 456 7890",
      eventName: "ورشة عمل الابتكار",
      status: true,
    },
    {
      id: 4,
      name: "عائشة سالم",
      phone: "+966 58 321 9876",
      eventName: "مؤتمر الأعمال الرقمية",
      status: false,
    },
  ]);

  const [checkedRows, setCheckedRows] = useState([]);
  const [filters, setFilters] = useState({});

  // Initialize form with supervisor statuses
  const methods = useForm({
    resolver: zodResolver(toggleSchema),
    defaultValues: {
      supervisorStatus: supervisorsData.reduce((acc, supervisor) => {
        acc[supervisor.id] = supervisor.status;
        return acc;
      }, {}),
    },
  });

  const { watch } = methods;

  // Watch for form changes and update supervisorsData
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && name.startsWith("supervisorStatus.")) {
        const supervisorId = parseInt(name.split(".")[1]);
        const newStatus = value.supervisorStatus[supervisorId];
        handleStatusToggle(supervisorId, newStatus);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleToggleRowCheck = (id) => {
    setCheckedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleToggleAllRows = () => {
    setCheckedRows(
      checkedRows.length === supervisorsData.length
        ? []
        : supervisorsData.map((row) => row.id)
    );
  };

  const handleAddFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleEdit = (id) => {
    console.log("Edit supervisor with ID:", id);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    console.log("Delete supervisor with ID:", id);
    // Add your delete logic here
    setSupervisorsData((prev) =>
      prev.filter((supervisor) => supervisor.id !== id)
    );
  };

  const handleStatusToggle = (id, newStatus) => {
    setSupervisorsData((prev) =>
      prev.map((supervisor) =>
        supervisor.id === id ? { ...supervisor, status: newStatus } : supervisor
      )
    );
  };

  const supervisorColumns = [
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
      key: "eventName",
      label: "اسم المناسبة",
      render: (value) => <TableCell value={value} />,
    },
    {
      key: "status",
      label: "حالة المشرف",
      render: (value, row) => (
        <div className={styles.toggleContainer}>
          <ToggleInput
            name={`supervisorStatus.${row.id}`}
            label=""
            translationNamespace="settings"
            disabled={false}
          />
        </div>
      ),
    },
    {
      key: "actions",
      label: "الإجراءات",
      moreRenders: true,
      render: (row) => (
        <ActionCellLayout>
          <EditActionCell onClick={() => handleEdit(row.id)} />
          <DeleteActionCell onClick={() => handleDelete(row.id)} />
        </ActionCellLayout>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <FormProvider {...methods}>
        <DynamicTable
          columns={supervisorColumns}
          data={supervisorsData}
          caption="قائمة المشرفين"
          addFilter={handleAddFilter}
          filters={filters}
          checkedRows={checkedRows}
          onToggleRowCheck={handleToggleRowCheck}
          onToggleAllRows={handleToggleAllRows}
        />
      </FormProvider>
    </div>
  );
};

export default Permissions;
