import { usePostStore } from '@/hooks/usePostStore';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

export default function PostListScreen() {
  const router = useRouter();
  const { posts, loading, error, handleFetchPosts, handleDeletePosts } = usePostStore();

  useEffect(() => {
    handleFetchPosts();
  }, []);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button title="Create Post" onPress={() => router.push('/post/create')} />
        <Button title="Sync from API" onPress={handleFetchPosts} />
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text>{item.body}</Text>
            <Button title="Delete" onPress={() => handleDeletePosts(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  postItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
