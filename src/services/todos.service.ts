import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/dto/update-todo.dto';
import { Todo, TodoDocument } from '../schemas/todos.schema';

@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo.name) private readonly todoModel: Model <TodoDocument>) {}

    /**
     * Create todo
     * @param createTodoDto 
     * @returns {Object} todo 
     */
    async create(createTodoDto: CreateTodoDto): Promise<TodoDocument> {
        const todo = new this.todoModel(createTodoDto);
        return todo.save();
    };

    /**
     * Find all todo
     * @returns {Object} todo
     */
    async findAll(): Promise<TodoDocument[]> {
        const todo = await this.todoModel.find().exec();
        if (!todo) {
            throw new Error('No todo')
        }
        return todo;
    };

    /**
     * Find todo by id
     * @param {Object} id 
     * @returns {Object} todo
     */
    async findOne(id: string): Promise<TodoDocument> {
        const todo = await this.todoModel.findById(id);
        if (!todo) {
            throw new Error('Todo not found');
        }
        return todo;
    };

    /**
     * Update a todo
     * @param {Object} id 
     * @param updateTodoDto 
     * @returns {Object} todo 
     */
    async update(id: string, updateTodoDto: UpdateTodoDto): Promise<TodoDocument> {
        const todo = await this.todoModel.findByIdAndUpdate(id, updateTodoDto);
        if (!todo) {
            throw new Error('Todo not found');
        }
        return todo
    };

    /**
     * Delete a todo
     * @param {Object} id 
     * @returns {Object} todo 
     */
    async remove(id: string) {
        const todo = await this.todoModel.findByIdAndDelete(id);
        if (!todo) {
            throw new Error('Todo not found');
        }
    };
};