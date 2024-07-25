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

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    alert('Login successful!');
                    window.location.href = '../../index.html'; // 跳转到主页
                } else {
                    alert('Login failed: ' + data.message);
                }
            } else {
                alert('Login failed');
            }


        } catch (error) {
            alert('Login failed');
            console.error(error); // 打印错误信息
        }
    };


    const handleSignUp = () => {
        window.location.href = '../register/register.html'; // 跳转到注册页面
    };

    return (<>
        <div className="welcome-message">
            ~~   WELCOME   ~~
        </div>
        <div className="icon-container">
            <VoicemailFilled fontSize="128px" />
        </div>

        <div className="input-container">
            <div className="input-group">
                <Label className="label-a" >Account</Label>
                <Input className="input" placeholder="Enter your phone number" />
            </div>
            <div className="input-group">
                <Label className="label-p" >Password</Label>
                <Input className="input" placeholder="Enter your password" type="password" />
            </div>
        </div>
        <div className="button-group">
            <Button className="button button-login" onClick={handleSignIn} shape="circular">Sign in</Button>
            <Button className="button button-register" onClick={handleSignUp} shape="circular">Sign up</Button>
        </div>



    </>
    );
};

export default Welcome