export interface Task {
  id: string;
  name: string,
  description: string;
  project_id: string;
  status: "pending" | "in progress" | "completed";
  assigned_user_id: string;
}
