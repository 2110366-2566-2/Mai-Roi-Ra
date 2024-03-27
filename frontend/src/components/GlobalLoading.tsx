import ReactDOM from "react-dom";
import LoadingCircular from "./LoadingCircular"; // Adjust the path as necessary

export const showLoadingOverlay = () => {
  let overlay = document.getElementById("global-loading-overlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "global-loading-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    overlay.style.zIndex = "9999";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    document.body.appendChild(overlay);
  }

  // Render the LoadingCircular component inside the overlay
  ReactDOM.render(<LoadingCircular />, overlay);
};

export const hideLoadingOverlay = () => {
  const overlay = document.getElementById("global-loading-overlay");
  if (overlay) {
    ReactDOM.unmountComponentAtNode(overlay); // Clean up the React component
    overlay.remove();
  }
};

export default showLoadingOverlay;
