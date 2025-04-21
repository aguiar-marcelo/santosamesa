  "use client";
  import { postRegister } from "@/services/routes";
  import Link from "next/link";
  import { useState } from "react";
  import { useRouter } from "next/navigation";
  import { OrbitProgress } from "react-loading-indicators";
  import './css/RegisterPage.css';

  const Cadastro = () => {
    const [etapa, setEtapa] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
    const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);

    const [userNameError, setUserNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
    const [fullNameError, setFullNameError] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);

    const router = useRouter();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
        setProfilePictureFile(selectedFile);
        setFileError(null);
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePicturePreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFile(null);
        setProfilePictureFile(null);
        setProfilePicturePreview(null);
        setFileError("Selecione uma imagem de perfil.");
      }
    };

    const proximaEtapa = () => {
      setGeneralError(null);
      setUserNameError(null);
      setEmailError(null);
      setPasswordError(null);
      setConfirmPasswordError(null);

      let isValid = true;

      const userNameRegex = /^[a-z0-9_-]+$/;
      if (!userNameRegex.test(userName)) {
        setUserNameError("Nome de usuário deve conter apenas letras minúsculas, números, hífen (-) e underline (_), sem espaços.");
        isValid = false;
      }

      if (!email) {
        setEmailError("'Endereço de e-mail' não pode ser vazio.");
        isValid = false;
      } else {
        const emailRegex = /.+@/;
        if (!emailRegex.test(email)) {
          setEmailError("Por favor, insira um endereço de e-mail válido.");
          isValid = false;
        }
      }

      if (!password) {
        setPasswordError("A senha não pode ser vazia.");
        isValid = false;
      } else if (password.length < 8) {
        setPasswordError("A senha precisa ter no mínimo 8 caracteres.");
        isValid = false;
      }

      if (!confirmPassword) {
        setConfirmPasswordError("A confirmação da senha não pode ser vazia.");
        isValid = false;
      }

      if (password !== confirmPassword) {
        setConfirmPasswordError("As senhas não coincidem.");
        isValid = false;
      }

      if (isValid) {
        setEtapa(2);
      }
    };

    const etapaAnterior = () => {
      setEtapa(1);
    };

    const register = async () => {
      setGeneralError(null);
      setFullNameError(null);
      setFileError(null);

      let isValid = true;

      if (!fullName) {
        setFullNameError("Nome de exibição não pode ser vazio.");
        isValid = false;
      }

      if (!file) {
        setFileError("Selecione uma imagem de perfil.");
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", "user");
      formData.append("userName", userName);
      formData.append("exibitionName", fullName);

      if (file) {
        formData.append("profilePicture", file);
      }

      setLoading(true);
      setGeneralError(null);

      try {
        const response = await postRegister(formData);
        alert("Usuário cadastrado com sucesso!");
        router.push("/login");
      } catch (error: any) {
        if (error?.response?.status === 409) {
          setGeneralError("Usuário já cadastrado, verifique os dados e tente novamente.");
        } else {
          setGeneralError("Erro ao cadastrar. Verifique os dados e tente novamente.");
        }
      } finally {
        setLoading(false);
      }
    };

    return (
      <div
        className="cadastro-container"
        style={{ backgroundImage: "url(img/img-login.jpg)" }}
      >
        <div className="cadastro-form-wrapper">
          <form onSubmit={(e) => e.preventDefault()}>
            {etapa === 1 ? (
              <div className="cadastro-form-stage-1">
                <h2 className="cadastro-form-title">Cadastro</h2>
                <progress
                  className="cadastro-progress"
                  max="100"
                  value={50}
                />
                <div className="cadastro-input-group">
                  <div className="cadastro-input-wrapper">
                    <p className="cadastro-label">Nome de usuário *</p>
                    <input
                      type="text"
                      placeholder="Digite seu nome de usuário"
                      className={`cadastro-input ${userNameError ? 'cadastro-input-error' : ''}`}
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    {userNameError && <p className="cadastro-error-message">{userNameError}</p>}
                  </div>
                </div>
                <div className="cadastro-input-wrapper">
                  <p className="cadastro-label">Endereço de e-mail *</p>
                  <input
                    type="email"
                    placeholder="Digite seu e-mail"
                    className={`cadastro-input ${emailError ? 'cadastro-input-error' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && <p className="cadastro-error-message">{emailError}</p>}
                </div>

                <div className="cadastro-input-wrapper">
                  <p className="cadastro-label">Crie sua senha *</p>
                  <input
                    type="password"
                    placeholder="Digite a senha"
                    className={`cadastro-input ${passwordError ? 'cadastro-input-error' : ''}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && <p className="cadastro-error-message">{passwordError}</p>}
                </div>

                <div className="cadastro-input-wrapper">
                  <p className="cadastro-label">Confirme sua senha *</p>
                  <input
                    type="password"
                    placeholder="Digite a senha novamente"
                    className={`cadastro-input ${confirmPasswordError ? 'cadastro-input-error' : ''}`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {confirmPasswordError && <p className="cadastro-error-message">{confirmPasswordError}</p>}
                </div>

                {generalError && (
                  <div className="cadastro-error">
                    {generalError}
                  </div>
                )}
                <div className="btn-container">
                  <Link href="/" className="cadastro-back-link">
                    Voltar
                  </Link>
                  <button
                    type="button"
                    className="cadastro-next-button"
                    onClick={proximaEtapa}
                  >
                    Próximo
                  </button>
                </div>
              </div>
            ) : (
              <div className="cadastro-form-stage-2">
                <h2 className="cadastro-form-title">Cadastro</h2>
                <progress
                  className="cadastro-progress"
                  max="100"
                  value={100}
                />

                <div className="cadastro-input-wrapper">
                  <p className="cadastro-label">Nome de exibição *</p>
                  <input
                    type="text"
                    placeholder="Digite o nome a ser apresentado"
                    className={`cadastro-input ${fullNameError ? 'cadastro-input-error' : ''}`}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {fullNameError && <p className="cadastro-error-message">{fullNameError}</p>}
                </div>

                <div className="mb-6">
                  <div className="profile-picture-container">
                    <img
                      className="profile-picture"
                      src={profilePicturePreview || '/img/user-null.png'}
                      alt="Foto de Perfil"
                    />
                    <div>
                      <label htmlFor="profilePictureInput" className="cadastro-label">
                        Selecionar nova foto
                      </label>
                      <div className="text-sm text-gray-600">Extensões suportadas: PNG, JPEG</div>
                      <div className="text-sm text-gray-600">Tamanho máximo: 5MB</div>
                      <input
                        type="file"
                        id="profilePictureInput"
                        className={`cadastro-file-input shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline ${fileError ? 'cadastro-input-error' : ''}`}
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg"
                      />
                      {fileError && <p className="cadastro-error-message">{fileError}</p>}
                    </div>
                  </div>
                </div>

                {generalError && (
                  <div className="cadastro-error">
                    {generalError}
                  </div>
                )}
                <div className="cadastro-buttons-stage-2">
                  <button
                    type="button"
                    className="cadastro-submit-button"
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
                  <button
                    type="button"
                    onClick={etapaAnterior}
                    className="cadastro-back-button-stage-2"
                  >
                    Voltar
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  };

  export default Cadastro;