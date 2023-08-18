import { create, createUserDTO } from "@/crud/user";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        res.status(400).json({ error: 'Get is not Allowed on this path' })
    }
    if (req.method === "POST") {
        const userId = req.query.id as string;
        const user = req.body as createUserDTO;
        const updatedUser = await create(user, prisma);
        res.status(200).json({ message: "update success", data: updatedUser });
    }
    if (req.method === "PATCH") {
        res.status(400).json({ error: 'Patch is not Allowed on this path' })
    }
    if (req.method === "DELETE") {
        res.status(400).json({ error: 'Delete is not Allowed on this path' })
    }


}