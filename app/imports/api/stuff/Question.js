import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The QuestionsCollection. It encapsulates state and variable values for question.
 */
class QuestionsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'QuestionsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      email: String,
      name: String,
      question1: String,
      answer1: String,
      question2: String,
      answer2: String,
      question3: String,
      answer3: String,
      question4: String,
      answer4: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {QuestionsCollection}
 */
export const Questions = new QuestionsCollection();
