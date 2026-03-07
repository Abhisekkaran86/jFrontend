import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}