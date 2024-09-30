export interface IBlog {
    title: string;
    content: string;
    image_url: string;
    author_Name?: string;
    isPublic?: boolean;
    totalLikes?: number;
    totalComments?: number;
    comments?: IComment[];
    tags?: string[];
    categories?: string[];
    slug?: string;
    readingTime?: string;
    metaDescription?: string;
    isFeatured?: boolean;
    views?: number;
}

export interface IComment {
    userEmail: string;
    userName: string;
    commentMessage: string;
    likes?: number;
    reply?: IComment[];
}


