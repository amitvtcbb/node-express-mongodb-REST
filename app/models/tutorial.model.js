// This Mongoose Model represents tutorials collection in MongoDB database. These fields will be generated automatically for each Tutorial document: _id, title, description, published, createdAt, updatedAt, __v.

// {
//   "_id": "5e363b135036a835ac1a7da8",
//   "title": "Js Tut#",
//   "description": "Description for Tut#",
//   "published": true,
//   "createdAt": "2020-02-02T02:59:31.198Z",
//   "updatedAt": "2020-02-02T02:59:31.198Z",
//   "__v": 0
// }

//step 1: Creating model syntax ==> mongoose.model("collection name/table name", mongoose.schema)
//step 2: Export the model ==> module.exports=mongoose({mongoose.schema})
// Here combine both step 1 in step 2

module.exports = mongoose => {
    const Tutorial = mongoose.model(
        "tutorial",
        mongoose.Schema(
            {
                title: String,
                description: String,
                published: Boolean
            },
            {
                timestamps: true
            }
        )
    );
    return Tutorial;
};


// If you use this app with a front-end that needs id field instead of _id, you have to override toJSON method that map default object to a custom object. So the Mongoose model could be modified as following code:

// module.exports = mongoose => {
//   var schema = mongoose.Schema(
//     {
//       title: String,
//       description: String,
//       published: Boolean
//     },
//     { timestamps: true }
//   );

//   schema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   });

//   const Tutorial = mongoose.model("tutorial", schema);
//   return Tutorial;
// };
// And the result will look like this-

// {
//   "title": "Js Tut#",
//   "description": "Description for Tut#",
//   "published": true,
//   "createdAt": "2020-02-02T02:59:31.198Z",
//   "updatedAt": "2020-02-02T02:59:31.198Z",
//   "id": "5e363b135036a835ac1a7da8"
// }