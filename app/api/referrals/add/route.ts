import { create, CreateReferralDTO } from "@/crud/referral";
import apiHandler from "@/errorHandler";
import { prisma } from "@/prisma/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const { POST, DELETE, GET, PATCH, PUT } = apiHandler({ POST: post });

async function post(req: Request) {


    if (req.method === "POST") {
        const referral = await req.json() as CreateReferralDTO;
        try {
            const newEvent = await create(referral, prisma);
            return NextResponse.json({ message: "Add success", data: newEvent });
        } catch (error) {
            console.log(error);
            const err = error as PrismaClientKnownRequestError
            if (err.code === 'P2002') return NextResponse.json({ message: "Duplicate prefix/username" }, { status: 400 })
            else return NextResponse.json({ message: err.message }, { status: 400 })
        }
    }


}