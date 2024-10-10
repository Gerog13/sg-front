import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

interface ConfirmUpdateTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (newStatus: "pending" | "in progress" | "completed") => void;
  title: string;
  content: string;
  initialStatus: "pending" | "in progress" | "completed";
}

const ConfirmUpdateTaskDialog: React.FC<ConfirmUpdateTaskDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  initialStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<
    "pending" | "in progress" | "completed"
  >(initialStatus);

  const handleStatusChange = (
    event: SelectChangeEvent<"pending" | "in progress" | "completed">
  ) => {
    setSelectedStatus(
      event.target.value as "pending" | "in progress" | "completed"
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p>{content}</p>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            value={selectedStatus}
            onChange={handleStatusChange}
            label="Status"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => onConfirm(selectedStatus)}
          color="primary"
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmUpdateTaskDialog;
