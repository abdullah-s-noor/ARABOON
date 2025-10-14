import {
    Dialog,
    DialogContent,
    Typography,
    Box,
    useTheme,
    IconButton,
} from "@mui/material"
import { Zap } from "lucide-react"
import Register from "../../components/auth/Register"
import Login from "../../components/auth/Login"
import { styles } from "./styles"
import { useEffect, useState } from "react"
import SendForgetPasswordEmail from "../../components/auth/SendForgetPasswordEmail"
import ResetPasswordWithOTP from "../../components/auth/ResetPasswordWithOTP"
import { useTranslation } from "react-i18next"
import { Close } from "@mui/icons-material"
export function AuthDialog({ open, onOpenChange }) {
    const { t,i18n } = useTranslation()
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
                {/* close dialog button */}
                
                
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
                            {t('register.footer_text')}
                        </Typography>
                    </Box>
                </Box>
                {/* right side */}
                <Box sx={style.rightSide}>
                    {mode === "register" ? <Register setMode={setMode} /> :
                        mode === 'login' ? <Login setMode={setMode} /> :
                            mode === 'forgetpassword' ? <SendForgetPasswordEmail setEmailForReset={setEmailForReset} setMode={setMode} /> :
                                mode === 'sendcode' ? <ResetPasswordWithOTP emailForReset={emailForReset} setMode={setMode} /> :
                                    onOpenChange(false)
                    }
                </Box>

            </DialogContent>
        </Dialog>
    )
}
