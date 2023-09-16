import express from "express";
import { createTransport } from "nodemailer";

const app = express();
app.use(express.json());
const port = 3000 || process.env.PORT;

let transporter = createTransport({
    service: "gmail",
    auth: {
      user: "asyncapp1@gmail.com",
      pass: "--------------use uour password----------",
    },
  });


app.post("/send-email",(req,res)=>{

    const {to,sub,text} =req.body;

    const mailOptions = {
        from: "asyncapp1@gmail.com",
        to: to,
        subject: sub,
        text: text,
        html: "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><style>body {font-family: Arial, sans-serif;background-color: #f7f7f7;margin: 0;padding: 20px;color: #333;}#content {background-color: #fff;padding: 20px;border-radius: 8px;box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);text-align: center;}#subscribe-button {display: inline-block;background-color: #ff0000;color: #fff;text-decoration: none;padding: 15px 25px;border-radius: 4px;font-weight: bold;}</style></head><body><div id='content'><h2>Subscribe to Our YouTube Channel!</h2><p>Don't miss out on our latest content. Click the button below to subscribe.</p><a id='subscribe-button' href='https://www.youtube.com/@Asyncapp' target='_blank' rel='noopener'>Subscribe Now</a></div></body></html>"
        ,
      };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send("Error sending email");
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).send("Email sent successfully");
        }
      });
    
})
  

app.get("/", (req, res) => {
  res.status(200).json({ message: "This is my first endpoint" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});