export const rememberToken = () => {

    const random = Math.random().toString(32).substring(2);
    const date = Date.now();

    return random + date;
}