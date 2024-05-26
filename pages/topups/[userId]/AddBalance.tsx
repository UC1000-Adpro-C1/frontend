import { useRouter } from 'next/router';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import '@/../../app/globals.css';

export default function AddBalance() {
    const router = useRouter();
    const { userId } = router.query;
    const [amount, setAmount] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setMessage('Please enter a valid amount.');
            setLoading(false); // Stop loading
            return;
        }

        try {
            // Construct TopUp object
            const topUpData = {
                amount: numericAmount,
                transactionTime: new Date().toISOString(),
                userOwnerId: userId as string
            };

            // Make the HTTP request to your backend API route
            const response = await fetch('http://34.87.57.125/api/topup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(topUpData), // Send constructed TopUp object
            });

            if (!response.ok) {
                throw new Error('Failed to submit data');
            }

            setMessage('Top-up successful!');
            setAmount(''); // Clear input after successful submission
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-6xl font-bold">Add Balance</h1>
            <p className="mt-3 text-2xl">User ID: {userId}</p>
            <form onSubmit={handleSubmit} className="w-full max-w-sm mt-6">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter amount"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </form>
            {message && <p className="mt-4 text-red-500">{message}</p>}
            <Link href={`/topups/${userId}`}>
                Go back to User Topup
            </Link>
        </div>
    );
}
