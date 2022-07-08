import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

import express from 'express'
import cors from 'cors'

import connection from './config/db.config.js';

import userRoutes from './routes/UserRoutes.js' 
import cartRoutes from './routes/CartRoutes.js'
import agentRoutes from './routes/AgentRoutes.js'
import orderRoutes from './routes/OrderRoutes.js'
import agentCart from './routes/AgentCartRoutes.js'
import agentOrders from './routes/AgentOrderRoutes.js'
import uploadRoutes from './routes/UploadRoutes.js'
import productRoutes from './routes/ProductRoutes.js'
import distributorRoutes from './routes/DistributorRoutes.js'

const app = express()
const PORT = process.env.PORT;
connection();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use('/api/products', productRoutes);
app.use("/api/agent/cart", agentCart);
app.use("/api/agent/order", agentOrders);
app.use("/api/distributors", distributorRoutes);

app.listen(PORT, () => {
    console.log(`Server is connected on port ${PORT}`);
});
