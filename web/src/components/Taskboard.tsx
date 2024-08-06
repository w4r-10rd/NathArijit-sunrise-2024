import React, { useEffect, useState } from 'react';
import { Button, List, Typography } from 'antd';
import { initializeTasks, getActiveTasks, getCompletedTasks, completeTask } from '@/modules/taskManager';
import { Task } from '@/model/Task';

const { Title } = Typography;

const Taskboard: React.FC = () => {
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  useEffect(() => {
    initializeTasks();
    setActiveTasks(getActiveTasks());
    setCompletedTasks(getCompletedTasks());
  }, []);

  const handleComplete = (taskTitle: string) => {
    completeTask(taskTitle);
    setActiveTasks(getActiveTasks());
    setCompletedTasks(getCompletedTasks());
  };

  return (
    <div>
      <Title level={2}>Active Tasks</Title>
      <List
        dataSource={activeTasks}
        renderItem={item => (
          <List.Item
            key={item.id} // Ensure each List.Item has a unique key
            actions={[
              <Button
                key={`complete-${item.id}`} // Ensure actions also have unique keys
                onClick={() => handleComplete(item.title)}
              >
                Complete
              </Button>
            ]}
          >
            {item.title} - {item.description}
          </List.Item>
        )}
      />
      <Title level={2}>Completed Tasks</Title>
      <List
        dataSource={completedTasks}
        renderItem={item => (
          <List.Item key={item.id}> {/* Ensure each List.Item has a unique key */}
            {item.title} - {item.description}
          </List.Item>
        )}
      />
    </div>
  );
};

export default Taskboard;
