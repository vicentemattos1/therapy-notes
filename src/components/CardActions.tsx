import {  Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

type CardMenuProps = {
  noteId: string
  handleDelete: ()=> void
}

export function CardMenu({ noteId, handleDelete }: CardMenuProps){
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ position: 'absolute', right: 10, top: 10, zIndex: 10}}>
      <Button
        id="menu-button"
        aria-controls={open ? 'menu-button' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{padding:0, minWidth: 30}}
      >
        <MoreVertIcon/>
      </Button>
      <Menu
        id="actions"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper:{
            sx: {marginTop: 1, width: 150}
          }
        }}
      >
              <MenuItem
              onClick={() => navigate(`/${noteId}/edit`)}
              sx={{
                borderColor: "hsl(var(--primary))",
                color: "hsl(var(--primary))",
                "&:hover": {
                  borderColor: "hsl(var(--primary))",
                  bgcolor: "hsl(var(--accent))",
                },
              }}
            >
              <EditIcon sx={{marginRight: 1}}/> Edit
            </MenuItem>
            <MenuItem
              onClick={handleDelete}
              sx={{
                borderColor: "hsl(var(--destructive))",
                color: "hsl(var(--destructive))",
                "&:hover": {
                  borderColor: "hsl(var(--destructive))",
                  bgcolor: "rgba(239, 68, 68, 0.1)",
                },
              }}
            >
              <DeleteIcon sx={{marginRight: 1}} /> Delete
            </MenuItem>
      </Menu>
    </Box>
  )
}