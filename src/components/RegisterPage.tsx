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
  const [profile, setProfile] = useState("");
  const router = useRouter();

  const register = async () => {
    if (!email) {
      alert("Digite o email");
      return;
    }
    if (!password) {
      alert("Digite a senha");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await postRegister(email, password, "user");
      console.log(response);

      alert("Usuário cadastrado com sucesso!");
      router.push("/");
    } catch (error: any) {
      setError("Email e/ou senha incorretos");
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

      <form className="flex justify-center items-center h-full">
        <div className="w-full max-w-lg bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
          {etapa === 1 ? (
            <div className="flex flex-col items-center text-gray-500">
              <h2 className="text-2xl font-semibold mt-0 mb-4">Cadastro</h2>
              <progress
                className={`progress-custom w-4/5 mb-4`}
                max="100"
                value={etapa === 1 ? 50 : 100}
              />
              {/* <p className="w-4/5 mb-2 text-left">Nome de usuário *</p>
                            <input type="text" placeholder="Digite seu nome de usuário" className="w-4/5 p-3 border-4 border-[#E5DCDC] rounded-lg mb-4" /> */}
              <p className="w-4/5 mb-2 text-left">Endereço de e-mail *</p>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-4/5 p-3 border-4 border-[#E5DCDC] rounded-lg mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="w-4/5 mb-2 text-left">Crie sua senha *</p>
              <input
                type="password"
                placeholder="Digite a senha que deseja criar"
                className="w-4/5 p-3 border-4 border-[#E5DCDC] rounded-lg mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <p className="w-4/5 mb-2 text-left">Confirme sua senha *</p>
                            <input type="password" placeholder="Digite sua senha novamente" className="w-4/5 p-3 border-4 border-gray-200 rounded-lg mb-6" /> */}
              {error && (
                <div className="border-red-600 rounded text-red-600  px-2 border">
                  {error}
                </div>
              )}
              <div className="flex gap-5 w-4/5 justify-between items-center">
                <Link href="/" className="text-gray-500">
                  Voltar
                </Link>
                <button
                  type="button"
                  className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
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
              <h2 className="text-2xl font-semibold mt-0 mb-4">Cadastro</h2>
              <progress
                className={`progress-custom w-4/5 mb-4`}
                max="100"
                value={100}
              />
              <p className="w-4/5 mb-2 text-left">Nome de exibição *</p>
              <input
                type="text"
                placeholder="Digite o nome a ser apresentado"
                className="w-4/5 p-3 border-4 border-[#E5DCDC] rounded-lg mb-4"
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
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
