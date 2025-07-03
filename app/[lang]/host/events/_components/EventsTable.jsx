import React from "react";
import CardLayout from "@/ui/commen/card/CardLayout";
import DynamicTable from "@/ui/commen/table";
import { eventsColumns } from "@/ui/commen/table/columns/events-columns";
import styles from "../event.module.css";
import { eventsTableData } from "@/staticData/events/data";

const EventsTable = () => (
  <CardLayout className={styles.tableWrapper}>
    <div className={styles.tableHeadSection}>
      <div className={styles.tableHeadTitle}>قائمة المناسبات</div>
      <div className={styles.tableHeadActions}>
        <button className={styles.searchButton}>
          <img
            style={{ width: "12.5px", height: "12.5px" }}
            src="/svg/events/search.svg"
            alt=""
          />
        </button>
        <button className={styles.moreButton}>
          <img src="/svg/events/more.svg" alt="" />
        </button>
      </div>
    </div>
    <DynamicTable columns={eventsColumns} data={eventsTableData} />
  </CardLayout>
);

export default EventsTable;
