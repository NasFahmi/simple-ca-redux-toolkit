import { Post } from '@/domain/entities/post/posts';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkApiConfig } from './store';


export const fetchPosts = createAsyncThunk<Post[], void, ThunkApiConfig>(
    'posts/fetchPosts',
    async (_, thunkApi) => {
        try {
            const postRepository = thunkApi.extra.postRepository; // Access postRepository from extra
            await postRepository.fetchAndCacheFromApi(); // Fetch data from API and cache it
            return await postRepository.getPosts();
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error; // Lempar error agar bisa ditangani di komponen yang memanggil thunk ini
        }
    }
)
// createAsyncThunk<return, parameter, ThunkApiConfig>
export const addPost = createAsyncThunk<Post[], { title: string, body: string }, ThunkApiConfig>(
    'posts/addPost',
    async ({ title, body }, thunkApi) => {
        try {
            const postRepository = thunkApi.extra.postRepository;
            await postRepository.addPost(title, body); // Ambil data dari API dan simpan ke cache
            return await postRepository.getPosts();
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error; // Lempar error agar bisa ditangani di komponen yang memanggil thunk ini
        }
    }
)
export const deletePost = createAsyncThunk<void, string, ThunkApiConfig>('posts/deletePost',
    async (postId, thunkApi) => {
        try {
            const postRepository = thunkApi.extra.postRepository;
            await postRepository.deletePost(postId); // Ambil data dari API dan simpan ke cache
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error; // Lempar error agar bisa ditangani di komponen yang memanggil thunk ini

        }
    }
)


interface PostState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

const initialState: PostState = {
    posts: [],
    loading: false,
    error: null,
};

//! diredux berbeda dengna zustand dia tidak dapat menerima object PostModel, atau serializable object, 
//! redux hanya bisa menerma object plain/ json plain, tidak bisa mernerima object class makanya 
//! ketika kita membuat redux kita tidak perlu membuat class PostModel, kita bisa langsung membuat interface Post
const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Posts
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.posts = action.payload;
                state.loading = false;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Add Post
            .addCase(addPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(addPost.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete Post
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default postSlice.reducer;