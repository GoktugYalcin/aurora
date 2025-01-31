export interface SpotifyTrack {
  id: string;
  name: string;
  cover: string;
  artist: string;
  album: string;
  spotifyUrl: string;
}

export interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
  };
}

export interface CreatePlaylistRequestBody {
  songIds: string[];
  playlistName: string;
}

export interface CreatePlaylistResponse {
  playlistId: string;
  playlistName: string;
  playlistDescription: string;
  totalTracks: string;
  playlistUrl: string;
  playlistImage: string | null;
}
