import * as React from "react";
import { useRouter } from 'next/router';
import '@/app/globals.css';
import Link from "next/link";

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

    const handleCancel = async (topUpId: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/topups/cancel/${topUpId}`, {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Update the topups state to reflect the cancelled status
            setTopups((prevTopups) =>
                prevTopups.map((topup) =>
                    topup.topUpId === topUpId ? { ...topup, status: 'CANCELLED' } : topup
                )
            );
        } catch (error) {
            if (error instanceof Error) {
                setError(error);
            } else {
                setError(new Error('An unknown error occurred'));
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Top-ups for User {userId}</h1>
            <Link href={`/topups/${userId}/AddBalance`}>
                Add Balance
            </Link>
            <ul>
                {topups.map((topup) => (
                    <li key={topup.topUpId}>
                        {topup.amount} - {topup.transactionTime} - {topup.status}
                        {topup.status === "PENDING" && (
                            <button onClick={() => handleCancel(topup.topUpId)}>Cancel</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserTopups;
