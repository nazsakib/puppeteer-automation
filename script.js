import puppeteer from "puppeteer";

async function searchGoogle(searchTerm) {
    const browser = await puppeteer.launch({ headless: false }); // Launch non-headless browser (optional)
    const page = await browser.newPage();

    await page.goto("https://www.google.com/webhp");
    await page.waitForSelector(".gLFyf"); // Wait for search bar element

    await page.type(".gLFyf", searchTerm);
    await page.keyboard.press("Enter"); // Simulate pressing Enter key

    // Consider waiting for more specific elements or changes in page content
    // instead of just waiting for h3
    // await page.waitForTimeout(9000); // Introduce a delay (adjust as needed)

    const results = await page
        .evaluate(() => {
            const searchResults = document.querySelectorAll("h3");
            const links = [];
            searchResults.forEach((result) => {
                links.push({
                    title: result.innerText,
                    // url: result.parentElement.href,
                });
            });
            return links;
        })
        .catch((error) => console.error("Error evaluating page:", error));

    // console.log("Search Results:");
    results.forEach((result) => {
        console.log(`${result.title}`);
    });

    await browser.close();
}

// Example usage
searchGoogle("chatgpt");
