import Container from "@/components/container";
import Link from "next/link";

// route autorization
import { getServerSession   } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";

export default async function NewTicket() {
    const session = await getServerSession(authOptions)

    // verify if user is logged
    if(!session || !session.user){
        redirect('/')
    }

    // get all customers is user logged
    const customers = await prismaClient.custumer.findMany({
        where: {
            userId: session.user.id
        }
    })

  return (
    <Container>
        <main className='mt-9 mb-2'>
        <div className="flex items-center gap-3">
            <Link href='/dashboard' className='text-white px-4 py-1 bg-gray-900 rounded'>
                Voltar
            </Link>
            <h1 className='text-3xl font-bold'>Novo Chamado</h1>
        </div>

        <form className='flex flex-col mt-5'>
            <label className="mb-1 font-medium text-lg">Nome do chamado</label>
            <input 
                className='w-full border-gray-400 border-1 rounded-md px-2 mb-2 h-11'
                type="text"
                placeholder="Digite o nome do chamado"
                required
            />
            <label className="mb-1 font-medium text-lg">Nome do chamado</label>
            <textarea 
                className='w-full border-gray-400 border-2 rounded-md px-2 mb-2 h-24 resize-none'
                placeholder="Digite o nome do chamado"
                required
            ></textarea>

            {customers.length !== 0 && (
                <>
                    <label className="mb-1 font-medium text-lg">Selecione o cliente</label>
                    <select
                    className='w-full border-gray-400 border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white'
                    >
                    {customers.map( customer => (
                        <option key={customer.id}value={customer.id}>{customer.name}</option>
                    ))}
                    </select>
                </>
            )}

            {customers.length === 0 && (
                <Link href='/dashboard/new/customer'>
                    Você não tem nenhum cliente cadastrado, <span className="text-blue-500 font-medium">clique aqui para cadastrar</span>
                </Link>
            )}

            <button 
            type='submit'
            className='bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed'
            disabled={customers.length ===0}
            >
                Cadastrar
            </button>
        </form>
        </main>
    </Container>
  )
}
