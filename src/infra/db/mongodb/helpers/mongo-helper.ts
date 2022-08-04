import { Collection, MongoClient } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient,

  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url);
  },

  async disconnect(): Promise<void> {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  map(collection: any): any {
    const { _id, ...collectionWithoutId } = collection;

    const mappedCollection = {
      id: _id.toString(),
      ...collectionWithoutId,
    };

    if (mappedCollection.password) {
      delete mappedCollection.password;
    }

    return mappedCollection;
  },
};
