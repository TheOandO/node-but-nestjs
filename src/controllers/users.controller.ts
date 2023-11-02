import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes } from '@nestjs/common';
import { UserService } from 'src/services/users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import { createUserSchema } from '../schemas/joi-schema';
import { catchAsync } from 'src/middleware/catchAsync';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(new JoiValidationPipe(createUserSchema))
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    };

    @Get()
    findAll() {
        return this.userService.findAll();
    };

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    };

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    };

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    };
};