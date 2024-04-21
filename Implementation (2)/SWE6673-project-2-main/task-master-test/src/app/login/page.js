// src/app/login/page.js
"use client";

import { Alert } from "react-bootstrap";
import React, { useState } from 'react';

export default function Page() {
	const [alertMsg, setAlertMsg] = useState('')	
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [alertMsgShow, setAlertMsgShow] = useState(false)
	const [alertVariant, setAlertVariant] = useState("danger")

	const handleLogin = async (e) => {
		e.preventDefault();
		
		setAlertMsgShow(true);
		if (!email || !password) {
			setAlertMsgShow(true);
			setAlertMsg(`ERROR: Enter a ${(!email && password ? "email" : (email && !password ? "password" : "email and password"))}.`, );
		}
		else {
			setAlertMsgShow(false);
		
		// TODO: Example of a backend call
		// axios.post('http://localhost.3002/login', {email, password}).then(res => console.log(res))
		// THIS IS JUST MOCK DATA.
			if (email == "JohnDough123@gmail.com" && password == "password123") {
				setAlertVariant("success");
				setAlertMsgShow(true);
				setAlertMsg(`Login Successful`);
			}
			else {
				setAlertVariant("danger");
				setAlertMsgShow(true);
				setAlertMsg(`ERROR`);
			}
		}
	};

	
	return (
		<main>
			<Alert role="alert" aria-label="alert" key="success" variant={alertVariant} show={alertMsgShow}>
				{alertMsg}
			</Alert>
			<form
				onSubmit={handleLogin}
				className="p-4 my-5 d-flex flex-column"
				method="post"
				id="form"
			>
				<label htmlFor="email-input">Email</label>
				<input id="email-input" onChange={e => setEmail(e.target.value)}/>

				<label htmlFor="password-input">Password</label>
				<input id="password-input" onChange={e => setPassword(e.target.value)}/>

				<button type="submit">Login</button>
			</form>
			<p><a href="/register">Register</a></p>
		</main>
	);
}
