import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id): Promise<void> {
    return this.todoService.remove(id);
  }

  @Post()
  create(@Body('title') title: string): Promise<Todo> {
    return this.todoService.create(title);
  }

  @Patch(':id/update-title')
  updateTitle(@Param('id') id, @Body('title') title): Promise<Todo> {
    return this.todoService.updateTitle(id, title);
  }

  @Patch(':id/update-completeness')
  updateCompleteness(@Param('id') id, @Body('isCompleted') isCompleted): Promise<Todo> {
    return this.todoService.updateCompleteness(id, isCompleted);
  }
}
