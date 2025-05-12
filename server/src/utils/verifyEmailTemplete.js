const verifyEmailTemplete = ({name,url}) => {
    return `
    <p>Dear ${name}</p>
    <p>Thank you for registering FreshMart</p>
    <a href=${url} style="color:white ; background: #071263 ; margin-top: 10px ; padding:20px">
    Verify Email
    </a>
`
}

export {verifyEmailTemplete}