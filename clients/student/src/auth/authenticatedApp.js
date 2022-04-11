import RenderApp from "./RenderApp";

const authenticatedApp = ({logged}) => {
    return <RenderApp logged={logged}/>
}

export default authenticatedApp;