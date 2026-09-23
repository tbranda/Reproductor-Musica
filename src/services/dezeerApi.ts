import { Track } from "../types/track";

/*Armá la función asíncrona de búsqueda (searchDeezerTracks) con su bloque try / catch:

Consulta el endpoint: [https://api.deezer.com/search?q=$](https://api.deezer.com/search?q=$){encodeURIComponent(query)}.

Verifica response.ok.

Mapea la respuesta asegurando que cada propiedad del JSON de Deezer encaje en las propiedades de tu interfaz Track (por ejemplo, Deezer entrega el audio en item.preview y la imagen en item.album.cover_medium).

Filtra elementos que no tengan audio disponible para evitar fallos en el reproductor.*/

export async function searchDeezerTracks(query: string): Promise<Track[]>{
        
    try {
        const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`)
        if (!response.ok) {
            throw new Error(`Error en la búsqueda de tracks: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        const tracks: Track[] = data.data.map((item: any) => ({
            id: item.id.toString(),
            title: item.title,
            artist: item.artist.name,
            uri: item.preview,
            artwork: item.album.cover_medium,
            duration: item.duration
        })).filter((track: Track) => track.uri !== null && track.uri !== undefined);
        return tracks;

    } catch (error){
        console.error("Error en la búsqueda de tracks:", error);
        return [];
    }
}