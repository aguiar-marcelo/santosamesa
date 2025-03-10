import React from 'react';

const SobreNosPage = () => {

    const logado = true; // alterar

    return (
        <form className="form" style={{ backgroundImage: 'linear-gradient(to right, #E05F30, #7f3815)' }}>
            <div style={{ marginTop: '30px' }}>
                <div className="grid-container">
                    <div className="row justify-center gap-5">
                        <img src="img/img-logo.png" width="45" height="40" alt="Logo" />
                        <h1 style={{ color: 'white' }}>SANTOS À MESA</h1>
                    </div>
                    <div className="justify-center">
                        <a className="btn-menu btn-border-start" style={{ backgroundColor: 'white' }} href="index.html">
                            Home
                        </a>
                        <button className="btn-menu" style={{ backgroundColor: 'white' }}>
                            Ver Localidades
                        </button>
                        <button className="btn-menu" style={{ backgroundColor: 'white' }}>
                            Destaques
                        </button>
                        <button className="btn-menu" style={{ backgroundColor: 'white' }}>
                            Perguntas Frequentes
                        </button>
                        <a className="btn-menu btn-border-end" style={{ backgroundColor: 'white' }}>
                            Sobre Nós
                        </a>
                    </div>

                    <div id="login-container" style={{ display: logado ? 'none' : 'block' }}>
                        <div className="justify-center gap-5">
                            <a className="txt-login" href="login.html" target="_self">
                                Login
                            </a>
                            <a
                                href="cadastro.html"
                                className="btn-style"
                                style={{ width: '45%', padding: '15px', textAlign: 'center', textDecoration: 'none' }}
                            >
                                Cadastrar
                            </a>
                        </div>
                    </div>

                    <div id="usuario-logado" style={{ display: logado ? 'block' : 'none' }}>
                        <div className="justify-center gap-5" style={{ alignItems: 'center' }}>
                            <img className="imagem-perfil" src="img/placeholder-perfil.png" alt="Foto de Perfil" />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <p style={{ color: 'white', marginBottom: '2px', marginTop: '2px' }}>User Teste</p>
                                <a style={{ color: 'white' }} href="perfil.html">
                                    Ver Perfil
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="center-container"
                    style={{ backgroundColor: 'white', marginLeft: '20px', marginRight: '20px', marginBottom: '40px', borderRadius: '8px' }}
                >
                    <div className="center-container" style={{ marginTop: '72px' }}>
                        <h2 style={{ marginBottom: '0' }}>Sobre Nós</h2>
                        <h4>
                            Conectando santistas e turistas para as melhores experiências gastronômicas desde 2025
                        </h4>
                    </div>

                    <div className="grid-container-1">
                        <div
                            className="center-container"
                            style={{ border: '2px solid #666565', borderRadius: '8px', padding: '30px', height: '-webkit-fill-available' }}
                        >
                            <div>
                                <h3 style={{ marginTop: '0', marginBottom: '3px' }}>Nossa missão</h3>
                                <h4 style={{ marginTop: '0' }}>O que nos motiva</h4>
                                <h5 style={{ marginBottom: '0' }}>
                                    Conectar pessoas e incentivar o descobrimento de novas experiências gastronômicas da cidade de Santos,
                                    incentivando o turismo. Acreditamos que não há coisa mais valiosa que descobrir o novo e criar novas
                                    memórias no processo.
                                </h5>
                            </div>
                        </div>

                        <div
                            className="center-container"
                            style={{ border: '2px solid #666565', borderRadius: '8px', padding: '30px', height: '-webkit-fill-available' }}
                        >
                            <div>
                                <h3 style={{ marginTop: '0', marginBottom: '3px' }}>Nossa história</h3>
                                <h4 style={{ marginTop: '0' }}>Como começou</h4>
                                <h5 style={{ marginBottom: '0' }}>
                                    O projeto Santos à Mesa surgiu como o trabalho de conclusão de curso de 7 estudantes da Universidade
                                    Santa Cecília, que tinham muito carinho pela cidade de Santos e queriam incentivar mais as pessoas a
                                    explorarem mais do que a cidade tinha para oferecer, focando na facilidade do processo.
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div className="center-container">
                        <h2 style={{ marginBottom: '0' }}>Nosso valores</h2>
                        <h4>Princípios que guiam o nosso trabalho</h4>
                    </div>

                    <div className="grid-container-2">
                        <div
                            className="center-container"
                            style={{ border: '2px solid #666565', borderRadius: '8px', padding: '30px', height: '-webkit-fill-available' }}
                        >
                            <div>
                                <h3 style={{ marginTop: '0', marginBottom: '3px' }}>Autenticidade</h3>
                                <h5 style={{ marginBottom: '0' }}>
                                    Valorizamos experiências genuínas e avaliações honestas. Nosso compromisso é com a verdade, mesmo
                                    quando ela não é perfeita.
                                </h5>
                            </div>
                        </div>

                        <div
                            className="center-container"
                            style={{ border: '2px solid #666565', borderRadius: '8px', padding: '30px', height: '-webkit-fill-available' }}
                        >
                            <div>
                                <h3 style={{ marginTop: '0', marginBottom: '3px' }}>Comunidade</h3>
                                <h5 style={{ marginBottom: '0' }}>
                                    Acreditamos no poder da inteligência coletiva. Nossa plataforma é construída pela comunidade e para a
                                    comunidade.
                                </h5>
                            </div>
                        </div>

                        <div
                            className="center-container"
                            style={{ border: '2px solid #666565', borderRadius: '8px', padding: '30px', height: '-webkit-fill-available' }}
                        >
                            <div>
                                <h3 style={{ marginTop: '0', marginBottom: '3px' }}>Diversidade</h3>
                                <h5 style={{ marginBottom: '0' }}>
                                    Celebramos a rica diversidade gastronômica de Santos, desde a tradicional comida caiçara até as mais
                                    recentes inovações culinárias.
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-row">
                <div className="center-container" style={{ color: 'rgb(232, 232, 236)', padding: '15px' }}>
                    <h3>SANTOS À MESA</h3>
                    ©2025, Santos à Mesa. Todos os direitos reservados.
                </div>
                <div className="img-mureta" style={{ marginTop: '15px' }} />
            </div>
        </form>
    );
};

