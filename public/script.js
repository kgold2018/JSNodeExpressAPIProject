const appName = document.getElementById('appName');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const ageInput = document.getElementById('age');
const addButton = document.getElementById('addButton');
const usersList =  document.getElementById('usersList');

let rowNumber = 1;

//MOCK DATA
const usersFormData =  [
    {
             "firstName": "Mark",
             "lastName": "Otto",
              "age": 30,
              "id" : "86e6bc2d-d03f-4c08-a291-bc748985d34a"
    },
    {
    "firstName": "Jacob",
    "lastName": "Thornton",
    "age": 40,
    "id" : "86e6bc2d-d03f-8c08-a291-bc748985d34a"
    },
    {
            "firstName": "Larry",
            "lastName": "the Bird",
            "age": 50,
            "id" : "86e6bc2d-d03f-6c08-a291-bc748985d34a"
   },
]
const storedUsers = JSON.parse(JSON.stringify(usersFormData))

class UI {
    static async displayAppName() {
        try {
            appName.innerText =  await UserService.getAppName();
        } catch(error) {
            console.error('Error while catching app name: ', error);
            throw error;
        }
    }

    static isFormValid() {
        const isFirstNameValid = firstNameInput.value.trim().length > 0;
        const isLastNameValid = lastNameInput.value.trim().length > 0;
        const isAgeValid = ageInput.value.trim().length > 0;

        return isFirstNameValid && isLastNameValid && isAgeValid;
    }

    static activateAddButton() {
        const isValid = UI.isFormValid();

        console.log("isValid Form = ", isValid);

        addButton.disabled = !isValid;
    }

    static displayUsers() {
    const users  = storedUsers;
    console.log(users);

        if ( users.length) {
            users.forEach((user) => {
                console.log('user = ', user)
                UI.addUserToList(user)
            })
        }
    }

    static addUserToList(user) {
        const row = document.createElement('tr');
        row.innerHTML =
        `<th scope="row">${rowNumber}</th>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.age}</td>
        <td>${user.id}</td>`
        ;
        usersList.appendChild(row)
        rowNumber ++;



    }
}


class UserService {
    static getAppName() {
        return fetch("http://localhost:5000/api/")
            .then(response => {
                if (response.status !== 200) {
                    console.error("[ERROR] Response status: ", response.status);
                    throw new Error('Failed to fetch app name. Unexpected response status.')
                }

                return response.text();
            })
            .catch(error => {
                console.error('[ERROR] Fetch error:', error);
                throw error;
            })
    }
}

//event to show App Name
document.addEventListener('DOMContentLoaded', UI.displayAppName);

//event to activate Add button
document.addEventListener('input', UI.activateAddButton);

//event to display users
document.addEventListener('DOMContentLoaded',UI.displayUsers)

