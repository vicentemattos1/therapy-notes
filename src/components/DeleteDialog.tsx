import { deleteNote } from "@/api/notesApi";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";


type DeleteDialogProps = {
  open: boolean
  nodeId: string
  onClose: ()=> void
}

export function DeleteDialog({ open, nodeId,  onClose }: DeleteDialogProps){

  const queryClient = useQueryClient()

  const handleDelete = () => {
    deleteMutation.mutate(parseInt(nodeId));
    onClose()
  };

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete note");
    },
  });
  return <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this note? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
}