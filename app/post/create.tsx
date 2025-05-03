// src/app/post/create.tsx
import { usePostStore } from '@/hooks/usePostStore';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';

export default function CreatePostScreen() {
  const router = useRouter();
  const { handleAddPosts } = usePostStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onSubmit = async () => {
    if (!title || !content) {
      Alert.alert('Validation', 'Judul dan konten tidak boleh kosong.');
      return;
    }

    await handleAddPosts(title, content);
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Content"
        style={styles.input}
        value={content}
        onChangeText={setContent}
      />
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 12,
    padding: 8,
  },
});
