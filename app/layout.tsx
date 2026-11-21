import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Asmita Gorti — Software & Studio',
  description: 'Selected software engineering work and creative projects by Asmita Gorti.',
};
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
