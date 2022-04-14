namespace Laboratorio.Api.Filters
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;
    using vetcommunity.DTOs.Response;

    public class ExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
           
            context.HttpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;

            context.Result = new JsonResult(new Response
            {
                Success = false,
                Message = $"Ocurrió un error. {context.Exception.Message}",
            });

            base.OnException(context);
        }
    }
}
