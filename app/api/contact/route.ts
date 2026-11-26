import type { SendEmail } from '@cloudflare/workers-types';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, email, message } = body;

        if (typeof name !== 'string' || !name.trim() || typeof phone !== 'string' || !phone.trim()) {
            return NextResponse.json(
                { error: 'Name and Phone are required' },
                { status: 400 }
            );
        }

        const { CONTACT_EMAIL } = getCloudflareContext().env as { CONTACT_EMAIL: SendEmail };
        const from = process.env.CONTACT_FORM_FROM_EMAIL;
        const to = process.env.CONTACT_FORM_DESTINATION_EMAIL;
        if (!from || !to) {
            throw new Error('Contact form sender and destination must be configured');
        }

        await CONTACT_EMAIL.send({
            from,
            to,
            subject: `New Contact Form Submission from ${name.trim().replace(/[\r\n]+/g, ' ')}`,
            text: [
                `Name: ${name}`,
                `Phone: ${phone}`,
                `Email: ${typeof email === 'string' && email ? email : 'Not provided'}`,
                '',
                'Message:',
                typeof message === 'string' && message ? message : 'No message',
            ].join('\n'),
        });

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
