const fs = require('fs');

const users = JSON.parse(fs.readFileSync('users.json'));

module.exports = {

  getUsers: function() {
    return users;
  },

  searchUsers: function(query) {
    var results = [];

    users.forEach(function(user) {
      if (searchFirstName(query, user) || searchLastName(query, user)) {
        results.push(user);
      }
    });
    return results;
  },

  addUser: function(userObject) {
    users.push(userObject);
    fs.writeFile('users.json', JSON.stringify(users), (error, data) => {
      if (error) {
        throw error;
      }
    });
  }
};

function searchFirstName(input, user) {
  return user.firstname.toLowerCase().includes(input.toLowerCase());
}

function searchLastName(input, user) {
  return user.lastname.toLowerCase().includes(input.toLowerCase());
}
