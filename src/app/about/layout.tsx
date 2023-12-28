import { ReactNode } from "react";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'About Page',
    description: 'About Page Description',
}

interface WithChildren {
    children: ReactNode
}

const AboutLayout = ({ children }: WithChildren) => {
    return (
        <>
            <nav>About Navbar</nav>
            <main className={styles.main}>
                {children}
            </main>
        </>
    )
}

export default AboutLayout