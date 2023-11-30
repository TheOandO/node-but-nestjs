import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';
import { MailDto } from '../dto/mail.dto'
import { SentMessageInfo } from 'nodemailer';
@Injectable()
export class MailService {
    constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    ) {}

    private async setTransport() {
        const OAuth2 = google.auth.OAuth2;
        const oauth2Client = new OAuth2(
            this.configService.get('GMAIL_CLIENT_ID'),
            this.configService.get('GMAIL_CLIENT_SECRET'),
        );
    
        oauth2Client.setCredentials({
            refresh_token: process.env.GMAIL_REFRESH_TOKEN,
        });
    
        const accessToken: string = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject('Failed to create access token');
            }
            resolve(token);
            });
        });
    
        const config: Options = {
            service: this.configService.get('GMAIL_SERVICE'),
            auth: {
                type: 'OAuth2',
                user: this.configService.get('EMAIL_SEND_FROM'),
                clientId: this.configService.get('GMAIL_CLIENT_ID'),
                clientSecret: this.configService.get('GMAIL_CLIENT_SECRET'),
                accessToken,
        }};
        this.mailerService.addTransporter(this.configService.get('GMAIL_SERVICE'), config);
    }

    public async userMailFrame(mailDto: MailDto): Promise<SentMessageInfo> {
        await this.setTransport()
        const mailOptions: ISendMailOptions = {
            from: this.configService.get('EMAIL_SEND_FROM'),
            to: mailDto.to,
            subject: mailDto.subject,
            context: mailDto.context,
            template: mailDto.template
        }

        return this.mailerService.sendMail(mailOptions)
    }

    public async sendUserMail(email: string, operation: string): Promise<SentMessageInfo> {
        let subject: string
        let template: string
        switch (operation) {
            case 'create':
                subject = 'Welcome to Your App';
                template = 'welcome.ejs'; 
                break;
            case 'update':
                subject = 'Profile Updated';
                template = 'updated.ejs'; 
                break;
            case 'delete':
                subject = 'Account Deleted';
                template = 'deleted.ejs'; 
                break;
            default:
                throw new Error('Invalid operation');
        }
    
        const mailDto: MailDto = {
            to: email,
            subject,
            context: { /* Additional context data if needed */ },
            template,
        };
    
        return this.userMailFrame(mailDto);
    }
}