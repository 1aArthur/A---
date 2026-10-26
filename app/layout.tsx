import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Asthex (.astun) — Arquitetura da Linguagem & Laboratório de Estudos',
  description: 'Portal oficial de engenharia, arquitetura e trilha de estudos da linguagem de programação Asthex (.astun): física dimensional, alta performance e computação de silício.',
  openGraph: {
    title: 'Asthex (.astun) — Arquitetura da Linguagem & Laboratório de Estudos',
    description: 'Portal oficial de engenharia, arquitetura e trilha de estudos da linguagem de programação Asthex (.astun): física dimensional, alta performance e computação de silício.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asthex (.astun) — Arquitetura da Linguagem & Laboratório de Estudos',
    description: 'Portal oficial de engenharia, arquitetura e trilha de estudos da linguagem de programação Asthex (.astun): física dimensional, alta performance e computação de silício.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className="dark">
      <body suppressHydrationWarning className="bg-[#08090c] font-sans antialiased text-[#f5f6fa]">
        {children}
      </body>
    </html>
  );
}
