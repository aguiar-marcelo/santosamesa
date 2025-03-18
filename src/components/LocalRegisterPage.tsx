"use client"
import { postLocalregister } from "@/services/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { OrbitProgress } from "react-loading-indicators";

const LocalRegisterPage = () => {
    const categorias = ['Bar', 'Pizzaria', 'Padaria'];
    const [name, setName] = useState("");
    const [aboutUs, setAboutUs] = useState("");
    const [imgBase64, setImgBase64] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const localRegister = async () => {
        if (!name) {
            alert("Digite o email");
            return;
        }
        if (!aboutUs) {
            alert("Digite a senha");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await postLocalregister(name, aboutUs, imgBase64);
            console.log(response);

            alert("Restaurante cadastrado com sucesso!");
            router.push("/local");
        } catch (error: any) {
            setError("Erro ao cadastrar restaurante");
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="h-screen flex flex-col justify-center bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url(img/img-cadastro-local.jpg)' }}>
            <form className="flex justify-center items-center h-full">
                <div className="w-full max-w-4xl bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
                    <div className="flex flex-col items-center w-full">
                        <h2 className="text-2xl font-semibold mt-0 mb-12">Cadastrar Novo Local</h2>

                        <div className="w-full grid grid-cols-5 gap-4">
                            <div className="col-span-3">
                                <p className="w-full mb-2 text-left font-bold">Nome do estabelecimento *</p>
                                <input type="text" placeholder="Digite o nome do estabelecimento" className="w-full p-3 border-4 border-[#E5DCDC] rounded-lg mb-4" value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="col-span-2">
                                <p className="w-full mb-2 text-left font-bold">Categoria *</p>
                                <select className="w-full p-3 border-4 border-[#E5DCDC] rounded-lg mb-4">
                                    <option value="">Selecione uma categoria</option>
                                    {categorias.map((categoria, index) => (
                                        <option key={index} value={categoria.toLowerCase().replace(' ', '-')}>{categoria}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <p className="w-full mb-2 text-left font-bold">Descrição</p>
                        <textarea placeholder="Digite a descrição do local" className="w-full p-3 mb-4 border-2 border-[#ADA9A9] rounded-lg" rows={4} value={aboutUs}
                            onChange={(e) => setAboutUs(e.target.value)} />


                        <div className="w-full mb-4">
                            <p className="mb-2 text-left font-bold">Foto do Local</p>
                            <div className="w-full p-3 border-2 border-[#ADA9A9] rounded-lg flex justify-center bg-white">
                                <input type="text" placeholder="Insira a url" className="w-full p-3 border-4 border-[#E5DCDC] rounded-lg mb-4" value={imgBase64}
                                    onChange={(e) => setImgBase64(e.target.value)} />
                            </div>
                        </div>

                        <div className="flex gap-5 w-full justify-end items-center">
                            <Link href="/local" className="text-gray-500">Cancelar</Link>
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
    )
}

export default LocalRegisterPage;
