// middleware/isBot.js

// Map bot name to regular expression used to detect them based
// on their user-agent
const knownBotsToPattern = new Map([
  ['Headless Chrome', /HeadlessChrome/],
  ['Wget', /[wW]get/],
  ['Python urllib', /Python\-urllib/],
  ['PHP crawl', /phpcrawl/],
  ['PhantomJS', /PhantomJS/]
]);

// Detect if an incoming request belongs to a bot using its user agent
function isKnownBotUserAgent(userAgent) {
  for (const [knownBot, pattern] of knownBotsToPattern.entries()) {
      if (userAgent.match(pattern)) {
          return {
              isBot: true,
              // In case the request comes from a bot,
              // we also returns the name of the bot
              nameBot: knownBot
          }
      }
  }

  return {
      isBot: false
  }
}

module.exports = function isBot(req, res, next) {
  // We enrich the incoming request object (req)
  // with information regarding bot detection
  req.botInfo = isKnownBotUserAgent(req.header('User-Agent'));
  next();
}