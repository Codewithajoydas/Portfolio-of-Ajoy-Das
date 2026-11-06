import {Resend}  from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendEmail = async (
  name: string,
  email: string,
  message: string,
  subject: string
) => {
  await resend.emails.send({
    from: "Ajoy Das <ajoydas@codewithajoydas.in>",
    to: [
      "ajoydas@codewithajoydas.in",
      "ajoydas@codewithajoydas.in",
    ],
    replyTo: email,
    subject: "New message from codewithajoydas.in",
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b; background-color: #ffffff;">
        <div style="padding-bottom: 20px; border-bottom: 2px solid #1d4ed8;">
          <h2 style="margin: 0; font-size: 22px; color: #1d4ed8;">
            New Portfolio Inquiry
          </h2>
          <p style="margin: 8px 0 0; font-size: 14px; color: #71717a;">
            You have received a new message through your portfolio website.
          </p>
        </div>
        <div style="padding: 24px 0;">
          <h3 style="margin: 0 0 18px; font-size: 16px; color: #18181b;">
            Contact Information
          </h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; color: #71717a; width: 100px;">Name</td>
              <td style="padding: 10px 0; color: #18181b; font-weight: 600;">
                ${name}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #71717a;">Email</td>
              <td style="padding: 10px 0;">
                <a href="mailto:${email}" style="color: #1d4ed8; text-decoration: none;">
                  ${email}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #71717a;">Subject</td>
              <td style="padding: 10px 0; color: #18181b; font-weight: 600;">
                ${subject}
              </td>
            </tr>
          </table>
        </div>
        <div style="padding: 20px; background-color: #f4f4f5; border-left: 3px solid #1d4ed8;">
          <h3 style="margin: 0 0 12px; font-size: 16px; color: #18181b;">
            Message
          </h3>
          <p style="margin: 0; font-size: 14px; line-height: 1.8; color: #3f3f46; white-space: pre-wrap; overflow-wrap: anywhere;">
            ${message}
          </p>
        </div>
        <div style="padding-top: 24px; margin-top: 24px; border-top: 1px solid #e4e4e7;">
          <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #a1a1aa; text-align: center;">
            This email was sent through
            <a href="https://codewithajoydas.in" style="color: #1d4ed8; text-decoration: none;">
              codewithajoydas.in
            </a>
          </p>
        </div>
      </div>
    `,
  });
};

