import React from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {task.name}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Description: {task.description}
        </Typography>
        <Typography variant="body2">{task.description}</Typography>
        <Box sx={{ mt: 2 }}>
          <Chip
            label={task.status}
            color={task.status === "completed" ? "success" : "primary"}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
