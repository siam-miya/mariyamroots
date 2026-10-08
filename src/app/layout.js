import "./globals.css";

export const metadata = {
  title: "Your Website",
  description: "Premium product landing page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}