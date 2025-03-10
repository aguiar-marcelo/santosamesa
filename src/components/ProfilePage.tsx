import React from 'react';
import { CSSProperties } from 'react';

const ProfilePage = () => {
    return (
        <form style={styles.form}>
            <div style={{ marginTop: '30px', backgroundImage: 'linear-gradient(to right, #37ADE4, #1F607E)' }}>
                <div style={styles.gridContainer}>
                    <div style={styles.row} className="justify-center gap-5">
                        <img src="img/img-logo.png" width="45" height="40" alt="Logo" />
                        <h1 style={{ color: 'white' }}>SANTOS À MESA</h1>
                    </div>
                    <div style={styles.justifyCenter}>
                        <a style={{ ...styles.btnMenu, ...styles.btnBorderStart, backgroundColor: 'white' }} href="index.html">
                            Home
                        </a>
                        <button style={{ ...styles.btnMenu, backgroundColor: 'white' }}>Ver Localidades</button>
                        <button style={{ ...styles.btnMenu, backgroundColor: 'white' }}>Destaques</button>
                        <button style={{ ...styles.btnMenu, backgroundColor: 'white' }}>Perguntas Frequentes</button>
                        <a style={{ ...styles.btnMenu, ...styles.btnBorderEnd, backgroundColor: 'white' }}>Sobre Nós</a>
                    </div>
                    <div style={{ ...styles.justifyCenter, ...styles.gap5, alignItems: 'center' }}>
                        <img style={styles.imagemPerfil} src="img/placeholder-perfil.png" alt="Foto de Perfil" />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <p style={{ color: 'white', marginBottom: '2px', marginTop: '2px' }}>User Teste</p>
                            <a style={{ color: 'white' }} href="perfil.html">
                                Ver Perfil
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginLeft: '70px', marginRight: '70px' }}>
                <div style={{ ...styles.gap5, display: 'flex', alignItems: 'center', marginTop: '30px', marginBottom: '30px' }}>
                    <img
                        style={{ ...styles.imagemPerfil, width: '100px', height: '100px' }}
                        src="img/placeholder-perfil.png"
                        alt="Foto de Perfil"
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1 style={{ marginBottom: '4px', marginTop: '4px' }}>User Teste</h1>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                style={{ ...styles.imgEstrela, marginRight: '5px' }}
                                src="img/estrela.png"
                                alt="Estrela"
                            />
                            <h4 style={styles.fadedColor}>3 avaliações</h4>
                        </div>
                    </div>
                </div>

                <div style={styles.gridContainer2}>
                    <h2>Minhas Avaliações</h2>
                    <div>
                        <button style={{ ...styles.btnStyle, width: '10%' }}>
                            5 <img style={styles.imgEstrela2} src="img/estrela-preenchida.png" alt="Estrela" />
                        </button>
                        <button style={{ ...styles.btnStyle, width: '10%' }}>
                            4 <img style={styles.imgEstrela2} src="img/estrela-preenchida.png" alt="Estrela" />
                        </button>
                        <button style={{ ...styles.btnStyle, width: '10%' }}>
                            3 <img style={styles.imgEstrela2} src="img/estrela-preenchida.png" alt="Estrela" />
                        </button>
                        <button style={{ ...styles.btnStyle, width: '10%' }}>
                            2 <img style={styles.imgEstrela2} src="img/estrela-preenchida.png" alt="Estrela" />
                        </button>
                        <button style={{ ...styles.btnStyle, width: '10%' }}>
                            1 <img style={styles.imgEstrela2} src="img/estrela-preenchida.png" alt="Estrela" />
                        </button>
                    </div>
                    <button style={styles.btnStyle2}>Editar Perfil</button>
                </div>

                <div style={{ border: '2px solid #666565', borderRadius: '8px', padding: '30px', height: 'auto', marginTop: '15px' }}>
                    <div>
                        <div style={{ display: 'flex' }}>
                            <img style={styles.reviewImage} src="img/img-placeholder.jpg" alt="Review" />
                            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', gap: '3%' }}>
                                <h3 style={{ marginTop: '0', marginBottom: '3px' }}>Burgman</h3>
                                <img
                                    style={{ ...styles.imgEstrela, marginRight: '5px' }}
                                    src="img/estrela-preenchida.png"
                                    alt="Estrela"
                                />
                                <h5 style={styles.fadedColor}>01/03/2025</h5>
                            </div>
                        </div>
                        <h4 style={{ marginBottom: '0' }}>
                            Um dos bares mais únicos da Tolentino! O ambiente é muito bonito e estilizado. A comida é ótima, mas achei
                            caro demais.
                        </h4>
                    </div>
                </div>

                <div style={{ border: '2px solid #666565', borderRadius: '8px', padding: '30px', height: 'auto', marginTop: '15px' }}>
                    <div>
                        <div style={{ display: 'flex' }}>
                            <img style={styles.reviewImage} src="img/img-placeholder-2.jpg" alt="Review" />
                            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', gap: '3%' }}>
                                <h3 style={{ marginTop: '0', marginBottom: '3px' }}>Padrela</h3>
                                <img
                                    style={{ ...styles.imgEstrela, marginRight: '5px' }}
                                    src="img/estrela-preenchida.png"
                                    alt="Estrela"
                                />
                                <h5 style={styles.fadedColor}>02/03/2025</h5>
                            </div>
                        </div>
                        <h4 style={{ marginBottom: '0' }}>
                            Adorei o local. A variedade do cardápio é ótima, o ambiente é aconchegante e os atendentes são super
                            atenciosos! Recomendo.
                        </h4>
                    </div>
                </div>

                <div style={{ border: '2px solid #666565', borderRadius: '8px', padding: '30px', height: 'auto', marginTop: '15px' }}>
                    <div>
                        <div style={{ display: 'flex' }}>
                            <img style={styles.reviewImage} src="img/img-placeholder-3.jpg" alt="Review" />
                            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', gap: '3%' }}>
                                <h3 style={{ marginTop: '0', marginBottom: '3px' }}>Van Gogh</h3>
                                <img
                                    style={{ ...styles.imgEstrela, marginRight: '5px' }}
                                    src="img/estrela-preenchida.png"
                                    alt="Estrela"
                                />
                                <h5 style={styles.fadedColor}>03/03/2025</h5>
                            </div>
                        </div>
                        <h4 style={{ marginBottom: '0' }}>Pizzaria super aconchegante!</h4>
                    </div>
                </div>
            </div>

            <div style={{ ...styles.bottomRow, marginTop: '30px' }}>
                <div style={{ ...styles.centerContainer, color: 'rgb(232, 232, 236)', padding: '15px' }}>
                    <h3>SANTOS À MESA</h3>
                    ©2025, Santos à Mesa. Todos os direitos reservados.
                </div>
                <div style={styles.imgMureta} />
            </div>
        </form>
    );
};

