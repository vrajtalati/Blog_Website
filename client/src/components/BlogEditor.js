import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Container, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createBlog } from '../features/blogSlice';

const BlogEditor = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(createBlog({ title, content, category }));
        setTitle('');
        setContent('');
        setCategory('');
    };

    return (
        <Container>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Travel">Travel</MenuItem>
                    <MenuItem value="Food">Food</MenuItem>
                    <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                </Select>
            </FormControl>
            <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={BlogEditor.modules}
                formats={BlogEditor.formats}
            />
            <Button variant="contained" onClick={handleSave} sx={{ marginTop: '20px' }}>
                Save
            </Button>
        </Container>
    );
};

BlogEditor.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
    ],
};

BlogEditor.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
];

export default BlogEditor;
