import RenderLogin from "./RenderLogin";

// Bridge as this file does count as a React Component.
const unauthenticatedApp = () => {
    return <RenderLogin />
}

export default unauthenticatedApp;