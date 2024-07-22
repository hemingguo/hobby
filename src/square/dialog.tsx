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
} from "@fluentui/react-components";

import {
    ArrowSquareUpRightRegular,

} from "@fluentui/react-icons";


const Dia = () => {
    return (
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
                            <Button appearance="primary">Yes</Button>
                        </DialogTrigger>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Not yet</Button>
                        </DialogTrigger>


                    </DialogActions>
                </DialogBody>

            </DialogSurface>
        </Dialog>
    );
};

export default Dia;