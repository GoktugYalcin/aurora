import { SpotifyTrack } from '@/types';
import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const SPOTIFY_CREATE_PLAYLIST_ENDPOINT = `${SPOTIFY_API_BASE_URL}/users`;
const SPOTIFY_ADD_TRACKS_TO_PLAYLIST = `${SPOTIFY_API_BASE_URL}/playlists`;

async function getAccessToken(session: any): Promise<string | null> {
  return session?.accessToken ?? null;
}

export async function POST(req: NextRequest) {
  const { trackIds }: { trackIds: string[] } = await req.json();

  if (!trackIds || trackIds.length === 0) {
    return NextResponse.json(
      { error: 'No track IDs provided' },
      { status: 400 },
    );
  }

  const session = await getSession({ req });
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const accessToken = await getAccessToken(session);
  if (!accessToken) {
    return NextResponse.json(
      { error: 'Invalid or missing access token' },
      { status: 401 },
    );
  }

  try {
    const userResponse = await fetch(`${SPOTIFY_API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await userResponse.json();
    const userId = userData.id;

    const createPlaylistResponse = await fetch(
      `${SPOTIFY_CREATE_PLAYLIST_ENDPOINT}/${userId}/playlists`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'My Mood Playlist',
          description: 'A playlist created based on selected moods.',
          public: false,
        }),
      },
    );

    if (!createPlaylistResponse.ok) {
      throw new Error('Failed to create playlist');
    }

    const playlistData = await createPlaylistResponse.json();
    const playlistId = playlistData.id;

    const addTracksResponse = await fetch(
      `${SPOTIFY_ADD_TRACKS_TO_PLAYLIST}/${playlistId}/tracks`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: trackIds.map((trackId) => `spotify:track:${trackId}`),
        }),
      },
    );

    if (!addTracksResponse.ok) {
      throw new Error('Failed to add tracks to playlist');
    }

    const updatedPlaylistData = await addTracksResponse.json();
    return NextResponse.json(
      {
        message: 'Playlist created and tracks added successfully!',
        playlist: updatedPlaylistData,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error creating playlist:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
