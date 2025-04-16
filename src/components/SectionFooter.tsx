"use client";
import React from "react";
import Image from "next/image";

const SectionFooter = () => {
    return (

        <div className="w-full mt-auto" style={{ background: 'linear-gradient(to right, #156F8D, #5C9CB2)' }}>
            <div className="flex flex-col items-center p-[15px] my-3">
                <h3 className="my-0 text-[#f1f1f4] font-bold">SANTOS À MESA</h3>
                <h4 className="my-0 text-[#f1f1f4]">©2025, Santos à Mesa. Todos os direitos reservados.</h4>
            </div>
            <Image src={"/img/img-mureta.png"} width="1000" height="1000" className="w-full" alt="muretas-santos" />
        </div>
    )
}

export default SectionFooter;