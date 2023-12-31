import { Blog, GptPrompt, Image, PricingModel, Review, Service, ServiceDescription, SubService, Tag, User } from "@prisma/client";

export type CreateBlogDTO = {
    title: string;
    subTitle: string;
    description: string;
    featured: boolean;
    date: Date;
    content: string;
    templateId?: string;
    author: { id?: string; email: string; };
    images: CreateImageDTO[];
    tags: CreateTagDTO[];
};

export type DisplayBlogDTO = Blog & { author: User; }; export type CreateImageDTO = {
    id?: string | undefined;
    name?: string | undefined | null;
    src: string;
};
export type CreateServiceDTO = {
    title: string;
    previewContent: string;
    featured: boolean;
    ServiceDescription: CreateServiceDescription[];
    hourlyRate: number;
    valueBrought: string[];
    skillsUsed: string[];
    htmlEmbed?: string;
    image?: CreateImageDTO;
    SubServices?: CreateSubServiceDTO[];
    tags?: CreateTagDTO[];
    faqs?: CreateFaqDTO[];
};

export type CreateServiceDescription = {
    id?: string;
    title: string;
    content: string;
    imageOnLeft: boolean;
    image: CreateImageDTO;

};
export type CreateFaqDTO = {
    question: string;
    answer: string;
};

export type DisplayServiceDTO = Service & {
    image?: Image;
    tags?: Tag[];
    SubServices?: SubService[];
    ServiceDescription?: (ServiceDescription & { image: Image; })[];

};
export type CreateSubServiceDTO = {
    id?: string;
    title: string;
    pricingModel: PricingModel;
    discounts: Discount[];
    serviceDeliverables: string[];
    serviceUsageScore: number;
    description: string;
    department: string;
    estimated_hours_times_fifty_percent: number;
    estimated_hours_times_one_hundred_percent: number;
    overheadCost: number;
    complexity: number;
    skillLevel: string;
    image?: CreateImageDTO;
    tags?: CreateTagDTO[];
};

export type Discount = {
    name: string;
    value: string;
};
export type CreateAddressDTO = {
    id?: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
};
export type CreateTagDTO = {
    id?: string;
    name: string;
};
export type CreateGptPromptDTO = {
    id?: string;
    description: string;
    title: string;
    prompt: string;
    model: string;
    temperature: number;
    max_tokens: number;
    top_p: number;
    best_of: number;
    frequency_penalty: number;
    presence_penalty: number;
    stop: string[]; // comma separaetd sequences
    timesUsed: number;
    timesIntegrated: number;
    costPerToken: number;
    profitMargin: number;
    tags: CreateTagDTO[];
    image?: CreateImageDTO | null;
    botUrl?: string;

};
export type DisplayPrompt = GptPrompt & {
    stop: string[];
    reviews?: Review[];
    image?: Image;
    tags: Tag[];
};

