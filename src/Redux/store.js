import { createStore, combineReducers } from 'redux'

const Contact = (state = 0, action) =>
{
    let type = action.type;
    let stateObj = Object.assign({}, state);
    switch(type)
    {
        case 'addContact' :
                let newContactObj = Object.assign({}, action.value);
                newContactObj.id = (stateObj.children.length + 1).toString();
                stateObj.children.push(newContactObj);
                return Object.assign({},state, {
                  ...stateObj
              });
            break;
        case 'editContact':
              let existingContactObj = Object.assign({}, action.value);
              let existingContactObjKey = Object.keys(existingContactObj);
              let existingContactObjKeyLen = existingContactObjKey.length;
              for(let i=0 ; i < existingContactObjKeyLen; i++)
              {
                var matchedContact = Object.assign({}, stateObj.children[existingContactObj.id - 1]);
                let manipulatedKey = existingContactObjKey[i];
                if(manipulatedKey !== "id")
                {
                  let manipulatedValue = existingContactObj[manipulatedKey];
                  stateObj.children[existingContactObj.id - 1][existingContactObjKey[i]] = manipulatedValue;
                  console.log("MAtch" + matchedContact);
                }
              }
              return Object.assign({},state, {
                ...stateObj
            });
            break;
        default :
            return state;
    }  
   return state;
}

const allReducers = combineReducers({
    contactArr: Contact
})

const store = createStore(
    allReducers,
    {
        contactArr: 
        {
            "totalContact": 5,
            "children": [
                {
                    "name": "dinesh",
                    "email": "iamdinesh8@gmail.com",
                    "phno": "9976059148",
                    "company": "MNO",
                    "address": "coimbatore",
                    "id": "1"
                  },
                  {
                    "name": "kumar",
                    "email": "kumar8@gmail.com",
                    "phno": "9976087452",
                    "company": "XYZ",
                    "address": "Chennai",
                    "id": "2"
                  },
                  {
                    "name": "ABC",
                    "email": "i@gmail.com",
                    "phno": "8745210236",
                    "company": "ABC",
                    "address": "Bangalore",
                    "id": "3"
                  },
                  {
                    "name": "OPQ",
                    "email": "opw@gmail.com",
                    "phno": "8745120398",
                    "company": "PTY",
                    "address": "Mysore",
                    "id": "4"
                  },
                  {
                    "name": "JKL",
                    "email": "jkl@gmail.com",
                    "phno": "7820136987",
                    "company": "CDE",
                    "address": "Mumbai",
                    "id": "5"
                  }
            ]
        }
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store }