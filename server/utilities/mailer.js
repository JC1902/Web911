const nodeMailer = require('nodemailer');
const mailConfig = require('../src/config/mailer.config');

const subject = `<h3>Actualización del estado de reparación de su vehiculo</h3>`;

const transporter = nodeMailer.createTransport({
    host: mailConfig.host,
    secure: true,
    port: mailConfig.port,
    auth: {
        user: mailConfig.mail,
        pass: mailConfig.password
    },
});

async function sendUpdateEmail(addresseeEmail, nombreCliente, vehiculo, estatusReparacion) {

    const basicTemplate = `
                            Hola, Señor(a): ${nombreCliente}.
                            Esperamos que se encuentre bien.

                            Le informamos que su vehiculo <b>${vehiculo}</b> ha pasado al proceso
                            de <b>${estatusReparacion}</b>. Le informarémos cuando su vehiculo se encuentre listo.
                        `;


    try {

        const mailInfo = await transporter.sendMail({

            from: `Automotriz 911 <${mailConfig.mail}>`,
            to: addresseeEmail,
            subject: subject,
            html: basicTemplate,
        });
    
        console.log('Información email: ', mailInfo.messageId);
        console.log('Emails enviados: ', mailInfo.accepted);
        console.log('Emails no alcanzados: ', mailInfo.rejected);

    } catch(error) {
        console.error("Error con el servicio de correos. Error: ", error);
        throw error;
    }
}

module.exports = sendUpdateEmail;