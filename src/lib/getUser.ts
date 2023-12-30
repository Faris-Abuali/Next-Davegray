export default async function getUser(userId: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

    // if (!res.ok) throw new Error('failed to fetch users');
    if (!res.ok) return undefined;

    return res.json();
}
