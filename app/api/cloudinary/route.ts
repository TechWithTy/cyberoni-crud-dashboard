import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/prismaClient";
import { createEventDTO, read, remove as removeEvent, update } from "@/crud/event";
import { NextRequest, NextResponse } from 'next/server'
import apiHandler from "@/errorHandler";
import { deleteFile, uploadFile } from "@/lib/cloudinary";

export const { POST, DELETE, GET, PATCH, PUT } = apiHandler({ POST: post });

async function post(req: NextRequest) {

    const {file, fileType, requestType, fileId } =  await req.json();

    if(requestType ==='UPLOAD') {
        const response = await uploadFile(file, fileType);
        return NextResponse.json({ message: "success", data: {url: response.secure_url} });
    }

    if(requestType ==='DELETE') {
        const response = await deleteFile(fileId, fileType);
        return NextResponse.json({ message: "success", data: {url: response.secure_url} });
    }

}
