
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
    addCategory : {
        url : "/api/v1/category/add-category",
        method : "post"
    },
    uploadImage : {
        url : "/api/v1/file/upload",
        method : "post"
    },
    getCategory : {
        url : "/api/v1/category/get",
        method : "get"
    },
    updateCategory :{
        url : "/api/v1/category/update",
        method : "put"
    },
    deleteCategory :{
        url : "/api/v1/category/delete",
        method : "delete"
    },
    addSubCategory :{
        url : "/api/v1/subcategory/create",
        method : "post"
    },
    getSubCategory :{
        url : "/api/v1/subcategory/get",
        method : "post"
    },
    updateSubCategory :{
        url : "/api/v1/subcategory/update",
        method : "put"
    },
    deleteSubCategory :{
        url : "/api/v1/subcategory/delete",
        method : "delete"
    },
    createProduct :{
        url : "/api/v1/product/create",
        method : "post"
    },
    getProduct :{
        url : "/api/v1/product/get",
        method : "post"
    }
}

export default SummaryApi