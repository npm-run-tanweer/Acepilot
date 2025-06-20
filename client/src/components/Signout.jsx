import { SignOutButton } from '@clerk/clerk-react'

export default function SignOut() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-neutral-800 text-neutral-900">
      <SignOutButton>
        <button className='bg-white rounded-lg px-6 py-2'>Custom sign out button</button>
      </SignOutButton>
    </div>
  )
}