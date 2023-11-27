import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../services/mail.service';
import { MailController } from '../controllers/mail.controller';
@Module({
    
    imports: [],
    providers: [MailService, ConfigService],
    controllers: [MailController],
    exports: [MailModule]
})

export class MailModule {}
