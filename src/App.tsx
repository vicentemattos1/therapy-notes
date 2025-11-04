import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Layout from "./components/Layout";
import NotesList from "./pages/NotesList";
import NotFound from "./pages/NotFound";
import CreateNote from "./pages/CreateNote";
import Dashboard from "./pages/Dashboard";
import EditNote from "./pages/EditNote";
import { ToastContainer } from 'react-toastify';


const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "hsl(190, 65%, 45%)",
    },
    secondary: {
      main: "hsl(20, 50%, 60%)",
    },
  },
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  },
});
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<NotesList />} />
            <Route path="/create" element={<CreateNote />} />
            <Route path="/:id/edit" element={<EditNote />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;