import React, { useState } from 'react';
import { db } from '../firebase/config';

const useFirestore = (collection, condition) =>{
    const [documents,setDocuments] = useState([]);
  React.useEffect(()=>{
    //   let collectionRef = db.collection(collection).orderBy('createdAt');
      let collectionRef = db.collection(collection)
      /**
       * {
       *    fieldName:abc
       *    operatior "=="
       *    compareValue: 'abc'
       * }
       */
      if(condition){
          if(!condition.compareValue || !condition.compareValue.length){
              return;
          }
          collectionRef= collectionRef.where(condition.fieldName,condition.operator,condition.compareValue)
      }
     const unsubscribe =  collectionRef.onSnapshot((spapshot)=>{
          const documents = spapshot.docs.map(doc=>({
              ...doc.data(),
              id:doc.id
          }))
          setDocuments(documents)
      })
        // db.collection('users').onSnapshot((snapshot)=>{
        //     const data = snapshot.docs.map(doc=>({
        //         ...doc.data(),
        //         id:doc.id
        //     }))
        //     console.log(data,snapshot)
        // })
        return unsubscribe;
    },[collection,condition])
    return documents;
}
export default useFirestore;
