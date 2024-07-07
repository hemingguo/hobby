import './register.css'

import {
    VoicemailFilled,
} from "@fluentui/react-icons"

import {
    Input,
    Label,
    Button,
} from '@fluentui/react-components'

const Reg = () => {

    const handleRegister = () => {
        window.location.href = '../logic/logic.html'; 
    };

    const handleCancel = () => {
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
                    <Label className="label-a" >Password</Label>
                    <Input className="input" placeholder="Enter your password" type="password" />
                </div>
                <div className="input-group">
                    <Label className="label-p" >Confirm</Label>
                    <Input className="input" placeholder="Re-enter to confirm" type="password" />
                </div>
            </div>
            <div className="button-group">
                <Button className="button button-register" onClick={handleRegister} shape="circular">OK</Button>
                <Button className="button button-cancel" onClick={handleCancel} shape="circular">Cancel</Button>
            </div>

        </>
    )
}

export default Reg