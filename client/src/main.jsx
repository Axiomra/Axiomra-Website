import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import ThemeProvider from "./theme/ThemeProvider.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={
        <div className="grid min-h-screen place-items-center bg-surface px-6 text-center">
          <div>
            <h1 className="font-display text-2xl font-semibold text-content">
              Something went wrong
            </h1>
            <p className="mt-2 text-sm text-content-dim">
              Please refresh the page. If it keeps happening, email us at
              hello@axiomra.com.
            </p>
          </div>
        </div>
      }
      onError={(error) => console.error("Unhandled UI error:", error)}
    >
      <HelmetProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
