import * as React from "react";
import { useRouter } from 'next/router';
import '@/../../app/globals.css';
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
        <div className="py-12 container mx-auto">
        <div>
            <h1>Top-ups for User {userId}</h1>
            <Link href={`/topups/${userId}/AddBalance`}>
                Add Balance
            </Link>
            <ul>
                {topups.map((topup) => (
                    <div key={topup.topUpId} className="bg-white shadow-lg rounded-lg p-4 mb-4">
                        <p><strong>Amount:</strong> Rp{topup.amount}</p>
                        <p><strong>Status:</strong> {topup.status}</p>
                        <p><strong>Transaction Time:</strong> {topup.transactionTime}</p>
                        {topup.status === "PENDING" && (
                            <button onClick={() => handleCancel(topup.topUpId)}>Cancel</button>
                        )}
                    </div>
            ))}
            </ul>
        </div>
        </div>
)
    ;
};

export default UserTopups;
