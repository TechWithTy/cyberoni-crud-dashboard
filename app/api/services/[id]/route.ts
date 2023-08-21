import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/prismaClient";
import { createServiceDTO, read, remove, update } from "@/crud/service";
import { NextResponse } from 'next/server'


export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELTE = handler;



async function handler(req: NextApiRequest, { params }: { params: { id: string } } ) {

    if (req.method === "GET") {
        const serviceId = params.id as string;
        const service = await read(serviceId, prisma)
        return NextResponse.json({ data: service })

    }
    if (req.method === "PUT") {
        const serviceId = params.id as string;
        const service = req.body as createServiceDTO;
        const updatedService = await update(serviceId, service, prisma);
        return NextResponse.json({ message: "update success", data: updatedService });
    }
    if (req.method === "DELETE") {
        const serviceId = params.id as string;
        const deleted = await remove(serviceId, prisma);
        return NextResponse.json({ message: "delete success" });

    }
    if(req.method ==="POST") {
        return NextResponse.error()
    }


}