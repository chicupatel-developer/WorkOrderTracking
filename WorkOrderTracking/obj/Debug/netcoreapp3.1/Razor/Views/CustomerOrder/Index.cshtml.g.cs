#pragma checksum "C:\MVC-JQuery\WorkOrderTracking\Views\CustomerOrder\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "32fb5b3cf87c40e8689d03c11ceb845d52e5d351"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_CustomerOrder_Index), @"mvc.1.0.view", @"/Views/CustomerOrder/Index.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"32fb5b3cf87c40e8689d03c11ceb845d52e5d351", @"/Views/CustomerOrder/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f45be0d4b3a1a0f535323d4294e29beb03308cee", @"/Views/_ViewImports.cshtml")]
    public class Views_CustomerOrder_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
#line 1 "C:\MVC-JQuery\WorkOrderTracking\Views\CustomerOrder\Index.cshtml"
  
    ViewData["Title"] = "Customer Order - Home Page";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n<div class=\"text-center\">\r\n    <h3 class=\"display-4\">Customer Orders</h3>\r\n</div>\r\n<div>\r\n    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "32fb5b3cf87c40e8689d03c11ceb845d52e5d3513665", async() => {
                WriteLiteral("Create - [Customer Order]");
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
<table id=""customerOrdersTable"" 
       class=""table table-sm table-bordered table-striped"" 
       style=""width:100%"">
    <thead>
        <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Product</th>
            <th>QTY</th>
            <th>Order Date</th>
            <th>Due Date</th>
            <th>Actions</th>
        </tr>
    </thead>
</table>

");
            DefineSection("Scripts", async() => {
                WriteLiteral(@"
    <script type=""text/javascript"">
        var editor;

        $(document).ready(function () {

            $('#floater').hide();

            var table = $('#customerOrdersTable').DataTable({
                processing: true,
                ordering: true,
                paging: true,
                searching: true,
                ajax: ""CustomerOrder/GetAllCustomerOrders"",
                columns: [
                    { ""data"": ""customerOrderId"" },
                    { ""data"": ""customerName"" },
                    { ""data"": ""productName"" },
                    { ""data"": ""orderQuantity"" },
                    {
                        ""data"": ""orderDate"", render: function (data, type, row) {//data
                            return moment(row.orderDate).format('DD MMM, YYYY');
                        }
                    },
                    {
                        ""data"": ""orderDueDate"", render: function (data, type, row) {//data
                            return mom");
                WriteLiteral(@"ent(row.orderDueDate).format('DD MMM, YYYY');
                        }
                    },
                    {
                        ""data"": null, ""defaultContent"": ""<button id='btnCOEdit' class='btn btn-primary'>Edit</button><span>|</span><button id='btnCODelete' class='btn btn-danger'>Delete</button>""
                    },
                ],
            });


            // edit
            // get
            var PlaceHolderElement = $('#PlaceHolderHere');
            $('#customerOrdersTable tbody').on('click', '[id*=btnCOEdit]', function () {
                var data = table.row($(this).parents('tr')).data();
                console.log(data);
                var customerOrderId = data.customerOrderId;
                console.log(customerOrderId);
                var url = 'CustomerOrder\\Edit\\' + customerOrderId;
                $.get(url).done(function (data) {
                    PlaceHolderElement.html(data);
                    PlaceHolderElement.find('.modal').modal('sh");
                WriteLiteral(@"ow');
                });
            });

            // delete
            // get
            $('#customerOrdersTable tbody').on('click', '[id*=btnCODelete]', function () {
                var data = table.row($(this).parents('tr')).data();
                console.log(data);
                var customerOrderId = data.customerOrderId;
                console.log(customerOrderId);
                var url = 'CustomerOrder\\GetCustomerOrderForDelete\\' + customerOrderId;
                $.get(url).done(function (data) {
                    // console.log(data);
                    PlaceHolderElement.html(data);
                    PlaceHolderElement.find('.modal').modal('show');
                });
            });

            // edit - delete
            // post
            PlaceHolderElement.on('click', '[data-save=""modal""]', function (event) {
                var form = $(this).parents('.modal').find('form');
                var actionUrl = form.attr('action');
                var sen");
                WriteLiteral(@"dData = form.serialize();
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
                        mErrors += '<font color=""red"">';
                        mErrors += response.result.message;
                        mErrors += ""<ul>"";
                        $.each(response.result.modelErrors, function (key, value) {
                      ");
                WriteLiteral(@"      mErrors += ""<li>"" + value + ""</li>"";
                        });
                        mErrors += ""</ul></font>"";
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
                var div = $(""#floater"");
                var content = '';
                if (result.statusCode == 0) {
                    content += '<img src=""../Images/success.png"" style = ""width:50px;height:50px;"" /> ';
                    content += '<font color=""green"">' + result.message + '</font>';
                }
                else if (result.statusCode == -1) {
                    content += '<img src=""../Images/error.png"" style = ""width:50px;height:50px;"" /> ';
                    content += '<font color=""red"">' + result.message + '</font>'");
                WriteLiteral(@";
                }
                else {
                    content += '<img src=""../Images/error.png"" style = ""width:50px;height:50px;"" /> ';
                    content += '<font color=""red"">' + result.Message + '</font>';
                }
                div.html(content);
                div.fadeIn(""slow"");
                div.queue(function () {
                    setTimeout(function () {
                        div.dequeue();

                        PlaceHolderElement.find('.modal').modal('hide');

                        table.ajax.reload();

                    }, 3000);
                });
                div.fadeOut(""fast"");
            };
            function resetUI() {
                $('#CustomerName').val('');
                $('#ProductName').val('');
                $('#ProductDesc').val('');
                $('#OrderQuantity').val('');
                $('#OrderDate').val('');
                $('#OrderDueDate').val('');
            };
        });
    </scrip");
                WriteLiteral("t>\r\n");
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
