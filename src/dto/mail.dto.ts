import { Options } from "nodemailer/lib/smtp-transport"

export interface MailDto extends Options {
    to: string
    subject: string
    context: Record<string, any>
    template: string
}