// src/components/BlogEditor.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Container, TextField, Button } from '@mui/material';

const BlogEditor = ({ initialData, onSave }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');

    const handleSave = () => {
        onSave({ title, content });
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
            <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={BlogEditor.modules}
                formats={BlogEditor.formats}
            />
            <Button variant="contained" onClick={handleSave}>
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
