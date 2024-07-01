import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createBlog = createAsyncThunk('blogs/createBlog', async (blog, { getState }) => {
    const state = getState();
    const token = state.user.token; // Ensure you correctly access the token from the Redux store

    const response = await fetch('https://blog-backend-3-d071.onrender.com/api/blogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(blog),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create blog');
    }

    const data = await response.json();
    return data;
});

const blogSlice = createSlice({
    name: 'blogs',
    initialState: {
        blogs: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBlog.fulfilled, (state, action) => {
                state.blogs.push(action.payload);
            })
            .addCase(fetchBlogs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
    const response = await fetch('https://blog-backend-3-d071.onrender.com/api/blogs');
    const data = await response.json();
    return data;
});

export default blogSlice.reducer;
