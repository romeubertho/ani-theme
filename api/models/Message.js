/**
 * Message.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        topics: { /** é necessário a mensagem conter pelo menos 1 tópico, estes devem estar previamente registrados na bd Topic **/
            collection: 'topic',
            via: 'messages',
            required: true,
            notNull: true
        },
        message: { /** mensagem é necessár **/
            type: 'string',
            required: true,
            notNull: true
        },
        creator: { /** é necessário a mensagem conter o criador da mensagem, este deve estar previamente registrado na bd User **/
            model: 'user',
            required: true,
            notNull: true
        },
        reposter:{ /** é necessário a mensagem conter o criador da mensagem, este deve estar previamente registrado na bd User **/
            model: 'user'
        }
    }
};

