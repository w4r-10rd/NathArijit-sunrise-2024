import { Task } from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];

export function initializeTasks(): void {
  // Initialize the first task if it's not already active
  const firstTask = tasks.find(task => task.group === 1 && task.status === 'pending');
  if (firstTask) {
    firstTask.status = 'active';
  }
}

export function getActiveTasks(): Task[] {
  return tasks.filter(task => task.status === 'active');
}

export function getCompletedTasks(): Task[] {
  return tasks.filter(task => task.status === 'completed');
}

export function getAllTasks(): Task[] {
  return tasks;
}

export function completeTask(taskTitle: string): void {
  const taskIndex = tasks.findIndex(task => task.title === taskTitle);
  if (taskIndex !== -1) {
    tasks[taskIndex].status = 'completed';
    unlockNextTask(tasks[taskIndex].group);
  }
}

function unlockNextTask(currentGroup: number): void {
  const pendingTasksInGroup = tasks.filter(task => task.group === currentGroup && task.status === 'pending');
  
  if (pendingTasksInGroup.length === 0) {
    const nextGroupTasks = tasks.filter(task => task.group === currentGroup + 1);
    if (nextGroupTasks.length > 0) {
      nextGroupTasks[0].status = 'active';
    }
  }
}

export function createTask(title: string, description: string, persona: string, group: number): void {
  const newTask: Task = {
    id: tasks.length + 1,
    title,
    description,
    persona,
    group,
    status: 'pending',
  };
  tasks.push(newTask);
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
