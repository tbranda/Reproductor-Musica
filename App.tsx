import { useState } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import type { Track } from "./src/types/track";
import { searchAudiusTracks } from "./src/services/audiusApi";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import SearchBar from "./src/components/SearchBar";
import TrackItem from "./src/components/TrackItem";
import MiniPlayer from "./src/components/MiniPlayer";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  // Si currentTrack es null, le pasás null para que el player quede en standby
  const player = useAudioPlayer(currentTrack ? currentTrack.uri : null);
  const status = useAudioPlayerStatus(player);

  const handleSelectTrack = (track: Track) => {
    setCurrentTrack(track);
    player.replace(track.uri);
    player.play();
  };

  function handlePause() {
    status.playing === true ? player.pause() : player.play();
  }

  async function handleSearch() {
    const trimmedQuery = query.trim();

    if (trimmedQuery === "") {
      return;
    }

    setIsLoading(true);

    try {
      const results = await searchAudiusTracks(query.trim());
      setTracks(results);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSubmit={handleSearch}
      />
      {isLoading && <ActivityIndicator color="#1DB954" size="large" />}
      <StatusBar style="auto" />
      <FlatList
        style={styles.list}
        data={tracks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TrackItem
            track={item}
            isActive={currentTrack?.id === item.id && Boolean(status.playing)}
            onSelect={() => handleSelectTrack(item)}
          />
        )}
      />
      {currentTrack !== null && (
        <MiniPlayer
          currentTrack={currentTrack}
          isPlaying={status.playing}
          onTogglePlayPause={handlePause}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
    paddingTop: 50,
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
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 8,
  },
  list: {
    width: "100%",
    marginTop: 8,
  },
  trackRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
  },
  artwork: {
    width: 66,
    height: 66,
    marginRight: 12,
  },
  trackTitle: {
    fontWeight: "bold",
  },
  playerBar: {
    position: "absolute",
    bottom: 48,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  miniArtwork: {
    width: 52,
    height: 52,
    borderRadius: 8,
    marginBottom: 8,
  },
  playerInfo: {
    flex: 1,
  },
  playButton: {
    backgroundColor: "#49acee",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  PlayerTitle: {
    color: "#fff",
    fontWeight: "600",
    paddingBottom: 4,
    left: 10,
  },
  PlayerArtist: {
    color: "#ffff",
    left: 10,
  },
  PlayButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  currentTrack: {
    color: "#32b817",
  },
});
