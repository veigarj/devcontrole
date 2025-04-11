"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/input"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation" 

const schema = z.object({
    name: z.string().min(1, "Nome completo é obrigatório"),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    phone: z.string().refine( (value) => {
        return /^(?:\(\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    },{
        message: "O numero de telefone deve estar (DD) 9 9999-9999",
    }),
    address: z.string(),
})

type FormData = z.infer<typeof schema>

export function NewCustomerForm({ userId }: { userId: string}) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })
    

    const router = useRouter();

    async function handleRegisterCustumer(data: FormData){
        await api.post("/api/customer", {
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            userId: userId
        })

        router.replace("/dashboard/customer")
    }
  return (
    <form className="mt-6 flex flex-col" onSubmit={handleSubmit(handleRegisterCustumer)} >
        <label className="mb-1 text-lg font-medium">Nome completo</label>
        <Input 
            type="text"
            name="name"
            placeholder="Nome completo"
            error={errors.name?.message}
            register={register}
        />

        <section className="flex gap-2 my-2 flex-col sm:flex-row">
            <div className="flex-1">
            <label className="mb-1 text-lg font-medium">Telefone</label>
            <Input 
                type="number"
                name="phone"
                placeholder="Exeplo (DD) 999999999"
                error={errors.phone?.message}
                register={register}
                />
            </div>

            <div className="flex-1">
            <label className="mb-1 text-lg font-medium">Email</label>
            <Input 
                type="email"
                name="email"
                placeholder="Digite seu email"
                error={errors.email?.message}
                register={register}
                />
            </div>
            
        </section>
        
            <label className="mb-1 text-lg font-medium">Endereço completo</label>
            <Input 
                type="text"
                name="address"
                placeholder="Digite o enderoço do cliente.."
                error={errors.address?.message}
                register={register}
            />

            <button type="submit" className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold">Cadastrar</button>
    </form>
  )
}
