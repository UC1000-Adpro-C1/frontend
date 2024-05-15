import * as React from "react";
import { useRouter } from 'next/router';
import '@/app/globals.css';

interface Topup {
    amount: number;
    status: string;
    transactionTime: string;
    topUpId: string;
    userOwnerId: string;
}

const UserTopups = () => {
    const router = useRouter();
    const { userId } = router.query; // Get user ID from query parameters
    const [topups, setTopups] = React.useState<Topup[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<Error | null>(null);

    React.useEffect(() => {
        if (!userId) return;

        const fetchTopups = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/topups/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTopups(data);
                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error);
                } else {
                    setError(new Error('An unknown error occurred'));
                }
                setLoading(false);
            }
        };

        fetchTopups();
    }, [userId]);

    // Debugging output
    console.log("Router ID:", userId);
    console.log("Topups:", topups);
    console.log("Loading:", loading);
    console.log("Error:", error);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Top-ups for User {userId}</h1>
            <ul>
                {topups.map((topup) => (
                    <li key={topup.topUpId}>
                        {topup.amount} - {topup.transactionTime}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserTopups;
