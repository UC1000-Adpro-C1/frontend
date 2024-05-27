import Link from "next/link";
import '@/app/globals.css';
import { useRouter } from 'next/router';
import React, { useState, FormEvent } from 'react';
const UnauthorizedUser: React.FC = () => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500">
            <div className="text-center p-8 shadow-lg rounded-xl">
                <h1 className="text-3xl font-bold mb-8">You are not authenticated for this user or have not logged in yet.</h1>
                <Link
                    href="/"
                    className="p-6 text-center hover:text-white focus:text-black transition-colors duration-300 ease-in-out"
                >
                    <h3 className="text-2xl font-bold">Back to Landing Page &rarr;</h3>
                </Link>
            </div>
        </div>
    );
};

export default UnauthorizedUser;