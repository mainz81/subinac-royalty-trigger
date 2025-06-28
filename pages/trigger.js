// pages/trigger.js
import { useState } from "react";

export default function Trigger() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/distribute?amount=${amount}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ message: "Error", error: err.toString() });
    }
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg,#292C36 60%,#37354E 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
    }}>
      <h1 style={{ color: "#F3C56B", fontSize: "2.2rem", marginBottom: 12 }}>
        💫 Subinac Royalty Trigger
      </h1>
      <form onSubmit={handleSubmit} style={{ background: "#23233b", padding: 28, borderRadius: 14, boxShadow: "0 2px 12px #0008", minWidth: 300 }}>
        <label style={{ color: "#fff", fontWeight: 500, marginBottom: 8, display: "block" }}>
          Enter XLM Amount:
          <input
            type="number"
            value={amount}
            step="0.000001"
            min="0"
            onChange={e => setAmount(e.target.value)}
            style={{ marginLeft: 10, padding: 6, borderRadius: 5, border: "1px solid #aaa", width: 110 }}
            required
          />
        </label>
        <button
          type="submit"
          disabled={loading || !amount}
          style={{
            marginTop: 18,
            padding: "8px 22px",
            borderRadius: 8,
            background: "#F3C56B",
            color: "#222",
            fontWeight: 700,
            fontSize: "1.05rem",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Sending..." : "Distribute"}
        </button>
      </form>
      {result && (
        <div style={{ marginTop: 30, background: "#222233", padding: 18, borderRadius: 12, color: "#fff", minWidth: 330, wordBreak: "break-all" }}>
          <b>{result.message}</b>
          {result.transactionHash && (
            <div style={{ marginTop: 8 }}>
              Transaction Hash:<br />
              <span style={{ color: "#F3C56B" }}>{result.transactionHash}</span>
            </div>
          )}
          {result.error && (
            <div style={{ color: "crimson", marginTop: 8 }}>
              {result.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
