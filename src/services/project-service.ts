import { api } from './api';
import { Project } from '@/types/project';

export const getProjects = async (): Promise<Project[]> => {
  return api('/projects');
};

export const getProject = async (id: string): Promise<Project> => {
  return api(`/projects/${id}`);
};

export const createProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
  return api('/projects', 'POST', projectData);
};

export const updateProject = async (id: string, projectData: Partial<Project>): Promise<Project> => {
  return api(`/projects/${id}`, 'PUT', projectData);
};

export const deleteProject = async (id: string): Promise<void> => {
  return api(`/projects/${id}`, 'DELETE');
};