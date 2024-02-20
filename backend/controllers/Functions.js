const bcrypt = require('bcryptjs')

const findOneData = async (db, query) => {
    const data = await db.findOne(query)
    return data
}

const Insert = async (db, insert) => {
    const data = await db.insertMany([insert])
    return data[0]
}

const Hash = async (password) => {
    const hashed = await bcrypt.hash(password, 10)
    return hashed
}

const findUsingid = async (db, id) => {
    const data = await db.findById(id)
    return data
}

const Compare = async (password, hashed) => {
    const status = await bcrypt.compare(password, hashed)
    return status
}

const findByAndUpdate = async (db, query, update) => {
    await db.findByIdAndUpdate(query, update)
}

module.exports = {
    findOneData,
    Insert,
    Hash,
    findUsingid,
    Compare,
    findByAndUpdate
}

