import { useState } from "react";
import "./logic.css";

import { VoicemailFilled } from "@fluentui/react-icons";

import {
  Input,
  Label,
  Button,
  Toaster,
  useToastController,
  ToastTitle,
  ToastTrigger,
  Toast,
  useId,
} from "@fluentui/react-components";

const Welcome = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const showToast = (
    message: string,
    intent: "success" | "error" | "warning" | "info"
  ) => {
    dispatchToast(
      <Toast>
        <ToastTitle
          action={
            <ToastTrigger>
              <Button appearance="transparent" size="small">
                Close
              </Button>
            </ToastTrigger>
          }
        >
          {message}
        </ToastTitle>
      </Toast>,
      { intent: intent }
    );
  };
  const handleSignIn = async () => {
    try {
      const response = await fetch("http://127.0.0.1:7001/logic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phone,
          password: password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("userId", result.id); //  store the phone temporarily
        showToast("Login successful!", "success");
        setTimeout(() => {
          window.location.href = "../../index.html"; //  Redirect to home page
        }, 800);
      } else {
        showToast(result.message, "error");
      }
    } catch (error) {
      showToast("Login failed", "error");
      console.error(error);
    }
  };

  const handleSignUp = () => {
    window.location.href = "../register/register.html"; // Redirect to registration page
  };

  return (
    <>
      <div className="welcome-message">~~ WELCOME ~~</div>
      <div className="icon-container">
        <VoicemailFilled fontSize="128px" />
      </div>

      <div className="input-container">
        <div className="input-group">
          <Label className="label-a">Account</Label>
          <Input
            appearance="filled-lighter-shadow"
            className="input"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="input-group">
          <Label className="label-p">Password</Label>
          <Input
            appearance="filled-lighter-shadow"
            className="input"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="button-group">
        <Button
          className="button button-login"
          onClick={handleSignIn}
          shape="circular"
        >
          Sign in
        </Button>
        <Button
          className="button button-register"
          onClick={handleSignUp}
          shape="circular"
        >
          Sign up
        </Button>
      </div>
      <Toaster toasterId={toasterId} />
    </>
  );
};

export default Welcome;
