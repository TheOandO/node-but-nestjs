import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';

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

    public async sendMailConfirm() {
        function getRndInteger(min:number, max:number) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        }
        await this.setTransport();
        this.mailerService
            .sendMail({
                to: 'dummy-reciever@gmail.com',
                from: this.configService.get('EMAIL_SEND_FROM'), // sender address
                subject: 'Verfication Code', // Subject line
                context: {
                    code: getRndInteger(111111, 999999)
                },
                template: './confirmation.ejs'
            })
            .then((success) => {
                console.log(success);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    public async sendMailWelcomeUser(to:string, context:any) {
        await this.setTransport();
        
        const mailOptions = {
            from: this.configService.get('EMAIL_SEND_FROM'),
            to,
            subject: 'Welkum',
            context,
            template: './welcome.ejs'
        }

        this.mailerService.sendMail(mailOptions)
        .then((success) => {
            console.log(success);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    public async sendMailUpdate(to:string, context:any) {
        await this.setTransport();
        
        const mailOptions = {
            from: this.configService.get('EMAIL_SEND_FROM'),
            to,
            subject: 'Your info has been updated',
            context,
            template: './updated.ejs'
        }

        this.mailerService.sendMail(mailOptions)
        .then((success) => {
            console.log(success);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    public async sendMailDelete(to:string, context:any) {
        await this.setTransport();
        
        const mailOptions = {
            from: this.configService.get('EMAIL_SEND_FROM'),
            to,
            subject: 'Your email has been deleted',
            context,
            template: './deleted.ejs'
        }

        this.mailerService.sendMail(mailOptions)
        .then((success) => {
            console.log(success);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    public async sendMail(mailOptions: Options) {
        mailOptions = {
            from: this.configService.get('EMAIL_SEND_FROM'),
        }
    }
}