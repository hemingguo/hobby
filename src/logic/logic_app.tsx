
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

    const handleSignIn = () => {
        window.location.href = '../../index.html'; // 跳转到指定页面
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
                <Input className="input" placeholder="Enter your account" />
            </div>
            <div className="input-group">
                <Label className="label-p" >Password</Label>
                <Input className="input" placeholder="Enter your password" type="password" />
            </div>
        </div>
        <div className="button-group">
            <Button className="button button-login" onClick={handleSignIn} shape="circular">Sign in</Button>
            <Button className="button button-register" shape="circular">Sign up</Button>
        </div>



    </>
    );
};

export default Welcome