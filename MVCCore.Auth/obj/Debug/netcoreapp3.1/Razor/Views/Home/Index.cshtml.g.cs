#pragma checksum "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Home\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "fc17dc36ab4cf1af76cd2434554ebf0f0007653c"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Index), @"mvc.1.0.view", @"/Views/Home/Index.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"fc17dc36ab4cf1af76cd2434554ebf0f0007653c", @"/Views/Home/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"bac839b09ebec20598a531d11fe4a085c8ec9251", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "C:\WorkOrder-Tracking-jQuery\MVCCore.Auth\Views\Home\Index.cshtml"
  
    ViewData["Title"] = "Home Page";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<style>
    .header{
        color: blue;
        font-size : large;
        text-decoration: underline;
        padding-bottom : 10px;
    }
</style>

<div class=""container"">
    <div class=""row"">
        <div class=""col-sm-6"">
            <div class=""panel panel-default"">
                <div class=""panel-heading text-center header"">Login</div>
                <div class=""panel-body"">
                    <ul>
                        <li>
                            Authenticated User can Login with System
                        </li>
                        <li>
                            After Successful Authentication,,, Token, User, Role and other informations are returned to client and saved in browser's session
                        </li>
                        <li>
                            As per User's Role,,, User is redirected in either [Admin] Area or [Operator] Area
                        </li>
                    </ul>
                </div>
            </di");
            WriteLiteral(@"v>
        </div>
        <div class=""col-sm-6"">
            <div class=""panel panel-default"">
                <div class=""panel-heading text-center header"">Register</div>
                <div class=""panel-body"">
                    <ul>
                        <li>
                            User can Register either as Admin or Operator Role
                        </li>
                        <li>
                            After Successful Registration,,, as per User's Role,,, User is redirected in either [Admin] Area or [Operator] Area
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class=""row"">
        <div class=""col-sm-6"">
            <div class=""panel panel-default"">
                <div class=""panel-heading text-center header"">Role : Admin</div>
                <div class=""panel-body"">
                    <ul>
                        <li>
                            Parts
                ");
            WriteLiteral(@"            <ul>
                                <li>
                                    View - Filter List of Parts (jQuery DataTable)
                                </li>
                                <li>
                                    Add / Edit / Delete - Part
                                </li>
                                <li>
                                    Add / Edit - Part Image
                                </li>
                            </ul>
                        </li>
                        <li>
                            Customer-Orders
                            <ul>
                                <li>
                                    View - Filter List of Customer Orders (jQuery DataTable)
                                </li>
                                <li>
                                    Add / Edit / Delete - Customer Order
                                </li>
                                <li>
                               ");
            WriteLiteral(@"     View Customer Order Progress Report Data
                                    <ul>
                                        <li>
                                            View Customer Order v/s Operations Progress Chart (google chart api)
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            Work-Orders
                            <ul>
                                <li>
                                    View - Filter List of Work Orders (jQuery DataTable)
                                </li>
                                <li>
                                    Add / Edit / Delete - Work Order
                                </li>
                                <li>
                                    View Customer Order Details
                                </li>
                   ");
            WriteLiteral(@"             <li>
                                    View List of Operations Connected with Work Order
                                    <br />
                                    <span><u>Operations</u></span>
                                    <br />
                                    <ul>
                                        <li>

                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class=""col-sm-6"">
            <div class=""panel panel-default"">
                <div class=""panel-heading text-center header"">Role : Operator</div>
                <div class=""panel-body"">
                    <ul>
                       
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
");
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
