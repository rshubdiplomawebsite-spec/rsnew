// import Navbar from "@/components/navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "./Provider";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "RS Hub Study Material",
  description:
    "Premium JUT Diploma notes, PYQs, PDFs, and exam-focused study resources.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GoogleOAuthProvider clientId="908554430875-nsba5aje061c0rmqijsqi6eh27cn2kke.apps.googleusercontent.com">
          <Provider>
            <Navbar />
            {children}
            <Toaster />
            <Footer />
            <Analytics />
          </Provider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
