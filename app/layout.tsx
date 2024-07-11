import "./globals.css";

export const metadata = {
  title: "Movies Semantic Search",
  description: "A simple movie search engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b text-emerald-900 from-emerald-500/10">
        {children}
      </body>
    </html>
  );
}
