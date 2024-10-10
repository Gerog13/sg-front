"use client";

import React, { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useAuth } from "@/hooks/use-auth";
import { getProjects } from "@/services/project-service";
import ProjectCard from "@/components/project-card";
import Layout from "@/components/layout";
import Link from "next/link";
import { Project } from "@/types/project";

const ProjectsPage: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Handle error (show message to user)
      }
    };

    fetchProjects();
  }, []);

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
          Projects
        </Typography>
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
      </Box>
      <Grid container spacing={3}>
        {projects.length === 0 ? ( 
          <Typography variant="h6" component="p">
            No projects available.
          </Typography>
        ) : (
          projects.map((project) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={project.id}
            >
              <ProjectCard project={project} />
            </Grid>
          ))
        )}
      </Grid>
    </Layout>
  );
};

export default ProjectsPage;
