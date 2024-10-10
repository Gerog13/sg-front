"use client";

import React, { useEffect, useState } from "react";
import { Typography, Box, Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout";
import ProjectForm from "@/components/project-form";
import { getProject, updateProject } from "@/services/project-service";
import { Project } from "@/types/project";

interface EditProjectPageProps {
  params: { id: string };
}

const EditProjectPage: React.FC<EditProjectPageProps> = ({ params }) => {
  const [project, setProject] = useState<Project | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProject(params.id);
        setProject(projectData);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [params.id]);

  const handleSubmit = async (data: Partial<Project>) => {
    try {
      await updateProject(params.id, data);
      router.push(`/projects/${params.id}`);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (!project) {
    return (
      <Layout>
        <Skeleton variant="text" width={300} height={40} sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" height={400} />
      </Layout>
    );
  }

  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Project: {project.name}
      </Typography>
      <Box sx={{ mt: 3 }}>
        <ProjectForm onSubmit={handleSubmit} initialData={project} />
      </Box>
    </Layout>
  );
};

export default EditProjectPage;
