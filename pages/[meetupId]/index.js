//our-domain.com/new-meetup
import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props){
    
    return(
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta
                    name='description'
                    content={props.meetupData.description}
                />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                description={props.meetupData.description}
                address={props.meetupData.address}
            />
        </Fragment>
    );
}

export async function getStaticPaths(){
    const client = await MongoClient.connect(
        'mongodb+srv://adrianovianadev:HdDNuT1a33BqrpJI@cluster0.gty4c.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1}).toArray(); //find all: {}, to get only the ids: { _id: 1 }

    client.close();

    return{
        fallback: false, //indicates that you defined all the paths here 
        paths: meetups.map(meetup => ({ 
            params: { meetupId: meetup._id.toString() },
        })),
    };
}

export async function getStaticProps(context){
    //fetch data for a single meetup

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        'mongodb+srv://adrianovianadev:HdDNuT1a33BqrpJI@cluster0.gty4c.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1}).toArray(); //find all: {}, to get only the ids: { _id: 1 }

    const selectedMeetup = await meetupsCollection.findOne({
        _id: ObjectId(meetupId),
    });

    client.close();

    return{
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.data.title,
                address: selectedMeetup.data.address,
                image: selectedMeetup.data.image,
                description: selectedMeetup.data.description,
            },
        }
    }
}

export default MeetupDetails;