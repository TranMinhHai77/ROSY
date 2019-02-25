using System;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Dta.Marketplace.Subscribers.Slack.Model;
using Dta.Marketplace.Subscribers.Slack.Services;


namespace Dta.Marketplace.Subscribers.Slack.Processors {
    internal class ApplicationMessageProcessor : AbstractMessageProcessor {
        private readonly ISlackService _slackService;
        public ApplicationMessageProcessor(ILogger<AppService> logger, IOptions<AppConfig> config, ISlackService slackService) : base(logger, config) {
            _slackService = slackService;
        }

        public async override Task<bool> Process(AwsSnsMessage awsSnsMessage) {
            switch (awsSnsMessage.MessageAttributes.EventType.Value) {
                case "created":
                    var definition = new {
                        supplier_code = -1,
                        name = "",
                        email_address = "",
                        application_type = "",
                        application = new {
                            id = -1,
                            name = "",
                            status = ""
                        }
                    };
                    var message = JsonConvert.DeserializeAnonymousType(awsSnsMessage.Message, definition);
                    string subject = null;
                    if (message.application_type == "edit") {
                        subject = "An existing seller has started a new application";
                    } else if (message.application_type == "new") {
                        subject = "A new seller has started an application";
                    }
                    if (string.IsNullOrEmpty(subject) == false) {
                        var slackMessage =
$@"*{subject}*
Application Id: {message.application.id}
{message.name} ({message.email_address})";

                        return await _slackService.SendSlackMessage(_config.Value.SUPPLIER_SLACK_URL, slackMessage);
                    } else {
                        _logger.LogWarning($"No enough for slack. {awsSnsMessage.MessageAttributes.ObjectType.Value} {awsSnsMessage.MessageAttributes.EventType.Value}");
                    }
                    break;
                default:
                    _logger.LogInformation($"Unknown message. {awsSnsMessage.MessageAttributes.ObjectType.Value} {awsSnsMessage.MessageAttributes.EventType.Value}");
                    break;
            }
            return true;
        }
    }
}
