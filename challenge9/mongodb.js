/*-----------------*/
/* create database */
/*-----------------*/
use ecommerce
    // > 'switched to db ecommerce'


/*--------------------*/
/* create collections */
/*--------------------*/
db.createCollection('products')
    // { ok: 1 }
db.createCollection('messages')
    // { ok: 1 }


/*--------------------*/
/* insert 10 products */
/*--------------------*/
db.products.insertMany([{"title": "Genocide","price": 120,"thumbnail": "https://robohash.org/dictamolestiaesequi.png?size=64x64&set=set1"}, {"title": "I Love You, Beth Cooper","price": 580,"thumbnail": "https://robohash.org/omnisvelitut.png?size=64x64&set=set1"}, {"title": "Game Over","price": 900,"thumbnail": "https://robohash.org/temporesedsit.png?size=64x64&set=set1"}, {"title": "Grocer's Son, The (Fils de l'épicier, Le)","price": 1280,"thumbnail": "https://robohash.org/nemoitaquenon.png?size=64x64&set=set1"}, {"title": "Je suis né d'une cigogne","price": 1700,"thumbnail": "https://robohash.org/adipisciexplicabofuga.png?size=64x64&set=set1"}, {"title": "Charming Mass Suicide, A (Hurmaava joukkoitsemurha)","price": 2300,"thumbnail": "https://robohash.org/velomnisodio.png?size=64x64&set=set1"}, {"title": "Nazis Strike, The (Why We Fight, 2)","price": 2860,"thumbnail": "https://robohash.org/pariatursedet.png?size=64x64&set=set1"}, {"title": "Anna","price": 3350,"thumbnail": "https://robohash.org/architectodelenitinam.png?size=64x64&set=set1"}, {"title": "Edmund Kean: Prince Among Lovers (Kean)","price": 4320,"thumbnail": "https://robohash.org/repudiandaealiquamenim.png?size=64x64&set=set1"}, {"title": "Big Snit, The","price": 4990,"thumbnail": "https://robohash.org/magnamautdistinctio.png?size=64x64&set=set1"}])
    // { acknowledged: true,
    //     insertedIds: 
    //         { '0': ObjectId("635b026be395857cd0b6d201"),
    //         '1': ObjectId("635b026be395857cd0b6d202"),
    //         '2': ObjectId("635b026be395857cd0b6d203"),
    //         '3': ObjectId("635b026be395857cd0b6d204"),
    //         '4': ObjectId("635b026be395857cd0b6d205"),
    //         '5': ObjectId("635b026be395857cd0b6d206"),
    //         '6': ObjectId("635b026be395857cd0b6d207"),
    //         '7': ObjectId("635b026be395857cd0b6d208"),
    //         '8': ObjectId("635b026be395857cd0b6d209"),
    //         '9': ObjectId("635b026be395857cd0b6d20a") } }


/*--------------------*/
/* insert 10 messages */
/*--------------------*/
db.messages.insertMany([{"email": "eudden0@over-blog.com","msg": "vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit","date": {"$date":"2022-07-01T11:03:02.000Z"}}, {"email": "cphillimore1@shareasale.com","msg": "at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis","date": {"$date":"2022-07-28T12:30:53.000Z"}}, {"email": "esparkwill2@google.fr","msg": "feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare","date": {"$date":"2022-07-07T00:29:53.000Z"}}, {"email": "hdanielsky3@oaic.gov.au","msg": "iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam","date": {"$date":"2022-08-04T00:48:28.000Z"}}, {"email": "tplumptre4@github.com","msg": "fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis","date": {"$date":"2022-07-09T21:44:04.000Z"}}, {"email": "aorpen5@linkedin.com","msg": "ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel","date": {"$date":"2022-06-27T05:16:14.000Z"}}, {"email": "ctrue6@dailymotion.com","msg": "ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus","date": {"$date":"2022-09-20T02:35:52.000Z"}}, {"email": "tblanchard7@drupal.org","msg": "ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo","date": {"$date":"2022-04-08T17:21:27.000Z"}}, {"email": "cbonifacio8@nba.com","msg": "condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat","date": {"$date":"2022-06-30T16:07:00.000Z"}}, {"email": "tbrowett9@yelp.com","msg": "felis fusce posuere felis sed lacus morbi sem mauris laoreet ut","date": {"$date":"2022-09-23T07:57:28.000Z"}}])
    // { acknowledged: true,
    //     insertedIds: 
    //         { '0': ObjectId("635b0280e395857cd0b6d20b"),
    //         '1': ObjectId("635b0280e395857cd0b6d20c"),
    //         '2': ObjectId("635b0280e395857cd0b6d20d"),
    //         '3': ObjectId("635b0280e395857cd0b6d20e"),
    //         '4': ObjectId("635b0280e395857cd0b6d20f"),
    //         '5': ObjectId("635b0280e395857cd0b6d210"),
    //         '6': ObjectId("635b0280e395857cd0b6d211"),
    //         '7': ObjectId("635b0280e395857cd0b6d212"),
    //         '8': ObjectId("635b0280e395857cd0b6d213"),
    //         '9': ObjectId("635b0280e395857cd0b6d214") } }



