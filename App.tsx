import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import type { Track } from "./src/types/track";
import { searchDeezerTracks } from "./src/services/dezeerApi";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  // Si currentTrack es null, le pasás null para que el player quede en standby
  const player = useAudioPlayer(currentTrack ? currentTrack.uri : null);
  const status = useAudioPlayerStatus(player);

  function handleSelectTrack(track: Track) {
    setCurrentTrack(track);
    player.replace(track.uri);
    player.play();
  }

  function handlePause() {
    status.isPlaying === true ? player.pause() : player.play();
  }

  async function handleSearch() {
    const trimmedQuery = query.trim();

    if (trimmedQuery === "") {
      return;
    }

    setIsLoading(true);

    try {
      const results = await searchDeezerTracks(trimmedQuery);
      setTracks(results);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar música</Text>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        placeholder="Escribí una canción o artista"
        returnKeyType="search"
      />
      {isLoading && <ActivityIndicator color="#1DB954" size="large" />}
      <StatusBar style="auto" />
      <FlatList
        style={styles.list}
        data={tracks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80}}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleSelectTrack(item)}>
            <View style={styles.trackRow}>
              <Image source={{ uri: item.artwork }} style={styles.artwork} />
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={styles.trackTitle}>
                  {item.title}
                </Text>
                <Text numberOfLines={1}>{item.artist}</Text>
              </View>
            </View>
          </Pressable>
        )}
      />
      {currentTrack !== null && (
        <View style={styles.playerBar}>
          <Image
            source={{ uri: currentTrack.artwork }}
            style={styles.miniArtwork}
          />
          <View style={styles.playerInfo}>
            <Text numberOfLines={1} style={styles.playerTitle}>
              {currentTrack.title}
            </Text>
            <Text numberOfLines={1} style={styles.playerArtist}>
              {currentTrack.artist}
            </Text>
          </View>
          <Pressable style={styles.playButton} onPress={handlePause}>
            <Text style={styles.playButtonText}>
              {status.isPlaying ? "Pausa" : "Play"}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  list: {
    width: "100%",
    marginTop: 16,
  },
  trackRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  artwork: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  trackTitle: {
    fontWeight: "600",
  },
  playerBar:{ 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#181818', 
    padding: 12, 
    borderTopWidth: 1, 
    borderTopColor: '#333'
  },
  miniArtwork: {
    width: 42,
    height: 42,
  },
  playerInfo: {
    flex: 1,
  },
  playButton:{
    backgroundColor: '#49acee',
    paddingHorizontal: 12,
    paddingVertical: 6,
  }

});
