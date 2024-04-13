import { useEffect, useRef, useState } from "react";

const OtpValidation = ({length, handleOtpSubmit = () => {}}) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    useEffect(()=> {
        if(inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [])

    const onChange = (index, e) => {
        e.preventDefault();
        const value = e.target.value;
        if(isNaN(value)) {
            return;
        }
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length-1);
        setOtp(newOtp);

        const combinedOtp = newOtp.join('');
        if(combinedOtp.length === length) {
            handleOtpSubmit(combinedOtp);
        }

        // const newPosition = newOtp.indexOf("", index);
        if(value && index < length-1) {
            inputRefs.current[index+1].focus();
        }
    }

    const onKeyDown = (index, e) => {
        if(e.key == 'Backspace' && index > 0 && !otp[index]) {
            inputRefs.current[index-1].focus();
            // e.preventDefault();   for moving to previous input without clearing the value
        }
    }

    const onClick = (index) => {
        if(otp[index]) {
            inputRefs.current[index].setSelectionRange(1,1);
        }
    }
    return (
        <div>
            <h2>OTP Verification</h2>{
            otp.map((value, index) => {
            return <input 
                key={index}
                className="otpInputField"
                type="text"
                value={value}
                onChange={(e)=> onChange(index, e)}
                onKeyDown={(e)=> onKeyDown(index, e)}
                onClick={(e) => onClick(index)}
                ref={(input)=>(inputRefs.current[index]=input)}
            />
        })}
        </div>   
    )
}

export default OtpValidation;