import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Todo } from './todos.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    email: string;

    @Prop({ type: ({ type: MongooseSchema.Types.ObjectId, ref: 'todos' }) })
    todos: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);
