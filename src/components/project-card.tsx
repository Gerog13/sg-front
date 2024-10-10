import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { Project } from "@/types/project";
import Link from "next/link";
import { format } from "date-fns";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const formattedStartDate = format(
    new Date(project.start_date),
    "MMM dd, yyyy"
  );
  const formattedEndDate = format(new Date(project.end_date), "MMM dd, yyyy");

  return (
    <Card
      sx={{
        boxShadow: 4,
        borderRadius: 2,
        padding: 2,
        backgroundColor: "#ffffff",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
          {project.name}
        </Typography>

        <Typography color="textSecondary" sx={{ mb: 2 }}>
          {project.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CalendarTodayIcon fontSize="small" color="action" sx={{ mr: 1 }} />
            <Typography variant="body2" color="textSecondary">
              Start: {formattedStartDate}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EventAvailableIcon
              fontSize="small"
              color="action"
              sx={{ mr: 1 }}
            />
            <Typography variant="body2" color="textSecondary">
              End: {formattedEndDate}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            component={Link}
            href={`/projects/${project.id}`}
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
