import './globals.css'
import { Toaster } from 'sonner'

export const metadata = {
  title: 'Aditya Singh — DevOps & Cloud Engineer',
  description: 'DevOps Engineer building reliable cloud infrastructure, CI/CD pipelines, and platform automation. AWS · Kubernetes · Terraform · Jenkins.',
  keywords: ['DevOps Engineer','Cloud Engineer','Platform Engineer','AWS','Kubernetes','Terraform','Jenkins','Docker','CI/CD','Aditya Singh','Indore'],
  authors: [{ name: 'Aditya Singh' }],
  openGraph: {
    title: 'Aditya Singh — DevOps & Cloud Engineer',
    description: 'Building reliable cloud infrastructure, scalable deployment pipelines, and automation that helps engineering teams move faster.',
    type: 'website',
    siteName: 'Aditya Singh'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Singh — DevOps & Cloud Engineer',
    description: 'Building reliable cloud infrastructure, scalable deployment pipelines, and automation.'
  },
  robots: { index: true, follow: true }
}

export const viewport = {
  themeColor: '#05070d',
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="noise antialiased">
        {children}
        <Toaster position="bottom-right" theme="dark" richColors closeButton />
      </body>
    </html>
  )
}
