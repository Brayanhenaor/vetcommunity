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

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public Dictionary<string, List<string>> Errors { get; set; } = null;
    }

    public class PagingResponse<T> : Response<T>
    {
        public int Page { get; set; }
        public int TotalRecords { get; set; }
        public int TotalPages { get; set; }
    }
}

