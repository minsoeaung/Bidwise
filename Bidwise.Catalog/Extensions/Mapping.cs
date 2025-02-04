﻿using Bidwise.Catalog.Entities;
using Bidwise.Catalog.Models;

namespace Bidwise.Catalog.Extensions;

public static class Mapping
{
    public static IQueryable<ItemListDto> MapItemsToDto(this IQueryable<Item> items)
    {
        return items.Select(i => new ItemListDto
        {
            Id = i.Id,
            Name = i.Name,
            StartDate = i.StartDate,
            EndDate = i.EndDate,
            DoubleMetaphone = i.DoubleMetaphone,
            CurrentHighestBid = i.CurrentHighestBid,
            Description = i.Description,
            BuyerId = i.BuyerId,
            BuyerName = i.BuyerName,
            SellerId = i.SellerId,
            SellerName = i.SellerName
        });
    }
}
