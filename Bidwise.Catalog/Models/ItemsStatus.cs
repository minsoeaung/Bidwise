﻿using System.Text.Json.Serialization;

namespace Bidwise.Catalog.Models;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum ItemsStatus
{
    All,
    Available,
    Sold,
    Expired,
    Ended 
}
