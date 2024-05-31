import puppeteer from "puppeteer";

async function searchGoogle(searchTerm) {
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();

    await page.goto("https://www.google.com/webhp");
    await page.waitForSelector(".gLFyf");

    await page.type(".gLFyf", searchTerm);
    await page.keyboard.press("Enter");

    const results = await page
        .evaluate(() => {
            const searchResults = document.querySelectorAll("h3");
            const links = [];
            searchResults.forEach((result) => {
                links.push({
                    title: result.innerText,
                });
            });
            return links;
        })
        .catch((error) => console.error("Error evaluating page:", error));

    console.log("Search Results:");
    results.forEach((result) => {
        console.log(`${result.title}`);
    });

    await browser.close();
}

searchGoogle("chatgpt");
