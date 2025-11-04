import { useMemo } from "react";
import { format, isSameMonth, subMonths } from "date-fns";
import type { Note } from "@/types/note";

type Options = { now?: Date };

export type DashboardMetrics = {
  totalThisMonth: number;
  totalLastMonth: number;
  deltaPct: number | null;
  avgDurationThisMonth: number;

  barChartData: Array<{ dateISO: string; label: string; sessions: number }>;

  monthlyLineChartData: Array<Record<string, number | string>>; 
  monthlyClientFrequency: Record<string, Record<string, number>>;
};

function calcDeltaPct(current: number, prev: number) {
  if (prev <= 0) return null;
  return ((current - prev) / prev) * 100;
}

export function useDashboardMetrics(notes: Note[] | undefined, opts: Options = {}): DashboardMetrics {
  return useMemo(() => {
    const now = opts.now ?? new Date();
    const list = notes ?? [];
    const prevMonth = subMonths(now, 1);
    const thisMonth = list.filter(n => isSameMonth(n.session_date, now));
    const lastMonth = list.filter(n => isSameMonth(n.session_date, prevMonth));
    const totalThisMonth = thisMonth.length;
    const totalLastMonth = lastMonth.length;
    const deltaPct = calcDeltaPct(totalThisMonth, totalLastMonth);

    const monthDurations = thisMonth.map(n => n.duration).filter(d => Number.isFinite(d) && d > 0);
    const avgDurationThisMonth =
      monthDurations.length
        ? Math.round((monthDurations.reduce((s, v) => s + v, 0) / monthDurations.length) * 10) / 10
        : 0;

    const sessionsPerDayMap = list.reduce<Record<string, number>>((acc, n) => {
      const key = format(n.session_date, "yyyy-MM-dd");
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    const barChartData = Object.entries(sessionsPerDayMap)
      .map(([dateISO, sessions]) => ({
        dateISO,
        label: format(new Date(dateISO), "MMM dd"),
        sessions: Number(sessions),
      }))
      .sort((a, b) => (a.dateISO < b.dateISO ? -1 : 1));

    // Monthly per client
    const monthlyClientFrequency = list.reduce<Record<string, Record<string, number>>>((acc, n) => {
      const monthKey = format(n.session_date, "yyyy-MM");
      const c = n.client_name;
      if (!acc[c]) acc[c] = {};
      acc[c][monthKey] = (acc[c][monthKey] || 0) + 1;
      return acc;
    }, {});
    const allMonths = Array.from(new Set(list.map(n => format(n.session_date, "yyyy-MM")))).sort();
    const monthlyLineChartData = allMonths.map(monthKey => {
      const label = format(new Date(`${monthKey}-01`), "MMM yyyy");
      const row: Record<string, number | string> = { month: monthKey, label };
      Object.keys(monthlyClientFrequency).forEach(c => {
        row[c] = monthlyClientFrequency[c][monthKey] || 0;
      });
      return row;
    });

    return {
      totalThisMonth,
      totalLastMonth,
      deltaPct,
      avgDurationThisMonth,
      barChartData,
      monthlyLineChartData,
      monthlyClientFrequency,
    };
  }, [notes, opts.now]);
}
