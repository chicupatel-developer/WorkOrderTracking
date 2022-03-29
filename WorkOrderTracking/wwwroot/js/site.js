// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {
    $('#example').DataTable({
        processing: true,
        ordering: true,
        paging: true,
        searching: true,
        ajax: "Part/GetParts",
        columns: [
            { "data": "partId" },
            { "data": "name" },
            { "data": "desc" },
        ]
    });




});