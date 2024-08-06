export interface Task {
  id: number;
  title: string;
  description: string;
  persona: string;
  group: number;
  status: 'active' | 'pending' | 'completed';
}