/*-------------------*/
// list all messages */
/*-------------------*/
db.messages.find()
    // { _id: ObjectId("635b0280e395857cd0b6d20b"),
    //      email: 'eudden0@over-blog.com',
    //      msg: 'vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit',
    //      date: 2022-07-01T11:03:02.000Z }
    // { _id: ObjectId("635b0280e395857cd0b6d20c"),
    //      email: 'cphillimore1@shareasale.com',
    //      msg: 'at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis',
    //      date: 2022-07-28T12:30:53.000Z }
    // { _id: ObjectId("635b0280e395857cd0b6d20d"),
    //      email: 'esparkwill2@google.fr',
    //      msg: 'feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare',
    //      date: 2022-07-07T00:29:53.000Z }
    // { _id: ObjectId("635b0280e395857cd0b6d20e"),
    //      email: 'hdanielsky3@oaic.gov.au',
    //      msg: 'iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam',
    //      date: 2022-08-04T00:48:28.000Z }
    // { _id: ObjectId("635b0280e395857cd0b6d20f"),
    //      email: 'tplumptre4@github.com',
    //      msg: 'fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis',
    //      date: 2022-07-09T21:44:04.000Z }
    // { _id: ObjectId("635b0280e395857cd0b6d210"),
    //      email: 'aorpen5@linkedin.com',
    //      msg: 'ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel',
    //      date: 2022-06-27T05:16:14.000Z }
    // { _id: ObjectId("635b0280e395857cd0b6d211"),
    //      email: 'ctrue6@dailymotion.com',
    //      msg: 'ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus',
    //      date: 2022-09-20T02:35:52.000Z }
    // { _id: ObjectId("635b0280e395857cd0b6d212"),
    //      email: 'tblanchard7@drupal.org',
    //      msg: 'ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo',
    //      date: 2022-04-08T17:21:27.000Z }
    // { _id: ObjectId("635b0280e395857cd0b6d213"),
    //      email: 'cbonifacio8@nba.com',
    //      msg: 'condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat',
    //      date: 2022-06-30T16:07:00.000Z }
    // { _id: ObjectId("635b0280e395857cd0b6d214"),
    //      email: 'tbrowett9@yelp.com',
    //      msg: 'felis fusce posuere felis sed lacus morbi sem mauris laoreet ut',
    //      date: 2022-09-23T07:57:28.000Z }


