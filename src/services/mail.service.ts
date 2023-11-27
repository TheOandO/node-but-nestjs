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
            this.configService.get('CLIENT_ID'),
            this.configService.get('CLIENT_SECRET'),
            'https://developers.google.com/oauthplayground',
        );
    
        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN,
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
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: this.configService.get('EMAIL'),
                clientId: this.configService.get('CLIENT_ID'),
                clientSecret: this.configService.get('CLIENT_SECRET'),
                accessToken,
        }};
        this.mailerService.addTransporter('gmail', config);
    }

    public async sendMailConfirm() {
        function getRndInteger(min:number, max:number) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        }
        await this.setTransport();
        this.mailerService
            .sendMail({
                transporterName: 'gmail',
                to: 'dummy-reciever@gmail.com',
                from: 'noreply@nestjs.com', // sender address
                subject: 'Verfication Code', // Subject line
                context: {
                    code: getRndInteger(111111, 999999)
                },
                template: './confirmation'
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
            transporterName: 'gmail',
            from: 'noreply@nestjs.com',
            to,
            subject: 'Welkum',
            context,
            template: './welcome'
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
            transporterName: 'gmail',
            from: 'noreply@nestjs.com',
            to,
            subject: 'Your info has been updated',
            context,
            template: './updated'
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
            transporterName: 'gmail',
            from: 'noreply@nestjs.com',
            to,
            subject: 'Your email has been deleted',
            context,
            template: './deleted'
        }

        this.mailerService.sendMail(mailOptions)
        .then((success) => {
            console.log(success);
        })
        .catch((err) => {
            console.log(err);
        });
    }
}
