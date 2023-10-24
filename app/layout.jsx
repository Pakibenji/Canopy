import "./globals.css";
import { body } from "./fonts";
import { AuthProvider } from "./Provider";
import { CityContextProvider } from "./context/geoLocationContext";
import Header from "./components/LayoutComponents/Header";
export const metadata = {
  title: "Jardin Calme",
  description:
    "L'application de jardinage qui favorise le partage, l'échange de plantes et la tranquillité dans le monde de la botanique.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={body.style}>
        <AuthProvider>
          <CityContextProvider>
            <Header />
            {children}
          </CityContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
