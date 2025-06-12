import { PostData } from "./type";
import instance from "../axios";

export const createPost = async (postData: PostData) => {
    const response = await instance.post(
        `/posts`,
        {
            fields: {
                title: { stringValue: postData.title },
                content: { stringValue: postData.content },
                // imageUrl: { stringValue: postData.imageUrl },
                isComplete: { booleanValue: postData.isComplete },
                createdAt: { stringValue: postData.createdAt },
                authorNickname: { stringValue: postData.authorNickname },
                parentId: postData.parentId ? { stringValue: postData.parentId } : undefined,
                seriesId: postData.seriesId ? { stringValue: postData.seriesId } : undefined
            }
        }
    );
    return response.data;
};