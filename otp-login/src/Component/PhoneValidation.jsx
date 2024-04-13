import { useState } from "react";
import OtpValidation from "./OtpValidation";

const PhoneValidation = (props) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValidNumber, setValidNumber] = useState(false);

    const handlePhoneChange = (event) => {
        // handleChange of phone number
        const value = event.target.value;
        setPhoneNumber(value);
    }

    const handlePhoneSubmit = (event) => {
        //handle submit button click
        event.preventDefault();

        const numberRegex = /[^0-9]/g;
        console.log("inside submit");
        if( phoneNumber.length < 10 || numberRegex.test(phoneNumber)) {
            alert('Invald Phone Number');
            return;
        }
        
        setValidNumber(true);
    }

    const handleOtpSubmit = (otp) => {
        // do the network call
        console.log("Login success");
    }

    return (
        <div className="mainBody">
            {!isValidNumber ?
            <div className="phoneNumber">
                <h2>Phone Number</h2>
                <form onSubmit={handlePhoneSubmit} action="">
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="Enter Phone number"
                    />
                    <button type="submit">Verify Phone</button>
                </form>
            </div> :
            <OtpValidation 
                handleOtpSubmit={handleOtpSubmit}
                length={4}
            /> }
        </div>
    );
}

export default PhoneValidation;