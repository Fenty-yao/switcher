import { Comment } from "./types";

export const addCommentRequest = async (comment: Comment): Promise<Comment> => {
    return new Promise<Comment>(() => {
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        })
            .then((response) => {
                if (response.ok) {
                    Promise.resolve(response.json());
                }
                throw new Error('Login failed');
            })
            .catch((error) => {
                console.error(error);
            }
            );
    })
}