import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "MindWise",
    description: "AI-powered mental health support",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <AuthProvider>
                    <ThemeProvider>{children}</ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}