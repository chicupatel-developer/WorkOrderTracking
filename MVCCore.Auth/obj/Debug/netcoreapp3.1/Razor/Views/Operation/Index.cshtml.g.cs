#pragma checksum "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "b097e1bdd91c21dec50e8cae55f450f4cdcc24e8"
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
#line 1 "C:\MVC-JQuery\MVCCore.Auth\Views\_ViewImports.cshtml"
using MVCCore.Auth;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\MVC-JQuery\MVCCore.Auth\Views\_ViewImports.cshtml"
using MVCCore.Auth.Models;

#line default
#line hidden
#nullable disable
#nullable restore
#line 1 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
using EF.Core.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b097e1bdd91c21dec50e8cae55f450f4cdcc24e8", @"/Views/Operation/Index.cshtml")]
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
#line 4 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
  
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
</style>

<div class=""text-center"">
    <h3 class=""display-6"">Work Order --&gt;&gt; <span class=""titleSpan""><u>[Operations]</u></span></h3>
</div>
<p></p>

<div class=""headerDiv"">
    <div class=""text-center"">
");
#nullable restore
#line 62 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
          
            if (Model.Count() > 0)
            {

#line default
#line hidden
#nullable disable
            WriteLiteral("                <span class=\"haveOperation\">Work Order # ");
#nullable restore
#line 65 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                                                    Write(Model.FirstOrDefault().WorkOrderId);

#line default
#line hidden
#nullable disable
            WriteLiteral("</span>\r\n");
#nullable restore
#line 66 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
            }
            else
            {

#line default
#line hidden
#nullable disable
            WriteLiteral("                <span class=\"zeroOperation\">Work Order # ");
#nullable restore
#line 69 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                                                    Write(ViewBag.SelectedWorkOrderId);

#line default
#line hidden
#nullable disable
            WriteLiteral(" has NO Operation !</span>\r\n");
#nullable restore
#line 70 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
            }
        

#line default
#line hidden
#nullable disable
            WriteLiteral("    </div>\r\n    <div class=\"text-center\">\r\n");
#nullable restore
#line 74 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
          
            if (ViewBag.Customer != null)
            {

#line default
#line hidden
#nullable disable
            WriteLiteral("                <span class=\"customer\">Customer : ");
#nullable restore
#line 77 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                                             Write(ViewBag.Customer);

#line default
#line hidden
#nullable disable
            WriteLiteral("</span>\r\n");
#nullable restore
#line 78 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
            }
            else
            {

#line default
#line hidden
#nullable disable
            WriteLiteral("                <span class=\"zeroOperation\">Customer : N/A</span>\r\n");
#nullable restore
#line 82 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
            }
        

