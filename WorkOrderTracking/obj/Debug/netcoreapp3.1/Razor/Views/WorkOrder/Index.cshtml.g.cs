#pragma checksum "C:\MVC-JQuery\WorkOrderTracking\Views\WorkOrder\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "8c0ae096af27b8965a6ad7e5c65bc847e717f085"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_WorkOrder_Index), @"mvc.1.0.view", @"/Views/WorkOrder/Index.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\MVC-JQuery\WorkOrderTracking\Views\_ViewImports.cshtml"
using WorkOrderTracking;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\MVC-JQuery\WorkOrderTracking\Views\_ViewImports.cshtml"
using WorkOrderTracking.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"8c0ae096af27b8965a6ad7e5c65bc847e717f085", @"/Views/WorkOrder/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f45be0d4b3a1a0f535323d4294e29beb03308cee", @"/Views/_ViewImports.cshtml")]
    public class Views_WorkOrder_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "Create", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "C:\MVC-JQuery\WorkOrderTracking\Views\WorkOrder\Index.cshtml"
  
    ViewData["Title"] = "Work Order - Home Page";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<style>
    .notStarted{
        color : red;
    }
    .startRunning {
        color: blue;
    }
    .stopped {
        color: Highlight;
    }
    .completed {
        color: green;
    }
    .cantComplete {
        color: brown;
    }
</style>


<div class=""text-center"">
    <h3 class=""display-4"">Work Orders</h3>
</div>
<div>
    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8c0ae096af27b8965a6ad7e5c65bc847e717f0853893", async() => {
                WriteLiteral("Create - [Work Order]");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
</div>

<!-- this will hold partial view (modal) -->
<div id=""PlaceHolderHere""></div>

<hr />
<p></p>
<table id=""workOrdersTable""
       class=""table table-sm table-bordered table-striped""
       style=""width:100%"">
    <thead>
        <tr>
            <th>#</th>
            <th>Customer</th>
            <th>WO Start Date</th>
            <th>WO Status</th>
            <th>Status Note</th>
            <th>Actions</th>
        </tr>
    </thead>
</table>

