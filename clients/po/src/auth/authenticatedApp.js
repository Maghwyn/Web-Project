import RenderApp from "./RenderApp";

// Bridge as this file does count as a React Component.
const authenticatedApp = ({logged}) => {
    return <RenderApp logged={logged}/>
}

export default authenticatedApp;