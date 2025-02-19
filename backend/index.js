import express from 'express'
import cors from 'cors'
import authRouter from "./routes/auth.js"
import connectToDatabase from './db/db.js'
import facultyRouter from './routes/faculty.js'
import departmentRouter from './routes/department.js'
import publicationRouter from './routes/publicationRoutes.js'
import journalPublicationRouter from './routes/journalPublicationRoutes.js';
import conferencePublicationRouter from './routes/conferencePublicationRoutes.js'; 

connectToDatabase();
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.static('public/uploads'))
app.use('/api/auth',authRouter)
app.use('/api/department',departmentRouter)
app.use('/api/faculty',facultyRouter)
app.use('/api/publications', publicationRouter);
app.use('/api/journal-publications', journalPublicationRouter);
app.use('/api/conference-publications', conferencePublicationRouter); 
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})
