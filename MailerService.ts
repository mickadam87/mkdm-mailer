import { createTransport, Transporter } from "nodemailer";

export class MailerService {
  transporter: Transporter;
  sender: string;

  constructor(service: string, user: string, pass: string, sender: string) {
    this.sender = sender;
    this.transporter = createTransport({
      service,
      auth: {
        user,
        pass,
      },
    });
  }

  async sendEmail(receiver: string, subject: string, body: string) {
    try {
      const mailOptions = {
        from: this.sender, // sender address
        to: receiver, // list of receivers
        subject: subject, // Subject line
        html: body, // plain text body
      };
      this.transporter.sendMail(mailOptions, (err: Error, info: any) => {
        if (err) {
          console.log(err.message);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
