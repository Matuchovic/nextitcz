import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  project_type: z.string().min(1),
  message: z.string().min(10),
  company: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    // Forward to FastAPI backend, or handle directly with Supabase/Resend
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    }

    // Send confirmation email via Resend (optional)
    // await resend.emails.send({ ... });

    return NextResponse.json({ message: 'Zpráva odeslána úspěšně.' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Neplatná data formuláře.', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Interní chyba serveru.' }, { status: 500 });
  }
}
