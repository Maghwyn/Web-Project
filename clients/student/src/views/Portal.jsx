const Portal = () => (
    <main className="auth">
        <div className="auth-box">
            <div className="auth-box-title">
                <h1>Bienvenue sur random</h1>
            </div>
            <div className="auth-box-student">
                <h3>M'authentifier en tant qu'élève</h3>
                <a href="http://localhost:3000/login"><button className="btn-variant1">Portail Elève</button></a>
            </div>
            <div className="auth-box-po">
                <h3>M'authentifier en tant qu'intervenant</h3>
                <a href="http://localhost:3001/login" target="_blank" rel="noreferrer"><button className="btn-variant1">Portail Intervenant</button></a>
            </div>
        </div>
    </main>
)

export default Portal;