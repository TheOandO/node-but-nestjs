import { Controller, Get } from '@nestjs/common';
import { MailService } from '../services/mail.service';

@Controller('mail')
export class MailController {
    constructor(readonly mailService: MailService) {}

    @Get('send-mail')
    public sendMail() {
        this.mailService.sendMailCode();
    }
}