using APICore.Auth.DTO;
using Auth.Lib.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace APICore.Auth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private APIResponse _response;

        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;

        public AuthenticateController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
        }

        // local database sign in
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            _response = new APIResponse();

            try
            {
                // throw new Exception();

                var user = await userManager.FindByNameAsync(model.Email);
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

                    _response.ResponseCode = 200;
                    _response.ResponseMessage = "Login Success!";

                    return Ok(new
                    {
                        response = _response,
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo,
                        userName = model.Email,
                        myRole = authClaims[2].Value,
                        firstName = user.FirstName,
                        lastName = user.LastName
                    });
                }
                else
                {
                    _response.ResponseCode = 401;
                    _response.ResponseError = "Username / Password Incorrect!";
                    return Ok(new
                    {
                        response = _response,
                    });
                }
            }
            catch (Exception ex)
            {
                _response.ResponseCode = 500;
                _response.ResponseError = "Server Error!";
                return Ok(new
                {
                    response = _response,
                });
            }

        }


        // registration with role
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            _response = new APIResponse();
            try
            {
                var userExists = await userManager.FindByNameAsync(model.Email);
                if (userExists != null)
                    return StatusCode(StatusCodes.Status500InternalServerError, new APIResponse { ResponseCode = 500, ResponseError = "User already exists!" });

                ApplicationUser user = new ApplicationUser()
                {
                    Email = model.Email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName
                };

                var result = await userManager.CreateAsync(user, model.Password);
                if (!result.Succeeded)
                    return StatusCode(StatusCodes.Status500InternalServerError, new APIResponse { ResponseCode = 500, ResponseError = "User creation fails!" });

                if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
                    await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
                if (!await roleManager.RoleExistsAsync(UserRoles.Operator))
                    await roleManager.CreateAsync(new IdentityRole(UserRoles.Operator));

                await userManager.AddToRoleAsync(user, model.AppRole);
                
                _response.ResponseCode = 0;
                _response.ResponseMessage = "User created successfully!";
                _response.ResponseError = null;
            }
            catch (Exception ex)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = "Server Error!";
                _response.ResponseError = ex.Message.ToString();
            }
            return Ok(_response);
        }
    }
}
