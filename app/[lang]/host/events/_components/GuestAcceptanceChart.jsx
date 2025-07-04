import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import CardLayout from "@/ui/commen/card/CardLayout";
import styles from "../event.module.css";
import { chartData, chartOptions } from "@/staticData/events/data";

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GuestAcceptanceChart = () => (
  <CardLayout className={styles.guestAcceptance}>
    <div className={styles.sectionTitle}>قبول الضيوف</div>
    <div className={styles.chartPlaceholder}>
      <Line data={chartData} options={chartOptions} height={80} />
    </div>
  </CardLayout>
);

export default GuestAcceptanceChart;
