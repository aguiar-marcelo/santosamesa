import Image from "next/image";
import React from "react";
import { Search } from 'lucide-react';
import Link from "next/link";

const LocalInfoPage = () => {
    return (
        <div className="relative w-full h-full">
            <div className="bg-cover bg-center h-[350px] w-full">
                foto
            </div>

            <div className="flex flex-col">
                <h1 className="mb-[4px] mt-[4px] font-bold">Boteco Burgman</h1>
                <h4 className="text-[#9D9393]">16 avaliações</h4>
            </div>

            <h2>UM POUQUINHO DE TUDO EM UM SÓ BAR</h2>
            <h3>Fundada em 2010, em Sorocaba/SP, por Amanda Bazzo e sua mãe Edite Bazzo, a Burgman vem se consolidando como uma das mais sólidas cervejarias da região.
                Sendo uma das pioneiras, ajudou a desbravar o caminho e hoje segue com o compromisso de difundir a cultura cervejeira.</h3>

            <h2 className="mb-[4px] mt-[4px] font-bold">Avaliações</h2>

            <div className="rounded-lg p-8" style={{ backgroundColor: '#A0E4FF' }}>
  <h2 className="mb-[4px] mt-[4px] font-bold">Deixe sua avaliação!</h2>
  <input type="text" placeholder="Digite sua avaliação aqui..." className="w-full px-4 py-2 rounded-md border border-gray-400 text-black" />
  <h3>Selecione a quantidade de estrelas que gostaria de dar a esse local:</h3>
  <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2">Enviar Avaliação</button>
</div>


        </div>
    );
};


export default LocalInfoPage;