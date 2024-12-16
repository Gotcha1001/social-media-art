import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { shadesOfPurple } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | Gigify",
    default: "Gigify",
  },
  description: "Music Gigs Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: shadesOfPurple }}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          {/* Animated Background */}
          <div className="animated-bg fixed -z-10 inset-0 opacity-90" />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            {/* HEADER */}
            <Header />
            <main className="min-h-screen">{children}</main>
            <footer className="bg-indigo-300 py-12 bg-opacity-20">
              <div className="mx-auto px-4 text-center text-gray-900">
                <p>
                  © {new Date().getFullYear()} CodeNow101. All Rights Reserved
                </p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
