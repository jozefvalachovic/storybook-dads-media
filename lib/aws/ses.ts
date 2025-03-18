import { sesClient, SendEmailCommand } from "../aws";
// Variables
const noReplyEmail = process.env.AWS_SES_EMAIL as string;
const emailLogoUrl = process.env.EMAIL_LOGO_URL;

export async function passwordReset(toEmail: string, userName: string, code: string) {
  const emailSubject = "Request for Password Reset from Storybook Dads";
  const emailBody = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; color: #333333;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style=" margin: 0 auto;">
          <tr>
            <td style="padding: 20px; text-align: center; border-bottom: 2px solid #d4d4d4;">
              <img src="${emailLogoUrl}" alt="storybook-dads-logo" width="100" height="52" style="display: block; margin: 0 auto;">
            </td>
          </tr>
          <tr>
            <td style="padding: 20px;">
              <h1 style="margin: 20px 0 10px; font-size: 24px; color: #333333;">Hello ${userName},</h1>
              <p style="margin: 16px 0; font-size: 16px; line-height: 1.5;">You have requested to reset your password. Please use the following code to reset your password:</p>
              <p style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; letter-spacing: 5px;">${code}</p>
              <p style="margin: 16px 0; font-size: 16px; line-height: 1.5;">If you did not request this, please ignore this email.</p>
              <p style="margin: 16px 0; font-size: 16px; line-height: 1.5;">Thank you for using Storybook Dads.</p>
              <p style="margin: 16px 0; font-size: 16px; line-height: 1.5;">Best regards,<br>Storybook Dads Team</p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const emailParameters = {
    Destination: {
      ToAddresses: [toEmail],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailBody,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: emailSubject,
      },
    },
    ReturnPath: noReplyEmail,
    Source: `Storybook Dads <${noReplyEmail}>`,
  };

  const sendEmailCommand = new SendEmailCommand(emailParameters);
  const sendEmail = await sesClient.send(sendEmailCommand);

  return sendEmail;
}
