const express = require('express');
const mongoose = require('mongoose')
const url = 'mongodb+srv://ahmad:ahmad123@cluster0.zdiw4.mongodb.net/Invoices?retryWrites=true&w=majority'
const cors = require('cors');
const bodyParser = require('body-parser')
const Invoice = require('./models/invoice');
const Payment = require('./models/payment');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

async function main() {
    const url = "mongodb+srv://ahmad:ahmad123@cluster0.zdiw4.mongodb.net/Invoices?retryWrites=true&w=majority";
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {

        await client.connect();
    } catch (e) {
        console.error(e);
    } finally {
    }
}
main().catch(console.error);


mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('connecteds')
})


app.get("/", (req, res) => {
    res.json({ message: "Welcome to Ahmad Horyzat application." });
});

app.get('/invoices', async (req, res) => {
    try {
        const invoices = await Invoice.find()
        res.json(invoices)
    } catch (err) {
        res.send('Error ' + err)
    }
})

app.post('/invoices', async (req, res) => {
    const invoice = new Invoice({
        customerName: req.body.customerName,
        descr: req.body.descr,
        value: req.body.value,
        creationDate: req.body.creationDate,
    })

    try {
        const a1 = await invoice.save()
        res.json(a1)
    } catch (err) {
        res.send('Error' + err)
    }
})

app.get('/payments', async (req, res) => {
    try {
        const payments = await Payment.find()
        res.json(payments)
    } catch (err) {
        res.send('Error ' + err)
    }
})

app.post('/payments', async (req, res) => {
    const payment = new Payment({
        invoiceId: req.body.invoiceId,
        value: req.body.value,
        paymentDate: req.body.paymentDate,
    })

    try {
        const pay = await payment.save()
        res.json(pay)
    } catch (err) {
        res.send('Error' + err)
    }
})
app.listen(900, ()=> {
    console.log('server started on port 9000');
})