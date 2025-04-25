import { Resend } from 'resend';
import { EmailTemplate } from '@/components';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST( req ) {
    try {
        const { email, message } = await req.json()

        const { data, error } = await resend.emails.send({
            from: 'COTAM App <onboarding@resend.dev>',
            to: [`${process.env.EMAIL_ADDRESS}`],
            subject: 'Feedback for COTAM APP',
            react: EmailTemplate({ email, message }),
        });

        console.log(data, error)
        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}