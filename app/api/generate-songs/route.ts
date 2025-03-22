import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const supabase = await createClient();

  const aiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const { moods } = await req.json();

  if (!moods || !moods?.length) {
    return NextResponse.json({ error: 'No moods posted.' }, { status: 500 });
  }

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'An error occured.' }, { status: 401 });
  }

  let { data: user_data, error: supabase_error } = await supabase
    .from('tbl_users')
    .select('*')
    .eq('spotify_email', session.user.email)
    .single();

  if (supabase_error) {
    return NextResponse.json({ error: 'An error occured.' }, { status: 500 });
  } else if (!user_data) {
    const { error: create_error } = await supabase
      .from('tbl_users')
      .insert([{ spotify_email: session.user.email, generated_this_month: 0 }])
      .select();

    if (create_error) {
      return NextResponse.json(
        { error: 'User creation failed.', create_error },
        { status: 500 },
      );
    }
  } else if (user_data?.generated_this_month > 4) {
    return NextResponse.json(
      { error: 'Monthly limit exceeded.' },
      { status: 500 },
    );
  }

  try {
    const generationObject = z.object({
      listName: z.string(),
      songs: z.array(z.string()),
    });
    const completion = await aiClient.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `[${moods}] Based on these moods, generate a JSON object with 10 harmonizing song suggestions. Format: {listName: "[generated name]", songs:["[artist] - [song]"]}. Return raw JSON.`,
        },
      ],
    });

    const aiResult = completion.choices[0].message.content;

    return NextResponse.json({ data: aiResult }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: 'An error occured on generating songs.', e },
      { status: 500 },
    );
  }
}
