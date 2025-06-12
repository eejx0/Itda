export interface PostData {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    isComplete: boolean;
    createdAt: string;
    authorNickname: string;

    parentId?: string;
    seriesId?: string;
}