");
            DefineSection("Scripts", async() => {
                WriteLiteral(@"
    <script type=""text/javascript"">

        $(document).ready(function () {

            var errorCode = 0;

            var PlaceHolderElement = $('#PlaceHolderHere');

            function getWOStatus(wos) {
                if (wos === 0)
                    return '<span class=""notStarted"">Not Started</span>';
                if (wos === 1)
                    return '<span class=""startRunning"">Start-Running</span>';
                if (wos === 2)
                    return '<span class=""stopped"">Stopped</span>';
                if (wos === 3)
                    return '<span class=""completed"">Completed</span>';
                if (wos === 4)
                    return '<span class=""cantComplete"">Can Not Complete</span>';
            }

            var table = $('#workOrdersTable').DataTable({
                processing: true,
                ordering: true,
                paging: true,
                searching: true,
                ajax: ""WorkOrder/GetAllWorkOrders"",
    ");
                WriteLiteral(@"            columns: [
                    { ""data"": ""workOrderId"" },
                    {
                        ""data"": ""null"", render: function (data, type, row) {//data
                            return ""<button type='button' id='btnCODetails' class='btn btn-link'>""+row.customer+""</a>"";
                        }
                    },
                    {
                        ""data"": ""workOrderStartDate"", render: function (data, type, row) {//data

                            if (row.workOrderStartDate == null) {
                                return 'No - Date';
                            } else {
                                return moment(row.workOrderStartDate).format('DD MMM, YYYY');
                            }
                        }
                    },
                    {
                        ""data"": ""workOrderStatus"", render: function (data, type, row) {//data
                            return getWOStatus(row.workOrderStatus)
                        }
 ");
                WriteLiteral(@"                   },
                    { ""data"": ""statusNote"", ""width"": ""25%"" },
                    {
                        ""data"": null, ""width"": ""25%"", ""defaultContent"": ""<button id='btnWOEdit' class='btn btn-primary'>Edit</button><span>|</span><button id='btnWODelete' class='btn btn-danger'>Delete</button><span>|</span><button id='btnOperations' class='btn btn-success'>Operations</button>""
                    },
                ],
            });

            // redirect to wo-operation page
            // get
            $('#workOrdersTable tbody').on('click', '[id*=btnOperations]', function () {
                var data = table.row($(this).parents('tr')).data();
                console.log(data);
                var workOrderId = data.workOrderId;
                console.log(workOrderId);
                var url = 'Operation\\Index\\' + workOrderId;

                window.location.href = url;

                /*
                $.get(url).done(function (data) {
               ");
                WriteLiteral(@"     console.log(data);
                });
                */
            });


            // get
            $('#workOrdersTable tbody').on('click', '[id*=btnCODetails]', function () {
                var data = table.row($(this).parents('tr')).data();
                console.log(data);
                var customerOrderId = data.customerOrderId;
                console.log(customerOrderId);
                var url = 'WorkOrder\\GetCustomerOrderDetails\\' + customerOrderId;
                $.get(url).done(function (data) {
                    // console.log(data);
                    PlaceHolderElement.html(data);
                    PlaceHolderElement.find('.modal').modal('show');
                });
            });

            // edit
            // get
            var PlaceHolderElement = $('#PlaceHolderHere');
            $('#workOrdersTable tbody').on('click', '[id*=btnWOEdit]', function () {
                var data = table.row($(this).parents('tr')).data();
                c");
                WriteLiteral(@"onsole.log(data);
                var workOrderId = data.workOrderId;
                console.log(workOrderId);
                var url = 'WorkOrder\\Edit\\' + workOrderId;
                $.get(url).done(function (data) {
                    PlaceHolderElement.html(data);
                    PlaceHolderElement.find('.modal').modal('show');
                });
            });

            // edit - delete
            // post
            PlaceHolderElement.on('click', '[data-save=""modal""]', function (event) {
                var form = $(this).parents('.modal').find('form');
                var actionUrl = form.attr('action');
                var sendData = form.serialize();
                $.post(actionUrl, sendData).done(function (response) {
                    console.log(response);
                    console.log(response.result.statusCode);
                    console.log(response.result.message);
                    var mErrors = '';
                    if (response.result.statusCod");
                WriteLiteral(@"e == 0) {
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
                        mErrors += '<font color=""red"">';
                        mErrors += response.result.message;
                        mErrors += ""<ul>"";
                        $.each(response.result.modelErrors, function (key, value) {
                            mErrors += ""<li>"" + value + ""</li>"";
                        });
                        mErrors += ""</ul></font>"";
                    }
                    else {
                        bkTimer(response.result);
 ");
                WriteLiteral(@"                       resetUI();
                    }
                    $('#opStatus').html(mErrors);
                });
            });

            // delete
            // get
            $('#workOrdersTable tbody').on('click', '[id*=btnWODelete]', function () {
                var data = table.row($(this).parents('tr')).data();
                console.log(data);
                var workOrderId = data.workOrderId;
                console.log(workOrderId);
                var url = 'WorkOrder\\GetWorkOrderForDelete\\' + workOrderId;
                $.get(url).done(function (data) {
                    // console.log(data);
                    PlaceHolderElement.html(data);
                    PlaceHolderElement.find('.modal').modal('show');
                });
            });

            // success / dal error
            function bkTimer(result) {
                var div = $(""#floater"");
                var content = '';
                if (result.statusCode == 0) {
        ");
                WriteLiteral(@"            content += '<img src=""../Images/success.png"" style = ""width:50px;height:50px;"" /> ';
                    content += '<font color=""green"">' + result.message + '</font>';
                }
                else if (result.statusCode == -1) {
                    content += '<img src=""../Images/error.png"" style = ""width:50px;height:50px;"" /> ';
                    content += '<font color=""red"">' + result.message + '</font>';
                }
                else {
                    content += '<img src=""../Images/error.png"" style = ""width:50px;height:50px;"" /> ';
                    content += '<font color=""red"">' + result.Message + '</font>';
                }
                div.html(content);
                div.fadeIn(""slow"");

                if (errorCode == 0) {
                    div.queue(function () {
                        setTimeout(function () {
                            div.dequeue();

                            PlaceHolderElement.find('.modal').modal('hide');
");
                WriteLiteral(@"
                            table.ajax.reload();

                        }, 3000);
                    });
                    div.fadeOut(""fast"");
                }
            };
            function resetUI() {
                $('#WorkOrderStartDate').val('');
                $('#WorkOrderStatus').val(0);
                $('#StatusNote').val('');
            };

        });
    </script>
");
            }
            );
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
