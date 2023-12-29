export default async function getUserPosts(userId: string) {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
        // cache: 'force-cache', // default
        // cache: 'no-store', // ISR (Incremental Static Regeneration)
        next: {
            revalidate: 60, // revalidate every 60 seconds
        }
    });

    // if (!res.ok) throw new Error('failed to fetch posts');
    if (!res.ok) return undefined;

    return res.json();
}
