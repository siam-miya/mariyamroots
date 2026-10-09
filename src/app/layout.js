import "./globals.css";

export const metadata = {
  title: "Mariyam Roots",
  description: "Premium hair oil in Bangladesh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}