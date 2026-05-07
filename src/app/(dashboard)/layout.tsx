import Navbar from "@/components/layout/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-fondo">
      <Navbar />
      <main className="pt-[48px]">
        <div className="max-w-[1300px] mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
