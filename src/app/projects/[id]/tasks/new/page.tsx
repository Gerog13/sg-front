"use client";

import React from "react";
import { Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout";
import { Project } from "@/types/project";
import TaskForm from "@/components/task-form";
import { createTask } from "@/services/task-service";
import { Task } from "@/types/task";

interface NewTaskProps {
  params: { id: string };
}

const NewTaskPage: React.FC<NewTaskProps> = ({ params }) => {
  const router = useRouter();
  const projectId = params.id;

  const handleSubmit = async (data: Partial<Project>) => {
    try {
      await createTask({ ...data, project_id: projectId } as Omit<Task, "id">);
      router.push(`/projects/${projectId}`);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Task
      </Typography>
      <Box sx={{ mt: 3 }}>
        <TaskForm onSubmit={handleSubmit} />
      </Box>
    </Layout>
  );
};

export default NewTaskPage;
