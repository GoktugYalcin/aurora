import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic'; // no caching
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'An error occured' }, { status: 401 });
  }

  let {
    data: user_data,
    error: supabase_error,
    count,
  } = await supabase
    .from('tbl_users')
    .select('*')
    .eq('spotify_email', session.user.email)
    .single();

  if (supabase_error) {
    return NextResponse.json({ error: 'An error occured' }, { status: 401 });
  }

  return NextResponse.json({ data: user_data }, { status: 200 });
}
