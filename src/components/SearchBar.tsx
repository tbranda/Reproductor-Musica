import { StyleSheet, View, Text, TextInput } from "react-native" 


interface SearchBarProps{
    value: string,
    onChangeText: (text: string) => void;
    onSubmit: () => void;
}

export default function SearchBar({value, onChangeText, onSubmit}: SearchBarProps) {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Buscar música</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
                placeholder="Escribí una canción o artista"
                placeholderTextColor="#777"
                returnKeyType="search"
            />
        </View>
    );    
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
  },
});