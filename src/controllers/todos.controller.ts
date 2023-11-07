import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes } from '@nestjs/common';
import { TodoService } from 'src/services/todos.service';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/dto/update-todo.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import { createTodoSchema } from 'src/schemas/joi-schema';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    @UsePipes(new JoiValidationPipe(createTodoSchema))
    create(@Body() createTodoDto: CreateTodoDto) {
        return this.todoService.create(createTodoDto);
    };

    @Get()
    findAll() {
        return this.todoService.findAll();
    };

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.todoService.findOne(id);
    };

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        return this.todoService.update(id, updateTodoDto);
    };

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.todoService.remove(id);
    };
};