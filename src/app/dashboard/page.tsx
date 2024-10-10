"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Avatar,
  Skeleton,
  Alert,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useAuth } from "@/hooks/use-auth";
import { getTasks, updateTask } from "@/services/task-service";
import { getProjects } from "@/services/project-service";
import ProjectCard from "@/components/project-card";
import TaskTable from "@/components/task-table";
import ConfirmDialog from "@/components/confirm-update-task-dialog";
import Layout from "@/components/layout";
import { Task } from "@/types/task";
import { Project } from "@/types/project";
import Link from "next/link";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<{
    projects: Project[];
    tasks: { [key: string]: Task[] };
  }>({ projects: [], tasks: {} });
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchProjectsAndTasks = async () => {
      try {
        const projectsData = await getProjects();
        const tasksByProject: { [key: string]: Task[] } = {};

        await Promise.all(
          projectsData.map(async (project) => {
            const tasksData = await getTasks(project.id);
            tasksByProject[project.id] = tasksData as Task[];
          })
        );

        setDashboardData({
          projects: projectsData as Project[],
          tasks: tasksByProject,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchProjectsAndTasks();
  }, []);

  const handleUpdateStatusClick = (task: Task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleConfirmStatusChange = async (
    newStatus: "pending" | "in progress" | "completed"
  ) => {
    if (selectedTask) {
      try {
        await updateTask(selectedTask.id, { status: newStatus });

        const updatedTasks = dashboardData.tasks[selectedTask.project_id].map(
          (task) =>
            task.id === selectedTask.id ? { ...task, status: newStatus } : task
        );

        setDashboardData((prevData) => ({
          ...prevData,
          tasks: {
            ...prevData.tasks,
            [selectedTask.project_id]: updatedTasks,
          },
        }));

        handleCloseDialog();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
  };

  return (
    <Layout>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        {loading ? (
          <>
            <Skeleton
              variant="circular"
              width={80}
              height={80}
              sx={{ margin: "0 auto", mb: 2 }}
            />
            <Skeleton
              variant="text"
              width={250}
              height={40}
              sx={{ margin: "0 auto", mb: 1 }}
            />
            <Skeleton
              variant="text"
              width={200}
              height={30}
              sx={{ margin: "0 auto" }}
            />
          </>
        ) : (
          <>
            <Avatar
              alt={user?.username}
              sx={{
                width: 80,
                height: 80,
                margin: "0 auto",
                mb: 2,
                bgcolor: "#8ecae6",
              }}
            >
              {user?.username[0]}
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to your Dashboard
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {user?.username}, here are your projects and tasks.
            </Typography>
          </>
        )}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your Projects
        </Typography>

        <Grid container spacing={4}>
          {loading ? (
            Array.from(new Array(3)).map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Skeleton variant="rectangular" width="100%" height={200} />
              </Grid>
            ))
          ) : dashboardData.projects.length === 0 ? (
            <Alert
              sx={{ textAlign: "center", width: "100%" }}
              variant="outlined"
              severity="warning"
            >
              You have no projects yet.
              {user?.role === "admin" && (
                <Button
                  component={Link}
                  href="/projects/new"
                  variant="contained"
                  color="primary"
                >
                  Create New Project
                </Button>
              )}
            </Alert>
          ) : (
            dashboardData.projects.map((project) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
                <ProjectCard project={project} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <Box sx={{ mt: 6 }}>
        {dashboardData.projects.map((project) => (
          <Box key={project.id} sx={{ mt: 6 }}>
            {loading ? (
              <>
                <Skeleton
                  variant="text"
                  width={200}
                  height={30}
                  sx={{ mb: 2 }}
                />
                <Skeleton variant="rectangular" width="100%" height={300} />
              </>
            ) : (
              !!dashboardData.tasks[project.id]?.length && (
                <>
                  <Typography variant="h5" gutterBottom>
                    Tasks for {project.name}
                  </Typography>
                  <TaskTable
                    tasks={dashboardData.tasks[project.id] || []}
                    onStatusClick={handleUpdateStatusClick}
                  />
                </>
              )
            )}
          </Box>
        ))}
      </Box>

      {selectedTask && (
        <ConfirmDialog
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

export default DashboardPage;
