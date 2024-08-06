// src/components/FileUpload.tsx
"use client"; // Asegúrate de que esto esté presente si estás usando useState

import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Upload } from '@mui/icons-material';

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      // Mostrar modal de confirmación
      setOpen(true);

      // Simulamos la llamada API a httpbin para la carga
      const formData = new FormData();
      formData.append('file', file);

      // Prueba con httpbin para asegurarte de que el POST funciona
      await axios.post('https://httpbin.org/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Llamada a API de terceros cuando la carga tiene éxito
      await axios.post('https://httpbin.org/post', { fileName: file.name });

      // Cerrar modal y limpiar estado
      setOpen(false);
      setFile(null);
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
      await axios.post('https://httpbin.org/post', { fileName: file.name });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={!file} startIcon={<Upload />}>
        Upload
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Upload</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to upload this file?</p>
          <p>{file?.name}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleUpload}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FileUpload;
