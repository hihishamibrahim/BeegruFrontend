import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import { GlobalAlert } from '../utils/globalAlert';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <GlobalAlert/>
        </AuthProvider>
      </body>
    </html>
  );
}
