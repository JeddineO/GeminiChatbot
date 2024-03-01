const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const genAI = new GoogleGenerativeAI('YOUR API KEY HERE');
const uri = 'mongodb://172.17.0.2:27017';
const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
}
connectToMongoDB();

const db = client.db('test');
const messagesCollection = db.collection('messages');

app.use(express.static(__dirname));

app.use(express.json());


app.get('/msg', async (req, res) => {
    try {
        const messages = await db.collection('messages').find().toArray();
        res.json(messages);
    } catch (error) {
        console.error('An error occurred while fetching messages:', error);
        res.status(500).send({ error: 'An error occurred while fetching messages' });
    }
});


app.get('/delete', async (req, res) => {

    try {
        db.collection("messages").deleteMany({});
        res.json("Rows Deleted");
    } catch (erro) {
        cosile.log(error);
    }
});

app.post('/generate', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        await messagesCollection.insertOne({ sender: 'You', message: prompt });
        await messagesCollection.insertOne({ sender: 'AI', message: text });
        console.log('Message stored in MongoDB:', text);
        res.send({ response: text });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
