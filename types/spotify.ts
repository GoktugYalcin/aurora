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
