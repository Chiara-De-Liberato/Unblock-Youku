var unblock_youku_lite = {};  // namespace
unblock_youku_lite.ip_addr  = "220.181.111.";
unblock_youku_lite.ip_addr += Math.floor(Math.random() * 254 + 1); // 1 ~ 254
console.log('faked ip addr: ' + unblock_youku_lite.ip_addr);

chrome.webRequest.onBeforeSendHeaders.addListener(
    // callback function
    function(details) {
        details.requestHeaders.push({
            name: "X-Forwarded-For",
            value: unblock_youku_lite.ip_addr
        });

        return {requestHeaders: details.requestHeaders};
    },

    // url filters
    {
        urls: [
            "http://*.youku.com/*",
            "http://*.tudou.com/*",
            "http://tudou.letv.com/*",
            "http://*.tudou.letv.com/*",
            "http://*.xiami.com/*",
            "http://*.ku6.com/*",
            "http://*.xunlei.com/*"
        ]
    },

    // extraInfoSpec
    // the request is blocked until the callback function returns
    ["requestHeaders", "blocking"]);
