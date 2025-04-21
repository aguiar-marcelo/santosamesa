import React from 'react';
import './css/ModalDeleteProfile.css';
import { deleteUser } from "@/services/routes";
import { useAuth } from '@/context/AuthContext';

const ModalDeleteProfile: React.FC<ModalDeleteProfileProps> = ({
  isOpen,
  onClose,
  userId,
  onDeleteSuccess,
}) => {
  const { token } = useAuth();
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleDelete = async () => {
    if (!userId || !token) {
      setErrorMessage("Não autenticado.");
      return;
    }

    setIsDeleting(true);
    setErrorMessage(null);

    try {
      await deleteUser(userId);
      setIsDeleting(false);
      onDeleteSuccess();
      onClose();
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || "Ocorreu um erro ao tentar excluir sua conta.");
      setIsDeleting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 text-black">
      <div className="modal-content-excluir">
        <div className="modal-header">
          <div className="title-container w-full">
            <div className="title">Excluir conta</div>
          </div>
          <button onClick={onClose} className="close-button">
            &#10006;
          </button>
        </div>

        <div className="modal-body-excluir">
          <div className="text-container">
            <div className="text-base">
              Ao excluir sua conta, você perderá todas as suas avaliações registradas, assim como os seus dados cadastrados,
              permitindo com que um novo usuário possa se cadastrar com suas informações.
            </div>
            <div className="font-bold"> Pense bem antes de prosseguir</div>
          </div>
        </div>

        <div className="btn-container-excluir">
          <button
            className={`btn-excluir-conta ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Excluindo...' : 'Excluir Conta'}
          </button>
          <button className="btn-cancelar text-black" onClick={onClose} disabled={isDeleting}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteProfile;