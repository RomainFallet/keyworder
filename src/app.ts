// Import dependencies
import * as fs from 'fs';
import * as path from 'path';
import * as puppeteer from 'puppeteer';
import * as xlsx from 'xlsx';

// Description of input data (we take a keyword as input)
interface ISheetInputData {
    keyword: string;
}

// Description of ouput data (we ouput keyword & corresonding search results & volume)
interface ISheetOutputData {
    keyword: string;
    volume: string;
    results: string;
}

// Declaring variables
let inputWorkbook: xlsx.WorkBook;
let inputSheetName: string;
let inputWorksheet: xlsx.WorkSheet;
let inputDatas: ISheetInputData[];

try {
    // Get the input xlsx file
    inputWorkbook = xlsx.readFile('./input.xlsx');
    // Get the first sheet name
    inputSheetName = inputWorkbook.SheetNames[0];
    // Get the sheet
    inputWorksheet = inputWorkbook.Sheets[inputSheetName];
    // We convert the sheet to JSON and select only the first column, we name it "keyword"
    // We ignore the first line of data (usually used for headers in xlsx file)
    inputDatas = xlsx.utils.sheet_to_json(inputWorksheet, {
        header: ['keyword'],
        range: 1,
    });
} catch (err) {
    console.error(`Err: unable to read the file "input.xlsx".`, err);
    process.exit(1);
}

// We prepare our output
let outputDatas: ISheetOutputData[] = [];

// Get number of results on Google France
let getNumberOfresults: (browser: puppeteer.Browser, keyword: string) => Promise < string > ;
getNumberOfresults = async (b, k) => {
    // We navigate to the corresponding search page
    console.log(`Action: opening page at https://www.google.fr/search?q=${encodeURI(k)}.`);
    const page = await b.newPage().catch((err: any) => { throw new Error(err); });
    await page.goto(`https://www.google.fr/search?q=${encodeURI(k)}`);
    console.log(`State: page is opened.`);

    // We get the result number directly from the HTML page
    console.log(`Action: getting the number of results.`);
    const searchResults: string = await page.evaluate(() => {
        const resultElement: HTMLElement | null = document.querySelector('#resultStats');
        if (!resultElement || !resultElement.textContent) {
            return 'Unable to get number of results for this keyword';
        }
        let resultsString: string = resultElement.textContent.trim();
        resultsString = resultsString.replace(/^(.+?) ([0-9\s\.]+) (.+?) (.+?)$/, '$2');
        resultsString = resultsString.replace(/[ \.]/g, '');
        return resultsString;
    }).catch((err: any) => { throw new Error(err); });

    console.log(`State: number of results is got.`);
    return searchResults;
};

