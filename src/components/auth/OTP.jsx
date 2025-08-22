import React, { useState, useEffect } from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { useTheme } from '@mui/system'
import { keyframes } from '@mui/system'
import { api } from '../../services/api'

// تعريف حركة الاهتزاز (shake animation)
const shake = keyframes`
  0% { transform: translateX(0); }
  10% { transform: translateX(-5px); }
  20% { transform: translateX(5px); }
  30% { transform: translateX(-5px); }
  40% { transform: translateX(5px); }
  50% { transform: translateX(0); }
  0% { transform: translateX(0); }
  60% { transform: translateX(-5px); }
  70% { transform: translateX(5px); }
  80% { transform: translateX(-5px); }
  90% { transform: translateX(5px); }
  100% { transform: translateX(0); }
`

function OTP({ setTokenForReset, formik, emailForReset }) {
    const [otp, setOtp] = useState('')
    const [status, setStatus] = useState('idle') // 'idle', 'loading', 'success', 'error'
    const theme = useTheme()

    const checkOtp = async (code) => {
        setStatus('loading')

        try {
            // محاكاة استدعاء API
            const payload = {
                email: emailForReset,
                code: code
            }
            const {data} = await api.post('/Authentication/ForgetPasswordConfirmation', payload);
            console.log("otp enter code", data.data.token)

            console.log(data)
            setStatus('success')
            setTokenForReset(data.data.token)
        } catch (error) {
            console.log("error otp",error)
            setStatus('error')
            // بعد انتهاء حركة الخطأ، قم بمسح الحقول
            setTimeout(() => {
                setOtp('')
                setStatus('idle')
            }, 700) // انتظر حتى تنتهي الحركة
        }
    }

    const handleOtpChange = (newValue) => {
        setOtp(newValue)
        const isComplete = newValue.length === 6


        if (isComplete) {
            checkOtp(newValue)
        } else {
            setStatus('idle') // إعادة الحالة إلى الوضع الافتراضي عند تغيير الإدخال
        }

        formik.setFieldValue('otp', newValue)
    }

    const validateChar = (value) => {
        return /^[0-9]$/.test(value)
    }

    const borderColor = status === 'success' ? 'green' : (status === 'error' ? 'red' : '#0c70de')
    const boxShadowColor = status === 'success' ? 'rgba(0,128,0,0.3)' : (status === 'error' ? 'rgba(255,0,0,0.3)' : 'rgba(12,112,222,0.3)')

    const animationStyle = status === 'error' ? `${shake} 0.5s ease-in-out` : 'none'

    return (
        <MuiOtpInput
            value={otp}
            onChange={handleOtpChange}
            validateChar={validateChar}
            length={6}
            sx={{ mb: 2 }}
            // 💡 هذه هي الإضافة الجديدة لتعطيل الحقول
            TextFieldsProps={{
                placeholder: '-',
                disabled: status === 'loading' || status === 'success',
                sx: {
                    '& .MuiOutlinedInput-root': {
                        animation: animationStyle,

                        '& input:not(:placeholder-shown) + fieldset': {
                            borderColor: borderColor,
                            boxShadow: `0 0 0 3px ${boxShadowColor}`,
                        },

                        '&.Mui-focused fieldset': {
                            borderColor: borderColor,
                            boxShadow: `0 0 0 3px ${boxShadowColor}`,
                        },

                        '& fieldset': {
                            borderColor: status === 'error' ? 'red' : undefined,
                            boxShadow: status === 'error' ? '0 0 0 3px rgba(255,0,0,0.3)' : undefined,
                        }
                    },
                },
            }}
        />
    )
}

export default OTP