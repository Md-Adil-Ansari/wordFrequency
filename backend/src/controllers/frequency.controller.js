const cheerio = require("cheerio");
const Heap = require("heap");
const axios = require("axios");
const fs = require("fs");

function getTopNWords(html, topN) {
  // Load HTML into cheerio for parsing

  const $ = cheerio.load(html);
  $("script, style, link, noscript, meta").remove();

  const cleanText = $.text();

  const words = cleanText
    .replace(/[\W_]+/g, " ") // Remove punctuation and special characters
    .toLowerCase() // Convert to lowercase
    .split(/\s+/) // Split into words
    .filter((word) => word.length > 0); // Remove empty strings

  // Count the frequency of each word using an unordered map
  const frequencyMap = {};
  words.forEach((word) => {
    if (word) {
      // Ensure the word is not empty
      frequencyMap[word] = (frequencyMap[word] || 0) + 1;
    }
  });

  // Use a Min Heap to determine the top N words
  const minHeap = new Heap((a, b) => a.frequency - b.frequency); // Min Heap based on frequency

  for (const [word, frequency] of Object.entries(frequencyMap)) {
    if (minHeap.size() < topN) {
      // If heap is not full, add the current word
      minHeap.push({ word, frequency });
    } else if (frequency > minHeap.peek().frequency) {
      // If current word's frequency is higher than the smallest in the heap
      minHeap.replace({ word, frequency }); // Replace the smallest
    }
  }

  // Extract the top N words from the heap
  const topWords = [];
  while (!minHeap.empty()) {
    topWords.push(minHeap.pop());
  }

  // Since it's a Min Heap, the smallest frequency is first; reverse to get descending order
  topWords.reverse();

  return topWords;
}

const higherFrequencyCalculator = async (req, res) => {
  const { url, n } = req.body;
  const topN = n === undefined || n === "" ? 10 : n;

  try {
    // Fetch the webpage content with timeout and limited redirects
    const response = await axios.get(url, {
      timeout: 10000, // 10 seconds timeout
      maxRedirects: 5, // Limit redirects to prevent infinite loops
      validateStatus: function (status) {
        return status >= 200 && status < 400; // Accept only 2xx and 3xx responses
      },
    });
    const html = response.data;
    // Process the HTML to get top N words
    const topWords = getTopNWords(html, topN);
    return res.json({ topWords }); // Respond with the top words
  } catch (error) {
    return res
      .status(500)
      .json({ errors: "Failed to fetch or process the URL." });
  }
};
module.exports = {
  higherFrequencyCalculator,
};
