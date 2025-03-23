import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

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
    const { error: create_error, data: create_data } = await supabase
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
  } else {
    const { error: update_error } = await supabase
      .from('tbl_users')
      .update({
        generated_this_month: parseInt(user_data.generated_this_month) + 1,
      })
      .eq('spotify_email', session.user.email)
      .select();

    if (update_error) {
      return NextResponse.json({ error: 'An error occured.' }, { status: 500 });
    }
  }
  try {
    const completion = await aiClient.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `[${moods}] I have this moods on my stash. Use this stash and give me one list and this list have exactly have 10 music suggestion to live the mood. Songs need to harmony with the mood. Just give the list as {listName: "[generate list name based on this selections]", songs:["artist name - song name"]}(any other props will not be accept obey the rule.) format result will be raw json`,
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
