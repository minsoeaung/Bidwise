﻿namespace Bidwise.Catalog.Models;

public class ItemDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public double? CurrentHighestBid { get; set; }
    public string DoubleMetaphone { get; set; }
    public int SellerId { get; set; }
    public string SellerName { get; set; }
    public int? BuyerId { get; set; }
    public string? BuyerName { get; set; }

    public IEnumerable<ImageDto> Images { get; set; } = [];

    public string Status
    {
        get
        {
            if (BuyerId != null)
                return ItemsStatus.Sold.ToString();

            var timeSpan = EndDate.ToUniversalTime() - DateTime.UtcNow;

            if (timeSpan.TotalSeconds <= 0) return ItemsStatus.Expired.ToString();

            return ItemsStatus.Available.ToString();
        }
    }

    public string TimeLeft
    {
        get
        {
            var timeSpan = EndDate.ToUniversalTime() - DateTime.UtcNow;

            if (timeSpan.TotalSeconds <= 0) return ItemsStatus.Expired.ToString();

            if (timeSpan.TotalDays >= 1)
                return $"{(int)timeSpan.TotalDays} Day{(timeSpan.TotalDays >= 2 ? "s" : "")}";

            if (timeSpan.TotalHours >= 1)
                return $"{(int)timeSpan.TotalHours} Hour{(timeSpan.TotalHours >= 2 ? "s" : "")}";

            return $"{(int)timeSpan.TotalMinutes} Minute{(timeSpan.TotalMinutes >= 2 ? "s" : "")}";
        }
    }
}