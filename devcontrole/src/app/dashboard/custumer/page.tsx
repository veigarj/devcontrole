import Component from '@/components/container'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Custumer() {
      const session = await getServerSession(authOptions)
    
      if (!session || !session.user) {
        redirect('/')
      }

  return (
    <Component>
        <main>
            <div>
                <h1>Meus Clientes</h1>
            </div>
        </main>
    </Component>
  )
}
