import { Product, PrismaClient, Supplier, ProductStatus } from "@prisma/client";
import { connectOrCreateObject as connectTag, CreateTagDTO } from "./tags";
import { connectOrCreateObject as connectImage, CreateImageDTO } from "./images";
import { CreateSupplierDTO } from "./supplier";

export type CreateProductDTO = {
    sku: string;
    name: string;
    status: ProductStatus;
    ratings?: number;
    inventory: number;
    productBreakdown?: string;
    shippingReturnPolicy: string;
    description: string;
    price: number;
    profitMargin: number;
    displayPrice: number;
    category: string;
    subcategory?: string;
    tags: CreateTagDTO[];
    images: CreateImageDTO[];
    suppliers?: Supplier[];
    amazonProductId?: string;
    cjDropShippingId?: string;
}


export type displayProductDTO = {
    id: string;
    sku: string;
    name: string;
    status: string;
    ratings: number | null;
    inventory: number;
    productBreakdown: string | null;
    shippingReturnPolicy: string;
    description: string;
    price: number;
    profitMargin: number;
    displayPrice: number;
    category: string;
    subcategory: string | null;
    amazonProductId?: string;
    cjDropShippingId?: string;
}
async function create(product: CreateProductDTO, prismaClient: PrismaClient) {
    const products = prismaClient.product;
    let createdproduct = await products.create({
        data: {
            ...product,
            tags: { connectOrCreate: connectTag(product.tags) },
            images: { connectOrCreate: connectImage(product.images) },
            suppliers: { connect: product.suppliers }
        }
    });
    return createdproduct
}

async function update(productId: string, product: CreateProductDTO, prismaClient: PrismaClient) {
    const products = prismaClient.product;
    let createdproduct = await products.update({
        where: { id: productId },
        data: {
            ...product,
            tags: { connectOrCreate: connectTag(product.tags) },
            images: { connectOrCreate: connectImage(product.images) },
            suppliers: { connect: product.suppliers }
        }
    });
    return createdproduct
}
async function remove(productId: string, prismaClient: PrismaClient) {
    const products = prismaClient.product;
    const existingproduct = await products.findUnique({ where: { id: productId } })
    if (existingproduct) {
        await products.delete({ where: { id: productId } })
    }
}
async function read(productId: string, prismaClient: PrismaClient) {
    const products = prismaClient.product;
    const existingproduct = await products.findUnique({
        where: { id: productId }, include: {
            reviews: true,
            images: true,
            tags: true,
            suppliers: true
        }
    })
    if (existingproduct) return existingproduct;

}

async function getAll(page: number, pageSize: number, prismaClient: PrismaClient) {
    const products = prismaClient.product;

    if (pageSize !== 10 && pageSize != 30 && pageSize !== 50) throw new Error('page size must be 10, 30 or 50')

    let allProducts = await products.findMany({
        skip: (page - 1) * pageSize, take: pageSize,
        where: {
        },
        include: {
            // reviews: true,

        }
    })

    const totalCount = await products.count();
    const totalPages = Math.ceil(totalCount / pageSize);

    return { records: allProducts, currentPage: page, totalPages, pageSize }

}

export { create, update, remove, read, getAll }