import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Home Page!</h1>
      <Link href="/about">To About</Link>
      <br />
      <Link href="/users">To Users</Link>
    </main>
  )
}
