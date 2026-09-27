import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { Track } from '../types/track';

interface TrackItemProps {
  track: Track;
  isActive: boolean;
  onSelect: () => void;
}

export default function TrackItem({ track, isActive, onSelect }: TrackItemProps) {
  return (
    <Pressable onPress={onSelect}>
      <View style={[styles.trackRow, isActive && styles.activeTrackRow]}>
        <Image source={{ uri: track.artwork }} style={styles.artwork} />
        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            style={[styles.trackTitle, isActive && styles.currentTrack]}
          >
            {track.title}
          </Text>
          <Text numberOfLines={1} style={styles.trackArtist}>
            {track.artist}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  activeTrackRow: {
    backgroundColor: 'rgba(50, 184, 23, 0.1)',
    borderRadius: 8,
  },
  artwork: {
    width: 56,
    height: 56,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: '#2a2a2a',
  },
  textContainer: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  currentTrack: {
    color: '#32b817', // Verde destacado al reproducir
  },
  trackArtist: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 2,
  },
});