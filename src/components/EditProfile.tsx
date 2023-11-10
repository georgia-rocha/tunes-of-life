import * as React from 'react';

import { Button, Dialog, DialogContent, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GET_USER } from '../redux/actionTypes/user';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { MenuProps } from '../interfaces';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';

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
  const [isEditingImage, setIsEditingImage] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleImageChange = (event: any): void => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const handleSave = () => {
    console.log('salvar');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1.5rem',
          height: '80vh',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
          Editar Perfil
        </Typography>
        <img
          src={selectedImage ? URL.createObjectURL(selectedImage) : editedUserData.image}
          alt="Perfil"
          style={{
            width: '9.3rem',
            height: '9.3rem',
            borderRadius: '50%',
            marginBottom: '1rem',
          }}
        />
        <label htmlFor="image-upload" style={{ cursor: 'pointer', marginBottom: '1.5rem', verticalAlign: 'middle' }}>
          <Button
            variant="outlined"
            component="span"
            sx={{ color: '#3e2723', border: '1px solid #3e2723' }}
            startIcon={<CameraAltIcon />}
            className="hover:text-yellow-950 hover:border-yellow-950 hover:bg-orange-50"
          >
            Alterar Imagem
          </Button>
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
          sx={{ marginBottom: '1rem', maxHeight: '3rem' }} // Defina um valor máximo de altura para o TextField
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
          sx={{ marginBottom: '1rem', maxHeight: '3rem' }} // Defina um valor máximo de altura para o TextField
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
}
