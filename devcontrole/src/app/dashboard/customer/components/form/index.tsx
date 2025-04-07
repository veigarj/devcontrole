"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    name: z.string().min(1, "Nome completo é obrigatório"),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    phome: z.string().refine( (value) => {
        return /^(?:\(\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    },{
        message: "O numero de telefone deve estar (DD) 9 9999-9999",
    }),
    address: z.string(),
})

type FormData = z.infer<typeof schema>

export function NewCustomerForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })
  return (
    <form>
        <label>Nome completo</label>
        <input type="text"
        placeholder="Digite seu nome completo"    
        />
    </form>
  )
}
