const Classes = ({info}) => (
    <main className="classes">
        <div className="classes-options">
            <ul>
                <li><span>{info.lastName} {info.firstName}</span></li>
                <li><span>Mes cours</span></li>
            </ul>
        </div>
        <div className="classes-content">
            {/*Generate classes cards*/} 
        </div>
    </main>
)

export default Classes;