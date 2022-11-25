import normalizr from 'normalizr'
import util from 'util'

export const normalize = normalizr.normalize
export const denormalize = normalizr.denormalize
const schema = normalizr.schema

const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

const schemaMessage = new schema.Entity('messages', {
    author: schemaAuthor
})

export const schemaChat = new schema.Entity('chat', {
    messages: [schemaMessage]
})

export const print = (object) => {
    console.log(util.inspect(object, false, 12, true))
}

export const getNormalizedData = (originalData) => {
    const originalLength = JSON.stringify(originalData).length
    const normalizedData = normalize({ id: 'webchat', messages: originalData }, schemaChat)
    const normalizedLength = JSON.stringify(normalizedData).length
    const compressRate = (normalizedLength * 100 / originalLength).toFixed(2)
    return {
        data: normalizedData,
        rate: compressRate
    }
}