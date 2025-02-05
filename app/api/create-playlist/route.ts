import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  CreatePlaylistRequestBody,
  CreatePlaylistResponse,
} from '@/types/spotify';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { songIds, playlistName }: CreatePlaylistRequestBody = await req.json();

  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!songIds || !Array.isArray(songIds) || songIds.length === 0) {
    return NextResponse.json({ error: 'Invalid song IDs' }, { status: 400 });
  }

  if (!playlistName) {
    return NextResponse.json(
      { error: 'Playlist name is missing' },
      { status: 400 },
    );
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

  try {
    const playlistResponse = await fetch(
      'https://api.spotify.com/v1/me/playlists',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${data.access_token ?? session.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playlistName,
          description: 'Generated playlist from selected songs',
          public: false,
        }),
      },
    );

    if (!playlistResponse.ok) {
      throw new Error('Failed to create playlist');
    }

    const playlistData = await playlistResponse.json();
    const playlistId = playlistData.id;

    const addSongsResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${data.access_token ?? session.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: songIds.map((id) => `spotify:track:${id}`),
        }),
      },
    );

    if (!addSongsResponse.ok) {
      throw new Error('Failed to add songs to playlist');
    }

    const addSongsData = await addSongsResponse.json();

    const playlistImageResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/images`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.access_token ?? session.accessToken}`,
        },
      },
    );

    let playlistImage = null;
    if (playlistImageResponse.ok) {
      const images = await playlistImageResponse.json();
      if (images.length > 0) {
        playlistImage = images[0].url;
      }
    }

    const playlistUrl = `https://open.spotify.com/playlist/${playlistId}`;

    const responseBody: CreatePlaylistResponse = {
      playlistId,
      playlistName: playlistData.name,
      playlistDescription: playlistData.description,
      totalTracks: addSongsData.snapshot_id,
      playlistImage,
      playlistUrl,
    };

    return NextResponse.json(responseBody);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
