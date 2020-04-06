using System;

namespace Contracts.Utilites
{
    public static class Utility
    {
        public static DateTime ConvertToUTC(DateTime dateTime)
        {
            TimeZoneInfo tz = TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time"); ;
            return TimeZoneInfo.ConvertTimeFromUtc(dateTime, tz);

        }
    }
}
