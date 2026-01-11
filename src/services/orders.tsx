export async function getRecentOrders(){
    // Simulate fetching recent orders from an API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: '00075', finalAmount: 235000, date: "2024-06-01" },
                { id: '00412', finalAmount: 1580000, date: "2024-06-02" },
                { id: '00015', finalAmount: 120000, date: "2024-06-03" },
            ]);
        }, 4000);
    });

}

export async function getUserOrdersAnalytics(userId: string) {
    // Simulate fetching orders analytics from an API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                totalOrders: 150,
                totalSpent: 35000000,
                averageOrderValue: 233333,
            });
        }, 2500);
    });

}