#line default
#line hidden
#nullable disable
            WriteLiteral("    </div>\r\n</div>\r\n<p></p>\r\n\r\n\r\n<div>\r\n    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "b097e1bdd91c21dec50e8cae55f450f4cdcc24e87108", async() => {
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
            WriteLiteral("\r\n</div>\r\n\r\n<!-- this will hold partial view (modal) -->\r\n<div id=\"PlaceHolderHere\"></div>\r\n\r\n\r\n");
            WriteLiteral(@"<p></p>
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
            <th>
                OP End Date
            </th>
            <th></th>
        </tr>
    </thead>
    <tbody>
");
#nullable restore
#line 126 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
         foreach (var item in Model)
        {

#line default
#line hidden
#nullable disable
            WriteLiteral("        <tr>\r\n            <td>\r\n                ");
#nullable restore
#line 130 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
           Write(Html.DisplayFor(modelItem => item.OperationId));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n            </td>\r\n\r\n\r\n");
#nullable restore
#line 134 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
              
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
            WriteLiteral("            <td>\r\n                ");
#nullable restore
#line 174 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
           Write(opNumber);

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                <br />\r\n                <span");
            BeginWriteAttribute("class", " class=\"", 4625, "\"", 4683, 1);
#nullable restore
#line 176 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
WriteAttributeValue("", 4633, GetClassFromOperationStatus(item.OperationStatus), 4633, 50, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(">\r\n                    ");
#nullable restore
#line 177 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
               Write(Html.DisplayFor(modelItem => item.OperationStatus));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                </span>\r\n            </td>\r\n\r\n\r\n");
#nullable restore
#line 182 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
              
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
            WriteLiteral("            <td>\r\n                <!-- ");
#nullable restore
#line 194 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                Write(opdetails);

#line default
#line hidden
#nullable disable
            WriteLiteral(" -->\r\n                <span>\r\n                    Req : ");
#nullable restore
#line 196 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                     Write(Html.DisplayFor(modelItem => item.OpQTYRequired));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                </span>\r\n                <br />\r\n                <span>\r\n                    Done : ");
#nullable restore
#line 200 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
                      Write(Html.DisplayFor(modelItem => item.OpQTYDone));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                </span>                \r\n            </td>\r\n         \r\n\r\n            <!--\r\n    <td class=\"");
#nullable restore
#line 206 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
          Write(GetClassFromOperationStatus(item.OperationStatus));

#line default
#line hidden
#nullable disable
            WriteLiteral("\">\r\n        ");
#nullable restore
#line 207 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
   Write(Html.DisplayFor(modelItem => item.OperationStatus));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n        <br />\r\n        ");
#nullable restore
#line 209 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
   Write(opNumber);

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </td>\r\n        -->\r\n\r\n\r\n");
#nullable restore
#line 214 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
              
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
            WriteLiteral("            <td>\r\n                ");
#nullable restore
#line 226 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
           Write(opdate);

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n            </td>\r\n\r\n");
#nullable restore
#line 229 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
              
                var opEdate = "";
                if (item.OperationEndDate != null)
                {
                    opEdate = item.OperationEndDate.Value.ToShortDateString();
                }
                else
                {
                    opEdate = "N/A";
                }
            

#line default
#line hidden
#nullable disable
            WriteLiteral("            <td>\r\n                ");
#nullable restore
#line 241 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
           Write(opEdate);

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n            </td>\r\n\r\n            <td>\r\n                <button");
            BeginWriteAttribute("id", " id=\"", 6530, "\"", 6552, 1);
#nullable restore
#line 245 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
WriteAttributeValue("", 6535, item.OperationId, 6535, 17, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("\r\n                        class=\'btn btn-primary opEdit\'>\r\n                    Edit\r\n                </button>\r\n\r\n                <button");
            BeginWriteAttribute("id", " id=\"", 6690, "\"", 6712, 1);
#nullable restore
#line 250 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
WriteAttributeValue("", 6695, item.OperationId, 6695, 17, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            BeginWriteAttribute("opNumber", "\r\n                        opNumber=\"", 6713, "\"", 6758, 1);
#nullable restore
#line 251 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
WriteAttributeValue("", 6749, opNumber, 6749, 9, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("\r\n                        class=\'btn btn-success assignPart\'>\r\n                    Assign Parts\r\n                </button>\r\n                <button");
            BeginWriteAttribute("id", " id=\"", 6906, "\"", 6928, 1);
#nullable restore
#line 255 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
WriteAttributeValue("", 6911, item.OperationId, 6911, 17, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            BeginWriteAttribute("opNumber", "\r\n                        opNumber=\"", 6929, "\"", 6974, 1);
#nullable restore
#line 256 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
WriteAttributeValue("", 6965, opNumber, 6965, 9, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("\r\n                        class=\'btn btn-info viewPartHistory\'>\r\n                    Parts History\r\n                </button>\r\n            </td>\r\n        </tr>\r\n");
#nullable restore
#line 262 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
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

            // get
            // all part(s) history from operationid
            $('.viewPartHistory').click(function () {
                var operationId = $(this).attr(""id"");
                console.log(operationId);

                var url = '");
#nullable restore
#line 283 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
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
#line 302 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
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
#line 315 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
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
#line 357 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
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
#line 371 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
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
#line 97 "C:\MVC-JQuery\MVCCore.Auth\Views\Operation\Index.cshtml"
           
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