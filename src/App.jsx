import "aos/dist/aos.css";
import "./App.css";
import Navigation from "./screens/navigations/Navigation";
import "../src/styles/GlobalStyle.css";
import { useEffect } from "react";
import Aos from "aos";
import { MainContent } from "./constants/content/MainContent";
const App = () => {
    console.clear();
    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
        });
    }, []);
    useEffect(() => {
        document.title = MainContent.appName;
        const favicon = document.createElement("link");
        favicon.rel = "icon";
        favicon.href = MainContent.favIcon;
        document.head.appendChild(favicon);
    }, []);

    return <Navigation />;
};

export default App;
