import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { User, UserDocument } from '../schemas/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model <UserDocument>) {}

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const { username, password, email } = createUserDto

        try {
            // Hash the password before saving it
            const hashdPass = await bcrypt.hash(password, 10);

            const user = new this.userModel({ username, email, password: hashdPass });
            return user.save();
        } catch (error) {
            // Check for unique username constraint error
            if (error.code === 11000 && error.keyPattern.username) {
                throw new Error('Username is already in use');
            }
            throw error; // Rethrow other errors
        }
    };

    async findAll(): Promise<UserDocument[]> {
        return this.userModel.find().exec();
    };

    async findOne(id: string): Promise<UserDocument> {
        return this.userModel.findById(id);
    };

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
        const { username, password, email } = updateUserDto

        if (password) {
            const hashdPass = await bcrypt.hash(password, 10);
            return this.userModel.findByIdAndUpdate(id, { username, password: hashdPass, email }, {new: true}).exec();
        };

        return this.userModel.findByIdAndUpdate(id, updateUserDto);
    };

    async remove(id: string) {
        return this.userModel.findByIdAndDelete(id);
    };
};