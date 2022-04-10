const Auth = ({oath}) => (
    <main className="auth">
        <div className="auth-box">
            <div className="auth-box-title">
                
                <h1>Seul les product owner de la coding peuvent s'authentifier</h1>
            </div>
            <div className="auth-box-student">
                <h3>M'authentifier avec l'email de la coding</h3>
                <button onClick={oath} className="btn-variant1">Google</button>
            </div>
        </div>
    </main>
)

export default Auth;