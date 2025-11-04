import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { UpdateNoteInput } from "@/types/note";
import { getNoteById, updateNote } from "@/api/notesApi";
import { toast } from "react-toastify";

const EditNote = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<UpdateNoteInput>({
    id: id!,
    clientName: "",
    sessionDate: new Date(),
    notes: "",
    duration: 50,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UpdateNoteInput, string>>>({});

  const { data: note, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => {
      if(id){
        return getNoteById(parseInt(id))
      }
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (note) {
      setFormData({
        id: note.id,
        clientName: note.client_name,
        sessionDate: note.session_date,
        notes: note.notes,
        duration: note.duration,
      });
    }
  }, [note]);

  const updateMutation = useMutation({
    mutationFn:async ()=> {
      const data = {
        id: parseInt(formData.id),
        client_name: formData.clientName,
        session_date: formData.sessionDate,
        notes:formData.notes,
        duration:formData.duration,
        updated_at: new Date()
      }
      await updateNote(data.id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note", id] });
      toast.success("Note updated successfully");
      navigate(`/`);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to update note");
    },
  });

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof UpdateNoteInput, string>> = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = "Client name is required";
    }

    if (!formData.notes.trim()) {
      newErrors.notes = "Notes are required";
    } else if (formData.notes.length > 500) {
      newErrors.notes = "Notes must be 500 characters or less";
    }

    if (formData.duration <= 0) {
      newErrors.duration = "Duration must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      updateMutation.mutate();
    }
  };

  const handleChange = (field: keyof UpdateNoteInput, value: string | number | Date) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!note) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Note not found
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Back to Notes
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/`)}
        sx={{ mb: 3, color: "hsl(var(--primary))" }}
      >
        Back to List
      </Button>

      <Paper sx={{ p: 4, bgcolor: "hsl(var(--card))", borderRadius: "var(--radius)" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "hsl(var(--foreground))" }}>
          Edit Note
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, color: "hsl(var(--muted-foreground))" }}>
          Update therapy session details
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Client Name"
              value={formData.clientName}
              onChange={(e) => handleChange("clientName", e.target.value)}
              error={!!errors.clientName}
              helperText={errors.clientName}
              fullWidth
              required
            />

            <TextField
              label="Session Date"
              type="date"
              value={new Date(formData.sessionDate).toISOString().split("T")[0]}
              onChange={(e) => handleChange("sessionDate", new Date(e.target.value))}
              fullWidth
              required
              slotProps={{
                inputLabel: {
                  shrink: true
                }
              }}
            />

            <TextField
              label="Session Duration (minutes)"
              type="number"
              value={formData.duration}
              onChange={(e) => handleChange("duration", parseInt(e.target.value))}
              error={!!errors.duration}
              helperText={errors.duration}
              fullWidth
              required
              slotProps={{
                htmlInput: {
                  min: 1
                }
              }}
            />

            <TextField
              label="Session Notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              error={!!errors.notes}
              helperText={
                errors.notes || `${formData.notes.length}/500 characters`
              }
              fullWidth
              required
              multiline
              rows={8}
              slotProps={{
                htmlInput: {
                  maxLength: 500
                }
              }}
            />

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/`)}
                sx={{
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={updateMutation.isPending}
                sx={{
                  bgcolor: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  "&:hover": {
                    bgcolor: "hsl(var(--primary))",
                    opacity: 0.9,
                  },
                }}
              >
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditNote;