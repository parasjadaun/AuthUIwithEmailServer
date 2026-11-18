const express=require('express');
const UpdateRoutes=require('./routes/UpdateCredtantioals.routes');
const AuthRouter=require('./routes/Auth.routes');

const cors=require('cors');

const app=express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is running successfully!"
    });
});

app.use('/api/auth',AuthRouter);
app.use('/api',UpdateRoutes);


module.exports=app;