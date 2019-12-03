/*OSRS WEB SCRAPER
  MINYOUNG NA
  DATABASE PSET2

  The problem I had with this one was that the runescape website was very poorly designed
  and I couldn't really work around it because it didn't have any tags. 
  i.e. the tables holding a player rank was... just a <tr> element without any id's lol

*/

/*
  Connection to the Mongodb
*/

const CONNECTION_URL = "mongodb+srv://Meandros:N5088EvzpPRK1f9W@cluster0-vygef.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "Cluster0";
const mongoose = require('mongoose')
const userSchema = require('./userSchema.js')
const User = mongoose.model('user', userSchema, 'user')

const cliProgress = require('cli-progress');
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar1.start(80001, 0);

/*
  Node API for promises
*/

const Promise = require("bluebird");
const request = Promise.promisifyAll(require("request"), {multiArgs: true});
const cheerio = require('cheerio');

const baseURL = 'https://secure.runescape.com/m=hiscore_oldschool/';
const searchURL = [];
let Searchcount = 1;
/*
  Set how many players you search for ( 25 players per page)
*/
const pages = 80001;
for (var i = 1; i <= pages; i++) {
    searchURL.push(baseURL + 'overall?table=0&page=' + i);
}

const connector = mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function createUser(name, link,rank,exp,level) {
    return new User({
        name,
        link,
        rank,
        exp,
        level
    }).save()
}

async function findUser(name) {
    return await User.findOne({name})
}

const getUsers= async () => {
    await Promise.map(searchURL, function(url) {
        bar1.increment();
        bar1.update(1);
        return request.getAsync(url).spread(function(response,body) {
            const nameMap = cheerio('tr.personal-hiscores__row', body).map(async (i, e) => {
                const rank = e.children[0].next.children[0].data.replace(/(\r\n|\n|\r)/gm,"");
                const modhtml = e.children[3].children[1].attribs.href.replace(/\uFFFD/g, '%A0');
                const raw_name = e.children[3].children[1].children[0].data.replace(/\uFFFD/g, ' ');

                const link = baseURL + modhtml;
                const name = raw_name.replace(/\uFFFD/g, ' ');

                const level = e.children[5].children[0].data.replace(/(\r\n|\n|\r)/gm,"");
                const exp = e.children[7].children[0].data.replace(/(\r\n|\n|\r)/gm,"");

                return {
                    name,
                    link,
                    rank,
                    exp,
                    level
                }
            }).get();

            return Promise.all(nameMap);
        });
    }).then(result => {
        ;
        (async () => {
            
            /*
            Create a new user using schema
            or find that user if it already exsist in the database.
            */
            for (var i = 0; i < pages; i++) {
                for (var k =0 ; k<25; k++){
                    const name = result[i][k].name
                    const link = result[i][k].link
                    const rank = result[i][k].rank
                    const exp = result[i][k].exp
                    const level = result[i][k].level
                    
                    let user = await connector.then(async () => {
                        return findUser(name)
                    })

                    if (!user) {
                        user = await createUser(name, link,rank,exp,level)
                    }
                }
            }         
        })();
    }).catch(function(err) {
        console.log(err);
    });
};


getUsers()
    .then(async() => console.log('SUCCESSFULLY COMPLETED THE WEB SCRAPING SAMPLE'))
    .catch((err) => console.error(err));