export default SobreNosPage;

const styles = `
    .form {
      position: absolute;
      left: 0;
      right: 0;
      margin-top: -40px;
    }

    .imagem-perfil {
      border-radius: 50%;
      width: 50px;
      height: 50px;
      object-fit: cover;
      border: 2px solid rgba(255, 255, 255, 0.500);
    }

    .grid-container {
      display: grid;
      grid-template-columns: 22% 55% 21%;
      grid-gap: 1%;
      padding: 10px;
      align-items: center;
      margin-left: 12px;
      margin-right: 12px;
    }

    .grid-container-1 {
      display: grid;
      grid-template-columns: 47.5% 47.5%;
      grid-gap: 5%;
      padding: 10px;
      padding-left: 40px;
      padding-right: 40px;
      align-items: center;
      margin-left: 12px;
      margin-right: 12px;
    }

    .grid-container-2 {
      display: grid;
      grid-template-columns: 32% 32% 32%;
      grid-gap: 2%;
      padding: 10px;
      padding-left: 40px;
      padding-right: 40px;
      align-items: center;
      margin-left: 12px;
      margin-right: 12px;
      margin-bottom: 72px;
    }

    .center-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h4, h5 {
      color: #666565;
    }

    button {
      padding: 10px;
      font-size: medium;
      transition: 0.4s;
      display: inline-block;
      border: 0;
    }

    input[type=text] {
      width: 100%;
      padding: 12px 20px;
      border-radius: 12px;
      border: 0;
    }

    .row {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

  .btn-border-start {
        border-end-start-radius: 10px;
        border-start-start-radius: 10px;
    }

    .btn-border-end {
        border-start-end-radius: 10px;
        border-end-end-radius: 10px;
    }

    .btn-menu {
        border: 1.5px solid #a4a3ab;
        color: rgb(0, 0, 0);
        padding: 15px;
    }

    .btn-menu:hover {
        background-color: #cccbd2;
    }

    .btn-style {
      background-color: #31afe1;
      color: white;
      border-radius: 12px;
    }

    .btn-style:hover {
      background-color: #2681d6;
    }

    .justify-center {
      display: flex;
      justify-content: center;
    }

    .gap-5 {
      column-gap: 5%;
    }
  `;