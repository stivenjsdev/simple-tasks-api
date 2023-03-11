import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() newTask: CreateTaskDto) {
    const { title, description } = newTask;
    return this.tasksService.createTask(title, description);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    this.tasksService.deleteTask(id);
    return {
      message: `Task with ID: ${id} deleted`,
    };
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() fieldsToUpdate: UpdateTaskDto) {
    return this.tasksService.updateTask(id, fieldsToUpdate);
  }
}
