import Image from 'next/image'
import styles from "@/styles/page.module.css"
import HomePage from '@/components/HomePage'

export default function Home() {
  return (
    <main className="text-black">
      <HomePage/>
    </main>
  )
}
