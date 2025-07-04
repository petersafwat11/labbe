"use client";
import React from "react";
import StatCard from "./StatCard";
import { useTranslation } from "react-i18next";

const dummyStats = [
  {
    icon: "/svg/auth/calendar.svg",
    labelKey: "stats.activeEvents",
    value: 2,
    sublabelKey: "stats.avgAttendance",
  },
  {
    icon: "/svg/auth/calendar.svg",
    labelKey: "stats.completedEvents",
    value: 2,
    sublabelKey: "stats.avgAttendance",
  },
  {
    icon: "/svg/auth/calendar.svg",
    labelKey: "stats.completedEvents",
    value: 2,
    sublabelKey: "stats.avgAttendance",
  },
  {
    icon: "/svg/auth/calendar.svg",
    labelKey: "stats.completedEvents",
    value: 2,
    sublabelKey: "stats.avgAttendance",
  },
  // Add more stats as needed
];

function StatsGrid() {
  const { t } = useTranslation("home-events");
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "2.4rem",
      }}
    >
      {dummyStats.map((stat, idx) => (
        <StatCard
          key={idx}
          icon={stat.icon}
          label={t(stat.labelKey, "Label")}
          value={stat.value}
          sublabel={t(stat.sublabelKey, "متوسط الاستجابة")}
        />
      ))}
    </div>
  );
}

export default StatsGrid;
