import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/dto/update-todo.dto';
import { Todo, TodoDocument } from '../schemas/todos.schema';

@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo.name) private readonly todoModel: Model <TodoDocument>) {}

    async create(createTodoDto: CreateTodoDto): Promise<TodoDocument> {
        const todo = new this.todoModel(createTodoDto);
        return todo.save();
    };

    async findAll(): Promise<TodoDocument[]> {
        return this.todoModel.find().exec();
    };

    async findOne(id: string): Promise<TodoDocument> {
        return this.todoModel.findById(id);
    };

    async update(id: string, updateTodoDto: UpdateTodoDto): Promise<TodoDocument> {
        return this.todoModel.findByIdAndUpdate(id, updateTodoDto);
    };

    async remove(id: string) {
        return this.todoModel.findByIdAndDelete(id);
    };
};