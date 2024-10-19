import { v4 as uuid } from "uuid";
import log from '../logger/logger.js';
//getUsers();
let users = [];
export const getUsers = (req, res) => {
    console.info("GET request to endpoint '/users' received.");
    res.send(users.length ? users : "There are no users.");
}

 export const postUsers= (req, res) => {
     console.info("POST request to endpoint '/users' received.");

     //create user postUsers()
     const user = req.body;
     const userId = uuid();

     users.push({...user, id: userId});
     res.send([{UserID: userId }]);

     //res.send("User was created successfully.");
 };
//export const deleteUsers
export const deleteUsers = (req,res) => {
    users = [];

    res.send("DB cleaned successfully.")
}






export const getUserById = (req, res) => {
    console.info("GET request to endpoint '/users/id' received.");

    const userID = req.params.id;
    const foundUser = users.find((user) => user.id === userID);

    res.send(foundUser ? foundUser : "User not found.");
};

// patchUserById();
export const patchUserById = (req, res) => {
    console.info("PATCH request to endpoint '/users/id' received.");

    const userID = req.params.id;
    const newFirstName = req.body.firstName;
    const newLastName = req.body.lastName;
    const newAge = req.body.age;

    const foundUser = users.find((user) => user.id === userID);

    if (newFirstName) {
        foundUser.firstName = newFirstName;
    }
    if (newLastName) {
        foundUser.lastName = newLastName;
    }
    if (newAge) {
        foundUser.age = newAge;
    }

    res.send("User was updated successfully.");
};


// deleteUserById();
export const deleteUserById = (req, res) => {
    console.info("DElETE request to endpoint '/users/id' received.");

    const userID = req.params.id;

    users = users.filter((user) => user.id !== userID);

    res.send("User was deleted successfully.");
};

