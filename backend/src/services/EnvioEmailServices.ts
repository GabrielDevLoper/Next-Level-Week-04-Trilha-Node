import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';

class EnvioEmailsService {

    private cliente: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(conta => {
            const transporte = nodemailer.createTransport({
                host: conta.smtp.host,
                port: conta.smtp.port,
                secure: conta.smtp.secure,
                auth: {
                    user: conta.user,
                    pass: conta.pass,
                }
            });

            this.cliente = transporte;
        });
    }

    async execute(to: string, subject: string, variaveis: object, path: string) {
        const templateFileContent = fs.readFileSync(path).toString('utf8');
        
        const mailTemplateParse = handlebars.compile(templateFileContent);

        const html = mailTemplateParse(variaveis);

        const mensagem = await this.cliente.sendMail({
            to,
            subject,
            html,
            from: "NPS <noreply@nps.com.br>"
        });

        console.log(`Mensagem enviada: ${mensagem.messageId}`);
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(mensagem)}`);
    }
}

export default new EnvioEmailsService();