import "./style.css";
import emailjs from "emailjs-com";

interface MailButtonProps {
  title: any;
  data: any; // Use a specific type if you have one for your JSON data
}

const MailButton: React.FC<MailButtonProps> = ({ title, data }) => {
  const jsonData = localStorage.getItem("mindMateData");
  const storedData = jsonData ? JSON.parse(jsonData) : "";

  const storedEmail = storedData.email;
  const storedName = storedData.name;

  function sendEmail() {
    console.log("Recipient email:", storedEmail);
    const templateParams = {
      name: storedName,
      title: title,
      data: data,
      to_email: storedEmail,
    };

    emailjs
      .send(
        "service_jsfvz1m",
        "template_00sdm8c",
        templateParams,
        "7NH_0OrfJiY1e7oBU"
      )
      .then(
        (_result) => {
          window.location.reload();
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <button className="button" onClick={sendEmail}>
      Send as E-Mail
    </button>
  );
};

export default MailButton;
