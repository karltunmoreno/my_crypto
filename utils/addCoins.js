const require = require(node - require);
const express= require('express');
const app = express();
let currentUser;

app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    currentUser = res.locals.user;
    next()
})
console.log(currentUser);



$("#insertRow").on("click", function (event) {
    event.preventDefault();

    var newRow = $("<tr>");
    var cols = '';

    // Table columns
    cols += '<th scrope="row">' + counter + '</th>';
    cols += '<td><input class="form-control rounded-0" type="text" name="firstname" placeholder="First name"></td>';
    cols += '<td><input class="form-control rounded-0" type="text" name="lastname" placeholder="Last name"></td>';
    cols += '<td><input class="form-control rounded-0" type="text" name="handle" placeholder="Handle"></td>';
    cols += '<td><button class="btn btn-danger rounded-0" id ="deleteRow"><i class="fa fa-trash"></i></button</td>';

    // Insert the columns inside a row
    newRow.append(cols);

    // Insert the row inside a table
    $("table").append(newRow);

    // Increase counter after each row insertion
    counter++;
});

// Remove row when delete btn is clicked
$("table").on("click", "#deleteRow", function (event) {
    $(this).closest("tr").remove();
    counter -= 1
});