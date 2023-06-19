// This function takes a database name and an object store name as parameters, opens a connection to the specified IndexedDB database using indexedDB.open(), and creates an object store with a keyPath of "id" if it doesn't already exist. It returns a promise that resolves with the database instance when the connection is successful, or rejects with an error when there is an error.

function openDatabase(databaseName, objectStoreName) {
  const request = indexedDB.open(databaseName);
  request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore(objectStoreName, { keyPath: "id" });
  };
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}



// This function takes a database instance, an object store name, and a data object as parameters, creates a transaction with a write mode using db.transaction(), retrieves the specified object store using transaction.objectStore(), and stores the data object in the object store using objectStore.put(). It is an asynchronous function that returns a promise that resolves when the data is successfully stored.

async function saveData(db, objectStoreName, data) {
  const transaction = db.transaction(objectStoreName, "readwrite");
  const objectStore = transaction.objectStore(objectStoreName);
  await objectStore.put(data);
}


// This function takes a database instance and an object store name as parameters, creates a transaction with a read mode using db.transaction(), retrieves the specified object store using transaction.objectStore(), opens a cursor to iterate over all the data in the object store using objectStore.openCursor(), and returns an array of all the data objects. It is an asynchronous function that returns a promise that resolves with the array of data objects.

async function getData(db, objectStoreName) {
  const transaction = db.transaction(objectStoreName, "readonly");
  const objectStore = transaction.objectStore(objectStoreName);
  const cursorRequest = objectStore.openCursor();
  const items = [];
  cursorRequest.onsuccess = function(event) {
    const cursor = event.target.result;
    if (cursor) {
      items.push(cursor.value);
      cursor.continue();
    }
  };
  await transaction.complete;
  return items;
}


// This function takes a database instance, an object store name, and a data object as parameters, retrieves the existing data from the specified object store using getData(), generates a new ID for the data object based on the last ID in the array, adds the ID property to the data object, and stores the data object in the object store using saveData(). It is an asynchronous function that returns a promise that resolves when the data is successfully stored.

async function createData(db, objectStoreName, data) {
  const items = await getData(db, objectStoreName);
  const lastId = items.length > 0 ? items[items.length - 1].id : 0;
  data.id = lastId + 1;
  await saveData(db, objectStoreName, data);
}

// This function takes a database instance, an object store name, an ID of the data object to update, and an object containing the updated data as parameters. It creates a transaction with a write mode using `db.transaction()`, retrieves the specified object store using `transaction.objectStore()`, retrieves the data object with the specified ID using `objectStore.get()`, updates the data object with the new data if it exists, and stores the updated data object in the object store using `objectStore.put()`. It is an asynchronous function that returns a promise that resolves when the data is successfully updated.


async function updateData(db, objectStoreName, id, newData) {
  const transaction = db.transaction(objectStoreName, "readwrite");
  const objectStore = transaction.object

store(objectStoreName);
const request = objectStore.get(id);
request.onsuccess = function(event) {
const data = event.target.result;
if (data) {
const updatedData = { ...data, ...newData };
objectStore.put(updatedData);
}
};
await transaction.complete;
}



// This function takes a database instance, an object store name, and an ID of the data object to delete as parameters. It creates a transaction with a write mode using `db.transaction()`, retrieves the specified object store using `transaction.objectStore()`, deletes the data object with the specified ID using `objectStore.delete()`, and completes the transaction using `transaction.complete`. It is an asynchronous function that returns a promise that resolves when the data is successfully deleted.


async function deleteData(db, objectStoreName, id) {
const transaction = db.transaction(objectStoreName, "readwrite");
const objectStore = transaction.objectStore(objectStoreName);
objectStore.delete(id);
await transaction.complete;
}


// This function takes a database instance, an object store name, and a search keyword as parameters. It retrieves all the data from the specified object store using `getData()`, filters the data objects based on whether any of their values contain the search keyword using `Array.filter()`, and returns an array of the filtered data objects. It is an asynchronous function that returns a promise that resolves with the array of filtered data objects.

async function searchData(db, objectStoreName, keyword) {
const items = await getData(db, objectStoreName);
const filteredItems = items.filter(item => {
return Object.values(item).some(value =>
String(value).toLowerCase().includes(keyword.toLowerCase())
);
});
return filteredItems;
}
