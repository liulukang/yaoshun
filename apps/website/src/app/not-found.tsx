import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{margin: "0 auto", maxWidth: 720, padding: "8rem 1.5rem", textAlign: "center"}}>
      <h1>Page not found</h1>
      <p>The requested Yaoshun Toys page does not exist.</p>
      <p><Link href="/">Return to the homepage</Link></p>
    </main>
  );
}
