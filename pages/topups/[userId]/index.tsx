import * as React from "react";
import { useRouter } from 'next/router';
import '@/app/globals.css';
import Link from "next/link";
import { getCookie } from '@/utils/cookies';

interface Topup {
    amount: number;
    status: string;
    transactionTime: string;
    topUpId: string;
    userOwnerId: string;
}

const UserTopups = () => {
    const router = useRouter();
    var { userId } = router.query; // Get user ID from query parameters
    const [topups, setTopups] = React.useState<Topup[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<Error | null>(null);

    React.useEffect(() => {
        if (!userId) {
            return; // If userId is not defined, do nothing
        }

        if (userId !== getCookie('username')) {
            router.push(`/UnauthorizedUser`);
            return;
        }

        const fetchTopups = async () => {
            try {
                const response = await fetch(`http://34.87.57.125/api/topups/${userId}`);
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
            const response = await fetch(`http://34.87.57.125/api/topups/cancel/${topUpId}`, {
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
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500 p-4">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => router.push('/')}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mb-4"
                >
                    Back
                </button>
                <div>
                    <h1 className="text-white text-2xl mb-4">Top-ups for User {userId}</h1>
                    <button
                        onClick={() => router.push(`/topups/${userId}/AddBalance`)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4"
                    >
                        Add Balance
                    </button>
                    <ul>
                        {topups.map((topup) => (
                            <div key={topup.topUpId} className="bg-white shadow-lg rounded-lg p-4 mb-4">
                                <p><strong>Amount:</strong> Rp{topup.amount}</p>
                                <p><strong>Status:</strong> {topup.status}</p>
                                <p><strong>Transaction Time:</strong> {topup.transactionTime}</p>
                                {topup.status === "PENDING" && (
                                    <button onClick={() => handleCancel(topup.topUpId)}
                                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700">Cancel</button>
                                )}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    )
        ;
};

export default UserTopups;