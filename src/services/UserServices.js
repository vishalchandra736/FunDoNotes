import firestore from '@react-native-firebase/firestore';

export const addUserData = async (email, name, user) => {
  await firestore().collection('Users').doc(user).set({
    name: name,
    email: email,
  });
};

export const fetchUserData = async (user) => {
  const userDetails = [];
  const userCollection = await firestore().collection('Users').doc(user.uid).get();
  const name = userCollection._data.name;
  const photo = userCollection._data.photo;
  userDetails.push(name);
  userDetails.push(photo);
  return userDetails;
};

export const updateProfile = async (user, photo) => {
  await firestore().collection('Users').doc(user.uid).update({photo: photo});
};
