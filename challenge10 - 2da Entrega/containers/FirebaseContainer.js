const admin = require("firebase-admin");
const serviceAccount = require("../persistence/config/firebase.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

class FirebaseContainer {
    constructor(collection) {
        this.db = admin.firestore();
        this.query = this.db.collection(collection)
    }

    save = async (element) => {
        let ret = {}
        try {
            const newElement = await this.query.add(JSON.parse(JSON.stringify(element)))
            ret = newElement.id
            console.log(`[OK] insert on ${this.query._queryOptions.collectionId} ID: ${ret}`)
        } catch (err) {
            console.error(err);
            ret = { 'error': 1, 'description': `[ERROR] Save on ${this.query._queryOptions.collectionId}: ${err}` }
            throw err
        }
        return ret
    }

    getAll = async () => {
        let ret = []
        try {
            const snapshot = await this.query.get()
            let elements = snapshot.docs;
            ret = elements.map(elem => ({ id: elem.id, ...elem.data() }))
        } catch (err) {
            console.error(err);
            throw err
        }
        return ret;
    }

    getById = async (id) => {
        let ret = { 'error': 2, 'description': `Element ID ${id} on ${this.query._queryOptions.collectionId} Not Found` }
        try {
            const elem = this.query.doc(`${id}`)
            const snapshot = await elem.get();
            if (snapshot.exists)
                ret = { id: snapshot.id, ...snapshot.data() }
        } catch (err) {
            console.error(err);
            throw err
        }
        return ret
    }

    update = async (id, element) => {
        let ret = { 'error': 2, 'description': `Element ID ${id} on ${this.query._queryOptions.collectionId} Not Found` }
        try {
            const elemById = this.query.doc(`${id}`)
            await elemById.update(element);
            console.log(`[OK] update ID ${id} on ${this.query._queryOptions.collectionId}`)
            ret = { 'error': 0, 'description': `Update ID ${id} on ${this.query._queryOptions.collectionId} Successful` }
        } catch (err) {
            console.error(err);
            throw err
        }
        return ret
    }

    deleteById = async (id) => {
        let ret = { 'error': 2, 'description': `Element ID ${id} on ${this.query._queryOptions.collectionId} Not Found` }
        try {
            await this.query.doc(`${id}`).delete();
            console.log(`[OK] delete ID ${id} on ${this.query._queryOptions.collectionId}`)
            ret = { 'error': 0, 'description': `Delete ID ${id} on ${this.query._queryOptions.collectionId} Successful` }
        } catch (err) {
            console.error(err);
            throw err
        }
        return ret
    }

    deleteAll = async () => {
        // https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=es-419#collections
        // It is not recommended, because there are many individual deletes
        let ret = { 'error': 0, 'description': `Delete ALL on ${this.query._queryOptions.collectionId} Successful` }
        try {
            const batch = this.db.batch();
            const snapshot = await this.query.get()
            snapshot.docs.forEach(doc => {
                batch.delete(doc.ref)
            })
            await batch.commit()
            console.log(`[OK] delete ALL on ${this.query._queryOptions.collectionId}`)
        } catch (err) {
            console.error(err)
            throw err
        }
        return ret
    }

}

module.exports = FirebaseContainer
