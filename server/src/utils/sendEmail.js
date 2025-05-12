import dotenv from "dotenv"
import { Resend } from 'resend';
dotenv.config()

if(!process.env.RESEND_API){
    console.log("Please Provide Resend API inside the .env file");
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async({sentTo,subject,html}) => {
    try {
        const { data, error } = await resend.emails.send({
        from: 'FreshMart <onboarding@resend.dev>',
        to: sentTo,
        subject: subject,
        html:html,
      });
    
      if (error) {
        return console.error({ error });
      }
    
      return data
    } catch (error) {
        console.log(error);
        
    }
}

export default sendEmail
  

  

