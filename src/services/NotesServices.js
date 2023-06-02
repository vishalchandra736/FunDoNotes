import firestore from '@react-native-firebase/firestore';

export const addNotesData = async (uid, title, notes, pinned, archive) => {
  await firestore()
    .collection('Users')
    .doc(uid)
    .collection('Notes')
    .add({
      title: title,
      notes: notes,
      pinned: pinned,
      archive: archive,
    });
};

export const fetchNotesData = async user => {
  const notesDetails = [];
  await firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('Notes')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        let data= documentSnapshot.data();
        data.id = documentSnapshot.id;
        notesDetails.push(data);
      });
    });
  return notesDetails;
};

export const updateNotesData = async (
  uID,
  noteID,
  title,
  notes,
  pinned,
  archive,
) => {
  await firestore()
    .collection('Users')
    .doc(uID)
    .collection('Notes')
    .doc(noteID)
    .update({
      title: title,
      notes: notes,
      pinned: pinned,
      archive: archive,
    });
};
