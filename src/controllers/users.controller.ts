import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, UseGuards } from '@nestjs/common';
import { UserService } from 'src/services/users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import { createUserSchema } from '../schemas/joi-schema';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { MailService } from 'src/services/mail.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, private readonly mailService:MailService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new JoiValidationPipe(createUserSchema))
    create(@Body() createUserDto: CreateUserDto) {
        this.mailService.sendMailWelcomeUser(createUserDto.email, { name: createUserDto.username })
        return this.userService.create(createUserDto);
    };

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.userService.findAll();
    };

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    };

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        this.mailService.sendMailUpdate(updateUserDto.email, { name: updateUserDto.username })
        return this.userService.update(id, updateUserDto);
    };

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    };
};