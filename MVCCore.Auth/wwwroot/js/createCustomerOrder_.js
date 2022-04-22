$(document).ready(function () {

    var errorCode = 0;

    $('#floater').hide();

    $('.createCustomerOrder').click(function () {

        var orderDate = $('#OrderDate').val();
        if (checkDate(orderDate))
            console.log('order date OK!');
        else
            orderDate = null;

        var orderDueDate = $('#OrderDueDate').val();
        if (checkDate(orderDueDate))
            console.log('order - due date OK!');
        else
            orderDueDate = null;

        var form = $('#customerOrderCreateForm');
        var actionUrl = form.attr('asp-action');
        var sendData = form.serialize();
        console.log(sendData);
        $.post(actionUrl, sendData).done(function (response) {
            console.log(response);
            console.log(response.result.statusCode);
            console.log(response.result.message);

            var mErrors = '';
            if (response.result.statusCode == 0) {
                errorCode = 0;
                bkTimer(response.result);
                resetUI();
            }
            else if (response.result.statusCode == -1) {
                errorCode = -1;
                bkTimer(response.result);
                // resetUI();
            }
            else if (response.result.statusCode == 1) {
                errorCode = 1;
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

        /*
        var ajaxPage = "/CustomerOrder/Create";
        $.ajax({
            type: "POST",
            url: ajaxPage,
            data: JSON.stringify({
                customerName: $('#CustomerName').val(),
                productName: $('#ProductName').val(),
                productDesc: $('#ProductDesc').val(),
                orderQuantity: parseInt($('#OrderQuantity').val()),
                // orderDate: $('#OrderDate').val(),
                // orderDueDate: $('#OrderDueDate').val(),
                orderDate: orderDate,
                orderDueDate: orderDueDate,
            }),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (response) {
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
            },
            error: function (obj) {
                alert("Ajax Call Error");
            },
        });
        */
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

        if (errorCode == 0) {
            console.log('error code = 0');
            div.queue(function () {
                setTimeout(function () {
                    div.dequeue();
                }, 3000);
            });
            div.fadeOut("fast");
        }      
    };

    function resetUI() {
        $('#CustomerName').val('');
        $('#ProductName').val('');
        $('#ProductDesc').val('');
        $('#OrderQuantity').val('');
        $('#OrderDate').val('');
        $('#OrderDueDate').val('');
    };

    function checkDate(myDate) {
        if (myDate == '')
            // console.log('enter order date!');
            return false;
        else
            // console.log(myDate);
            return true;
    }

});