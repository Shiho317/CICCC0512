const router = require('express').Router()
const uuid = require("uuid")

const members = [
    { id: uuid.v4(), name: "Mario", email: "mario@mail.com" },
    { id: uuid.v4(), name: "Luigi", email: "luigi@mail.com" },
    { id: uuid.v4(), name: "Yoshi", email: "yoshi@mail.com" },
]

router.get('/', (req, res) => {
    res.render("index", { members })
})

router.get('/:id', (req, res) => {
    const paramsID = req.params.id
    
    const found = members.some(member => member.id === paramsID)
    
    if(found){
        const findMember = members.filter(member => member.id === paramsID)
        res.render("index", {members: findMember})
    }else{
        res.status(400).json({ msg: `Member with id: ${paramsID}, is not found `})
    }
})

router.post('/', (req,res) => {
    const newData = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }
    console.log(newData)

    members.push(newData)
    res.render("index", { members })
})

router.put("/:id", (req,res) => {
    const paramsID = req.params.id
    const found = members.some(member => member.id === paramsID)
    
    if(found){
        const { name, email } = req.body

        //mutate
        const newMembers = members.forEach(member => {
            if(member.id === paramsID){
                name && (member.name = name)
                email && (member.email = email)
            }
        })

        console.log(newMembers)

        res.render("index", { newMembers })

    }else{
        res.status(400).json({ msg: `Member with id: ${paramsID}, is not found `})
    }
})

router.delete("/:id", (req,res) => {
    const paramsID = req.params.id
    const found = members.some(member => member.id === paramsID)
    
    if(found){
        const newMembers = members.splice(members.findIndex(member => member.id === paramsID),1)
        console.log(newMembers)
        res.render("index", { members: newMembers })
    }else{
        res.status(400).json({ msg: `Member with id: ${paramsID}, is not found `})
    }
})

module.exports = router