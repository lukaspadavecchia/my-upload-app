// src/components/FileList.tsx
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const FileList: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);

  useEffect(() => {
    // Fetch files from API
    const fetchFiles = async () => {
      try {
        const response = await axios.get('/api/files');
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleDelete = async (fileId: string) => {
    try {
      await axios.delete(`/api/files/${fileId}`);
      setFiles(files.filter(file => file.id !== fileId));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleEdit = (file: any) => {
    setSelectedFile(file);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/files/${selectedFile.id}`, selectedFile);
      setFiles(files.map(file => file.id === selectedFile.id ? selectedFile : file));
      handleClose();
    } catch (error) {
      console.error('Error saving file:', error);
    }
  };

  return (
    <div>
      <h2>File List</h2>
      <ul>
        {files.map(file => (
          <li key={file.id}>
            {file.name}
            <Button onClick={() => handleEdit(file)}><Edit /></Button>
            <Button onClick={() => handleDelete(file.id)}><Delete /></Button>
          </li>
        ))}
      </ul>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit File</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="File Name"
            type="text"
            fullWidth
            variant="standard"
            value={selectedFile?.name || ''}
            onChange={(e) => setSelectedFile({ ...selectedFile, name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FileList;
