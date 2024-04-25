// src/app/login/page.js
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from "react-bootstrap";

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");

    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        );

        const data = await res.json();

        if (data.message === "Login Sucessfult") {
            setAlertMessage(data.message);
            setAlertType("success");
            setShowAlert(true);

            await Login(data);

            router.push("/dashboard");
        } else {
            setAlertMessage(data.message);
            setAlertType("danger");
            setShowAlert(true);
        }
    };

    return (
        <main>
            {showAlert && (
                <Alert
                    key={alertType}
                    variant={alertType}
                    onClose={() => setShowAlert(false)}
                    dismissible
                >
                    {alertMessage}
                </Alert>
            )}
            <form
                onSubmit={handleLogin}
                className="p-4 my-5 d-flex flex-column"
                method="post"
                id="form"
            >
                <label htmlFor="email-input">Email</label>
                <input
                    id="email-input"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password-input">Password</label>
                <input
                    id="password-input"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </main>
    );
}
