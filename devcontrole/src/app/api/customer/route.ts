import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export async function DELETE(request: Request) {
    // valide session
    const session = await getServerSession(authOptions);

    if (!session || !session.user){
        return NextResponse.json({ error: "Not authorized"}, { status: 401 })
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    if (!userId) {
        return NextResponse.json({ error: "Failed delete customer"}, { status: 400 })
    }

    const findTicket = await prismaClient.ticket.findFirst({
        where: {
            custumerId: userId
        }
    })

    if(findTicket){
        return NextResponse.json({ error: "Failed delete customer"}, { status: 400})
    }

    try {
        await prismaClient.custumer.delete({
            where: {
                id: userId as string
            }
        })

        return NextResponse.json({ message: "Customer deleted com sucesso!"})

    } catch (err) {
        return NextResponse.json({ error: "Failed delete customer"}, { status: 400 })
    }

    return NextResponse.json({ ok: true})
}

export async function POST(request: Request) {
    
    const session = await getServerSession(authOptions);

    if (!session || !session.user){
        return NextResponse.json({ error: "Not authorized"}, { status: 401 })
    }

    const { name, email, phone, address, userId } = await request.json();
    
    try {
        await prismaClient.custumer.create({
            data: {
                name,
                phone,
                email,
                address: address ? address : "",
                userId: userId
            }
        })

        return NextResponse.json({ message: "Cliente cadastrado com sucesso!"}, { status: 201 })
        
    } catch(err){
        return NextResponse.json({ error: "Failed create new customer"}, { status: 400 })
    }

}