//IPORTING DEPENDENCY
import MESSAGE from "../../models/message.mongo";
import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import axios from 'axios'
import dotenv from 'dotenv';
import { text } from "body-parser";

dotenv.config();

// reciving data from client 
const API_URL = process.env.API_URL|| '';


// using snd grid
// get API KE FROM SEND GRID
sgMail.setApiKey(API KEY CREATED)


// CREATING FORM
const createContactForm = async (req: Request, res: Response, next: NextFunction) => {
    const { name , email, message} = req.body;
    await axios.post(`${API_URL}` ,{
        name,
        email,
        message,
    })
    const newForm = new MESSAGE({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        message
        
        /***
         * OPTION 2 WAY
         * name:req.body.name,
         * email:req.body.email,
         * costumerMessage:req.body.message? req.body.message : false
         */

    });

    try {
        const newForm_1 = await newForm
            .save();
        
        // sendgrid
        const message = {
            from: {
                name: "company name",
                email:"email adress"
            },
            to: newForm.email,
            subject: 'THANK YOU FOR CONTACT US OUR COSTOMER REPRESENTATIVES WOULD ATTAIN TO YOU SHORTLY',
            html: `<h2> ${newForm.name}! and email ${newForm.email}? THANK YOUR FOR CONSTACTING COMPANY NAME</h2>
            <h4> Feel free to return to our WEBSITE copy and paste the below link or click on the button </h4>
            <a href ="https://${req.headers.host}"
            <button a href = "">CLICK HERE</botton>
            `,
            text: `<h2> ${newForm.name}! and email ${newForm.email}? THANK YOUR FOR CONSTACTING COMPANY NAME</h2>
            <h4> Feel free to return to our WEBSITE copy and paste the below link or click on the button </h4>
            <a href ="https://${req.headers.host}"
            <button a href = "">CLICK HERE</botton>
            `            
        }

        sgMail.send(message)
        sgMail.then((response)=> console.log('email sent'))
        .catch(error => console.log(error.message))
        return res.status(201).json({ newForm_1 });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

// FINE ONE FORM
const SeeOneForm = async (req: Request, res: Response, next: NextFunction) => {
    const newFormId = req.params.Id

    try {
        const newForm = await MESSAGE.findById(newFormId)
            .populate('newForm')
            .select('__v');
        return (newForm ? res.status(200).json({ newForm }) : res.status(404).json({ message: 'not found' }));
    } catch (error) {
        return res.status(500).json({ error });
    }
};

// FINE ALL FORM
const SeeAllForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newForm = await MESSAGE.find();
        return res.status(200).json({ newForm });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

//UPDATE ONE FORM
// const updateOneForm = async (req: Request, res: Response, next: NextFunction) => {
//     const newFormId = req.params.email;
//     //  const {  email } = req.body;


//     return MESSAGE.findById( newFormId )
//         .then((newForm) => {
//             if (newForm) {
//                 newForm.set(req.body);

//                 return newForm
//                     .save()
//                     .then((newForm) => res.status(201).json({ newForm }))
//                     .catch((error) => res.status(500).json({ error }));
//             } else {
//                 return res.status(404).json({ message: 'not found' });
//             }
//         })
//         .catch((error) => res.status(500).json({ error }));
// };

export default { createContactForm, SeeOneForm, SeeAllForm };