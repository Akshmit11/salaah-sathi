import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col w-full min-h-screen max-w-7xl lg:mx-auto bg-primary-50">
      <Header />
      <div className="flex-1 py-6 px-1 sm:px-10 mt-24">{children}</div>
      <Footer />
    </main>
  );
}
