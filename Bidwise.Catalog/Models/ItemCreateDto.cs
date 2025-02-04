﻿namespace Bidwise.Catalog.Models;

public class ItemCreateDto
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string DoubleMetaphone { get; set; }
    public int SellerId { get; set; }
    public string SellerName { get; set; }
    public string CategoryName { get; set; }
    public double StartingBid { get; set; }
    public DateTime EndDate { get; set; }
    public IEnumerable<ImageCreateDto> Images { get; set; } = [];
}

public class ImageCreateDto
{
    public string? Label { get; set; }
    public IFormFile File { get; set; }
    public string? Name { get; set; }
}