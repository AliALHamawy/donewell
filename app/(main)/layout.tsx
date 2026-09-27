import Navbar from "@/components/myComponents/Navbar";
import AuthGuard from "@/components/myComponents/AuthGuard";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <AuthGuard>
      <Navbar />
      <div className="w-full h-15.25"/>
      {children}
    </AuthGuard>
  );
}
