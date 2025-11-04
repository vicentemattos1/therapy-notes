import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Chip,
  Button,
} from "@mui/material";
import { format } from "date-fns";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import { DeleteDialog } from "@/components/DeleteDialog";
import { useState } from "react";
import { CardMenu } from "@/components/CardActions";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Link } from "react-router-dom";
import { getNotes } from "@/api/notesApi";

const NotesList = () => {
  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });
  const [noteId, setNoteId] = useState<string | null>(null);


  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No notes yet. Create your first note!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "hsl(var(--foreground))" }}>
          Session Notes
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "hsl(var(--muted-foreground))" }}>
          All therapy session notes
        </Typography>
        </Box>
        <Button variant="contained" sx={{color: 'white', height: 40}}><Link to='/create' className="flex items-center gap-1" > <NoteAddIcon sx={{fontSize: 18}} /> New Note</Link></Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {notes.map((note) => (
          <Card
            key={note.id}
            sx={{
              position: 'relative',
                height: "100%",
                bgcolor: "hsl(var(--card))",
                borderRadius: "var(--radius)",
                border: "1px solid hsl(var(--border))",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  borderColor: "hsl(var(--primary))",
                },
              }}
            >
              <CardContent>
              <CardMenu handleDelete={()=> setNoteId(note.id)} noteId={note.id} />
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <PersonIcon sx={{ color: "hsl(var(--primary))", mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "hsl(var(--foreground))" }}>
                    {note.client_name}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                  <Chip
                    label={format(note.session_date, "MMM dd, yyyy")}
                    size="small"
                    sx={{
                      bgcolor: "hsl(var(--accent))",
                      color: "hsl(var(--accent-foreground))",
                    }}
                  />
                  <Chip
                    icon={<AccessTimeIcon />}
                    label={`${note.duration} min`}
                    size="small"
                    sx={{
                      bgcolor: "hsl(var(--muted))",
                      color: "hsl(var(--muted-foreground))",
                    }}
                  />
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    color: "hsl(var(--muted-foreground))",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: 1.6,
                  }}
                >
                  {note.notes.substring(0, 100)}
                  {note.notes.length > 100 && "..."}
                </Typography>
              </CardContent>
          </Card>
        ))}
      </Box>
      <DeleteDialog open={!!noteId} nodeId={noteId} onClose={()=> setNoteId(null)} />
      
    </Box>
  );
};

export default NotesList;