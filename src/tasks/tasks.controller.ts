import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponse, BadRequestApiResponse, NotFoundApiResponse } from './api-response.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
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
  @ApiNotFoundResponse({ type: NotFoundApiResponse })
  deleteTask(@Param('id') id: string): ApiResponse {
    this.tasksService.deleteTask(id);
    return {
      message: `Task with ID: ${id} deleted`,
    };
  }

  @Patch(':id')
  @ApiBadRequestResponse({ type: BadRequestApiResponse })
  @ApiNotFoundResponse({ type: NotFoundApiResponse })
  updateTask(@Param('id') id: string, @Body() fieldsToUpdate: UpdateTaskDto) {
    return this.tasksService.updateTask(id, fieldsToUpdate);
  }
}
