using System.Text.Json.Serialization;

namespace vetcommunity.DTOs.Response
{
	public class Response<T> : Response
    {
        public T Result { get; set; }
    }

    public class Response
    {
        public bool Success { get; set; } = true;

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Message { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public Dictionary<string, List<string>> Errors { get; set; } = null;
    }
}

