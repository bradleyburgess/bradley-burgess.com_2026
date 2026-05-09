import { z } from "astro/zod";
import { DateTime } from "luxon";
const {
  NODE_ENV = "development",
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID,
} = import.meta.env;

function validateColors(color1: string, color2: string) {
  color1 = color1.trim().toLowerCase();
  color2 = color2.trim().toLowerCase();
  return (
    color1 != color2 &&
    ["black", "white"].includes(color1) &&
    ["black", "white"].includes(color2)
  );
}

function validateGotcha(gotcha: string) {
  return gotcha.trim() === "";
}

export const contactFormActionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Please enter a valid email address"),
  message: z.string().min(20, "Message must be at least 20 characters long"),
  color1: z.string().optional(),
  color2: z.string().optional(),
  _gotcha: z.string().refine((val) => val === ""),
});
export type ContactFormActionSchema = z.infer<typeof contactFormActionSchema>;

interface ITelegramMessageProps {
  formName: string;
  formEmail: string;
  formMessage: string;
}

const createMessage = ({
  formName,
  formEmail,
  formMessage,
}: ITelegramMessageProps) =>
  `New message through bradley-burgess.com

Name: ${formName}
Date: ${DateTime.now().setZone("America/New_York").toLocaleString(DateTime.DATETIME_MED)}
Email: ${formEmail}

Message: ${formMessage}`;

const sendTelegramMessage = async ({
  formName,
  formEmail,
  formMessage,
}: ITelegramMessageProps) => {
  const result = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: createMessage({ formName, formEmail, formMessage }),
      }),
    },
  );
  return result;
};

export async function contactFormHandler(
  input: ContactFormActionSchema,
): Promise<boolean> {
  console.log("Received contact form submission");
  if (!validateColors(input.color1 ?? "", input.color2 ?? "")) {
    console.log("Failed color spam question");
    return false;
  }
  if (!validateGotcha(input._gotcha)) {
    console.log("Failed gotcha spam question");
    return false;
  }

  if (NODE_ENV === "production") {
    try {
      const result = await sendTelegramMessage({
        formName: input.name,
        formEmail: input.email,
        formMessage: input.message,
      });
      return result.ok ? true : false;
    } catch (error) {
      console.error("Error sending Telegram message:", error);
      return false;
    }
  }
  console.log(
    createMessage({
      formName: input.name,
      formEmail: input.email,
      formMessage: input.message,
    }),
  );
  return true;
}