/*-------------------*/
// list all products */
/*-------------------*/
db.products.find()
    // { _id: ObjectId("635b026be395857cd0b6d201"),
    //      title: 'Genocide',
    //      price: 120,
    //      thumbnail: 'https://robohash.org/dictamolestiaesequi.png?size=64x64&set=set1' }
    // { _id: ObjectId("635b026be395857cd0b6d202"),
    //      title: 'I Love You, Beth Cooper',
    //      price: 580,
    //      thumbnail: 'https://robohash.org/omnisvelitut.png?size=64x64&set=set1' }
    // { _id: ObjectId("635b026be395857cd0b6d203"),
    //      title: 'Game Over',
    //      price: 900,
    //      thumbnail: 'https://robohash.org/temporesedsit.png?size=64x64&set=set1' }
    // { _id: ObjectId("635b026be395857cd0b6d204"),
    //      title: 'Grocer\'s Son, The (Fils de l\'épicier, Le)',
    //      price: 1280,
    //      thumbnail: 'https://robohash.org/nemoitaquenon.png?size=64x64&set=set1' }
    // { _id: ObjectId("635b026be395857cd0b6d205"),
    //      title: 'Je suis né d\'une cigogne',
    //      price: 1700,
    //      thumbnail: 'https://robohash.org/adipisciexplicabofuga.png?size=64x64&set=set1' }
    // { _id: ObjectId("635b026be395857cd0b6d206"),
    //      title: 'Charming Mass Suicide, A (Hurmaava joukkoitsemurha)',
    //      price: 2300,
    //      thumbnail: 'https://robohash.org/velomnisodio.png?size=64x64&set=set1' }
    // { _id: ObjectId("635b026be395857cd0b6d207"),
    //      title: 'Nazis Strike, The (Why We Fight, 2)',
    //      price: 2860,
    //      thumbnail: 'https://robohash.org/pariatursedet.png?size=64x64&set=set1' }
    // { _id: ObjectId("635b026be395857cd0b6d208"),
    //      title: 'Anna',
    //      price: 3350,
    //      thumbnail: 'https://robohash.org/architectodelenitinam.png?size=64x64&set=set1' }
    // { _id: ObjectId("635b026be395857cd0b6d209"),
    //      title: 'Edmund Kean: Prince Among Lovers (Kean)',
    //      price: 4320,
    //      thumbnail: 'https://robohash.org/repudiandaealiquamenim.png?size=64x64&set=set1' }
    // { _id: ObjectId("635b026be395857cd0b6d20a"),
    //      title: 'Big Snit, The',
    //      price: 4990,
    //      thumbnail: 'https://robohash.org/magnamautdistinctio.png?size=64x64&set=set1' }


/*-----------------*/
// count documents */
/*-----------------*/
db.messages.estimatedDocumentCount()
    // 10
db.messages.countDocuments()
    // 10
db.products.estimatedDocumentCount()
    // 10
db.products.countDocuments()
    // 10


/*----------------*/
// insert product */
/*----------------*/
db.products.insertOne({"title": "Relationship Status: It's Complicated","price": 463,"thumbnail": "https://robohash.org/adipiscidelectusreprehenderit.png?size=64x64&set=set1"})
    // { acknowledged: true,
    //     insertedId: ObjectId("635b02d5e395857cd0b6d215") }


/*-------------------------------------*/
/* list products priced less than 1000 */
/*-------------------------------------*/
db.products.find({price:{$lt:1000}})
    // { _id: ObjectId("635b026be395857cd0b6d201"),
    //      title: 'Genocide',
    //      price: 120,
    //      thumbnail: 'https://robohash.org/dictamolestiaesequi.png?size=64x64&set=set1' }
    // { _id: ObjectId("635b026be395857cd0b6d202"),
    //      title: 'I Love You, Beth Cooper',
    //      price: 580,
    //      thumbnail: 'https://robohash.org/omnisvelitut.png?size=64x64&set=set1' }
    // { _id: ObjectId("635b026be395857cd0b6d203"),
    //      title: 'Game Over',
    //      price: 900,
    //      thumbnail: 'https://robohash.org/temporesedsit.png?size=64x64&set=set1' }
    // { _id: ObjectId("635b02d5e395857cd0b6d215"),
    //      title: 'Relationship Status: It\'s Complicated',
    //      price: 463,
    //      thumbnail: 'https://robohash.org/adipiscidelectusreprehenderit.png?size=64x64&set=set1' }


/*---------------------------------------------------*/
/* list the products with price between 1000 to 3000 */
/*---------------------------------------------------*/
db.products.find({$and: [{price: {$gte:1000}},{price:{$lte:3000}}]})
    // { _id: ObjectId("635b026be395857cd0b6d204"),
    //      title: 'Grocer\'s Son, The (Fils de l\'épicier, Le)',
    //      price: 1280,
    //      thumbnail: 'https://robohash.org/nemoitaquenon.png?size=64x64&set=set1' }
    // { _id: ObjectId("635b026be395857cd0b6d205"),
    //      title: 'Je suis né d\'une cigogne',
    //      price: 1700,
    //      thumbnail: 'https://robohash.org/adipisciexplicabofuga.png?size=64x64&set=set1' }
    // { _id: ObjectId("635b026be395857cd0b6d206"),
    //      title: 'Charming Mass Suicide, A (Hurmaava joukkoitsemurha)',
    //      price: 2300,
    //      thumbnail: 'https://robohash.org/velomnisodio.png?size=64x64&set=set1' }
    // { _id: ObjectId("635b026be395857cd0b6d207"),
    //      title: 'Nazis Strike, The (Why We Fight, 2)',
    //      price: 2860,
    //      thumbnail: 'https://robohash.org/pariatursedet.png?size=64x64&set=set1' }


