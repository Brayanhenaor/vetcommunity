namespace vetcommunity.DTOs.Request
{
	public class PagingRequest
	{
        private int rows;
        private int page;

        public PagingRequest()
        {
            rows = 10;
            page = 1;
        }

        public int Rows
        {
            get => rows;
            set
            {
                rows = value < 1 ? 10 : value;
            }
        }

        public int Page
        {
            get => page;
            set
            {
                page = value < 1 ? 1 : value;
            }
        }
    }
}

