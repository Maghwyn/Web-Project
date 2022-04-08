const Auth = ({login}) => (
    <main className="auth">
        <div className="auth-box">
            <div className="auth-box-title">
                <h1>Seul les élèves de la coding peuvent s'authentifier</h1>
            </div>
            <div className="auth-box-student">
                <h3>M'authentifier avec l'email de la coding</h3>
                <a href="http://localhost:3000/login"><button className="btn-variant1">Google</button></a>
            </div>
        </div>
    </main>
)

export default Auth;