import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Track } from "../types/track";

interface MiniPlayerProps {
  currentTrack: Track;
  isPlaying: boolean;
  onTogglePlayPause: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function MiniPlayer({
  currentTrack,
  isPlaying,
  onTogglePlayPause,
  onPrevious,
  onNext
}: MiniPlayerProps) {
    return (
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
          <View style={styles.controlsContainer}>
            <Pressable hitSlop={8} onPress={onPrevious}>
                <Ionicons name="play-skip-back" size={18} color="#fff" />
            </Pressable>
            <Pressable onPress={onTogglePlayPause}>
                <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={18}
                color="#fff"
                />
            </Pressable>
            <Pressable hitSlop={8} onPress={onNext}>
                <Ionicons name="play-skip-forward" size={18} color="#fff" />
            </Pressable>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
  playerBar: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  miniArtwork: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#181818",
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  playerTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  playerArtist: {
    color: "#a0a0a0",
    fontSize: 12,
    marginTop: 2,
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
