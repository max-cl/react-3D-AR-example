import { Toaster } from "react-hot-toast";

import RoutesApp from "./routes";

function App() {
    return (
        <>
            <Toaster position="top-center" />
            <RoutesApp />
        </>
    );
}

export default App;
