import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Band and Artist Social Media App",
  description: "Social media app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={inter.className}>
          {/* Navbar */}
          <div className="w-full bg-black">
            <Navbar />
          </div>

          {/* Main Content */}
          <div className="bg-slate-100 w-full">{children}</div>

          {/* Toast Container */}
          <Toaster
            position="top-right" // You can change the position as needed
            toastOptions={{
              style: {
                border: "1px solid #3b0963",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#2f0748",
                color: "#fff",
              },
              success: {
                duration: 3000, // Customize the duration
              },
              error: {
                duration: 3000, // Customize the duration
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
