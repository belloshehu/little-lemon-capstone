import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon.db");

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        try {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS menus (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, price NUMERIC NOT NULL, description TEXT NOT NULL, image TEXT, category TEXT NOT NULL);"
          );
        } catch (error) {
          console.log("FAILED TO CREATE TABLE: " + error);
        }
      },
      reject,
      resolve
    );
  });
}

export async function truncateTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        try {
          tx.executeSql("TRUNCATE TABLE menus;");
        } catch (error) {
          console.log("FAILED TO DELETE TABLE DATA:  " + error);
        }
      },
      reject,
      resolve
    );
  });
}
export async function deleteTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        try {
          tx.executeSql("DROP TABLE menus;");
        } catch (error) {
          console.log("FAILED TO DELETE TABLE:  " + error);
        }
      },
      reject,
      resolve
    );
  });
}
export async function getMenuItems() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      try {
        tx.executeSql("SELECT * FROM menus;", [], (_, { rows }) => {
          resolve(rows._array);
        });
      } catch (error) {
        console.log("FAILED TO FETCH MENU: " + error);
        reject(error);
      }
    });
  });
}

export function transformMenuImageUrl(items) {
  const transformedMenuItems = items.map((item) => ({
    ...item,
    image: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
  }));
  return transformedMenuItems;
}

export function insertMenuItem({ name, price, description, image, category }) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      try {
        tx.executeSql(
          "INSERT INTO menus (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)",
          [name, price, description, image, category]
        );
        resolve({ name, price, description, image, category });
      } catch (error) {
        console.log("FAILED TO SAVE ITEM: " + error);
        reject(error);
      }
    });
  });
}

export async function saveMenuItems(menuItems) {
  // 2. Implement a single SQL statement to save all menu data in a table called menuitems.
  // Check the createTable() function above to see all the different columns the table has
  // Hint: You need a SQL statement to insert multiple rows at once.
  try {
    for (const item of menuItems) {
      await insertMenuItem(item);
    }
  } catch (error) {
    console.log("FAILED TO SAVE MENUS: ", error);
  }
}

/**
 * 4. Implement a transaction that executes a SQL statement to filter the menu by 2 criteria:
 * a query string and a list of categories.
 *
 * The query string should be matched against the menu item titles to see if it's a substring.
 * For example, if there are 4 items in the database with titles: 'pizza, 'pasta', 'french fries' and 'salad'
 * the query 'a' should return 'pizza' 'pasta' and 'salad', but not 'french fries'
 * since the latter does not contain any 'a' substring anywhere in the sequence of characters.
 *
 * The activeCategories parameter represents an array of selected 'categories' from the filter component
 * All results should belong to an active category to be retrieved.
 * For instance, if 'pizza' and 'pasta' belong to the 'Main Dishes' category and 'french fries' and 'salad' to the 'Sides' category,
 * a value of ['Main Dishes'] for active categories should return  only'pizza' and 'pasta'
 *
 * Finally, the SQL statement must support filtering by both criteria at the same time.
 * That means if the query is 'a' and the active category 'Main Dishes', the SQL statement should return only 'pizza' and 'pasta'
 * 'french fries' is excluded because it's part of a different category and 'salad' is excluded due to the same reason,
 * even though the query 'a' it's a substring of 'salad', so the combination of the two filters should be linked with the AND keyword
 *
 */

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      let qStr = "?";
      activeCategories.forEach((category) => {
        qStr += ",?";
      });
      const sqlStatement =
        `SELECT * FROM menus WHERE name LIKE "%${query}%" and category IN (` +
        qStr +
        ");";
      tx.executeSql(sqlStatement, [...activeCategories], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}
