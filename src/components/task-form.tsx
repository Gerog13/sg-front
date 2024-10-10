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
import { Task } from "@/types/task";
import { User } from "@/types/user";
import { getUsers } from "@/services/user-service";
import { useAuth } from "@/hooks/use-auth";

interface TaskFormProps {
  onSubmit: (data: Partial<Task>) => void;
  initialData?: Partial<Task>;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData }) => {
  const { control, handleSubmit, setValue } = useForm<Partial<Task>>({
    defaultValues: {
      ...initialData,
      name: initialData?.name || "",
      description: initialData?.description || "",
      status: initialData?.status || "pending",
      assigned_user_id: initialData?.assigned_user_id || "",
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
      setValue("assigned_user_id", user?.id || "");
    }
  }, [isAdmin, setValue, user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Task Title"
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
          name="status"
          control={control}
          rules={{ required: "Status is required" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select {...field} labelId="status-select-label" label="Status">
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
              {error && <p style={{ color: "red" }}>{error.message}</p>}
            </FormControl>
          )}
        />

        <Controller
          name="assigned_user_id"
          control={control}
          rules={{ required: "Assigned User is required" }}
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
          {initialData ? "Update Task" : "Create Task"}
        </Button>
      </Box>
    </form>
  );
};

export default TaskForm;
