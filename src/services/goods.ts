export async function getUserTopProducts(userId: string) {
    // Simulate fetching user's top products from an API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                [
                    { id: 'prod001', name: 'Эфиопия Арача', count: 15 },
                    { id: 'prod002', name: 'Колумбия Супремо', count: 12 },
                    { id: 'prod003', name: 'Бразилия Сантос', count: 10 },
                ]
            );
        }, 3000);
    });
}