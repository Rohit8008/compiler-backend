import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
    }
});

// Test the connection immediately
transport.verify(function(error, success) {
    if (error) {
        console.log('Connection failed:', error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

export default transport;