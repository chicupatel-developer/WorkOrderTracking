#pragma checksum "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "f660c3b4603572497a40794bd11835bc3f5a2831"
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
#line 1 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\_ViewImports.cshtml"
using MVCCore.Auth;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\_ViewImports.cshtml"
using MVCCore.Auth.Models;

#line default
#line hidden
#nullable disable
#nullable restore
#line 1 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
using EF.Core.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f660c3b4603572497a40794bd11835bc3f5a2831", @"/Views/Operation/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"bac839b09ebec20598a531d11fe4a085c8ec9251", @"/Views/_ViewImports.cshtml")]
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
#line 4 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
  
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

    .titleSpan {
        background-color: lightgoldenrodyellow;
        color: red;
    }

    .notStarted {
        color: red;
    }

    .startRunning {
        color: blue;
    }

    .pauseRunning {
        color: mediumpurple;
        border: 2px solid red;
    }

    .completed {
        color: green;
    }

    .cantComplete {
        color: brown;
    }
   
    .serverError {
        color: red;
        font-size: x-large;
    }
</style>

<div class=""text-center"">
    <h3 class=""display-6"">Work Order --&gt;&gt; <span class=""titleSpan""><u>[Operations]</u></span></h3>
</div>
<p></p>

");
#nullable restore
#line 65 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
 if (Model != null)
{



#line default
#line hidden
#nullable disable
            WriteLiteral("    <div class=\"headerDiv\">\r\n        <div class=\"text-center\">\r\n");
#nullable restore
#line 71 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
              
                if (Model.Count() > 0)
                {

#line default
#line hidden
#nullable disable
            WriteLiteral("                    <span class=\"haveOperation\">Work Order # ");
#nullable restore
#line 74 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                                                        Write(Model.FirstOrDefault().WorkOrderId);

#line default
#line hidden
#nullable disable
            WriteLiteral("</span>\r\n");
#nullable restore
#line 75 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                }
                else
                {

#line default
#line hidden
#nullable disable
            WriteLiteral("                    <span class=\"zeroOperation\">Work Order # ");
#nullable restore
#line 78 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                                                        Write(ViewBag.SelectedWorkOrderId);

#line default
#line hidden
#nullable disable
            WriteLiteral(" has NO Operation !</span>\r\n");
#nullable restore
#line 79 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                }
            

#line default
#line hidden
#nullable disable
            WriteLiteral("        </div>\r\n        <div class=\"text-center\">\r\n");
#nullable restore
#line 83 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
              
                if (ViewBag.Customer != null)
                {

#line default
#line hidden
#nullable disable
            WriteLiteral("                    <span class=\"customer\">Customer : ");
#nullable restore
#line 86 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                                                 Write(ViewBag.Customer);

#line default
#line hidden
#nullable disable
            WriteLiteral("</span>\r\n");
#nullable restore
#line 87 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                }
                else
                {

#line default
#line hidden
#nullable disable
            WriteLiteral("                    <span class=\"zeroOperation\">Customer : N/A</span>\r\n");
#nullable restore
#line 91 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                }
            

#line default
#line hidden
#nullable disable
            WriteLiteral("        </div>\r\n    </div>\r\n    <p></p>\r\n");
            WriteLiteral("    <div>\r\n        ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f660c3b4603572497a40794bd11835bc3f5a28317766", async() => {
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
            WriteLiteral("\r\n    </div>\r\n");
            WriteLiteral("    <!-- this will hold partial view (modal) -->\r\n    <div id=\"PlaceHolderHere\"></div>\r\n");
            WriteLiteral(@"    <p></p>
    <table class=""table"" id=""operationsTable"">
        <thead>
            <tr>
                <th>
                    #
                </th>
                <th>
                    Operation
                </th>
                <th>
                    QTY
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
#line 132 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
             foreach (var item in Model)
            {

#line default
#line hidden
#nullable disable
            WriteLiteral("            <tr>\r\n");
#nullable restore
#line 135 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                 if (item.OpQTYDone >= item.OpQTYRequired)
                {

#line default
#line hidden
#nullable disable
            WriteLiteral("                    <td>\r\n                        <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\r\n                        ");
#nullable restore
#line 139 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                   Write(Html.DisplayFor(modelItem => item.OperationId));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                    </td>\r\n");
#nullable restore
#line 141 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                }
                else
                {

#line default
#line hidden
#nullable disable
            WriteLiteral("                    <td>\r\n                        ");
#nullable restore
#line 145 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                   Write(Html.DisplayFor(modelItem => item.OperationId));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                    </td>\r\n");
#nullable restore
#line 147 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                }

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n\r\n");
#nullable restore
#line 150 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                  
                    var opNumber = "";
                    if (item.OperationNumber == (int)OperationNumber.Spindle)
                    {
                        opNumber = "Spindle - 10";
                    }
                    if (item.OperationNumber == (int)OperationNumber.Hub_Single_Head)
                    {
                        opNumber = "Hub_Single_Head - 20";
                    }
                    if (item.OperationNumber == (int)OperationNumber.Hub_Double_Head)
                    {
                        opNumber = "Hub_Double_Head - 30";
                    }
                    if (item.OperationNumber == (int)OperationNumber.Push_Cups)
                    {
                        opNumber = "Push_Cups - 40";
                    }
                    if (item.OperationNumber == (int)OperationNumber.Assembly_Spindle_Hub)
                    {
                        opNumber = "Assembly_Spindle_Hub - 50";
                    }
                    if (item.OperationNumber == (int)OperationNumber.Paint)
                    {
                        opNumber = "Paint - 60";
                    }
                    if (item.OperationNumber == (int)OperationNumber.Packaging)
                    {
                        opNumber = "Packaging - 70";
                    }
                    if (item.OperationNumber == (int)OperationNumber.Rework_Spindle)
                    {
                        opNumber = "Rework_Spindle - 80";
                    }
                    if (item.OperationNumber == (int)OperationNumber.Rework_Hub)
                    {
                        opNumber = "Rework_Hub - 90";
                    }
                

#line default
#line hidden
#nullable disable
            WriteLiteral("                <td>\r\n                    ");
#nullable restore
#line 190 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
               Write(opNumber);

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                    <br />\r\n                    <span");
            BeginWriteAttribute("class", " class=\"", 5464, "\"", 5522, 1);
#nullable restore
#line 192 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
WriteAttributeValue("", 5472, GetClassFromOperationStatus(item.OperationStatus), 5472, 50, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(">\r\n                        ");
#nullable restore
#line 193 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                   Write(Html.DisplayFor(modelItem => item.OperationStatus));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                    </span>\r\n                </td>\r\n\r\n\r\n");
#nullable restore
#line 198 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                  
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
            WriteLiteral("                <!--\r\n                <td>\r\n                    <div>\r\n                        ");
#nullable restore
#line 212 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                   Write(opdetails);

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                    </div>\r\n                </td>\r\n                -->\r\n\r\n                <td>\r\n                    <span>\r\n                        Req : ");
#nullable restore
#line 219 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                         Write(Html.DisplayFor(modelItem => item.OpQTYRequired));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                    </span>\r\n                    <br />\r\n                    <span>\r\n                        Done : ");
#nullable restore
#line 223 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                          Write(Html.DisplayFor(modelItem => item.OpQTYDone));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                    </span>\r\n                </td>\r\n\r\n");
#nullable restore
#line 227 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                  
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
#line 239 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
               Write(opdate);

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                </td>\r\n\r\n                <td>\r\n                    <button");
            BeginWriteAttribute("id", " id=\"", 7032, "\"", 7054, 1);
#nullable restore
#line 243 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
WriteAttributeValue("", 7037, item.OperationId, 7037, 17, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("\r\n                            class=\'btn btn-primary opEdit\'>\r\n                        <i class=\"fa fa-edit fa-lg\" aria-hidden=\"true\"></i>\r\n\r\n                    </button>\r\n\r\n                    <button");
            BeginWriteAttribute("id", " id=\"", 7257, "\"", 7279, 1);
#nullable restore
#line 249 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
WriteAttributeValue("", 7262, item.OperationId, 7262, 17, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            BeginWriteAttribute("opNumber", "\r\n                            opNumber=\"", 7280, "\"", 7329, 1);
#nullable restore
#line 250 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
WriteAttributeValue("", 7320, opNumber, 7320, 9, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("\r\n                            class=\'btn btn-success assignPart\'>\r\n                        Parts\r\n                        <i class=\"fa fa-tasks\" aria-hidden=\"true\"></i>\r\n                    </button>\r\n                    <button");
            BeginWriteAttribute("id", " id=\"", 7558, "\"", 7580, 1);
#nullable restore
#line 255 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
WriteAttributeValue("", 7563, item.OperationId, 7563, 17, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            BeginWriteAttribute("opNumber", "\r\n                            opNumber=\"", 7581, "\"", 7630, 1);
#nullable restore
#line 256 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
WriteAttributeValue("", 7621, opNumber, 7621, 9, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("\r\n                            class=\'btn btn-success viewPartHistory\'>\r\n                        Parts\r\n                        <i class=\"fa fa-history\" aria-hidden=\"true\"></i>\r\n                    </button>\r\n                    <button");
            BeginWriteAttribute("id", " id=\"", 7866, "\"", 7888, 1);
#nullable restore
#line 261 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
WriteAttributeValue("", 7871, item.OperationId, 7871, 17, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            BeginWriteAttribute("opNumber", "\r\n                            opNumber=\"", 7889, "\"", 7938, 1);
#nullable restore
#line 262 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
WriteAttributeValue("", 7929, opNumber, 7929, 9, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(@"
                            class='btn btn-info viewOperationLog'>
                        Operation Log
                        <i class=""fa fa-sitemap"" aria-hidden=""true""></i>
                    </button>
                </td>
            </tr>
");
#nullable restore
#line 269 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
            }

#line default
#line hidden
#nullable disable
            WriteLiteral("        </tbody>\r\n    </table>\r\n");
#nullable restore
#line 272 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
}
else
{

#line default
#line hidden
#nullable disable
            WriteLiteral("    <div class=\"container serverError\">\r\n        Server Error !\r\n    </div>\r\n");
#nullable restore
#line 278 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
}

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n\r\n");
            DefineSection("Scripts", async() => {
                WriteLiteral(@"
    <script type=""text/javascript"">

        $(document).ready(function () {

            var PlaceHolderElement = $('#PlaceHolderHere');

            var errorCode = 0;

            // get
            // operation log from operationid
            // ");
                WriteLiteral("@db table : OperatorActivities\r\n            $(\'.viewOperationLog\').click(function () {\r\n                var operationId = $(this).attr(\"id\");\r\n                console.log(operationId);\r\n\r\n                var url = \'");
#nullable restore
#line 297 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                      Write(Url.Action("GetOperationLogData", "Operation"));

#line default
#line hidden
#nullable disable
                WriteLiteral(@"' + '\\' + operationId;
                $.get(url).done(function (data) {
                    PlaceHolderElement.html(data);
                    PlaceHolderElement.find('.modal').modal('show');
                });
            });



            // get
            // all part(s) history from operationid
            $('.viewPartHistory').click(function () {
                var operationId = $(this).attr(""id"");
                console.log(operationId);

                var url = '");
#nullable restore
#line 312 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                      Write(Url.Action("GetPartHistory", "Part"));

#line default
#line hidden
#nullable disable
                WriteLiteral(@"' + '\\' + operationId;
                $.get(url).done(function (data) {
                    PlaceHolderElement.html(data);
                    PlaceHolderElement.find('.modal').modal('show');
                });
            });



            // assign parts for operation
            // get
            $('.assignPart').click(function () {
                var operationId = $(this).attr(""id"");
                console.log(operationId);

                var opNumber = $(this).attr(""opNumber"");
                console.log(opNumber);


                var url = '");
#nullable restore
#line 331 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
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
            // assign parts for operation
            // post
            PlaceHolderElement.on('click', '.xferPartOp', function (event) {
                var form = $(this).parents('.modal').find('form');
                var actionUrl = form.attr('action');
                var sendData = form.serialize();

                var url = '");
#nullable restore
#line 344 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                      Write(Url.Action("XferPartsForOperation", "Operation"));

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

            // edit
            // get
            $('.opEdit').click(function () {
                var operationId = $(this).attr(""id"");
                console.log(operationId);

                var url = '");
#nullable restore
#line 386 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
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
#line 400 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
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
#nullable restore
#line 106 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
               
        public string GetClassFromOperationStatus(OperationStatus opStatus)
        {
            return opStatus == OperationStatus.Not_Started ? "notStarted" : opStatus == OperationStatus.Start_Running ? "startRunning" : opStatus == OperationStatus.Pause_Running ? "pauseRunning" : opStatus == OperationStatus.Completed ? "completed" : "cantComplete";
        }
    

#line default
#line hidden
#nullable disable
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
