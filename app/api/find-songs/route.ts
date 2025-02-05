import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { SpotifyTrack } from '@/types/spotify';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const SPOTIFY_API_URL = 'https://api.spotify.com/v1/search';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

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
    const { songs } = await req.json();

    if (!songs || !Array.isArray(songs)) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 },
      );
    }

    const results = [];

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
