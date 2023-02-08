import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken)

export const sendWhatsApp = async (user, prods, total) => {
    const options = {
        body: `${process.env.SUBJECT_NEWORDER} ${user.fullname}, ${user.username}.\n Productos: ${prods}\n Total: $${total}`,
        //mediaUrl: ['https://www.investingmoney.biz/public/img/art/xl/18012019161021Twilio-IoT.jpg'],
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${user.phone}`
    }

    try {
        const message = await client.messages.create(options)
        console.log(message)
    } catch (error) {
        console.log(error)
    }
}