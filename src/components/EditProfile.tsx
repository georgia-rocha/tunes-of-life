import * as React from 'react';
import { Dialog, IconButton, InputAdornment } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { GET_USER } from '../redux/actionTypes/user';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { MenuProps } from '../interfaces';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import { IconButtonEdit, AvatarEdit, DialogEdit, TextFieldEdit, Tittle } from '../styles/EditProfile';
import '../app/globals.css';

const EditProfile: React.FC<MenuProps> = ({ open, onClose }) => {
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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <IconButtonEdit
        aria-label="Fechar"
        onClick={onClose}
      >
        <CloseIcon />
      </IconButtonEdit>
      <DialogEdit>
        <Tittle variant="h5">
          Editar Perfil
        </Tittle>
        <AvatarEdit
          src={selectedImage ? URL.createObjectURL(selectedImage) : editedUserData.image}
          alt="Perfil"
        />
        <label htmlFor="image-upload"
          className="label-container">
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
        <TextFieldEdit
          label="Nome"
          value={editedUserData.name}
          onChange={(e) =>
            setEditedUserData({ ...editedUserData, name: e.target.value })
          }
          fullWidth
        />
        <TextFieldEdit
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
        />
        <button
          type="submit"
          className="button-edit"
          onClick={handleSave}
        >
          Salvar
        </button>
      </DialogEdit>
    </Dialog>
  );
};

export default EditProfile;
