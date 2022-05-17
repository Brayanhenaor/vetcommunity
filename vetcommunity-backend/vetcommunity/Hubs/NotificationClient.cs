using System;
namespace vetcommunity.Hubs
{
	public interface INotificationClient
	{
		Task RefreshNotifications();
	}
}

