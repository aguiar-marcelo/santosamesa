"use client";
import React from "react";
import { User, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import logo from '../../public/img/img-logo.png';

const SectionMenu = () => {
  const { user, token, signOut } = useAuth();
  return (
    <>
      <div
        style={{ background: "linear-gradient(to right, #1F607E, #506F7D)" }}
      >
        <div className="w-full flex justify-between gap-4 p-4 items-center ">
          <div className="flex justify-center items-center gap-2">
          <img src={logo.src} alt="Logo" width={45} height={40} />
            <h1 className="text-white text-2xl font-bold">SANTOS À MESA</h1>
            <div className="rounded-lg overflow-hidden space-x-8 pl-10">
              <Link href="/" className="text-white hover:underline">
                Home
              </Link>
              <Link href="/local" className="text-white hover:underline">
                Ver Locais
              </Link>
              <Link href="/" className="text-white hover:underline">
                Destaques
              </Link>
              <Link href="/sobre-nos" className="text-white hover:underline">
                Sobre Nós
              </Link>
            </div>
          </div>

          <div className="flex justify-center gap-4 items-center">
            {user && token ? (
              <div className="flex gap-5">
                <Link href={`/perfil/${user.id}`} className="text-white hover:underline">
                  <Image
                    className="ml-3 h-12 w-12 rounded-full"
                    style={{ border: '2px solid rgba(255, 255, 255, 0.5)' }}
                    src={user.profilePicture || "/img/user-null.png"}
                    alt=""
                    width="500"
                    height="500"
                  />
                </Link>
                <div className="flex flex-col">
                  <span className="text-white">{user.exibitionName}</span>
                  <span className="text-zinc-200 text-sm">@{user.userName}</span>
                </div>
                <button
                  className="text-white hover:text-red-700"
                  onClick={signOut}
                >
                  <LogOut />
                </button>
              </div>) : (
              <>
                {" "}
                <Link href="/login" className="text-white underline">
                  Login
                </Link>
                <Link
                  href="/cadastro"
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-[#04344a]"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionMenu;