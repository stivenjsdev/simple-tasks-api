import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 } from 'uuid';
import { UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'first task',
      description: 'some task',
      status: TaskStatus.PENDING,
    },
    {
      id: '2',
      title: 'second task',
      description: 'some task',
      status: TaskStatus.DONE,
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
    const task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.PENDING,
    };
    this.tasks.push(task);

    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  updateTask(id: string, fieldsToUpdate: UpdateTaskDto): Task {
    const task = this.getTaskById(id);
    if(!task) {
      throw new HttpException(
        `Task with ID ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    const updatedTask = Object.assign(task, fieldsToUpdate);
    this.tasks = this.tasks.map((task) =>
      task.id === id ? updatedTask : task,
    );
    return updatedTask;
  }

  deleteTask(id: string): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new HttpException(
        `Task with ID ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.tasks.splice(taskIndex, 1);
  }
}
