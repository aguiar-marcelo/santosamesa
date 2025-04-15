"use client";
import { postRegister } from "@/services/routes";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { OrbitProgress } from "react-loading-indicators";

const Cadastro = () => {
  const [etapa, setEtapa] = useState(1);

  const etapaAnterior = () => {
    setEtapa(1);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  const register = async () => {
    if (!fullName.trim().includes(" ")) {
      alert("Digite seu nome completo com sobrenome.");
      return;
    }

    const userNameRegex = /^[a-z0-9_-]+$/;
    if (!userNameRegex.test(userName)) {
      alert(
        "Username deve conter apenas letras minúsculas, números, hífen (-) e underline (_), sem espaços."
      );
      return;
    }

    if (!email) {
      alert("Digite o email");
      return;
    }

    if (!password || !confirmPassword) {
      alert("Digite a senha e confirme.");
      return;
    }

    if (password.length < 8) {
      alert("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    if (!file) {
      alert("Selecione uma imagem de perfil.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", "user");
    formData.append("userName", userName);
    formData.append("exibitionName", fullName);
    formData.append("profilePicture", file);

    setLoading(true);
    setError(null);
  
    try {
      const response = await postRegister(formData);
      alert("Usuário cadastrado com sucesso!");
      router.push("/login");
    } catch (error: any) {
      if (error?.response?.status === 409) {
        setError("Usuário já cadastrado, verifique os dados e tente novamente.");
      } else {
        setError("Erro ao cadastrar. Verifique os dados e tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const barraDeProgresso = `
  .progress-custom {
    height: 10px;
    border: none;
    background-color: #B0B8BE;
    border-radius: 5px;
  }
  .progress-custom::-webkit-progress-bar {
    background-color: #B0B8BE;
    border-radius: 5px;
  }
  .progress-custom::-webkit-progress-value {
    background-color: #1D98EA;
    border-radius: 5px;
  }
`;

  return (
    <div
      className="h-screen flex flex-col justify-center bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: "url(img/img-login.jpg)" }}
    >
      <style jsx global>{`
        ${barraDeProgresso}
      `}</style>

      <div className="w-[40rem] m-auto bg-white bg-opacity-80 p-5 rounded-lg shadow-lg text-gray-500">
        <form>
          {etapa === 1 ? (
            <div className="flex flex-col items-center gap-y-3">
              <h2 className="text-2xl font-semibold mt-0 mb-4">Cadastro</h2>
              <progress
                className={`progress-custom w-full mb-4`}
                max="100"
                value={etapa === 1 ? 50 : 100}
              />
              <div className="flex w-full gap-x-2 border">
                <div className="w-full">
                  <p className="mb-2 text-left">Nome completo *</p>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full p-3 border-4 border-[#E5DCDC] rounded-lg"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <p className="mb-2 text-left">Username *</p>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full p-3 border-4 border-[#E5DCDC] rounded-lg"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full">
                <p className="mb-2 text-left">Endereço de e-mail *</p>
                <input
                  type="email"
                  placeholder="Digite seu e-mail"
                  className="w-full p-3 border-4 border-[#E5DCDC] rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex w-full gap-x-2">
                <div className="w-full">
                  <p className="mb-2 text-left">Crie sua senha *</p>
                  <input
                    type="password"
                    placeholder=""
                    className="w-full p-3 border-4 border-[#E5DCDC] rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <p className="mb-2 text-left">Confirme sua senha *</p>
                  <input
                    type="password"
                    placeholder=""
                    className="w-full p-3 border-4 border-[#E5DCDC] rounded-lg"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full">
                <p className="mb-2 text-left ">Selecione sua foto de perfil</p>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="w-full cursor-pointer rounded-lg border outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-gray-500 file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:text-gray-700  dark:focus:border-primary"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) setFile(selectedFile);
                  }}
                />
              </div>

              {error && (
                <div className="border-red-600 rounded text-red-600 my-2 px-2 border">
                  {error}
                </div>
              )}
              <div className="w-full px-3 flex justify-between items-center">
                <Link href="/" className="px-3 text-gray-500">
                  Voltar
                </Link>
                <button
                  type="button"
                  className="bg-blue-500 text-white py-3 px-10 rounded-lg hover:bg-blue-600"
                  disabled={loading}
                  onClick={register}
                >
                  {loading ? (
                    <OrbitProgress
                      style={{
                        fontSize: 5,
                        display: "flex",
                        justifyItems: "center",
                      }}
                      color="#fff"
                      dense
                      speedPlus={1}
                    />
                  ) : (
                    "Cadastrar"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {/* <h2 className="text-2xl font-semibold mt-0 mb-4">Cadastro</h2>
              <progress
                className={`progress-custom w-4/5 mb-4`}
                max="100"
                value={100}
              />
              <p className="w-4/5 mb-2 text-left">Nome de exibição *</p>
              <input
                type="text"
                placeholder="Digite o nome a ser apresentado"
                className="w-4/5 p-3 border-4 border-[#E5DCDC] rounded-lg"
              />
              <p className="w-4/5 mb-2 text-left">
                Selecione sua foto de perfil
              </p>
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="w-4/5 mb-4"
              />
              <div className="flex flex-col items-center w-4/5 gap-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 w-full"
                >
                  CADASTRAR
                </button>
                <a
                  href="#"
                  onClick={etapaAnterior}
                  className="text-gray-500 bg-gray-200 py-3 px-6 rounded-lg w-full text-center"
                >
                  Voltar
                </a>
              </div> */}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
