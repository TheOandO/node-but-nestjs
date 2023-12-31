import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { User, UserDocument } from '../schemas/users.schema';
import { MailService } from 'src/services/mail.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model <UserDocument>, private readonly mailService: MailService) {}

    /**
     * Create user
     * @param createUserDto 
     * @returns {Object} user 
     */
    async create(createUserDto: CreateUserDto){
        const { username, password, email } = createUserDto

        try {
            // Hash the password before saving it
            const hashdPass = await bcrypt.hash(password, 10);

            const user = new this.userModel({ username, email, password: hashdPass });

            await this.mailService.sendUserMail(user.email, 'create')

            return user.save();
        } catch (error) {
            // Check for unique username constraint error
            if (error.code === 11000 && error.keyPattern.username) {
                throw new Error('Username is already in use');
            }
            throw error; // Rethrow other errors
        }
    };

    /**
     * Find all user
     * @returns {Object} user
     */
    async findAll() {
        const user = await this.userModel.find().exec();
        if (!user) {
            throw new Error('No user')
        }
        return user;
    };

    /**
     * Find user by id
     * @param {Object} id 
     * @returns {Object} user
     */
    async findOne(id: string) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new Error('User not found')
        }
        return user;
    };

    /**
     * Update a user
     * @param {Object} id 
     * @param updateUserDto 
     * @returns {Object} user
     */
    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id)
        if (!user) {
            throw new Error('User not found');
        }
        const { username, password, email } = updateUserDto

        if (password) {
            const hashdPass = await bcrypt.hash(password, 10);

            await this.mailService.sendUserMail(updateUserDto.email, 'update')

            return this.userModel.findByIdAndUpdate(id, { username, password: hashdPass, email }, {new: true}).exec();
        };

        await this.mailService.sendUserMail(updateUserDto.email, 'update')

        return this.userModel.findByIdAndUpdate(id, updateUserDto);
    };

    /**
     * Delete a user
     * @param {Object} id 
     * @returns {Object} user 
     */
    async remove(id: string) {
        const user = await this.findOne(id)
        if (!user) {
            throw new Error('User not found');
        }
        await this.mailService.sendUserMail(user.email, 'delete')

        return this.userModel.findByIdAndDelete(id);
    };

    /**
     * Find user by username
     * @param username 
     * @returns user
     */
    async findByUsername(username: string){
        const user = await this.userModel.findOne({ username }).exec();
        if (!user) {
            throw new Error('User not found')
        }
        return user;
    }
};