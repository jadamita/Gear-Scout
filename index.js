const got = require('got');
const cheerio = require('cheerio');

function getProductName(htmlBody) {
    try {
        var productName;
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

(async () => {
    console.log('GearScout 0.1.0 - Joseph Adamita\n');

    try {
        const siteReq = await got('https://www.repfitness.com/bars-plates/bar-and-plate-packages/basic-olympic-iron-weight-set');
        const $ = cheerio.load(siteReq.body);

        var productName = await getProductName($);
        var singleProduct = $('.data-table.grouped-items-table').length == 0;
        var productPrice = $('.price-box').text().trim();

        console.log(`Product Name: ${productName}\nSingle product: ${singleProduct}\nProduct Price: ${productPrice}`);

    } catch (err) {
        console.error(`[ERROR] ${err.message}`)
    }
})();