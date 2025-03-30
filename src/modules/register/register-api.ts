export const register = async<T>(username: string, password: string): Promise<T> => {
    return new Promise<T>(() => {
        fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    Promise.resolve(response.json());
                }
                throw new Error('Register failed');
            })
            .catch((error) => {
                console.error(error);
            }
            );
    })
}