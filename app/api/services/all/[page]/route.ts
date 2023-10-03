import { getAll, read, remove, update } from "@/crud/service";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from 'next/server'
import apiHandler from "@/errorHandler";

const get = async (req: NextApiRequest, { params }: { params: { page: string } }) => {
    const services = await getAll(parseInt(params.page),10, prisma)  // skipping 10 record for every new page
    return NextResponse.json({ message: "found", data: services })

}
export const { POST, DELETE, GET, PATCH, PUT } = apiHandler({ GET: get });
