import './register.css';
import {
    VoicemailFilled,
} from "@fluentui/react-icons";
import {
    Input,
    Label,
    Button,
} from '@fluentui/react-components';
import { useState } from 'react';


const Reg = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (!/^\d{11}$/.test(phone)) {
            alert('Phone number must be 11 digits!');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters!');
            return;
        }
        

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:7001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phone,
                    password: password,
                }),
            });

            if (response.ok) {
                alert('Registration successful!');
                window.location.href = '../logic/logic.html';
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            alert('Registration failed');
            console.error(error); // 打印错误信息
        }
    };

    const handleCancel = async () => {
        window.location.href = '../logic/logic.html';
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
                    <Label className="label-n">Phone</Label>
                    <Input
                        className="input"
                        placeholder="Enter your phone number"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <Label className="label-a">Password</Label>
                    <Input
                        className="input"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <Label className="label-p">Confirm</Label>
                    <Input
                        className="input"
                        placeholder="Re-enter to confirm"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="button-group">
                <Button className="button button-register" onClick={handleRegister} shape="circular">OK</Button>
                <Button className="button button-cancel" onClick={handleCancel} shape="circular">Cancel</Button>
            </div>
        </>
    );
};

export default Reg;
