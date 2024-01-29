import { MongoClient } from 'mongodb';

export async function connectToCluster(uri) {
   let mongoClient;

   try {
       mongoClient = new MongoClient(uri);
       await mongoClient.connect();

       return mongoClient;
   } catch (error) {
       console.error('Connection to MongoDB Atlas failed!', error);
       process.exit();
   }
}


export async function executeSearch(searchTerm){
	let result=[];
	const agg = [
	  {
		'$search': {
		  'index': 'default', 
		  'text': {
			'query': `${searchTerm}`, 
			'path': [
			  'make', 'model', 'type'
			]
		  }
		}
	  }, {
		'$set': {
		  'score': {
			'$meta': 'searchScore'
		  }
		}
	  },{
		  $limit:24
	  }
	];
	const uri = process.env.DB_URI;
	let mongoClient;
   try {
        mongoClient = await connectToCluster(uri);
	   	const coll = mongoClient.db('zicta').collection('typeapproval');
		const cursor = coll.aggregate(agg);
		result = await cursor.toArray();		
   } finally {
       await mongoClient.close();
   }
   return result;
}