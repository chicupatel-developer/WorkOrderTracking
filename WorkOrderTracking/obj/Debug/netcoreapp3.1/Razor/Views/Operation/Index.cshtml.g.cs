#pragma checksum "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "a3f1a77353c19eb1f8fcde1e7f869da5cd081b4d"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Operation_Index), @"mvc.1.0.view", @"/Views/Operation/Index.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"a3f1a77353c19eb1f8fcde1e7f869da5cd081b4d", @"/Views/Operation/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f45be0d4b3a1a0f535323d4294e29beb03308cee", @"/Views/_ViewImports.cshtml")]
    public class Views_Operation_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<IEnumerable<EF.Core.Models.Operation>>
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
            WriteLiteral("\r\n");
#nullable restore
#line 3 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
  
    ViewData["Title"] = "Work Order - Operations Home Page";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<style>
    .headerDiv {
        border: 2px solid black;
    }

    .zeroOperation {
        color: red;
        font-size: large;
    }

    .haveOperation {
        color: blue;
        font-size: x-large;
    }

    .customer {
        color: blue;
        font-size: x-large;
    }
</style>

<div class=""text-center"">
    <h3 class=""display-4"">Work Order - Operations</h3>
</div>
<p></p>

<div class=""headerDiv"">
    <div class=""text-center"">
");
#nullable restore
#line 35 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
          
            if (Model.Count() > 0)
            {

#line default
#line hidden
#nullable disable
            WriteLiteral("                <span class=\"haveOperation\">Work Order # ");
#nullable restore
#line 38 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
                                                    Write(Model.FirstOrDefault().WorkOrderId);

#line default
#line hidden
#nullable disable
            WriteLiteral("</span>\r\n");
#nullable restore
#line 39 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
            }
            else
            {

#line default
#line hidden
#nullable disable
            WriteLiteral("                <span class=\"zeroOperation\">Work Order # ");
#nullable restore
#line 42 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
                                                    Write(ViewBag.SelectedWorkOrderId);

#line default
#line hidden
#nullable disable
            WriteLiteral(" has NO Operation !</span>\r\n");
#nullable restore
#line 43 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
            }
        

#line default
#line hidden
#nullable disable
            WriteLiteral("    </div>\r\n    <div class=\"text-center\">\r\n");
#nullable restore
#line 47 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
          
            if (ViewBag.Customer != null)
            {

#line default
#line hidden
#nullable disable
            WriteLiteral("                <span class=\"customer\">Customer : ");
#nullable restore
#line 50 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
                                             Write(ViewBag.Customer);

#line default
#line hidden
#nullable disable
            WriteLiteral("</span>\r\n");
#nullable restore
#line 51 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
            }
            else
            {

#line default
#line hidden
#nullable disable
            WriteLiteral("                <span class=\"zeroOperation\">Customer : N/A</span>\r\n");
#nullable restore
#line 55 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
            }
        

