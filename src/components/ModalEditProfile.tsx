import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { updateUser as updateUserAPI } from "@/services/routes"; 
import './css/ModalEditProfile.css';

const ModalEditProfile: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onSaveSuccess,
  onOpenDeleteModal,
}) => {
  const { token } = useAuth();
  const [exibitionName, setExibitionName] = useState(user?.exibitionName || "");
  const [userName, setUserName] = useState(user?.userName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | undefined>(user?.profilePicture || "/img/user-null.png");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setExibitionName(user.exibitionName || "");
      setUserName(user.userName || "");
      setEmail(user.email || "");
      setProfilePicturePreview(user.profilePicture || "/img/user-null.png");
      setErrorMessage(null);
      setSuccessMessage(null);
    } else {
      setExibitionName("");
      setUserName("");
      setEmail("");
      setProfilePictureFile(null);
      setProfilePicturePreview("/img/user-null.png");
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [user, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setProfilePictureFile(file || null);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePicturePreview(user?.profilePicture || "/img/user-null.png");
    }
  };

  const handleSave = async () => {
    if (!user?.id || !token) {
      setErrorMessage("Não autenticado.");
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const formData = new FormData();
    formData.append('exibitionName', exibitionName);
    formData.append('userName', userName);
    if (profilePictureFile) {
      formData.append('profilePicture', profilePictureFile);
    }
    if (email !== user?.email) {
      formData.append('email', email);
    }

    try {
      const responseData = await updateUserAPI(user.id, formData);

      setSuccessMessage("Perfil atualizado com sucesso!");
      setIsSaving(false);
      onSaveSuccess(responseData);
      onClose();
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || "Ocorreu um erro ao tentar salvar suas alterações.");
      setIsSaving(false);
    }
  };

  const handleOpenDeleteModalClick = () => {
    onClose();
    onOpenDeleteModal();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="title-container">
            <div className="title">Editar Seu Perfil</div>
          </div>
          <button onClick={onClose} className="close-button">
            &#10006;
          </button>
        </div>

        <div className="modal-body">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <div className="form-group">
            <label htmlFor="exibitionName" className="form-label">
              Nome de exibição *
            </label>
            <input
              type="text"
              className="form-input"
              value={exibitionName}
              onChange={(e) => setExibitionName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="userName" className="form-label">
              Nome de usuário *
            </label>
            <input
              type="text"
              className="form-input"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Endereço de e-mail *
            </label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <div className="profile-picture-container">
              <img
                className="profile-picture-preview"
                src={profilePicturePreview}
                alt="Foto de Perfil"
              />
              <div className="profile-picture-upload">
                <label htmlFor="profilePictureInput" className="form-label">
                  Selecione sua nova foto de perfil
                </label>
                <div className="upload-info">Extensões suportadas: PNG, JPEG</div>
                <div className="upload-info">Tamanho máximo: 5MB</div>
                <input
                  type="file"
                  id="profilePictureInput"
                  className="upload-input"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="btn-container">
          <button className="btn-excluir" onClick={handleOpenDeleteModalClick}>
            Excluir Conta
          </button>
          <button
            className={`btn-salvar ${isSaving ? 'btn-disabled' : ''}`}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditProfile;