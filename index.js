const puppeteer = require('puppeteer');
const md5 = require('md5');
const fs = require('fs');

async function getimage(url, path = './') {
    try {
        const hash = md5(url);
        if (fs.existsSync(path + hash + '.png')) {
            return `${hash}.png`;
        }
        const browser = await puppeteer.launch({
            defaultViewport: {
                width: 1280,
                height: 720,
                isLandscape: true,
            },
            args: ['--no-sandbox'],
        });
        const page = await browser.newPage();
        await page.goto(url);
        await page.screenshot({
            path: `${path}/${hash}.png`,
            fullPage: true,
            type: 'png',
        });
        await browser.close();
        return `${hash}.png`;
    } catch (e) {
        console.log(e);
    }
}

module.exports = getimage;
