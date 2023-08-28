import { getAll, read, remove, update } from "@/crud/prompt";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from 'next/server'

export const GET = async (req: NextApiRequest, { params }: { params: { page: string } }) => {
    const prompts = await getAll(parseInt(params.page),10, prisma)  // skipping 10 record for every new page
    return NextResponse.json({ message: "found", data: prompts })

}
