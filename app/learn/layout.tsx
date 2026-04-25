import { Header } from '@/components/layout/Header';

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
