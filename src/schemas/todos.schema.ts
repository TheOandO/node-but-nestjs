import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ default: false })
    completed: boolean;

    @Prop({ type: String, ref: 'User', required: true })
    username: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);