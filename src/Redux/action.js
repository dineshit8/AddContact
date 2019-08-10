import { store } from './store'

const addContact = (newContact) => {
      var action = {
         value: newContact,
         type : "addContact"
      }
   store.dispatch(action)
 }

 const editContact = (existingContact) => {
   var action = {
      value: existingContact,
      type : "editContact"
   }
   store.dispatch(action)
}

 export { 
   addContact,
   editContact
}