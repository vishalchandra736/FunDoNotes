import firestore from '@react-native-firebase/firestore';

export const addNotesData = async (
  uid,
  noteID,
  title,
  notes,
  pinned,
  archive,
  deleted,
  labelData,
) => {
  await firestore()
    .collection('Users')
    .doc(uid)
    .collection('Notes')
    .doc(noteID)
    .set({
      title: title,
      notes: notes,
      pinned: pinned,
      archive: archive,
      deleted: deleted,
      labelData: labelData
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
        let data = documentSnapshot.data();
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
  deleted,
  labelData,
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
      deleted: deleted,
      labelData: labelData,
    });
};

export const deleteNoteData = async (uid, noteId) => {
  try {
    await firesotre()
      .collection('Users')
      .doc(uid)
      .collection('Notes')
      .doc(noteId)
      .delete()
      .then(console.log('deleleted'));
  } catch (error) {
    console.log(error);
  }
};
