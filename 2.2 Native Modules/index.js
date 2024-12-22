const fs = require("fs");

// fs.writeFile("test.txt", "hello how are you? \n" + new Date(), (err) => {
//     if (err) throw err;

//     console.log("File Saved successfully!!");
// });


fs.readFile("test.txt", "utf-8", (err, data) => {
    if (err) throw err;

    console.log(data);
});