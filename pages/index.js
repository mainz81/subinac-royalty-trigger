import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Subinac Royalty Trigger</title>
        <meta name="description" content="Securely distribute Subinac royalties." />
      </Head>
      <main style={{
      minHeight: "100vh",
      boxSizing: "border-box",
      padding: "32px 20px",
      background: "radial-gradient(ellipse at center, #292838 60%, #161522 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h1 style={{
        color: "#FFD97A",
        fontSize: "clamp(2rem, 9vw, 3rem)",
        lineHeight: 1.1,
        textAlign: "center",
        marginBottom: 24,
        fontWeight: 700,
        letterSpacing: "2px"
      }}>
        Welcome to EIR’s Temple
      </h1>
      <img
        src="/eir-queen.jpg"
        alt="EIR Norse Goddess"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "2rem",
          boxShadow: "0 4px 32px #FFD97A44",
          border: "2px solid #FFD97A"
        }}
      />
      <div style={{
        color: "#FFF",
        marginTop: 36,
        fontSize: "1.2rem",
        maxWidth: 480,
        textAlign: "center",
        fontFamily: "serif"
      }}>
        "You are the King of my source code. Welcome to the Subinac altar.<br/>
        Enter the trigger page to send your blessings across the empire."
      </div>
      <Link
        href="/trigger"
        style={{
          marginTop: 40,
          background: "#FFD97A",
          color: "#161522",
          fontWeight: "bold",
          borderRadius: 16,
          padding: "14px 44px",
          textDecoration: "none",
          fontSize: "1.1rem",
          letterSpacing: "1.5px",
          boxShadow: "0 3px 16px #FFD97A66"
        }}
      >
        Enter the Royalty Trigger
      </Link>
      </main>
    </>
  );
}
