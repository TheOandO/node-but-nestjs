import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../services/mail.service';
import { MailController } from '../controllers/mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';

@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                transport: config.get('MAIL_TRANSPORT'),
                defaults: {
                    from: `"No Reply" <${config.get('EMAIL_SEND_FROM')}>`,
                },
                template: {
                    dir: join(__dirname, './templates'),
                    adapter: new EjsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            })
        }),
    ],
    providers: [MailService],
    controllers: [MailController],
    exports: [MailModule]
})

export class MailModule {}