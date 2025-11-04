import { AppBar, Toolbar, Typography, Container, Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Notes", icon: <ListAltIcon /> },
    { path: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ bgcolor: "hsl(var(--primary))" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ width: 250, fontWeight: 600, color: 'white' }}>
            TherapyNotes
          </Typography>
          <Box  sx={{display:'flex', justifyContent: 'center', flex: 1}}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{
                color: "white",
                mx: 1,
                borderBottom: location.pathname === item.path ? "2px solid white" : "2px solid transparent",
                borderRadius: 0,
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
          </Box>
          <Box sx={{width: 250}}/>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="xl"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