export default ProfilePage;

const styles: { [key: string]: CSSProperties } = {
    form: {
        position: 'absolute',
        left: 0,
        right: 0,
        marginTop: '-40px',
    },
    imgMureta: {
        backgroundImage: "url('img/img-mureta.png')",
        height: '45px',
        width: '100%',
    },
    imgEstrela: {
        width: '25px',
        height: '25px',
    },
    imgEstrela2: {
        width: '15px',
        height: '15px',
    },
    reviewImage: {
        width: '100px',
        height: '100px',
    },
    fadedColor: {
        color: '#9D9393',
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: '22% 55% 21%',
        gridGap: '1%',
        padding: '10px',
        alignItems: 'center',
        marginLeft: '12px',
        marginRight: '12px',
    },
    gridContainer2: {
        display: 'grid',
        gridTemplateColumns: '20% 68% 10%',
        gridGap: '1%',
        alignItems: 'center',
    },
    centerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        padding: '5px',
        fontSize: 'medium',
        transition: '0.4s',
        display: 'inline-block',
        border: '0',
    },
    inputText: {
        width: '100%',
        padding: '12px 20px',
        borderRadius: '12px',
        border: '0',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnBorderStart: {
        borderEndStartRadius: '10px',
        borderStartStartRadius: '10px',
    },
    btnBorderEnd: {
        borderStartEndRadius: '10px',
        borderEndEndRadius: '10px',
    },
    btnMenu: {
        border: '1.5px solid #a4a3ab',
        color: 'rgb(0, 0, 0)',
        padding: '15px',
    },
    btnMenuHover: {
        backgroundColor: '#cccbd2',
    },
    btnStyle: {
        backgroundColor: '#31afe1',
        color: 'white',
        borderRadius: '12px',
    },
    btnStyleHover: {
        backgroundColor: '#2681d6',
    },
    btnStyle2: {
        backgroundColor: '#55798E',
        color: 'white',
        borderRadius: '4px',
    },
    imagemPerfil: {
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        objectFit: 'cover',
        border: '2px solid rgba(255, 255, 255, 0.5)',
    },
    bottomRow: {
        backgroundColor: '#247895',
        marginTop: 'auto',
        width: '100%',
    },
    justifyCenter: {
        display: 'flex',
        justifyContent: 'center',
    },
    gap5: {
        columnGap: '5%',
    },
};