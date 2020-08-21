const got = require('got');
const cheerio = require('cheerio');
const schedule = require('node-schedule');

function getProductName(htmlBody) {
    try {
        var isSimpleFormat = htmlBody('#product_addtocart_form > h1').length > 0;
        if (isSimpleFormat) {
            return htmlBody('#product_addtocart_form > h1').text();
        } else {
            return htmlBody('#product_addtocart_form > div.row > div.product-shop.col-sm-4 > div.product-name > h1').text();
        }
    } catch (error) {
        return "Error getting product name";
    }
}

async function checkUrl(url) {
    try {
        callCount++;
        const siteReq = await got(url);
        const $ = cheerio.load(siteReq.body);

        var productName = await getProductName($);
        var productAvailale = $('.availability').text().indexOf('Out of stock') == -1;
        var singleProduct = $('.data-table.grouped-items-table').length == 0;
        var productPrice = $('.price-box').text().trim();

        var currentTime = new Date();
        var timeString = currentTime.toLocaleString();

        console.log(`[${timeString}] - ${productName} - ${productPrice} - Available: [${(productAvailale == true ? '✔' : '❌')}]`);

    } catch (err) {
        console.error(`[ERROR] ${err.message}`)
    }
}

var callCount = 0;

(async () => {
    console.log('GearScout 0.1.0 - Joseph Adamita\n=============================\n\nStarting product scouting jobs...');

    var checkJob = schedule.scheduleJob('*/30 * * * * *', function(){
        checkUrl('https://www.repfitness.com/bars-plates/bar-and-plate-packages/basic-olympic-iron-weight-set');
    });
})();


[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
    process.on(eventType, () => {
        console.log(`\n=============================\n           RESULTS          \n=============================\nJobs Ran: ${callCount}\n=============================`);
    });
});