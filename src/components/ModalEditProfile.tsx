import React, { useState, useEffect } from 'react';
import './css/ModalEditProfile.css';
import { useAuth } from '@/context/AuthContext';
import { updateUser } from "@/services/routes";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    exibitionName?: string | null;
    userName?: string | null;
    profilePicture?: string | null;
    id?: number;
    email?: string | null;
  } | null;
  onSaveSuccess: () => void;
  onOpenDeleteModal: () => void;
}

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
    if (email !== user.email) {
      formData.append('email', email);
    }

    try {
      const responseData = await updateUser(user.id, formData);

      setSuccessMessage("Perfil atualizado com sucesso!");
      setIsSaving(false);
      onSaveSuccess();
      onClose();
    } catch (error: any) {
      console.error("Erro ao enviar dados de perfil:", error);
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
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 text-black">
      <div className="modal-content bg-white rounded-md w-[1017px] h-[732px] flex flex-col justify-between">
        <div className="modal-header">
          <div className="title text-black">Editar Seu Perfil</div>
          <button onClick={onClose} className="close-button">
            &#10006;
          </button>
        </div>

        <div className="modal-body">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <div className="mb-6">
            <label htmlFor="exibitionName" className="block text-black text-base font-bold">
              Nome de exibição *
            </label>
            <input
              type="text"
              className="w-full p-4 border-4 border-[#E5DCDC] rounded-md text-black"
              value={exibitionName}
              onChange={(e) => setExibitionName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="userName" className="block text-black text-base font-bold">
              Nome de usuário *
            </label>
            <input
              type="text"
              className="w-full p-4 border-4 border-[#E5DCDC] rounded-md text-black"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-black text-base font-bold">
              Endereço de e-mail *
            </label>
            <input
              type="email"
              className="w-full p-4 border-4 border-[#E5DCDC] rounded-md text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="profilePictureInput" className="block text-black text-base font-bold">
              Foto de Perfil
            </label>
            <div className="flex items-center gap-4">
              <img
                className="profile-picture w-24 h-24 object-cover rounded-full"
                src={profilePicturePreview}
                alt="Foto de Perfil"
              />
              <div>
                <label htmlFor="profilePictureInput" className="block text-black text-sm font-semibold mb-1">
                  Selecionar nova foto
                </label>
                <div className="text-sm text-gray-600">Extensões suportadas: PNG, JPEG</div>
                <div className="text-sm text-gray-600">Tamanho máximo: 5MB</div>
                <input
                  type="file"
                  id="profilePictureInput"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="btn-container">
          <button className="btn-excluir text-black" onClick={handleOpenDeleteModalClick}>
            Excluir Conta
          </button>
          <button
            className={`btn-salvar text-black ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
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