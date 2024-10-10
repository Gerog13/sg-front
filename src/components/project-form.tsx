import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Project } from "@/types/project";
import { User } from "@/types/user";
import { getUsers } from "@/services/user-service";
import { useAuth } from "@/hooks/use-auth";

interface ProjectFormProps {
  onSubmit: (data: Partial<Project>) => void;
  initialData?: Partial<Project>;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, initialData }) => {
  const { control, handleSubmit, setValue } = useForm<Partial<Project>>({
    defaultValues: {
      ...initialData,
      name: initialData?.name || "",
      description: initialData?.description || "",
      start_date: initialData?.start_date || "",
      end_date: initialData?.end_date || "",
      user_id: initialData?.user_id || "",
    },
  });

  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (isAdmin) {
      const fetchUsers = async () => {
        const usersData = await getUsers();
        setUsers(usersData);
      };

      fetchUsers();
    } else {
      setValue("user_id", user?.id || "");
    }
  }, [isAdmin, setValue, user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Project Name"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Description"
              multiline
              rows={4}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="start_date"
          control={control}
          rules={{ required: "Start Date is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Start Date"
              type="date"
              slotProps={{
                inputLabel: { shrink: true },
              }}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="end_date"
          control={control}
          rules={{
            required: "End Date is required",
            validate: (value) =>
              (value && new Date(value) >= new Date()) ||
              "End Date cannot be in the past",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="End Date"
              type="date"
              slotProps={{
                inputLabel: { shrink: true },
              }}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="user_id"
          control={control}
          rules={{ required: "User is required" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error} disabled={!isAdmin}>
              <InputLabel id="user-select-label">Assigned User</InputLabel>
              <Select
                {...field}
                labelId="user-select-label"
                label="Assigned User"
                defaultValue={isAdmin ? "" : user?.id || ""}
              >
                {isAdmin ? (
                  users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={user?.id}>{user?.username}</MenuItem>
                )}
              </Select>
              {error && <p style={{ color: "red" }}>{error.message}</p>}
            </FormControl>
          )}
        />

        <Button type="submit" variant="contained" color="primary">
          {initialData ? "Update Project" : "Create Project"}
        </Button>
      </Box>
    </form>
  );
};

export default ProjectForm;
