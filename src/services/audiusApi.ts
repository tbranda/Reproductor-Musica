import type { Track } from '../types/track';

const APP_NAME = 'MiMusicPlayerApp';

export async function searchAudiusTracks(query: string): Promise<Track[]> {
  try {
    const url = `https://discoveryprovider.audius.co/v1/tracks/search?query=${encodeURIComponent(
      query
    )}&app_name=${APP_NAME}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const json = await res.json();

    return (json.data || []).map((item: any) => ({
      id: item.id,
      title: item.title,
      artist: item.user?.name || 'Artista',
      uri: `https://discoveryprovider.audius.co/v1/tracks/${item.id}/stream?app_name=${APP_NAME}`,
      artwork: item.artwork?.['480x480'] || item.artwork?.['150x150'] || '',
      duration: item.duration,
    }));
  } catch (error) {
    console.error('Error buscando en Audius:', error);
    return [];
  }
}