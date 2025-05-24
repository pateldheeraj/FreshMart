
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
    refresh_token : {
        url : "/api/v1/user/refresh-token",
        method : "post"
    },
    user_details : {
        url : "/api/v1/user/user-details",
        method : "get"
    },
    logout : {
        url : "/api/v1/user/logout",
        method : "post"
    },
    avatarUpload : {
        url : "/api/v1/user/update-avatar",
        method : "put"
    },
    updateUserDetails : {
        url : "/api/v1/user/update-user",
        method : "put"
    },
}

export default SummaryApi