// src/app/register/page.js
"use client";

import { POST } from '../api/auth/register/route';
import { Alert } from "react-bootstrap";
import React, { useState } from 'react';

export default function Page() {
	const [alertMsg, setAlertMsg] = useState('')	
	const [fname, setFName] = useState('')
	const [lname, setLName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [alertMsgShow, setAlertMsgShow] = useState(false)
	const [alertVariant, setAlertVariant] = useState("danger")
	
	const handleLogin = async (e) => {
		e.preventDefault();
		setAlertMsgShow(false);
		// If email and password are missing
		if ((!email || email == " ") && (!password || password == " ")) {
			setAlertVariant("danger");
			setAlertMsgShow(true);
			setAlertMsg("All fields are required and cannot be empty.");
			return;
		}
		// If just email is missing
		if (!email || email == " ") {
			setAlertVariant("danger");
			setAlertMsgShow(true);
			setAlertMsg("Missing Email. Please Fill Out All Fields");
			return;
		}
		// If just password is missing
		if (!password) {
			setAlertVariant("danger");
			setAlertMsgShow(true);
			setAlertMsg("Missing Password. Please Fill Out All Fields");
			return;
		}
		// Check for valid email and password
		let validInfo = true;
		try {
			emailValidationChecker(email);
			passwordValidationChecker(password);
		}
		catch (exc) {
			validInfo = false;
			setAlertVariant("danger");
			setAlertMsgShow(true);
			setAlertMsg(exc);
		}
		// If info is valid
		if (validInfo) {
			let registerReq = {
				first_name: fname,
				last_name: lname,
				email: email,
				password: password,
			}
			let response = await POST( registerReq );
			if (response.status == 200 && response.message == "Success") {
				setAlertVariant("success");
				setAlertMsgShow(true);
				setAlertMsg("Registration Success");
			}
			else {
				setAlertVariant("danger");
				setAlertMsgShow(true);
				setAlertMsg(response.message);
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
				<label htmlFor="fname-input">First Name</label>
				<input id="fname-input" onChange={e => setFName(e.target.value)}/>

				<label htmlFor="lname-input">Last Name</label>
				<input id="lname-input" onChange={e => setLName(e.target.value)}/>

				<label htmlFor="email-input">Email</label>
				<input id="email-input" onChange={e => setEmail(e.target.value)}/>

				<label htmlFor="password-input">Password</label>
				<input id="password-input" type="password" onChange={e => setPassword(e.target.value)}/>

				<button type="submit">Register</button>
			</form>
			<p><a href="/login">Login</a></p>
		</main>
	);
}

// function will check if user's input email address meets the following requirements
// - contains a @ and a period in the email domain
// - contains text after the period in the email domain (i.e .com, .edu, etc.,)
// - errors will occur if there is the above conditions are not met, and/or if there are additional special characters, repeating periods or @
function emailValidationChecker(emailAddress) {
	let regexr = "[a-z0-9_-]+(?:\\.[a-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
	if (emailAddress.match(regexr)) {
		return true;
	}
	let moreThanOneAt_regex = "(@).*\\1";
	if (emailAddress.match(moreThanOneAt_regex)) {
		throw "Invalid Email Detected.";
	}
	let twoDotsInARow_regex = "[.]{2,}";
	if (emailAddress.match(twoDotsInARow_regex)) {
		throw "Invalid Email Detected.";
	}
	let noTextAfterDot_regex = "[.]\\w{1,}";
	if (emailAddress.match(noTextAfterDot_regex)) {
		throw "Invalid Email Detected.";
	}
	let missingDotAfterAt_regex = "[@]\\w{1,}[.]";
	if (emailAddress.match(missingDotAfterAt_regex)) {
		throw "Invalid Email Detected.";
	}
	let missingAt_regex = "";
	if (emailAddress.match(missingAt_regex)) {
		throw "Invalid Email Detected.";
	}
	// Message can be changed if different messages are desired instead of "invalid email"
	return false;
}

function passwordValidationChecker(password) {
	let containsSpecialChar = "[!@#$%^&*]";
	if (!password.match(containsSpecialChar)) {
		throw "Password requires at least 1 special character (e.g !@#$%^&*)";
	}
	let containsNumber = "[0-9]";
	if (!password.match(containsNumber)) {
		throw "Password requires at least 1 number";
	}
	if (password.length <= 8) {
		throw "Password requires to have a length greater than 8";
	}
	let regexr = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{9,}$";
	if (password.match(regexr)) {
		return true;
	}
	return false;
}
