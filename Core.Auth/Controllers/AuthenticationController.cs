using Core.Auth.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Core.Auth.Authentication;
using Core.Auth.AuthDTO;

namespace Core.Auth.Controllers
{
    public class AuthenticationController : Controller
    {
        private readonly ILogger<AuthenticationController> _logger;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;

        public AuthenticationController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, ILogger<AuthenticationController> logger)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


        // local database sign in
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginModel model)
        {
            OperationResult retData = new OperationResult();
            try
            {
                // check for 500
                // throw new Exception();

                if (ModelState.IsValid)
                {
                    var user = await userManager.FindByNameAsync(model.Username);
                    if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
                    {
                        var userRoles = await userManager.GetRolesAsync(user);

                        var authClaims = new List<Claim>
                        {
                            new Claim(ClaimTypes.Name, user.UserName),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        };

                        foreach (var userRole in userRoles)
                        {
                            authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                        }

                        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                        var token = new JwtSecurityToken(
                            issuer: _configuration["JWT:ValidIssuer"],
                            audience: _configuration["JWT:ValidAudience"],
                            expires: DateTime.Now.AddHours(3),
                            // expires: DateTime.UtcNow.AddSeconds(8),
                            claims: authClaims,
                            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                            );

                        retData.Message = "Login Success !";
                        retData.ModelErrors = new List<string>();
                        retData.StatusCode = 0;
                        retData.Token = new JwtSecurityTokenHandler().WriteToken(token);                        
                        retData.Username = model.Username;
                        retData.MyRole = authClaims[2].Value;
                    }
                    else
                    {
                        retData.Message = "Username / Password Incorrect !";
                        retData.ModelErrors = new List<string>();
                        retData.StatusCode = -1;                     
                    }
                }
                else
                {
                    retData.Message = "Model is NOT Valid !";
                    retData.StatusCode = 1;
                    retData.ModelErrors = new List<string>();
                    foreach (var modelState in ViewData.ModelState.Values)
                    {
                        foreach (var error in modelState.Errors)
                        {
                            string mError = error.ErrorMessage.ToString();
                            retData.ModelErrors.Add(mError);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                retData.Message = "Server Error !";
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;                
            }
            return Json(new { Result = retData });
        }


        // registration with role
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            Response _response = new Response();
            try
            {
                // check for 500: Exception
                // throw new Exception();

                if (ModelState.IsValid)
                {
                    var userExists = await userManager.FindByNameAsync(model.Username);
                    if (userExists != null)
                        return StatusCode(StatusCodes.Status500InternalServerError, new Response { ResponseCode = 500, ResponseMessage = "User already exists!" });

                    ApplicationUser user = new ApplicationUser()
                    {
                        Email = model.Email,
                        SecurityStamp = Guid.NewGuid().ToString(),
                        UserName = model.Username
                    };

                    var result = await userManager.CreateAsync(user, model.Password);
                    if (!result.Succeeded)
                        return StatusCode(StatusCodes.Status500InternalServerError, new Response { ResponseCode = 500, ResponseMessage = "User creation failed!" });

                    if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
                        await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
                    if (!await roleManager.RoleExistsAsync(UserRoles.Operator))
                        await roleManager.CreateAsync(new IdentityRole(UserRoles.Operator));
                  
                    await userManager.AddToRoleAsync(user, model.MyRole);

                    _response.ResponseCode = 200;
                    _response.ResponseMessage = "User created successfully!";
                    return Ok(_response);
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                /*
                _response.ResponseCode = 500;
                _response.ResponseMessage = "Server Error!";
                */
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { ResponseCode = 500, ResponseMessage = "Server Error!" });
            }
        }



    }
}
