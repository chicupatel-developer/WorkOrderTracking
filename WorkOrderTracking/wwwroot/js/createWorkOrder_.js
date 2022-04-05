$(document).ready(function () {

    $('#floater').hide();

    $('.createWO').click(function () {      

        var form = $('#coCreateForm');
        var actionUrl = form.attr('asp-action');
        var sendData = form.serialize();
        // console.log(sendData);

        console.log($('#CustomerOrders').val() + " : " + $('#CustomerOrders :selected').text());

        sendData += 'customerOrderId=' + $('#CustomerOrders').val();
        console.log(sendData);

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

});