const { saveUserData, getAllUserData } = require("../utils/getUserData");

// save new user
module.exports.saveUserDataController = (req, res) => {
  const { name, gender, contact, address, photoUrl } = req.body;
  if (!name || !gender || !contact || !address || !photoUrl) {
    res.send("name,gender,contact,address,photoUrl is required");
  } else {
    const existUser = getAllUserData();
    const newUserId = Date.now().toString();

    existUser[newUserId] = {
      id: newUserId,
      name,
      gender,
      contact,
      address,
      photoUrl,
    };
    saveUserData(existUser);
    res.send({ success: true, msg: "user added successfully" });
  }
};

// get all users
module.exports.getAllUsers = (req, res) => {
  const data = getAllUserData();
  res.send(data);
};

// get random user
module.exports.getRandomUser = (req, res) => {
  const existUser = getAllUserData();
  const dataKey = Object.keys(existUser);
  const randomUserIndex = Math.floor(Math.random() * dataKey.length);
  const randomUserDataKey = dataKey[randomUserIndex];
  res.send(existUser[randomUserDataKey]);
};

// update user data
module.exports.updateUserById = (req, res) => {
  const existUser = getAllUserData();
  const userId = req.params.id;
  if (existUser[userId]) {
    const { name, gender, contact, address, photoUrl } = req.body;
    existUser[userId] = {
      id: userId,
      name: name || existUser[userId].name,
      gender: gender || existUser[userId].gender,
      contact: contact || existUser[userId].contact,
      address: address || existUser[userId].address,
      photoUrl: photoUrl || existUser[userId].photoUrl,
    };
    saveUserData(existUser);
    res.send({ success: true, msg: "user updated success" });
  } else {
    res.send({ success: false, msg: "user id not found" });
  }
};

// update multiple user data
module.exports.updateMultipleUser = (req, res) => {
  const idsArray = req.body.idsArray;
  const existUser = getAllUserData();
  const { name, gender, contact, address, photoUrl } = req.body;

  try {
    for (let i = 0; i <= idsArray.length; i++) {
      if (existUser[idsArray[i]]) {
        existUser[idsArray[i]] = {
          id: idsArray[i],
          name: name || existUser[idsArray[i]].name,
          gender: gender || existUser[idsArray[i]].gender,
          contact: contact || existUser[idsArray[i]].contact,
          address: address || existUser[idsArray[i]].address,
          photoUrl: photoUrl || existUser[idsArray[i]].photoUrl,
        };
        saveUserData(existUser);
        res.send({ update: true, mgs: "multiple user updated !" });
        console.log(existUser[idsArray[i]])
      } else {
        res.send({
          update: false,
          msg: `${idsArray[i]} => not found this user id`,
        });
      }
    }
  } catch (err) {
    res.send("idsArray is required");
  }
};

// delete user by id
module.exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  const existUser = getAllUserData();
  if (existUser[userId]) {
    delete existUser[userId];
    saveUserData(existUser);
    res.send({ delete: true, msg: `${userId} is deleted` });
  } else {
    res.send({ delete: false, msg: "user not found" });
  }
};
