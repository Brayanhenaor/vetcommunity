using System;
using System.Text.Json.Serialization;

namespace vetcommunity.DTOs.Response
{
	public class Response<T>
	{
        public bool Success { get; set; } = true;

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Message { get; set; }

        public T Result { get; set; }
    }
}

