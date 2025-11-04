import { useQuery } from "@tanstack/react-query";
import {
  Paper,
  Typography,
  Box,
  CircularProgress,
  Chip,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { getNotes } from "@/api/notesApi";

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const Dashboard = () => {
  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  const {
    totalThisMonth,
    totalLastMonth,
    deltaPct,
    avgDurationThisMonth,
    barChartData,
    monthlyClientFrequency,
    monthlyLineChartData
  } = useDashboardMetrics(notes);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!notes) return null;

  const trend =
    deltaPct === null ? "neutral" : deltaPct > 0 ? "up" : deltaPct < 0 ? "down" : "neutral";

  const TrendIcon =
    trend === "up" ? ArrowUpwardIcon : trend === "down" ? ArrowDownwardIcon : RemoveIcon;

  const trendColor =
    trend === "up"
      ? "hsl(var(--green-600, 142 72% 29%))"
      : trend === "down"
      ? "hsl(var(--red-600, 0 72% 45%))"
      : "hsl(var(--muted-foreground))";

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "hsl(var(--foreground))" }}>
        Dashboard
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "hsl(var(--muted-foreground))" }}>
        Analytics and insights for your therapy sessions
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          mb: 3,
        }}
      >
        <Paper
          sx={{
            p: 3,
            bgcolor: "hsl(var(--card))",
            borderRadius: "var(--radius)",
            border: "1px solid hsl(var(--border))",
          }}
          elevation={0}
        >
          <Typography variant="subtitle2" sx={{ color: "hsl(var(--muted-foreground))", mb: 1 }}>
            Total month
          </Typography>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "hsl(var(--foreground))" }}>
              {totalThisMonth}
            </Typography>
            <Chip
              variant="outlined"
              size="small"
              label={`vs last month (${totalLastMonth})`}
              sx={{
                borderColor: "hsl(var(--border))",
                color: "hsl(var(--muted-foreground))",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}>
            <TrendIcon fontSize="small" sx={{ color: trendColor }} />
            <Typography variant="body2" sx={{ color: trendColor, fontWeight: 600 }}>
              {deltaPct === null ? "sem base" : `${deltaPct.toFixed(1)}%`}
            </Typography>
            <Typography variant="body2" sx={{ color: "hsl(var(--muted-foreground))" }}>
              compared to last month
            </Typography>
          </Box>
        </Paper>

        <Paper
          sx={{
            p: 3,
            bgcolor: "hsl(var(--card))",
            borderRadius: "var(--radius)",
            border: "1px solid hsl(var(--border))",
          }}
          elevation={0}
        >
          <Typography variant="subtitle2" sx={{ color: "hsl(var(--muted-foreground))", mb: 1 }}>
            Avarange of sessions
          </Typography>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "hsl(var(--foreground))" }}>
              {avgDurationThisMonth}
            </Typography>
            <Typography variant="h6" sx={{ color: "hsl(var(--muted-foreground))" }}>
              min
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 1, color: "hsl(var(--muted-foreground))" }}>
            Considering current month
          </Typography>
        </Paper>
      </Box>

      <Box  sx={{display: 'flex', gap: 1,}}>
      <Paper sx={{ width: '100%', p: 3, bgcolor: "hsl(var(--card))", borderRadius: "var(--radius)" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Sessions per Day
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" allowDecimals={false} domain={[0, "dataMax"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelFormatter={(lbl) => String(lbl)}
            />
            <Legend />
            <Bar dataKey="sessions" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      <Paper sx={{ width: '100%', p: 3, bgcolor: "hsl(var(--card))", borderRadius: "var(--radius)" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Session Frequency by Client (Monthly)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyLineChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" allowDecimals={false} domain={[0, "dataMax"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelFormatter={(lbl) => String(lbl)}
            />
            <Legend />
            {Object.keys(monthlyClientFrequency).map((client, index) => (
              <Line
                key={client}
                type="monotone"
                dataKey={client}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
