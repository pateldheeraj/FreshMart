
export const baseURL = 'http://localhost:8000'

const SummaryApi = {
    register : {
        url : "/api/v1/user/register",
        method : "post"
    },
    login : {
        url : "/api/v1/user/login",
        method : "post"
    },
    forgot_password : {
        url : "/api/v1/user/forgot-password-otp",
        method : "put"
    },
    verify_forgot_password_otp : {
        url : "/api/v1/user/verify-forgot-password-otp",
        method : "put"
    },
    reset_password : {
        url : "/api/v1/user//reset-password",
        method : "put"
    },
    reset_password : {
        url : "/api/v1/user/reset-password",
        method : "put"
    },
}

export default SummaryApi