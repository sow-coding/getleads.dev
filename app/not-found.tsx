import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-full my-4 flex flex-col items-center'>
      <h2 className='text-2xl font-bold'>Not Found</h2>
      <p className='my-4'>Could not find requested resource</p>
      <Link href="/dashboard">
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  )
}