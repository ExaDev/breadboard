import { createRoot } from "react-dom/client";
import "./index.css";
import BoardSettings from "./components/BoardSettings";

const container = document.createElement("div");
container.setAttribute("class", "settings");
document.body.appendChild(container);
const root = createRoot(container);
root.render(BoardSettings());
