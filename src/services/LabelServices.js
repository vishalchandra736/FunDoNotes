import firesotre from '@react-native-firebase/firestore';

export const addLabelData = async (uid, label) => {
  try {
    await firesotre().collection('Users').doc(uid).collection('Labels').add({
      label: label,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchLabelData = async uid => {
  const labelsDetails = [];
  await firesotre()
    .collection('Users')
    .doc(uid)
    .collection('Labels')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        let data = documentSnapshot.data();
        data.id = documentSnapshot.id;
        labelsDetails.push(data);
      });
    });

  return labelsDetails;
};

export const updateLabelData = async (uid, labelId, labelData) => {
  try {
    await firesotre()
      .collection('Users')
      .doc(uid)
      .collection('Labels')
      .doc(labelId)
      .update({
        label: labelData,
      }).then(console.log("Updated"));
  } catch (error) {
    console.log(error);
  }
};

export const deleteLabelData = async (uid, labelId) => {
  try {
    await firesotre()
      .collection('Users')
      .doc(uid)
      .collection('Labels')
      .doc(labelId)
      .delete()
      .then(console.log('deleleted'));
  } catch (error) {
    console.log(error);
  }
};
