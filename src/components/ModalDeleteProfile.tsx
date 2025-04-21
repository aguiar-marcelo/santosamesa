import React, { useState } from 'react';
import './css/ModalDeleteProfile.css';
import { deleteUser } from "@/services/routes";
import { useAuth } from '@/context/AuthContext'; 
import { useRouter } from 'next/navigation';

interface ModalDeleteProfileProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: number;
  onDeleteSuccess: () => void;
}

const ModalDeleteProfile: React.FC<ModalDeleteProfileProps> = ({ isOpen, onClose, userId, onDeleteSuccess }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { signOut } = useAuth(); 
  const router = useRouter();

  const handleDelete = async () => {
    if (!userId) {
      setErrorMessage("ID do usuário não encontrado.");
      return;
    }

    setIsDeleting(true);
    setErrorMessage(null);

    try {
      const response = await deleteUser(userId);
      console.log("Resposta da exclusão do usuário:", response);

      setIsDeleting(false);
      signOut();
      router.push('/login');

      onDeleteSuccess();
      onClose();
    } catch (error: any) {
      console.error("Erro ao excluir a conta:", error);
      setErrorMessage(error?.response?.data?.message || "Ocorreu um erro ao tentar excluir sua conta.");
      setIsDeleting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 text-black">
      <div className="modal-content bg-white rounded-md p-8 w-[500px]">
        <div className="modal-header mb-4">
          <h2 className="title">Excluir Conta</h2>
        </div>
        <div className="text-container">
          <p>
            Ao excluir sua conta, você perderá todas as suas avaliações registradas, assim como os seus dados cadastrados,
            permitindo com que um novo usuário possa se cadastrar com suas informações.
          </p>
          <p className="font-bold"> Pense bem antes de prosseguir</p>
          {errorMessage && <div className="error-message mt-2 text-red-500">{errorMessage}</div>}
        </div>
        <div className="btn-container-excluir">
          <button
            className="btn-excluir-conta"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Excluindo...' : 'Excluir Conta'}
          </button>
          <button
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteProfile;