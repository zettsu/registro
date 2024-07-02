const { password } = require('pg/lib/defaults');
const postgre = require('../database')
const bcrypt = require('bcrypt');
const saltRounds = 10;

function validateUser(password, hash, res) {
    bcrypt
        .compare(password, hash)
        .then(() => {
            res.json({ msg: "OK", data: "success" })
        })
        .catch(err => console.error(err.message))
}

async function saveUser(usuario, hash, res) {
    const sql = 'INSERT INTO users(name, password) VALUES($1, $2) RETURNING *'
    const { rows } = await postgre.query(sql, [usuario, hash])

    res.json({ msg: "OK", data: rows[0] })
}


const userController = {
    createTable: async (req, res) => {
        try {
            const { rows } = await postgre.query("CREATE TABLE users ( name varchar(255), password varchar(255) );")
            res.json({ msg: "OK", data: rows })
        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    login: async (req, res) => {
        try {
            const { usuario, password } = req.body

            if(usuario == undefined || password == undefined) {
                return res.status(400).json({ msg: "missing fields" })
            }

            const { rows } = await postgre.query("select * from users where name = $1 limit 1", [usuario])
            
            if (rows.length > 0) {
                validateUser(password, rows[0].password, res);
            }else{
                return res.status(401).json({ msg: "unauthorized" })
            }
        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    create: async (req, res) => {
        try {
            const { usuario, password } = req.body

            if(usuario == undefined || password == undefined) {
                return res.status(400).json({ msg: "missing fields" })
            }

            const { rows } = await postgre.query("select * from users where name = $1 limit 1", [usuario])
            
            if (rows.length > 0) {
                return res.status(400).json({ msg: "already exists a user with that name" })
            }

            bcrypt
                .hash(password, 10).then(hash => {
                    return hash;
                }).then(hash => saveUser(usuario, hash, res));

        } catch (error) {
            res.json({ msg: error.msg })
        }
    }
}

module.exports = userController