#line default
#line hidden
#nullable disable
            WriteLiteral("    </div>\r\n</div>\r\n<p></p>\r\n\r\n\r\n<div>\r\n    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "a3f1a77353c19eb1f8fcde1e7f869da5cd081b4d6580", async() => {
                WriteLiteral("Create - [Work Order - Operation]");
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

<p></p>
<table class=""table"" id=""operationsTable"">
    <thead>
        <tr>
            <th>
                #
            </th>
            <th>
                OP
            </th>
            <th>
                OP Details
            </th>
            <th>
                OP Status
            </th>
            <th>
                OP Start Date
            </th>
            <th></th>
        </tr>
    </thead>
    <tbody>
");
#nullable restore
#line 92 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
         foreach (var item in Model)
        {

#line default
#line hidden
#nullable disable
            WriteLiteral("            <tr>\r\n                <td>\r\n                    ");
#nullable restore
#line 96 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
               Write(Html.DisplayFor(modelItem => item.OperationId));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                </td>\r\n\r\n\r\n");
#nullable restore
#line 100 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
                  
                    var opNumber = "";
                    if (item.OperationNumber == (int)10)
                    {
                        opNumber = "Spindle - 10";
                    }
                    if (item.OperationNumber == (int)20)
                    {
                        opNumber = "Hub_Single_Head - 20";
                    }
                    if (item.OperationNumber == 30)
                    {
                        opNumber = "Hub_Double_Head - 30";
                    }
                    if (item.OperationNumber == 40)
                    {
                        opNumber = "Push_Cups - 40";
                    }
                    if (item.OperationNumber == 50)
                    {
                        opNumber = "Assembly_Spindle_Hub - 50";
                    }
                    if (item.OperationNumber == 60)
                    {
                        opNumber = "Paint - 60";
                    }
                    if (item.OperationNumber == 70)
                    {
                        opNumber = "Packaging - 70";
                    }
                    if (item.OperationNumber == 80)
                    {
                        opNumber = "Rework_Spindle - 80";
                    }
                    if (item.OperationNumber == 90)
                    {
                        opNumber = "Rework_Hub - 90";
                    }
                

#line default
#line hidden
#nullable disable
            WriteLiteral("                <td>\r\n                    ");
#nullable restore
#line 140 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
               Write(opNumber);

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                </td>\r\n\r\n\r\n");
#nullable restore
#line 144 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
                  
                    var opdetails = "";
                    if (item.Details != null)
                    {
                        opdetails = item.Details;
                    }
                    else
                    {
                        opdetails = "N/A";
                    }
                

#line default
#line hidden
#nullable disable
            WriteLiteral("                <td>\r\n                    ");
#nullable restore
#line 156 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
               Write(opdetails);

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                </td>\r\n\r\n                <td>\r\n                    ");
#nullable restore
#line 160 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
               Write(Html.DisplayFor(modelItem => item.OperationStatus));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                </td>\r\n\r\n");
#nullable restore
#line 163 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
                  
                    var opdate = "";
                    if (item.OperationStartDate != null)
                    {
                        opdate = item.OperationStartDate.Value.ToShortDateString();
                    }
                    else
                    {
                        opdate = "N/A";
                    }
                

#line default
#line hidden
#nullable disable
            WriteLiteral("                <td>\r\n                    ");
#nullable restore
#line 175 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
               Write(opdate);

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                </td>\r\n\r\n                <td>\r\n                    <button");
            BeginWriteAttribute("id", " id=\"", 4726, "\"", 4748, 1);
#nullable restore
#line 179 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
WriteAttributeValue("", 4731, item.OperationId, 4731, 17, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("\r\n                            class=\'btn btn-primary opEdit\'>\r\n                        Edit\r\n                    </button>\r\n\r\n                    <button");
            BeginWriteAttribute("id", " id=\"", 4902, "\"", 4924, 1);
#nullable restore
#line 184 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
WriteAttributeValue("", 4907, item.OperationId, 4907, 17, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("\r\n                            class=\'btn btn-success assignPart\'>\r\n                        Assign Parts\r\n                    </button>\r\n                </td>\r\n            </tr>\r\n");
#nullable restore
#line 190 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
        }

#line default
#line hidden
#nullable disable
            WriteLiteral("    </tbody>\r\n</table>\r\n\r\n\r\n\r\n");
            DefineSection("Scripts", async() => {
                WriteLiteral(@"
    <script type=""text/javascript"">

        $(document).ready(function () {

            var PlaceHolderElement = $('#PlaceHolderHere');

            var errorCode = 0;

            // assign parts for operation
            // get
            $('.assignPart').click(function () {
                var operationId = $(this).attr(""id"");
                console.log(operationId);

                var url = '");
#nullable restore
#line 211 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
                      Write(Url.Action("XferPartsForOperation", "Operation"));

#line default
#line hidden
#nullable disable
                WriteLiteral(@"' + '\\' + operationId;
                $.get(url).done(function (data) {
                    PlaceHolderElement.html(data);
                    PlaceHolderElement.find('.modal').modal('show');
                });
            });

            // edit
            // get
            $('.opEdit').click(function () {
                var operationId = $(this).attr(""id"");
                console.log(operationId);

                var url = '");
#nullable restore
#line 224 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
                      Write(Url.Action("Edit", "Operation"));

#line default
#line hidden
#nullable disable
                WriteLiteral(@"' + '\\' + operationId;
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

                var url = '");
#nullable restore
#line 238 "C:\MVC-JQuery\WorkOrderTracking\Views\Operation\Index.cshtml"
                      Write(Url.Action("Edit", "Operation"));

#line default
#line hidden
#nullable disable
                WriteLiteral(@"';

                $.post(url, sendData).done(function (response) {
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
                        mErrors += '<font color=""red"">';
                        mErrors += response.result.message;
                        mErrors += ""<ul>"";
          ");
                WriteLiteral(@"              $.each(response.result.modelErrors, function (key, value) {
                            mErrors += ""<li>"" + value + ""</li>"";
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
                    content += '<img src=""../../Images/success.png"" style = ""width:50px;height:50px;"" /> ';
                    content += '<font color=""green"">' + result.message + '</font>';
                }
                else if (result.statusCode == -1) {
                    content += '<img src=""../../Images/error.png"" style = ""width:50p");
                WriteLiteral(@"x;height:50px;"" /> ';
                    content += '<font color=""red"">' + result.message + '</font>';
                }
                else {
                    content += '<img src=""../../Images/error.png"" style = ""width:50px;height:50px;"" /> ';
                    content += '<font color=""red"">' + result.Message + '</font>';
                }
                div.html(content);
                div.fadeIn(""slow"");

                if (errorCode == 0) {
                    div.queue(function () {
                        setTimeout(function () {
                            div.dequeue();

                            PlaceHolderElement.find('.modal').modal('hide');
                            window.location.reload(true);

                        }, 3000);
                    });
                    div.fadeOut(""fast"");
                }
                else {

                }
            };
            function resetUI() {
                $('#Details').val('');
                ");
                WriteLiteral("$(\'#OperationStatus\').val(0);\r\n                $(\'#OperationStartDate\').val(\'\');\r\n            };\r\n        });\r\n    </script>\r\n");
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
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<IEnumerable<EF.Core.Models.Operation>> Html { get; private set; }
    }
}
#pragma warning restore 1591
