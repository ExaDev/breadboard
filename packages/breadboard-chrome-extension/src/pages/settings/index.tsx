import "./index.css";
import BoardSettings from "./components/BoardSettings";
import ReactDOM from "react-dom/client";

const container = document.createElement("div");
container.setAttribute("class", "settings");
document.body.appendChild(container);
const root = ReactDOM.createRoot(container);
root.render(<BoardSettings />);
