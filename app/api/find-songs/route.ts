import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { SpotifyTrack } from '@/types/spotify';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const SPOTIFY_API_URL = 'https://api.spotify.com/v1/search';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const supabase = await createClient();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'An error occured.' }, { status: 401 });
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
    return NextResponse.json({ error: 'An error occured.' }, { status: 401 });
  } else if (user_data?.generated_this_month > 4) {
    return NextResponse.json({ error: 'An error occured.' }, { status: 401 });
  }

  const { data } = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: session?.refreshToken ?? '',
    }).toString(),
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { songs, listName } = await req.json();

    if (!songs || !Array.isArray(songs)) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 },
      );
    }

    const results = [];
    const songIds = [];

    for (const song of songs) {
      const response = await fetch(
        `${SPOTIFY_API_URL}?q=${encodeURIComponent(song)}&type=track&limit=1`,
        {
          headers: {
            Authorization: `Bearer ${data.access_token ?? session.accessToken}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        if (data.tracks.items.length > 0) {
          const track = data.tracks.items[0];
          songIds.push(track.id);
          results.push({
            name: track.name,
            id: track.id,
            artist: track.artists.map((artist: any) => artist.name).join(', '),
            album: track.album.name,
            cover: track.album.images[0]?.url || null,
            spotifyUrl: track.external_urls.spotify,
          });
        }
      }
    }

    const { error: generate_list_error } = await supabase
      .from('tbl_generated_lists')
      .insert([
        { user_id: session.user.email, songs: songIds, list_name: listName },
      ])
      .select();

    if (generate_list_error) {
      return NextResponse.json({ error: generate_list_error }, { status: 500 });
    }

    return NextResponse.json(
      { songs: results as SpotifyTrack[] },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
