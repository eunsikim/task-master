// src/app/register/page.js
"use client";

import { useState } from "react";
import { Alert } from "react-bootstrap";

// function will check if user's input email address meets the following requirements
// - contains a @ and a period in the email domain
// - contains text after the period in the email domain (i.e .com, .edu, etc.,)
// - errors will occur if there is the above conditions are not met, and/or if there are additional special characters, repeating periods or @
function emailValidationChecker(emailAddress) {
    return emailAddress;
}

//function will check that user input is not blank
function filledInField(emailAddress) {
    return emailAddress;
}

export default function Page() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [alertShow, setAlertShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
            }),
        });

        const data = await res.json();

        if (data.message === "Registration Successful") {
            setAlertMessage(data.message);
            setAlertType("sucess");
            setAlertShow(true);

            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
        } else {
            setAlertMessage(data.message);
            setAlertType("danger");
            setAlertShow(true);
        }
    };

    return (
        <main>
            {alertShow && (
                <Alert
                    key={alertType}
                    variant={alertType}
                    onClose={() => setAlertShow(false)}
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
                <label htmlFor="fname-input">First Name</label>
                <input
                    id="fname-input"
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor="lname-input">Last Name</label>
                <input
                    id="lname-input"
                    onChange={(e) => setLastName(e.target.value)}
                />

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
