## Eli-iDB Plugin Documentation

Eli-iDB is a lightweight JavaScript plugin that simplifies the usage of IndexedDB, a client-side database system. It provides a set of functions to perform common database operations, such as creating and managing object stores, storing and retrieving data objects, updating and deleting data, and searching for specific data objects.

### Installation

You can include the Eli-iDB plugin in your project by using the following CDN link:

```html
<script src="https://cdn.jsdelivr.net/gh/aj-techsoul/Eli-iDB@main/eliidb.js"></script>
```

### Usage

The Eli-iDB plugin provides the following functions:

#### `openDatabase(databaseName, objectTable)`

This function opens a connection to the specified IndexedDB database and creates an object table if it doesn't already exist. It returns a promise that resolves with the database instance when the connection is successful, or rejects with an error when there is an error.

```javascript
openDatabase(databaseName, objectTable)
  .then(db => {
    // Database connection successful, perform operations
  })
  .catch(error => {
    // Error occurred while opening the database
  });
```

#### `saveData(db, objectTable, data)`

This function stores the provided data object in the specified object table of the database. It creates a write transaction, retrieves the object table, and uses `objectStore.put()` to store the data. It returns a promise that resolves when the data is successfully stored.

```javascript
saveData(db, objectTable, data)
  .then(() => {
    // Data stored successfully
  })
  .catch(error => {
    // Error occurred while storing the data
  });
```

#### `getData(db, objectTable)`

This function retrieves all the data objects from the specified object table of the database. It creates a read transaction, retrieves the object table, and iterates over the data using a cursor. It returns a promise that resolves with an array of all the data objects.

```javascript
getData(db, objectTable)
  .then(data => {
    // Use the retrieved data objects
  })
  .catch(error => {
    // Error occurred while retrieving the data
  });
```

#### `createData(db, objectTable, data)`

This function retrieves the existing data from the specified object table, generates a new ID for the data object, adds the ID property to the data object, and stores it in the object table using `saveData()`. It returns a promise that resolves when the data is successfully stored.

```javascript
createData(db, objectTable, data)
  .then(() => {
    // Data created and stored successfully
  })
  .catch(error => {
    // Error occurred while creating or storing the data
  });
```

#### `updateData(db, objectTable, id, newData)`

This function retrieves a data object with the specified ID from the object table, updates it with the new data, and stores the updated data object in the object table. It returns a promise that resolves when the data is successfully updated.

```javascript
updateData(db, objectTable, id, newData)
  .then(() => {
    // Data updated successfully
  })
  .catch(error => {
    // Error occurred while updating the data
  });
```

#### `deleteData(db, objectTable, id)`

This function deletes the data object with the specified ID from the object table. It returns a promise that resolves when the data is successfully deleted.

```javascript
deleteData(db, objectTable, id)
  .then(() => {
    // Data deleted successfully
  })
  .catch(error => {
    // Error occurred while deleting the data
  });
``


#### Example
Example Use Case: Managing a collection of books
Open the database and create an object table named "books"
```javascript
openDatabase("library", "books")
  .then(db => {
    // Data objects for testing
    const book1 = { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" };
    const book2 = { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" };
    const book3 = { id: 3, title: "1984", author: "George Orwell" };

    // Store data objects in the "books" object table
    saveData(db, "books", book1)
      .then(() => console.log("Book 1 stored successfully"))
      .catch(error => console.error("Error storing Book 1:", error));

    saveData(db, "books", book2)
      .then(() => console.log("Book 2 stored successfully"))
      .catch(error => console.error("Error storing Book 2:", error));

    saveData(db, "books", book3)
      .then(() => console.log("Book 3 stored successfully"))
      .catch(error => console.error("Error storing Book 3:", error));

    // Retrieve all data objects from the "books" object table
    getData(db, "books")
      .then(data => {
        console.log("Retrieved books:", data);
        // Output: Retrieved books: [book1, book2, book3]
      })
      .catch(error => console.error("Error retrieving books:", error));

    // Create a new book and store it in the "books" object table
    const newBook = { title: "Pride and Prejudice", author: "Jane Austen" };
    createData(db, "books", newBook)
      .then(() => console.log("New book created and stored successfully"))
      .catch(error => console.error("Error creating and storing new book:", error));

    // Update the title of a book with ID 1
    const updatedData = { title: "The Great Gatsby (Updated)" };
    updateData(db, "books", 1, updatedData)
      .then(() => console.log("Book updated successfully"))
      .catch(error => console.error("Error updating book:", error));

    // Delete a book with ID 3
    deleteData(db, "books", 3)
      .then(() => console.log("Book deleted successfully"))
      .catch(error => console.error("Error deleting book:", error));
  })
  .catch(error => console.error("Error opening database:", error));
```
