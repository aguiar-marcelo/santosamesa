"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, error } = useAuth();

  const login = async () => {
    if (!email) {
      alert("Digite o email");
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
      <style>{fadeInUpKeyframes}</style>
      <form style={styles.form}>
        <div style={styles.gridContainer}>
          <div style={{ ...styles.imgBackground }}>
            <div style={{ ...styles.column, ...styles.centerContainer }}>
              <h1
                style={{ ...styles.fadeIn, color: "white" }}
                className="font-bold"
              >
                SANTOS À MESA
              </h1>
              <h2
                style={{ ...styles.fadeIn, color: "white" }}
                className="font-bold mt-0"
              >
                Descubra lugares incríveis para comer em Santos
              </h2>
            </div>
          </div>
          <div style={{ ...styles.column, ...styles.centerContainer }} className="text-gray-500">
            <h1 className="font-bold">Login</h1>
            <p style={styles.p}>E-mail</p>
            <input
              type="text"
              name="email"
              placeholder="Digite o seu e-mail"
              style={styles.input}
              className="mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p style={styles.p}>Senha</p>
            <input
              type="password"
              name="password"
              placeholder="Digite a sua senha"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div style={styles.errorMsg}>{error}</div>}
            <div style={styles.column}>
              <button
                type="button"
                onClick={login}
                style={styles.btnStyle}
                disabled={loading}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    styles.btnStyleHover.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    styles.btnStyle.backgroundColor)
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
              <Link href="/" style={styles.a}>
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

const styles = {
  form: {
    height: "100vh",
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center",
    backgroundColor: "#f2f0f0",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "60% 40%",
    height: "100vh",
  },
  centerContainer: {
    display: "flex",
    alignItems: "center" as "center",
    justifyContent: "center" as "center",
    height: "100%",
  },
  errorMsg: {
    color: "red",
    fontSize: "12px",
    backgroundColor: "#f8d7da",
    padding: "1px",
    borderRadius: "5px",
    text: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center" as "center",
    width: "100%",
  },
  imgBackground: {
    backgroundImage: `url('/img/img-login.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center" as "center",
    justifyContent: "center" as "center",
  },
  fadeIn: {
    animation: "1.5s fadeInUp",
  },
  btnStyle: {
    backgroundColor: "#31afe1",
    color: "white",
    borderRadius: "12px",
    padding: "10px",
    fontSize: "medium",
    transition: "0.4s",
    border: "0",
    marginTop: "1em",
    width: "80%",
    display: "flex",
    alignItems: "center" as "center",
    justifyContent: "center" as "center",
  },
  btnStyleHover: {
    backgroundColor: "#2681d6",
  },
  input: {
    width: "80%",
    padding: "12px 20px",
    borderRadius: "3px",
    border: "4px solid #e5dcdc",
    boxSizing: "border-box" as "border-box",
  },
  p: {
    width: "80%",
    justifyContent: "flex-start" as "flex-start",
  },
  a: {
    marginTop: "1em",
    color: "#A09898",
  },
};

const fadeInUpKeyframes = `
@keyframes fadeInUp {
  0% {
    transform: translateY(60%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}
`;
