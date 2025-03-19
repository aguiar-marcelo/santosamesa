"use client";
import React from "react";
import Image from "next/image";

const FooterSection = () => {
    return (

        <div className="bg-[#247895] w-full mt-auto">
            <div className="flex flex-col items-center text-[#e8e8ec] p-[15px] my-3">
                <h3 className="my-0">SANTOS À MESA</h3>
                <h4 className="my-0">©2025, Santos à Mesa. Todos os direitos reservados.</h4>
            </div>
            <Image src={"/img/img-mureta.png"} width="1000" height="1000" className="w-full" alt="muretas-santos" />
        </div>
    )
}

export default FooterSection;