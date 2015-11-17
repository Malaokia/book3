//
// TODO: implement the logic to decide whether or not to make a trade
//

function decideWhetherOrNotToTrade(tweet){
/*game, news, money, fun, good, actor, news, movies, tech, music, people, apple, google*/

  /*  var a = ['game','news','money', 'fun', 'good', 'actor', 'news', 'movies', 'tech', 'music', 'people', 'apple', 'google']
    _.forEach(a,function(x){
      if(tweet.tweet.search(x)  != -1){
        array_key[_.indexOf(a,x)].count += 1
        console.log(x,array_key[_.indexOf(a,x)].count)
      }
    })
    if(price != oldprice){
      var diff = price - oldprice
      _.forEach(array_key,function(x){
        if(x.count > 0 && diff > 0 ){
          x.effect++
        }
        if(x.count > 0 && diff < 0 ){
          x.effect--
        }
        console.log(x.word, x.effect)
        x.count = 0
      })
      console.log('array_key',array_key)
    }

  console.log('price',price)*/
  if(tweet.search(/people/i)!= -1||tweet.search(/money/i)!= -1
   ||tweet.search(/movies/i)!=-1 || tweet.search(/game/i)!= -1 ||
   tweet.search(/fun/i)!= -1 || tweet.search(/good/i)!=-1 && bank.currency == 'USD'){return true}
   else{return false}

}
