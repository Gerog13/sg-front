"use client";

import React from "react";
import { Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout";
import ProjectForm from "@/components/project-form";
import { createProject } from "@/services/project-service";
import { Project } from "@/types/project";

const NewProjectPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (data: Partial<Project>) => {
    try {
      await createProject(data as Omit<Project, "id">);
      router.push("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Project
      </Typography>
      <Box sx={{ mt: 3 }}>
        <ProjectForm onSubmit={handleSubmit} />
      </Box>
    </Layout>
  );
};

export default NewProjectPage;
