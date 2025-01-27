var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.Bidwise_ApiGateway>("api-gateway");
builder.AddProject<Projects.Bidwise_Identity>("identity-service");
builder.AddProject<Projects.Bidwise_Catalog>("catalog-service");
builder.AddProject<Projects.Bidwise_WebClient>("web-mvc");
//builder.AddProject<Projects.Bidwise_React_Bff>("web-spa");

builder.AddProject<Projects.Bidwise_Bids>("bidwise-bids");
//builder.AddProject<Projects.Bidwise_React_Bff>("web-spa");

builder.Build().Run();
