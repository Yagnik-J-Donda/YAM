import type { Metadata } from 'next';
import './user.css';

export const metadata: Metadata = {
  title: 'YAM Prototype User',
  description: 'Your personal doorway to the Y(A–Z)M ecosystem.',
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return children;
}
