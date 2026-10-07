import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";

export default function WebsiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}