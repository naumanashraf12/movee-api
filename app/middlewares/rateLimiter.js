const redis = require('redis');
const Helper = require('../models/helper')
const redis_client = redis.createClient();
const WINDOW_DURATION_IN_HOURS = 24;
const DAY = 86400000
const SECOND = 1000
const WINDOW_DURATION_IN_SECONDS = 1
const MAX_WINDOW_REQUEST_COUNT = 100;
const WINDOW_LOG_DURATION = 1;
const Request_Count = {
    Day:{
        prototype:100,basic:50000,plus:100000,premium:250000
    },
    Second:{
        prototype:1,basic:10,plus:30,premium:50
    },
    concurrent:{
        prototype:1,basic:1,plus:3,premium:5
    }

}
redis_client.on("error", function (err) {
    console.log("Error " + err);
});

exports.rateLimiter = (req, res, next) => {
    try {
        if(req.role==='admin')
        next()
        //Checks if the Redis client is present
       else
       {
           if (!redis_client) {
            console.log('Redis client does not exist!');
            process.exit(1);
        }
           redis_client.get(req.id, function(error, record) {
            if (error) throw error;
            const currentTime = Date.now();
             if (record === null) {
                let requestLog = {
                    requestTimeStamp: currentTime,
                    dailyCount:1,
                    secondsCount:1
                    // requestCount: 1
                };
                redis_client.set(req.id, JSON.stringify(requestLog));
                next();
            }
            else{let data = JSON.parse(record);

           let lastRequest = data;
           if((currentTime-lastRequest.requestTimeStamp)<DAY){
               if(lastRequest.dailyCount<Request_Count.Day[req.category])
               {
                   if((currentTime-lastRequest.requestTimeStamp)<SECOND)
                   {
                       if(lastRequest.secondsCount<Request_Count.Second[req.category]){
                        let requestLog = {
                            requestTimeStamp: currentTime,
                            dailyCount:(lastRequest.dailyCount+1),
                            secondsCount:(lastRequest.secondsCount+1)
                        };
                        redis_client.set(req.id, JSON.stringify(requestLog));
                        next();
                       }
                       else{
                        res.set({
                            "X-RateLimit-Category": req.category,
                            "X-RateLimit-Type": 'Second-limit',
                            "X-RateLimit-Limit": Request_Count.Second[req.category],
                            "X-RateLimit-Remaining": Request_Count.Second[req.category]-lastRequest.secondsCount,
                            "Retry-After": new Date((lastRequest.requestTimeStamp+SECOND))
                        });
                       Helper.sendLimiterResponse(res,429,"Second")
                       }

                   }
                   else{
                    let requestLog = {
                        requestTimeStamp: currentTime,
                        dailyCount:(lastRequest.dailyCount+1),
                        secondsCount:1
                    };
                    redis_client.set(req.id, JSON.stringify(requestLog));
                    next();
                   }
               }
               else{
                res.set({
                    "X-RateLimit-Category": req.category,
                    "X-RateLimit-Type": 'Daily-limit',
                    "X-RateLimit-Limit": Request_Count.Day[req.category],
                    "X-RateLimit-Remaining": 0,
                    "Retry-After": new Date((lastRequest.requestTimeStamp+DAY))
                });
                Helper.sendLimiterResponse(res,429,"Daily")
               }
           }
           else{
                let requestLog = {
                requestTimeStamp: currentTime,
                dailyCount:1,
                secondsCount:1
                };
                redis_client.set(req.id, JSON.stringify(requestLog));
                next();
            }
           }
        });
    }
    } catch (error) {
        next(error);
    }
};
