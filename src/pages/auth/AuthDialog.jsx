import {
    Dialog,
    DialogContent,
    Typography,
    Box,
    useTheme,
} from "@mui/material"
import { Zap } from "lucide-react"
import Register from "../../components/auth/Register"
import Login from "../../components/auth/Login"
import { styles } from "./styles"
import { useEffect, useState } from "react"
import SendForgetPasswordEmail from "../../components/auth/SendForgetPasswordEmail"
import CodeConfirmation from "../../components/auth/CodeConfirmation"
export function AuthDialog({ open, onOpenChange }) {
    const theme = useTheme()
    const style = styles(theme)
    const [mode, setMode] = useState('register')
    const [emailForReset, setEmailForReset] = useState(null)
    useEffect(() => {
        setMode('register')
    }, [open])
    return (
        <Dialog
            open={open}
            onClose={() => onOpenChange(false)}
            PaperProps={{ sx: style.dialogPaper }}
        >
            <DialogContent sx={style.dialogContent}>
                {/* Left side - Character Image */}
                <Box sx={style.leftSide}>
                    {/* Overlay gradient for smooth blending */}
                    <Box sx={style.overlayGradient} />

                    {/* Background Image */}
                    <Box
                        component="img"
                        src={theme.palette.mode === 'dark' ? "/image/auth/7.png" : "/image/auth/6.png"}
                        alt="Mystical Character"
                        sx={style.bgImage}
                    />

                    {/* Bottom Text */}
                    <Box sx={style.bottomTextContainer}>
                        <Box sx={style.bottomTextInner}>
                            <Zap size={20} />
                            <Typography sx={style.topTypography}>
                                ARABOON
                            </Typography>
                            <Zap size={20} />
                        </Box>

                        <Typography sx={style.bottomTypography}>
                            Discover manga your way — favorites, reading history, and a full library at your fingertips
                        </Typography>
                    </Box>
                </Box>
                {/* right side */}
                <Box sx={style.rightSide}>
                    {mode === "register" ? <Register setMode={setMode} /> :
                        mode === 'login' ? <Login setMode={setMode} /> :
                            mode === 'forgetpassword' ? <SendForgetPasswordEmail setEmailForReset={setEmailForReset} setMode={setMode} /> :
                                mode === 'sendcode' ? <CodeConfirmation emailForReset={emailForReset} setMode={setMode} /> :
                                    null
                    }
                </Box>

            </DialogContent>
        </Dialog>
    )
}
