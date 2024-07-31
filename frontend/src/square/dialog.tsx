// 该文件为加入某一兴趣圈的确认窗口
import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogActions,
    DialogContent,
    Button,
    Toaster,
    useToastController,
    ToastTitle,
    ToastTrigger,
    Toast,
    useId,
} from "@fluentui/react-components";

import {
    ArrowSquareUpRightRegular,

} from "@fluentui/react-icons";

interface DiaProps {

    circle_id: number;

}


const Dia: React.FC<DiaProps> = ({ circle_id }) => {

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

    const handleJoinClick = async (circle_id: number) => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            console.error('User ID not found in local storage');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:7001/circle/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    circle_id: circle_id,
                    user_id: parseInt(userId, 10),
                })
            });

            if (response.ok) {
                console.log('Successfully joined the circle');
                const body = await response.json()
                if (body.message === 'You have joined the circle') {
                    showToast("You have joined the circle", "error");
                }
                else {
                    showToast("Join successful!", "success");
                }
            } else {
                console.error('Failed to join the circle');

            }
        } catch (error) {
            console.error('Error joining the circle:', error);
        }
    };

    return (
        <>
            <Dialog>
                <DialogTrigger disableButtonEnhancement>
                    <Button appearance="subtle" icon={<ArrowSquareUpRightRegular fontSize={20} />}>Join</Button>
                </DialogTrigger>
                <DialogSurface>

                    <DialogBody>
                        <DialogTitle>Confirm</DialogTitle>

                        <DialogContent>
                            Are you sure you want to join this interest group?
                        </DialogContent>

                        <DialogActions>

                            <DialogTrigger disableButtonEnhancement>
                                <Button onClick={() => handleJoinClick(circle_id)} appearance="primary">Yes</Button>
                            </DialogTrigger>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">Not yet</Button>
                            </DialogTrigger>


                        </DialogActions>
                    </DialogBody>

                </DialogSurface>
            </Dialog>
            <Toaster toasterId={toasterId} />
        </>
    );
};

export default Dia;