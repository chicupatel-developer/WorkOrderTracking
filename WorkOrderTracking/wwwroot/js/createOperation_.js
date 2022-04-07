$(document).ready(function () {

    $('#floater').hide();

    // disable some of the controls
    $('#OperationStartDate').prop('readonly', true);
    $('#OperationStatus').prop('disabled', true);


    $('.createOP').click(function () {

        var form = $('#opCreateForm');
        // var actionUrl = form.attr('asp-action');
        var actionUrl = 'Create';
        var sendData = form.serialize();

        $.post(actionUrl, sendData).done(function (response) {
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
        }).fail(function (error) {
            alert("Ajax Call Error");
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
            }, 3000);
        });
        div.fadeOut("fast");
    };

    function resetUI() {
        $('#OperationNumber').val(10);
        $('#Details').val('');
        $('#OperationStatus').val(0);        
    };
});