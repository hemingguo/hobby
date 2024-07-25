import { useState } from 'react';
import './logic.css'

import {
    VoicemailFilled,
} from "@fluentui/react-icons"

import {
    Input,
    Label,
    Button,
} from '@fluentui/react-components'

const Welcome = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            const response = await fetch('http://127.0.0.1:7001/logic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phone,
                    password: password,
                }),
            });

            const result = await response.json();

            if (result.success) {
                alert('Login successful!');
                window.location.href = '../../index.html'; // Redirect to home page
            } else {
                alert(result.message); // Display error message
            }
        } catch (error) {
            alert('Login failed');
            console.error(error);
        }
    };

    const handleSignUp = () => {
        window.location.href = '../register/register.html'; // Redirect to registration page
    };

    return (
        <>
            <div className="welcome-message">
                ~~   WELCOME   ~~
            </div>
            <div className="icon-container">
                <VoicemailFilled fontSize="128px" />
            </div>

            <div className="input-container">
                <div className="input-group">
                    <Label className="label-a">Account</Label>
                    <Input
                        className="input"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <Label className="label-p">Password</Label>
                    <Input
                        className="input"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="button-group">
                <Button className="button button-login" onClick={handleSignIn} shape="circular">Sign in</Button>
                <Button className="button button-register" onClick={handleSignUp} shape="circular">Sign up</Button>
            </div>
        </>
    );
};

export default Welcome;
