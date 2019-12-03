# Minyoung Na Database project 2

## Requirements

| Software | Version |
| ------ | ----------- |
| node   | 12.9.1 |
| mongoose | 5.7.11 |
| mongodb    | 3.34 |

## How to run

After downloading node

    npm install

If you want to scrape data ( it has already been done for 20 pages, but if you may want to update it  ). 

    node scraper.js

this will take a bit so grab a coffee. To change how many pages you want to search for, change the `page` in scraper.js
into any number you want.

To play around with data and actually use it, you can use getter.js. To obtain player information
based on their name,

    node getter.js name "PlayerName"

or to search which player is at a certain rank

    node getter.js rank "Rank"