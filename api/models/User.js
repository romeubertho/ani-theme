/**
 * User.js
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
        username: {
            type: 'string',
            required: true,
            notNull: true,
            unique: true,
            primaryKey: true
        },
        password: {
            type: 'string',
            required: true,
            notNull: true
        },
        name:{
          type:'string',
          required: true,
          notNull:true
        },
        birthday:{
            type: 'date',
            required:true,
            notNull:true
        },
        description:{
            type: 'string',
            required: true,
            notNull: true
        },
        photo:{
            type:'string',
            required:false
        },
        messages: {
            collection: 'message',
            via: 'creator'
        },
        following: {
            collection: 'user',
            via: 'followers'
        },
        followers: {
            collection: 'user',
            via: 'following'
        },
        groups: {
            collection: 'group',
            via: 'creator'
        },
        subscriptions:{
            collection: 'group',
            via: 'subscribers'
        }
    }
};

