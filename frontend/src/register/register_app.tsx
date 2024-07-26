import './register.css';
import {
    VoicemailFilled,
} from "@fluentui/react-icons";
import {
    Input,
    Label,
    Button,
    Toaster,
    useToastController,
    ToastTrigger,
    ToastTitle,
    Toast,
    useId,
} from '@fluentui/react-components';
import { useState } from 'react';


const Reg = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const toasterId = useId('toaster');
    const { dispatchToast } = useToastController(toasterId);


    const showToast = (message: string, intent: 'success' | 'error' | 'warning' | 'info') => {
        dispatchToast(
            <Toast>
                <ToastTitle
                    action={
                        <ToastTrigger>
                            <Button appearance="transparent" size="small">Close</Button>
                        </ToastTrigger>
                    }
                >
                    {message}
                </ToastTitle>
            </Toast>,
            { intent: intent }
        );
    };

    const handleRegister = async () => {
        if (!/^\d{11}$/.test(phone)) {
            showToast('Phone number must be 11 digits!', 'warning');
            return;
        }

        if (password.length < 6) {
            showToast('Password must be at least 6 characters!', 'warning');
            return;
        }


        if (password !== confirmPassword) {
            showToast('Passwords do not match!', 'error');
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
                showToast('Registration successful!', 'success');
                setTimeout(() => {
                    window.location.href = '../logic/logic.html';
                }, 800);
            } else {
                showToast('Registration failed', 'error');
            }
        } catch (error) {
            showToast('Registration failed', 'error');
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
                        appearance="filled-lighter-shadow"
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
                        appearance="filled-lighter-shadow"  
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
                        appearance="filled-lighter-shadow"
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
            <Toaster toasterId={toasterId} />
        </>
    );
};

export default Reg;
