import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly usersRepository: Repository<Todo>,
  ) {}

  create(title: string): Promise<Todo> {
    const todo = new Todo();
    todo.title = title;
    return this.usersRepository.save(todo);
  }

  async save(todo: Todo): Promise<Todo> {
    return this.usersRepository.save(todo);
  }

  findAll(): Promise<Todo[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<Todo> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async updateTitle(id: string, title: string): Promise<Todo> {
    const todo = await this.usersRepository.findOneOrFail(id);
    todo.title = title;
    return this.usersRepository.save(todo);
  }

  async updateCompleteness(id: string, isCompleted: boolean): Promise<Todo> {
    const todo = await this.usersRepository.findOneOrFail(id);
    todo.isCompleted = isCompleted;
    return this.usersRepository.save(todo);
  }
}
