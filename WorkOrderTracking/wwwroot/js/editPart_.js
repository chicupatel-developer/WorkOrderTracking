// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {

    $('#floater').hide();
       

    
    PlaceHolderElement.on('click', '[data-save="modal"]', function (event) {
        var form = $(this).parents('.modal').find('form');
        var actionUrl = form.attr('action');
        var sendData = form.serialize();
        $.post(actionUrl, sendData).done(function (response) {
            // PlaceHolderElement.find('.modal').modal('hide');
            console.log(response);
            console.log(response.result.statusCode);
            console.log(response.result.message);

            var mErrors = '';
            if (response.result.statusCode == 0) {
                bkTimer(response.result);
                resetUI();
            }
            else if (response.result.statusCode == -1) {
                bkTimer(response.result);
                resetUI();
            }
            else if (response.result.statusCode == 1) {
                // model error
                mErrors += '<font color="red">';
                mErrors += response.result.message;
                mErrors += "<ul>";
                $.each(response.result.modelErrors, function (key, value) {
                    mErrors += "<li>" + value + "</li>";
                });
                mErrors += "</ul></font>";
            }
            else {
                bkTimer(response.result);
                resetUI();
            }
            $('#opStatus').html(mErrors);
        });
    });

    // success / dal error
    function bkTimer(result) {
        var div = $("#floater");
        var content = '';
        if (result.statusCode == 0) {
            content += '<img src="../Images/success.png" style = "width:50px;height:50px;" /> ';
            content += '<font color="green">' + result.message + '</font>';
        }
        else if (result.statusCode == -1) {
            content += '<img src="../Images/error.png" style = "width:50px;height:50px;" /> ';
            content += '<font color="red">' + result.message + '</font>';
        }
        else {
            content += '<img src="../Images/error.png" style = "width:50px;height:50px;" /> ';
            content += '<font color="red">' + result.Message + '</font>';
        }
        div.html(content);
        div.fadeIn("slow");
        div.queue(function () {
            setTimeout(function () {
                div.dequeue();

                PlaceHolderElement.find('.modal').modal('hide');
            }, 3000);
        });
        div.fadeOut("fast");
    };

    function resetUI() {
        $('#Name').val('');
        $('#Desc').val('');
    };


});
