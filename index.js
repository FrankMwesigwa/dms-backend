import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

import express from 'express'
import cors from 'cors'

import connection from './config/db.config.js';

import productRoutes from './routes/ProductRoutes.js'

import userRoutes from './routes/UserRoutes.js' 
import distRoutes from './routes/Dist/DistRoutes.js'
import distCartRoutes from './routes/Dist/DistCartRoutes.js'
import distOrderRoutes from './routes/Dist/DistOrderRoutes.js'

// import agentRoutes from './routes/Agents/AgentRoutes.js'
// import agentCart from './routes/Agents/AgentCartRoutes.js'
// import agentOrders from './routes/Agents/AgentOrderRoutes.js'
// import uploadRoutes from './routes/UploadRoutes.js'



const app = express()
const PORT = process.env.PORT;
connection();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use("/api/distributor", distRoutes);
app.use('/api/dist/cart', distCartRoutes);
app.use("/api/dist/orders", distOrderRoutes);
// app.use("/api/agents", agentRoutes);
// app.use("/api/upload", uploadRoutes);
// app.use("/api/agent/cart", agentCart);
// app.use("/api/agent/order", agentOrders);


app.listen(PORT, () => {
    console.log(`Server is connected on port ${PORT}`);
});
