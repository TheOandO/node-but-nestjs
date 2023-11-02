import { Module } from "@nestjs/common";
import { TodoService } from "src/services/todos.service";
import { TodoController } from "src/controllers/todos.controller";
import { Todo, TodoSchema } from "../schemas/todos.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forFeature([
        {
            name: Todo.name,
            schema: TodoSchema
        },])
    ],
    controllers: [TodoController],
    providers: [TodoService]
})

export class TodoModule {}