let getSearchVolume: (browser: puppeteer.Browser, keyword: string) => Promise < string > ;
getSearchVolume = async (b, k) => {
    // We navigate to the corresponding search page
    console.log('Action: opening a new page at https://searchvolume.io/.');
    const page = await b.newPage().catch((err: any) => { throw new Error(err); });
    await page.goto(`https://searchvolume.io/`);
    console.log('State: page is opened.');

    let delay: (timeout: number) => Promise < void > ;
    delay = (t) => {
        return new Promise((resolve) => setTimeout(() => resolve(), t));
    };

    let checkStatus: (page: puppeteer.Page) => Promise < 'loading' | 'ready' | 'searching' | 'done' > ;
    checkStatus = async (p) => {
        return await p.evaluate(() => {
            // We get the elements
            const textareaElement: HTMLInputElement | null = document.querySelector('#input');
            const spinnerElement: HTMLElement | null = document.querySelector('#spinner-verify');
            const resultElement: HTMLTableElement | null = document.querySelector('#cpc');

            if (!textareaElement || !spinnerElement || !resultElement) { return 'loading'; }
            if (!spinnerElement.style.visibility && !textareaElement.value) {
                return 'loading';
            } else if (spinnerElement.style.visibility === 'hidden' && !textareaElement.value) {
                return 'ready';
            } else if (textareaElement.value && resultElement.style.display === '') {
                return 'searching';
            } else if (textareaElement.value && resultElement.style.display === 'none') {
                return 'done';
            }
            return 'loading';
        }).catch((err: any) => { throw new Error(err); });
    };

    // We wait until the page is ready
    console.log('Action: waiting for the page to be ready.');
    let pageStatus = await checkStatus(page)
        .catch((err: any) => { throw new Error(err); });
    while (pageStatus !== 'ready') {
        await delay(1000).catch((err: any) => { throw new Error(err); });
        pageStatus = await checkStatus(page)
            .catch((err: any) => { throw new Error(err); });
    }
    console.log('State: page is ready.');

    // Set the country
    console.log('Action: setting up search country to "france".');
    await page.evaluate(() => {
        const countryElement: HTMLInputElement | null = document.querySelector('#country');
        if (countryElement) { countryElement.value = 'france'; }
    }).catch((err: any) => { throw new Error(err); });
    console.log('State: search country is set.');

    // Set the input
    console.log(`Action: setting the keyword "${k}" in the form.`);
    await page.evaluate((keyword: string) => {
        const inputElement: HTMLInputElement | null = document.querySelector('#input');
        if (inputElement) { inputElement.value = keyword; }
    }, k).catch((err: any) => { throw new Error(err); });
    console.log(`State: the keyword is set.`);

    // Submit the form
    console.log(`Action: submitting the form.`);
    await page.evaluate(() => {
        const submitElement: HTMLButtonElement | null = document.querySelector('#submit');
        if (submitElement) { submitElement.click(); }
    }).catch((err: any) => { throw new Error(err); });
    console.log(`State: the form is submit.`);

    // We wait until the search is done
    console.log('Action: waiting until the search is completed.');
    pageStatus = await checkStatus(page).catch((err: any) => { throw new Error(err); });
    while (pageStatus !== 'done') {
        await delay(1000).catch((err: any) => { throw new Error(err); });
        pageStatus = await checkStatus(page).catch((err: any) => { throw new Error(err); });
    }
    console.log('State: search is completed.');

    // We get the search volume
    console.log('Action: getting search volume.');
    const searchVolume = await page.evaluate(() => {
        const volumeElement: HTMLElement | null = document.querySelector('#table > tbody > tr > td:nth-child(2)');
        if (!volumeElement || !volumeElement.textContent) { return 'Unable de get search volume for this keyword.'; }
        return volumeElement.textContent.trim().replace(/[ ,\.]/g, '');
    }).catch((err: any) => { throw new Error(err); });
    console.log('State: search volume is got.');

    return searchVolume;
};

const start = async () => {
    // We start the borwser
    console.log('Action: starting the browser.');
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }).catch((err: any) => { throw new Error(err); });
    console.log('State: browser is started.');

    // For each keyword in our input list
    for (const inputData of inputDatas) {
        const searchResults = await getNumberOfresults(browser, inputData.keyword)
            .catch((err: any) => { throw new Error(err); });
        const searchVolume = await getSearchVolume(browser, inputData.keyword)
            .catch((err: any) => { throw new Error(err); });

        // We add the result in our output array
        outputDatas = [...outputDatas, {
            keyword: inputData.keyword,
            results: searchResults,
            volume: searchVolume,
        }];

        // We log the result in the console
        console.log(`Result: "${inputData.keyword}", searches/month "${searchVolume}", results "${searchResults}".`);
    }

    console.log('Action: closing the browser.');
    await browser.close().catch((err: any) => { throw new Error(err); });
    console.log('State: browser is closed.');

    // Declaring variables
    let outputWorkbook: xlsx.WorkBook;
    let outputWorksheet: xlsx.WorkSheet;

    try {
        const outputPath = './output.xlsx';

        // Remove ouput file if it exists
        if (fs.existsSync(outputPath)) { fs.unlinkSync(outputPath); }

        // Create output workbook
        outputWorkbook = xlsx.utils.book_new();
        // Convert our result into sheet
        outputWorksheet = xlsx.utils.json_to_sheet(outputDatas);
        // Add the sheet to the newly created workbook
        xlsx.utils.book_append_sheet(outputWorkbook, outputWorksheet, 'Feuil1');
        // Write the file
        xlsx.writeFile(outputWorkbook, outputPath);
    } catch (err) {
        console.error(`Err: unable to write the file "output.xlsx".`, err);
        process.exit(1);
    }
};

try {
    start();
} catch (err) {
    console.error(`Err: an error occured while getting datas from "google.fr" of "searchvolume.io".`, err);
    process.exit(1);
}
