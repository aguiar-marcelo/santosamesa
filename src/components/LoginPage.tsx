"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import './css/LoginPage.css';


const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, error } = useAuth();


  const login = async () => {
    if (!email) {
      alert("Digite o e-mmail");
      return;
    }
    if (!password) {
      alert("Digite a senha");
      return;
    }
    setLoading(true);
    await signIn(email, password).then(() => setLoading(false));
  };


  return (
    <>
      <form className="login-page-form">
        <div className="login-grid-container">
          <div className="login-img-background">
            <div className={`login-column login-center-container`}>
              <h1
                className={`font-bold login-fade-in`}
                style={{ color: "white" }}
              >
                SANTOS À MESA
              </h1>
              <h2
                className={`font-bold mt-0 login-fade-in`}
                style={{ color: "white" }}
              >
                Descubra lugares incríveis para comer em Santos
              </h2>
            </div>
          </div>
          <div className={`background login-column login-center-container`}>
            <h1 className="font-bold">Login</h1>
            <p className="login-p">E-mail</p>
            <input
              type="text"
              name="email"
              placeholder="Digite o seu e-mail"
              className={`mb-4 login-input text-black`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="login-p">Senha</p>
            <input
              type="password"
              name="password"
              placeholder="Digite a sua senha"
              className="login-input text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="login-error-msg">{error}</div>}
            <div className="login-column">
              <button
                type="button"
                onClick={login}
                className="login-btn-style bg-primary"
                disabled={loading}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    getComputedStyle(e.currentTarget).getPropertyValue('--login-btn-style-hover-bg') || '#2681d6')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    getComputedStyle(e.currentTarget).getPropertyValue('--login-btn-style-bg') || '#31afe1')
                }
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
                  "LOGIN"
                )}
              </button>
              <Link href="/" className="login-a">
                CANCELAR
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};


export default LoginPage;