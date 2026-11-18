import { Route, Routes } from "react-router-dom"
import SendVerificationMail from "./ForgotPassward/SendVerificationMail"
import VerifyOTP from "./ForgotPassward/VerifyOTP"
import CreateNewPassword from "./ForgotPassward/CreateNewPassword"

const ForgotPassword = () => {
  return (
  <Routes>
    <Route path="/" element={<SendVerificationMail />} />
    <Route path="/verifyOtp" element={<VerifyOTP />} />
    <Route path="/createNewPassword" element={<CreateNewPassword />} />
  </Routes>
  )
}

export default ForgotPassword