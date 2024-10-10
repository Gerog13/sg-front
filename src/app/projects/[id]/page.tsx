"use client";

import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Skeleton } from "@mui/material";
import Layout from "@/components/layout";
import ConfirmUpdateTaskDialog from "@/components/confirm-update-task-dialog";
import TaskTable from "@/components/task-table";
import { getProject } from "@/services/project-service";
import { getTasks, updateTask } from "@/services/task-service";
import { Project } from "@/types/project";
import { Task } from "@/types/task";
import Link from "next/link";

interface ProjectPageProps {
  params: { id: string };
}

const ProjectPage: React.FC<ProjectPageProps> = ({ params }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchProjectAndTasks = async () => {
      try {
        const [projectData, tasksData] = await Promise.all([
          getProject(params.id),
          getTasks(params.id),
        ]);
        setProject(projectData);
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching project and tasks:", error);
      }
    };

    fetchProjectAndTasks();
  }, [params.id]);

  const handleUpdateStatusClick = (task: Task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
  };

  const handleConfirmStatusChange = async (
    newStatus: "pending" | "in progress" | "completed"
  ) => {
    if (selectedTask) {
      try {
        await updateTask(selectedTask.id, { status: newStatus });

        const updatedTasks = tasks.map((task) =>
          task.id === selectedTask.id ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
    handleCloseDialog();
  };

  if (!project) {
    return (
      <Layout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Skeleton variant="text" width={300} height={40} />{" "}
          <Skeleton variant="rectangular" width={100} height={40} />{" "}
        </Box>
        <Skeleton variant="text" width="80%" height={30} sx={{ mb: 3 }} />{" "}
        <Box sx={{ mt: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Skeleton variant="text" width={200} height={30} />{" "}
            <Skeleton variant="rectangular" width={100} height={40} />{" "}
          </Box>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          {project.name}
        </Typography>
        <Button
          component={Link}
          href={`/projects/${project.id}/edit`}
          variant="contained"
          color="primary"
        >
          Edit Project
        </Button>
      </Box>
      <Typography variant="body1" gutterBottom>
        {project.description}
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5">Tasks</Typography>
          <Button
            component={Link}
            href={`/projects/${project.id}/tasks/new`}
            variant="contained"
            color="primary"
          >
            Add Task
          </Button>
        </Box>

        <TaskTable tasks={tasks} onStatusClick={handleUpdateStatusClick} />
      </Box>

      {selectedTask && (
        <ConfirmUpdateTaskDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmStatusChange}
          title="Update Task Status"
          content={`Select a new status for the task "${selectedTask.name}".`}
          initialStatus={selectedTask.status}
        />
      )}
    </Layout>
  );
};

export default ProjectPage;
