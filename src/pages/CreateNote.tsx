import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CreateNoteInput } from "@/types/note";
import { createNote } from "@/api/notesApi";
import { toast } from "react-toastify";

const CreateNote = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<CreateNoteInput>({
    clientName: "",
    sessionDate: new Date(),
    notes: "",
    duration: 50,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateNoteInput, string>>>({});

  const createMutation = useMutation({
    mutationFn:async ()=> {
      const data = {
        client_name: formData.clientName,
        session_date: formData.sessionDate,
        notes:formData.notes,
        duration:formData.duration,
      }
      await createNote(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note created successfully");
      navigate(`/`);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create note");
    },
  });

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateNoteInput, string>> = {};

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
      createMutation.mutate();
    }
  };

  const handleChange = (field: keyof CreateNoteInput, value: string | number | Date) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{ mb: 3, color: "hsl(var(--primary))" }}
      >
        Back to Notes
      </Button>

      <Paper sx={{ p: 4, bgcolor: "hsl(var(--card))", borderRadius: "var(--radius)" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "hsl(var(--foreground))" }}>
          Create New Note
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, color: "hsl(var(--muted-foreground))" }}>
          Record a new therapy session
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
              value={formData.sessionDate.toISOString().split("T")[0]}
              onChange={(e) => handleChange("sessionDate", new Date(e.target.value))}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
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
              inputProps={{ min: 1 }}
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
              inputProps={{ maxLength: 500 }}
            />

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/")}
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
                disabled={createMutation.isPending}
                sx={{
                  bgcolor: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  "&:hover": {
                    bgcolor: "hsl(var(--primary))",
                    opacity: 0.9,
                  },
                }}
              >
                {createMutation.isPending ? "Saving..." : "Save Note"}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateNote;