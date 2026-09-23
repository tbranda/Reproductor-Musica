/*Exportá una interface de TypeScript llamada Track que defina los siguientes campos con tipado estricto (sin any):
    Un identificador unívoco (alfanumérico/string).
    Título de la canción.
    Nombre del artista o autor.
    URL directa al archivo de audio en streaming (.mp3).
    URL a la imagen de portada.
    Duración en segundos (numérico opcional o requerido, según prefieras)
*/
export interface Track {
  id: string;
  title: string;
  artist: string;
  uri: string;
  artwork: string;
  duration?: number;
}