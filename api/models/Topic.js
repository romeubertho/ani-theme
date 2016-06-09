/**
 * Topic.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      id: {
            type: 'integer',
            unique: true,
            primaryKey: false,
            autoIncrement: true
        },
        topic: {
            type: 'string',
            required: true,
            notNull: true,
            unique:true,
            primaryKey: true
        },
        messages:{
            collection: 'message',
            via:'topics'
        }
  }
};

