import express from "express"
const app = express()
const port = 5000

app.use(express.json());

const users = []
let nextId = 1


//get list of all users
app.get("/users", (req, res) => {
    res.status(200).send(users)
})



//Add a new user in a list
app.post("/user", (req, res) => {
    try {
        const { name, userClass, section } = req.body;


        if (!name || !userClass || !section) {
            return res.status(400).send({ error: "All fields are required" });
        }

        const newUser = { id: nextId++, name, userClass, section };
        users.push(newUser);
        res.status(201).send(newUser);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
});



// get a single user by id
app.get("/user/:id", (req, res) => {
    const foundUser = users.find((item) => item.id === parseInt(req.params.id));

    if (!foundUser) {
        return res.status(404).send("User not found")

    }

    res.status(201).send(foundUser)
})


//update user by id
app.put("/user/:id", (req, res) => {
    const foundUser = users.find((item) => item.id === parseInt(req.params.id));

    if (!foundUser) {
        return res.status(404).send("User not found")

    }

    const { name, userClass, section } = req.body
    foundUser.name = name
    foundUser.userClass = userClass
    foundUser.section = section
    res.status(201).send(foundUser)

});

//delete user

app.delete("/user/:id", (req, res) => {
    const index = users.findIndex((item) => item.id === parseInt(req.params.id))

    if (index === -1) {
        return res.status(404).send("user not found")
    }

    users.splice(index, 1)
    return res.status(202).send("User Deleted")

})

app.listen(port, () => {
    console.log(`server is listening at port ${port}`);

})