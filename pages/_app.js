import React from "react";

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Subinac interface error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ minHeight: "100vh", padding: 24, background: "#161522", color: "#fff", display: "grid", placeItems: "center", textAlign: "center" }}>
          <section>
            <h1 style={{ color: "#FFD97A" }}>The Royalty Trigger needs a refresh</h1>
            <p>The page encountered a temporary browser error. Your wallet and transaction data were not changed.</p>
            <button type="button" onClick={() => window.location.reload()} style={{ padding: "12px 22px", border: 0, borderRadius: 10, background: "#FFD97A", color: "#161522", fontWeight: 700 }}>
              Refresh safely
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default function App({ Component, pageProps }) {
  return (
    <AppErrorBoundary>
      <Component {...pageProps} />
    </AppErrorBoundary>
  );
}
