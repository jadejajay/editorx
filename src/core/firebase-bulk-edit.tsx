import firestore from '@react-native-firebase/firestore';
export const addRandomData = async (num: any, database: any) => {
  for (let i = 0; i < num; i++) {
    try {
      await firestore()
        .collection(database)
        .add({
          time: 1696243535636 + 7200000 * i,
        });
      console.log(`Added document ${i + 1}`);
    } catch (error) {
      console.error(`Error adding document ${i + 1}:`, error);
    }
  }
};
// 'IBAIS HARDWARE GROUP'
export const changeData = async () => {
  const list: any = [];
  try {
    const collectionRef = firestore().collection('IBAIS HARDWARE GROUP');
    // Fetch documents from the collection
    const querySnapshot = await collectionRef.get();
    querySnapshot.forEach(async (doc) => {
      list.push(doc.id);
    });
    list.map(async (item: any, index: any) => {
      try {
        // Update the field in each document
        await collectionRef.doc(item).update({
          url: `http://itekindia.com/chats/images/${index + 1}.png`,
        });
        console.log(
          `Field uploadTime updated in document with ID: ${item},${
            1696243535636 + 7200000 * (index + 1)
          }`
        );
      } catch (error) {
        console.error(
          `Error updating field in document with ID: ${item}`,
          error
        );
      }
    });

    console.log(`changed document`);
  } catch (error) {
    console.error(`Error adding document :`, error);
  }
};
// 'IBAIS HARDWARE GROUP'
// http://itekindia.com/chats/images/1.png
