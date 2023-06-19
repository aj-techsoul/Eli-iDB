# Eli-iDB Plugin

Eli-iDB is a lightweight JavaScript plugin that simplifies working with IndexedDB, a client-side storage mechanism for web applications. This plugin provides a set of functions to perform common operations such as creating a database, adding data, retrieving data, updating data, and deleting data.

## Features

- Easy integration with your JavaScript projects.
- Simplifies the usage of IndexedDB with a streamlined API.
- Provides functions for common operations like adding, retrieving, updating, and deleting data.
- Promises-based approach for asynchronous operations.

## Installation

You can include the Eli-iDB plugin in your project by adding the following script tag to your HTML file:

```html
<script src="https://cdn.jsdelivr.net/gh/aj-techsoul/Eli-iDB@main/eliidb.js"></script>
```

## Usage

To use the Eli-iDB plugin, follow these steps:

1. Create a new instance of the EliDB class:

   ```javascript
   const eliDB = new EliDB(databaseName, objectStoreName);
   ```

   Replace `databaseName` with the desired name for your IndexedDB database and `objectStoreName` with the name of the object store you want to work with, similar like `table` under database.

2. Use the available methods to perform operations on the database:

   - **Adding data:**

     ```javascript
     eliDB.addData(data);
     ```

     Replace `data` with an object containing the data to be added.

   - **Retrieving data:**

     ```javascript
     eliDB.getData().then(data => {
       // Handle retrieved data
     });
     ```

     Use the `then` method to access the retrieved data.

   - **Updating data:**

     ```javascript
     eliDB.updateData(id, newData);
     ```

     Replace `id` with the ID of the data object to be updated and `newData` with an object containing the updated data.

   - **Deleting data:**

     ```javascript
     eliDB.deleteData(id);
     ```

     Replace `id` with the ID of the data object to be deleted.

## Example

Here's an example that demonstrates how to use the Eli-iDB plugin to add data to an IndexedDB database:

```javascript
const databaseName = 'myDatabase';
const objectStoreName = 'tblname';
const data = {
  name: 'Ajay',
  email: 'techsoul4@gmail.com',
  phone: '9862542983'
};

const eliDB = new EliDB(databaseName, objectStoreName);
eliDB.addData(data)
  .then(() => {
    console.log('Data added successfully');
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
```

Make sure to replace `myDatabase` with the desired name for your database and `myObjectStore` with the name of the object store you want to use.

## Contributions

Contributions to the Eli-iDB plugin are welcome! If you have any suggestions, bug reports, or feature requests, please feel free to submit an issue or pull request on [GitHub](https://github.com/aj-techsoul/Eli-iDB).

## License

This project is licensed under the [MIT License](LICENSE).

## Credits

Eli-iDB is developed and maintained by [AJ-TechSoul](https://github.com/aj-techsoul) www.techsoul.in
