"use client";
import { postRestaurant } from "@/services/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { OrbitProgress } from "react-loading-indicators";

const LocalRegisterPage = () => {
  const categorias = ["Bar", "Pizzaria", "Padaria"];
  const [name, setName] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [categoria, setCategoria] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const localRegister = async () => {
    if (!name) {
      alert("Digite o nome");
      return;
    }
    if (!aboutUs) {
      alert("Digite algo sobre o local");
      return;
    }

    if (!file) {
      alert("Selecione uma imagem do local.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("aboutUs", aboutUs);
    formData.append("categoryId", categoria);
    formData.append("locationId", "1");
    formData.append("url_img", file);
    setLoading(true);
    setError(null);
    try {
      const response = await postRestaurant(formData);
      console.log(response);

      alert("Restaurante cadastrado com sucesso!");
      router.push("/local");
    } catch (error: any) {
      setError("Erro ao cadastrar restaurante");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex flex-col justify-center bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: "url(img/img-cadastro-local.jpg)" }}
    >
      <form className="flex justify-center items-center h-full">
        <div className="w-full max-w-4xl bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-gray-500">
          <div className="flex flex-col items-center w-full">
            <h2 className="text-2xl font-semibold mt-0 mb-12">
              Cadastrar Novo Local
            </h2>

            <div className="w-full grid grid-cols-5 gap-4">
              <div className="col-span-3">
                <p className="w-full mb-2 text-left font-bold">
                  Nome do estabelecimento *
                </p>
                <input
                  type="text"
                  placeholder="Digite o nome do estabelecimento"
                  className="w-full p-3 border-2 border-[#ADA9A9] rounded-lg mb-4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <p className="w-full mb-2 text-left font-bold">Categoria *</p>
                <select
                  onChange={(e) => setCategoria(e.target.value)}
                  value={categoria}
                  className="w-full p-3 border-2 border-[#ADA9A9] rounded-lg mb-4"
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((categoria, index) => (
                    <option key={index} value={categoria.replace(" ", "-")}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="w-full mb-2 text-left font-bold">Descrição</p>
            <textarea
              placeholder="Digite a descrição do local"
              className="w-full p-3 mb-4 border-2 border-[#ADA9A9] rounded-lg"
              rows={4}
              value={aboutUs}
              onChange={(e) => setAboutUs(e.target.value)}
            />

            <div className="w-full mb-4">
              <p className="mb-2 text-left font-bold">Foto do Local</p>
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

            <div className="flex gap-5 w-full justify-end items-center">
              <Link href="/local" className="text-gray-500">
                Cancelar
              </Link>
              <button
                type="button"
                onClick={localRegister}
                disabled={loading}
                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
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
        </div>
      </form>
    </div>
  );
};

export default LocalRegisterPage;
