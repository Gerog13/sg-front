import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
} from "@mui/material";
import { Task } from "@/types/task";

interface TaskTableProps {
  tasks: Task[];
  onStatusClick: (task: Task) => void;
}

const getStatusChip = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return (
        <Chip
          label="Pending"
          color="default"
          sx={{ backgroundColor: "gray", color: "white" }}
        />
      );
    case "in progress":
      return <Chip label="In Progress" color="primary" />;
    case "completed":
      return <Chip label="Completed" color="success" />;
    default:
      return <Chip label={status} color="default" />;
  }
};

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onStatusClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="tasks table">
        <TableHead>
          <TableRow>
            <TableCell>Task Name</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell component="th" scope="row">
                {task.name}
              </TableCell>
              <TableCell align="center">{task.description}</TableCell>
              <TableCell align="center">{getStatusChip(task.status)}</TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onStatusClick(task)}
                >
                  Update Status
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
