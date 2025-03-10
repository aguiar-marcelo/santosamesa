import React from 'react';

const LoginPage = () => {

    return (
        <>
            <style>{fadeInUpKeyframes}</style>
            <form style={styles.form}>
                <div style={styles.gridContainer}>
                    <div style={{ ...styles.imgBackground }}>
                        <div style={{ ...styles.column, ...styles.centerContainer }}>
                            <h1 style={{ ...styles.fadeIn, color: 'white' }}>SANTOS À MESA</h1>
                            <h2 style={{ ...styles.fadeIn, color: 'white' }}>Descubra lugares incríveis para comer em Santos</h2>
                        </div>
                    </div>
                    <div style={{ ...styles.column, ...styles.centerContainer }}>
                        <h1>Login</h1>
                        <p style={styles.p}>E-mail</p>
                        <input type="text" placeholder="Digite o seu e-mail" style={styles.input} />
                        <p style={styles.p}>Senha</p>
                        <input type="password" placeholder="Digite a sua senha" style={styles.input} />
                        <div style={styles.column}>
                            <button
                                style={styles.btnStyle}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.btnStyleHover.backgroundColor)}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.btnStyle.backgroundColor)}
                            >
                                LOGIN
                            </button>
                            <a href="index.html" style={styles.a}>
                                CANCELAR
                            </a>
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
        height: '100vh',
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'center',
        backgroundColor: '#f2f0f0',
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: '60% 40%',
        height: '100vh',
    },
    centerContainer: {
        display: 'flex',
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
        height: '100%',
    },
    column: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center' as 'center',
        width: '100%',
    },
    imgBackground: {
        backgroundImage: `url('/img/img-login.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
    },
    fadeIn: {
        animation: '1.5s fadeInUp',
    },
    btnStyle: {
        backgroundColor: '#31afe1',
        color: 'white',
        borderRadius: '12px',
        padding: '10px',
        fontSize: 'medium',
        transition: '0.4s',
        display: 'inline-block' as 'inline-block',
        border: '0',
        marginTop: '1em',
        width: '80%',
    },
    btnStyleHover: {
        backgroundColor: '#2681d6',
    },
    input: {
        width: '80%',
        padding: '12px 20px',
        borderRadius: '3px',
        border: '4px solid #e5dcdc',
        boxSizing: 'border-box' as 'border-box',
    },
    p: {
        marginBottom: '6px',
        width: '80%',
        justifyContent: 'flex-start' as 'flex-start',
    },
    a: {
        marginTop: '1em',
        color: '#A09898',
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