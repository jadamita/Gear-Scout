const got = require('got');

(async () => {
    console.log('GearScout 0.1.0 - Joseph Adamita\n');

    try {
        const siteReq = await got('https://www.roguefitness.com/the-rogue-axle');

        

    } catch (err) {
        console.error(`[ERROR] ${err.message}`)
    }
})();