/*---------------------------------------------*/
/* list products with prices greater than 3000 */
/*---------------------------------------------*/
db.products.find({price:{$gt:3000}})
    // { _id: ObjectId("635b026be395857cd0b6d208"),
    //      title: 'Anna',
    //      price: 3350,
    //      thumbnail: 'https://robohash.org/architectodelenitinam.png?size=64x64&set=set1' }
    // { _id: ObjectId("635b026be395857cd0b6d209"),
    //      title: 'Edmund Kean: Prince Among Lovers (Kean)',
    //      price: 4320,
    //      thumbnail: 'https://robohash.org/repudiandaealiquamenim.png?size=64x64&set=set1' }
    // { _id: ObjectId("635b026be395857cd0b6d20a"),
    //      title: 'Big Snit, The',
    //      price: 4990,
    //      thumbnail: 'https://robohash.org/magnamautdistinctio.png?size=64x64&set=set1' }


/*----------------------------------------------------------------------*/
/* make a query that brings only the name of the third cheapest product */
/*----------------------------------------------------------------------*/
db.products.find({},{title:1,_id:0}).sort({price:1}).skip(2).limit(1)
    // { title: 'I Love You, Beth Cooper' }


/*-----------------------------------------------------------------------------------------------*/
/* make an update on all the products, adding the stock field to all of them with a value of 100 */
/*-----------------------------------------------------------------------------------------------*/
db.products.updateMany({},{$set: {"stock":100}})
    // { acknowledged: true,
    //     insertedId: null,
    //     matchedCount: 11,
    //     modifiedCount: 11,
    //     upsertedCount: 0 }


/*------------------------------------------------------------------------*/
/* change the stock to zero of the products with prices greater than 4000 */
/*------------------------------------------------------------------------*/
db.products.updateMany({price: {$gt:4000}},{$set: {"stock":0}})
    // { acknowledged: true,
    //     insertedId: null,
    //     matchedCount: 2,
    //     modifiedCount: 2,
    //     upsertedCount: 0 }

// check it
db.products.find({stock:0})
    // { _id: ObjectId("635b026be395857cd0b6d209"),
    //      title: 'Edmund Kean: Prince Among Lovers (Kean)',
    //      price: 4320,
    //      thumbnail: 'https://robohash.org/repudiandaealiquamenim.png?size=64x64&set=set1',
    //      stock: 0 }
    // { _id: ObjectId("635b026be395857cd0b6d20a"),
    //      title: 'Big Snit, The',
    //      price: 4990,
    //      thumbnail: 'https://robohash.org/magnamautdistinctio.png?size=64x64&set=set1',
    //      stock: 0 }


/*-------------------------------------------*/
/* delete products with price less than 1000 */
/*-------------------------------------------*/
db.products.deleteMany({price: {$lt: 1000}})
    // { acknowledged: true, deletedCount: 4 }


/*---------------------------------------------------------------------------------------*/
/* create a user 'pepe' with password 'asd456' that can only read the ecommerce database */
/*---------------------------------------------------------------------------------------*/
use admin
    // 'switched to db admin'
db.createUser({user:"pepe", pwd: "asd456", roles: [{role:"read", db: "ecommerce"}]})
    // { ok: 1 }


/*------------------------------------------------*/
/* verify that pepe cannot change the information */
/*------------------------------------------------*/
mongosh -u pepe -p asd456
    // Current Mongosh Log ID: 635b04079ee681ed64e9b1cf
    // Connecting to:          mongodb://<credentials>@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0
    // Using MongoDB:          6.0.2
    // Using Mongosh:          1.6.0
    // For mongosh info see: https://docs.mongodb.com/mongodb-shell/
test> show dbs
    // ecommerce  112.00 KiB
test> use ecommerce
    // switched to db ecommerce
ecommerce> show tables
    // messages
    // products
ecommerce> db.products.find({},{title:1,_id:0}).sort({price:1}).skip(2).limit(1)
    // [ { title: 'Charming Mass Suicide, A (Hurmaava joukkoitsemurha)' } ]
ecommerce> db.products.insertOne({dont:1})
    // MongoServerError: not authorized on ecommerce to execute command { insert: "products", documents: [ { dont: 1, _id: ObjectId('635b0444171806008bca109b') } ], ordered: true, lsid: { id: UUID("04c22f08-8ef2-4538-b15a-15ed304b8bcf") }, $db: "ecommerce" }

