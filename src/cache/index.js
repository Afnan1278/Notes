const { reject } = require('async');
const Redis = require('redis')
const client = Redis.createClient({
    url: 'redis://redis:6379',
  legacyMode: true
});
(async () => { await client.connect(); })();
exports.client = client;

exports.getValue = async(key) => {
    return new Promise ((resolve, reject)=>{
        client.get(key, (err, data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}
