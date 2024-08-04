// src/taskManager.ts

import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";



let tasks: Task[] = [...initialTasks];

export function initializeTasks() {
  tasks = [...initialTasks];
}

export function getActiveTasks(): Task[] {
  const completedGroups = new Set<number>();

  tasks.forEach(task => {
    if (task.completed) {
      completedGroups.add(task.group);
    }
  });

  let maxCompletedGroup = 0;
  for (const group of completedGroups) {
    if (group > maxCompletedGroup) {
      maxCompletedGroup = group;
    }
  }

  return tasks.filter(task => task.group <= maxCompletedGroup + 1 && !task.completed);
}

export function getCompletedTasks(): Task[] {
  return tasks.filter(task => task.completed);
}

export function getAllTasks(): Task[] {
  return tasks;
}

export function completeTask(taskTitle: string): void {
  const task = tasks.find(task => task.title === taskTitle);
  if (task) {
    task.completed = true;
  }
}

export function createTask(title: string, description: string, persona: string, group: number): void {
  const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
  tasks.push(new Task(id, title, description, persona, group));
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
  }
}

export function deleteTask(taskId: number): void {
  tasks = tasks.filter(task => task.id !== taskId);
}
