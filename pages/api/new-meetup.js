// /api/new-meetup
// POST /api

import { MongoClient } from 'mongodb';

async function handler(req, res){
    if(req.method === 'POST'){
        const data = req.body;

        const client = await MongoClient.connect(
            'mongodb+srv://adrianovianadev:HdDNuT1a33BqrpJI@cluster0.gty4c.mongodb.net/meetups?retryWrites=true&w=majority'
        );
        
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne({data}); //insert one new document

        console.log(result);

        client.close();

        res.status(201).json({message: 'Meetup inserted!'});
    }
}

export default handler;