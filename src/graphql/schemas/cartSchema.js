const cartTypeDefs = 
` type Cart {
    title: String,

  }`

  {
    
    "userID": {
      "$oid": "64f48d83a485456d736c0785"
    },
    "__v": { "$numberInt": "0" },
    "addedAt": {
      "$date": { "$numberLong": "1693850315749" }
    },
    "items": [
      {
        "product": {
          "productID": {
            "$oid": "64d8812d1944dc8a654230a8"
          }
        },
        "quantity": { "$numberInt": "4" },
        "discount": { "$numberInt": "0" },
        "_id": {
          "$oid": "64f61accd0eeb370dd895eb4"
        }
      },
      {
        "product": {
          "productID": {
            "$oid": "64d8a0cbf77b23daa46b8924"
          }
        },
        "quantity": { "$numberInt": "94" },
        "discount": { "$numberInt": "0" },
        "_id": {
          "$oid": "64f6ced9bb9a13aae14c4658"
        }
      },
      {
        "product": {
          "productID": {
            "$oid": "64d88ad23dd7635f839bb860"
          }
        },
        "quantity": { "$numberInt": "400" },
        "discount": { "$numberInt": "34" },
        "_id": {
          "$oid": "64f6ee678c5175c567e81530"
        }
      }
    ]
  }