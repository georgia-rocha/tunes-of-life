import * as React from 'react';

import { Dialog, DialogContent, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { GET_USER } from '../redux/actionTypes/user';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { MenuProps } from '../interfaces';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';

export default function EditProfile({
  open,
  onClose,
}: MenuProps) {
  const user = useSelector((rootReducer: any) => rootReducer.userReducer);
  const [editedUserData, setEditedUserData] = useState({
    name: user.name,
    password: user.password,
    image: user.image,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();

  const handleImageChange = (event: any): void => {
    const file = event.target.files[0];
    
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const imageUrl = reader.result;

      setEditedUserData({ ...editedUserData, image: imageUrl });      
    };
    reader.readAsDataURL(file);
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const handleSave = (): void => {
    event?.preventDefault();
    if (user) {
      dispatch({
        type: GET_USER,
        payload: editedUserData,
      });
      alert('Senha salva com sucesso!');
    };
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <IconButton
        aria-label="Fechar"
        style={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1.5rem',
          height: '80vh',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: '0.5rem' }}>
          Editar Perfil
        </Typography>
        <img
          src={selectedImage ? URL.createObjectURL(selectedImage) : editedUserData.image}
          alt="Perfil"
          style={{
            width: '9.3rem',
            height: '9.3rem',
            borderRadius: '50%',
            marginBottom: '0.5rem',
          }}
        />
        <label htmlFor="image-upload" style={{ cursor: 'pointer', marginBottom: '1rem', verticalAlign: 'middle', border: '1px solid #3e2723', padding: '0.3rem', borderRadius: '0.5rem' }}>
          <CameraAltIcon style={{ marginRight: '0.5rem' }} />
            Alterar Imagem
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </label>
        <TextField
          label="Nome"
          value={editedUserData.name}
          onChange={(e) =>
            setEditedUserData({ ...editedUserData, name: e.target.value })
          }
          fullWidth
          sx={{ marginBottom: '2rem', maxHeight: '3rem' }}
        />
        <TextField
          label="Nova Senha"
          type={showPassword ? 'text' : 'password'}
          value={editedUserData.password}
          onChange={(e) =>
            setEditedUserData({ ...editedUserData, password: e.target.value })
          }
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: '1rem', maxHeight: '3rem' }}
        />
        <button
          type="submit"
          className="bg-yellow-900 hover:bg-yellow-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSave}
        >
          Salvar
        </button>
      </DialogContent>
    </Dialog>
  );
};
