# gridpane-slack2email
A collection of scripts to have GridPane Slack Notifications go to Email

# Requirements
* Able to process GridPane slack webhook POST's
* Can use more than one transactional email API's, no SMTP support at this time.
* Generates a log that rolls 30 days (maybe)
* Allow for specifying multiple emails.

# Solutions
The following are solutions to get GridPane Slack Notications to go to Emails

## 1. Cloudflare Workers
The easiest solution would be to use a Cloudflare worker, since it can be deployed with point and click. Here are some resource.s

* Sending email with Cloudflare Workers - https://blog.cloudflare.com/sending-email-from-workers-with-mailchannels/
* Using the Postmark API - https://postmarkapp.com/developer/api/email-api

## 2. PHP Code
Selfhost a PHP script, locate a PHP library or framework that supports multiple transactional email services.


# Email Providers to Support
The following providers will be supported. Create an issue if you want a provider to be supported.

* Postmark - https://postmarkapp.com/developer/api/email-api
