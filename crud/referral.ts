import { PrismaClient, Referral, ReferralPriority, ReferralType } from "@prisma/client";

export type CreateReferralDTO = {
    prefix: string | null;
    type: ReferralType;
    campaignId: string;
    expires: Date;
    description: string;
    priority: ReferralPriority;
    link: string;
    fallback: string;
    redirect: string
    click: number
}


export async function create(referral: CreateReferralDTO, prisma: PrismaClient) {
    const referrals = prisma.referral
    const newReferral = await referrals.create({
        data: referral
    })

    return newReferral

}

export async function read(id: string, prisma: PrismaClient) {
    const referrals = prisma.referral
    const newReferral = await referrals.findUnique({
        where: {
            id
        }
    })

    return newReferral

}

export async function remove(id: string, prisma: PrismaClient) {
    const referrals = prisma.referral
    const newReferral = await referrals.delete({
        where: {
            id
        }
    })

    return newReferral

}



export async function update(id: string, referral: CreateReferralDTO, prisma: PrismaClient) {
    const referrals = prisma.referral
    const newReferral = await referrals.update({
        where: {
            id
        },
        data: referral
    })

    return newReferral

}

export async function getAll(page: number, pageSize: number, prismaClient: PrismaClient) {
    const refferals = prismaClient.referral;

    if (pageSize !== 10 && pageSize != 30 && pageSize !== 50) throw new Error('page size must be 10, 30 or 50')

    let allrefferals = await refferals.findMany({
        skip: (page - 1) * pageSize, take: pageSize,
        where: {
        },
    })

    const totalCount = await refferals.count();
    const totalPages = Math.ceil(totalCount / pageSize);

    return { records: allrefferals, currentPage: page, totalPages, pageSize }

}
