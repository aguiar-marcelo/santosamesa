"use client"
import Link from "next/link";

const LocalRegisterPage = () => {
    const categorias = ['Bar', 'Pizzaria', 'Padaria'];

    return (
        <div className="h-screen flex flex-col justify-center bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url(img/img-cadastro-local.jpg)' }}>
            <form className="flex justify-center items-center h-full">
                <div className="w-full max-w-4xl bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
                    <div className="flex flex-col items-center w-full">
                        <h2 className="text-2xl font-semibold mt-0 mb-12">Cadastrar Novo Local</h2>

                        <div className="w-full grid grid-cols-5 gap-4">
                            <div className="col-span-3">
                                <p className="w-full mb-2 text-left font-bold">Nome do estabelecimento *</p>
                                <input type="text" placeholder="Digite o nome do estabelecimento" className="w-full p-3 border-4 border-[#E5DCDC] rounded-lg mb-4" />
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
                        <textarea placeholder="Digite a descrição do local" className="w-full p-3 mb-4 border-2 border-[#ADA9A9] rounded-lg" rows={4} />


                        <div className="w-full mb-4">
                            <p className="mb-2 text-left font-bold">Foto do Local</p>
                            <div className="w-full p-3 border-2 border-[#ADA9A9] rounded-lg flex justify-center bg-white">
                                <label
                                    htmlFor="file-upload"
                                    className="font-bold py-2 px-4 border-2 border-[#ADA9A9] rounded-lg cursor-pointer"
                                >
                                    Adicionar foto
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    className="hidden"
                                />
                            </div>
                        </div>

                        <div className="flex gap-5 w-full justify-end items-center">
                            <Link href="/local" className="text-gray-500">Cancelar</Link>
                            <button
                                type="button"
                                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
                            >
                                Cadastrar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LocalRegisterPage;
