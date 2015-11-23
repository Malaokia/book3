var DetailsItems;   // global scope (i.e., can be accessed in javascript console)
var NoServicesItems;
var ServicesItems;


function solution1(){
    '...'
}

function solution2(){
  '...'
}

function solution3a(){
  var emptystate = _.filter(ServicesItems,function(x){
    var bool = (x['State A'] == x['State Z'] && x['State A'] != '' && x['State A'] != 'Unknown')||
      ((x['State A'] != '' || x['State Z'] != '') && x['State A'] != 'Unknown') ? true : false;
    return bool;
  });
  var namebrr = _.chain(DetailsItems)
    .filter(function(x){return !_.contains(x[" Total BRR "],"$-")})
    .groupBy('Name/ID')
    .mapValues(function(x){
      return _.sum(_.map(x,function(e){
        var strnum = e[' Total BRR '].split("$")[1].split(',').join("")
        if(!_.contains(strnum,"-"))
          return parseInt(strnum)
      }))
    })
    .value()
  var stateid = _.chain(emptystate)
      .groupBy(function(x){
        if(x['State Z'] != "" &&(x['State A'] != x['State Z'])){
          return x['State Z']
        }
        else
          return x['State A']
      })
      .mapValues(function(x){
        return _.chain(DetailsItems)
          .filter(function(x){return _.contains(["Consulting / Other Professional Services","Finance", "Internet Content & Software", "Legal","Federal Government", "Retail",
           "Healthcare", "Colo/Hosting", "Manufacturing", "Real Estate / Construction"],x['Vertical'])})
          .groupBy('Vertical')
          .mapValues('length')
          .value()
        }).value();
/*
  var staterev = _.chain(emptystate)
    .groupBy(function(x){
      if(x['State Z'] != "" &&(x['State A'] != x['State Z']))
        return x['State Z']
      else
        return x['State A']
    })
    .mapValues(function(x){
      return _.chain(DetailsItems)
        .filter(function(x){
          var m = ["Consulting / Other Professional Services","Finance", "Internet Content & Software", "Legal","Federal Government", "Retail",
           "Healthcare", "Colo/Hosting", "Manufacturing", "Real Estate / Construction"]
          return _.contains(m,x['Vertical'])
        })
        .groupBy('Vertical')
        .mapValues('length')
        .defaults({"Consulting / Other Professional Services":0},{"Finance":0}, {"Internet Content & Software":0}, {"Legal":0},{"Federal Government":0}, {"Retail":0},
         {"Healthcare":0}, {"Colo/Hosting":0}, {"Manufacturing":0}, {"Real Estate / Construction":0})
        .pairs()
        .unzip()
        .value()[1]
    }).value();*/

  var staterev = _.chain(emptystate)
    .groupBy(function(x){
      if(x['State Z'] != "" &&(x['State A'] != x['State Z']))
        return x['State Z']
      else
        return x['State A']
    })
    .mapValues(function(x){
      var int = _.map(_.pluck(x,' Total MRR '),function(z){
        var strnum = z.split("$")[1].split(',').join("")
        if(!_.contains(strnum,"-"))
          return parseInt(strnum)
      })
      var brr = 0;
      var vert = "";
      _.map(_.pluck(x,'Name/ID'),function(i){
        _.map(namebrr,function(j,k){
          if(k == i)
            brr += j
        })
      })
      return  brr - _.sum(int)
    }).value();
    var i = Object.keys(staterev).map(function(key){
      return [key,staterev[key]];
    });
    i.sort(function(f,s){
      return s[1] -f[1];
    });
    var k = _.filter(_.flatten(i),function(x){
      return _.isString(x)
    })
    var v = _.filter(_.flatten(i),function(x){
      return _.isNumber(x)
    })
    var data = {
      labels: k,
      series: [v]
    };
  options = {stackBars: true, horizontalBars: true}

  new Chartist.Bar('#q3 .answer', data, options)
    .on('draw', function(data) {
      if(data.type === 'bar') {
        data.element.attr({ style: 'stroke-width: 10px' })
      }
    })
}
function solution3b(){
/*  var stateid = _.chain(ServicesItems)
    .groupBy(function(x){
      if(x['State Z'] != "" &&(x['State A'] != x['State Z'])){
        return x['State Z']
      }
      else
        return x['State A']
    })
    .mapValues(function(x){
      return _.chain(DetailsItems)
        .groupBy('Vertical')
        .reduce(function(total,n){
          return total
        })
        .mapValues('length')
        .value()
    }).value()

  var namevert = _.chain(DetailsItems)
    .filter(function(x){return !_.contains(x[" Total BRR "],"$-")})
    .filter(function(x){
      var strnum = x[' Total BRR '].split("$")[1].split(',').join("")
      if(!_.contains(strnum,"-"))
        return true
      else
        return false
    })
    .groupBy(function(x){return x['Name/ID']})
    .mapValues(function(x){
      var vert = ""
      _.map(x,function(y){
        vert = y['Vertical']
      })
      return vert
    })
    .value()*/
    var emptystate = _.filter(ServicesItems,function(x){
      var bool = (x['State A'] == x['State Z'] && x['State A'] != '' && x['State A'] != 'Unknown')||
        ((x['State A'] != '' || x['State Z'] != '') && x['State A'] != 'Unknown') ? true : false;
      return bool;
    });
    var namemrr = _.chain(emptystate)
      .filter(function(x){return !_.contains(x[" Total MRR "],"$-")})
      .groupBy(function(x){return x['Name/ID']})
      .mapValues(function(x){
        return _.sum(_.map(x,function(e){
          var strnum = e[' Total MRR '].split("$")[1].split(',').join("")
          if(!_.contains(strnum,"-"))
            return parseInt(strnum)
        }))
      })
      .value()
  var indus = _.chain(DetailsItems)
    .groupBy('Vertical')
    .mapValues(function(x){
      var int = _.map(_.pluck(x,' Total BRR '),function(z){
        var strnum = z.split("$")[1].split(',').join("")
        if(!_.contains(strnum,"-"))
          return parseInt(strnum)
      })
      var mrr = 0;
      var vert = "";
      _.map(_.pluck(x,'Name/ID'),function(i){
        _.map(namemrr,function(j,k){
          if(k == i)
            mrr += j
        })
      })
      return  _.sum(int) - mrr
    })
    .value();
  var i = Object.keys(indus).map(function(key){
    return [key,indus[key]];
  });
  i.sort(function(f,s){
    return s[1] -f[1];
  });
  var k = _.filter(_.flatten(i),function(x){
    return _.isString(x)
  })
  var v = _.filter(_.flatten(i),function(x){
    return _.isNumber(x)
  })
  var data = {
    labels: k,
    series: [v]
  };

  options = {stackBars: true, horizontalBars: true}

  new Chartist.Bar('#q4 .answer', data, options)
    .on('draw', function(data) {
      if(data.type === 'bar') {
        data.element.attr({ style: 'stroke-width: 15px' })
      }
    })
}
function solution3c(){
  /*var emptystate = _.filter(ServicesItems,function(x){
    var bool = (x['State A'] == x['State Z'] && x['State A'] != '' && x['State A'] != 'Unknown')||
      ((x['State A'] != '' || x['State Z'] != '') && x['State A'] != 'Unknown') ? true : false;
    return bool;
  });
  var namebrr = _.chain(DetailsItems)
    .filter(function(x){return !_.contains(x[" Total BRR "],"$-")})
    .groupBy('Name/ID')
    .mapValues(function(x){
      return _.sum(_.map(x,function(e){
        var strnum = e[' Total BRR '].split("$")[1].split(',').join("")
        if(!_.contains(strnum,"-"))
          return parseInt(strnum)
      }))
    })
    .value()
  var stateid = _.chain(emptystate)
      .groupBy(function(x){
        if(x['State Z'] != "" &&(x['State A'] != x['State Z'])){
          return x['State Z']
        }
        else
          return x['State A']
      })
      .mapValues(function(x){
        return  _.chain(DetailsItems)
          .filter(function(x){return _.contains(["Consulting / Other Professional Services","Finance", "Internet Content & Software", "Legal","Federal Government", "Retail",
           "Healthcare", "Colo/Hosting", "Manufacturing", "Real Estate / Construction"],x['Vertical'])})
          .groupBy('Vertical')
          .mapValues('length')
          .defaults({"Consulting / Other Professional Services":0},{"Finance":0}, {"Internet Content & Software":0}, {"Legal":0},{"Federal Government":0}, {"Retail":0},
           {"Healthcare":0}, {"Colo/Hosting":0}, {"Manufacturing":0}, {"Real Estate / Construction":0})
          .pairs()
          .unzip()
          .value()[1]
        }).value();
  var s = _.slice(_.values(stateid),0,10)
  var data = {
    labels : ["MD", "CA", "NV", "TX", "GA", "MN", "IN", "TN", "KS", "IL", "CO", "NY", "VA", "DC", "MA", "AZ", "IA", "AL", "WA","MI", "NJ", "NE", "CT", "ID", "PA", "UT", "OH", "MT", "MO", "MS", "FL", "OR", "NC", "KY", "WY", "AK", "NM"],
    series : _.keys(stateid)
  }

  options = {
    stackBars: true,
    horizontalBars: true
  }

  return Chartist.Bar('#q5 .answer', data, options)
    .on('draw', function(data) {
      if(data.type === 'bar') {
        data.element.attr({ style: 'stroke-width: 30px' })
      }
    })*/
}

function solution4(){
  console.log(NoServicesItems)
  var s = _.filter(NoServicesItems,function(x){
    return (!_.contains(x["PriorYearRevenue"], "N/A")) || (!_.contains(x["PriorYearEmployees"], "N/A"))//||// !_.contains(x["PriorYearEmployees"], "N/A") || !_.contains(x[" PriorYearRevenue "],"#N/A")
  })
  var noserv = _.groupBy(s,"Name/ID")
  noserv = _.mapValues(noserv,function(x){
    if(parseInt(x[0]["PriorYearRevenue"]) != 0 || parseInt(x[0]["PriorYearEmployees"])!=0){
      return _.round(parseInt(x[0]["PriorYearRevenue"])/parseInt(x[0]["PriorYearEmployees"]))}
    else{return 0}
  })
  var i = Object.keys(noserv).map(function(key){
    return [key,noserv[key]];
  });
  i.sort(function(f,s){
    return s[1] -f[1];
  });
  var k = _.filter(_.flatten(i),function(x){
    return _.isString(x)
  })

  var v = _.filter(_.flatten(i),function(x){
    return _.isNumber(x)
  })
  var data = {
    labels: k.reverse(),
    series: [v.reverse()]
  };
  options = {stackBars: true, horizontalBars: true}

  new Chartist.Bar('#q5 .answer', data, options)
    .on('draw', function(data) {
      if(data.type === 'bar') {
        data.element.attr({ style: 'stroke-width: 15px' })
      }
    })
}

function solution4b(){
  var namebrr = _.chain(DetailsItems)
    .filter(function(x){return !_.contains(x[" Total BRR "],"$-")})
    .groupBy('Name/ID')
    .mapValues(function(x){
      return _.sum(_.map(x,function(e){
        var strnum = e[' Total BRR '].split("$")[1].split(',').join("")
        if(!_.contains(strnum,"-"))
          return parseInt(strnum)
      }))
    })
    .value()
  var namemrr = _.chain(ServicesItems)
    .filter(function(x){return !_.contains(x[" Total MRR "],"$-")})
    .groupBy('Name/ID')
    .mapValues(function(x){
      return _.sum(_.map(x,function(e){
        if(!_.contains( e[' Total MRR '],','))
          var strnum = e[' Total MRR '].split("$")[1]
        else
          var strnum = e[' Total MRR '].split("$")[1].split(',').join("")
        if(!_.contains(strnum,"-"))
          return parseInt(strnum)
      }))
    })
    .value()

    var i = Object.keys(namemrr).map(function(key){
      if(_.isUndefined(namebrr[key])){
        namebrr[key] = 0
      }
      return [key,namebrr[key]-namemrr[key]];
    });
    i.sort(function(f,s){
      return s[1] -f[1];
    });
    var k = _.filter(_.flatten(i),function(x){
      return _.isString(x)
    })
    var v = _.filter(_.flatten(i),function(x){
      return _.isNumber(x)
    })
    var data = {
      labels: k,
      series: [v]
    };
  options = {stackBars: true, horizontalBars: true}

  new Chartist.Bar('#q6 .answer', data, options)
    .on('draw', function(data) {
      if(data.type === 'bar') {
        data.element.attr({ style: 'stroke-width: 10px' })
      }
    })
}

function solution5(){
    /*: replace the hard coded values in series by actual computation
  var groups = _.groupBy(items, 'CrsPBADept')
	hist = _.pairs(_.mapValues(_.groupBy(groups["HIST"],'CrsLvlNum'),function(d){
		return d.length
	}));
	cs = _.pairs(_.mapValues(_.groupBy(groups["CSCI"],"CrsLv1Num"),function(d){
		return d.length
	}));
	histNums = _.sortBy(hist, function(d){
		return d[0]
	});
	csNums = _.sortBy(cs, function(d) {
		return d[0]
	});

	x = _.take(_.map(histNums,function(d){
				return d[0];
	}),4);
	y = _.take(_.map(histNums,function(d){
				return d[1];
	}),4);
	z = _.take( _.map(csNums,function(d){
				return d[1]
	}),4);
	var data = {
    labels: x ,
    series: [y,z]
  };
  console.log("x ",x)
  console.log("y",y)
  console.log("z",z)
  new Chartist.Bar('#q5 .answer', data);*/
  return '...'
}
function toggleSourecode(){
  $('pre').each(function(){
    if ($(this).height()){
        $(this).attr('data-height', $(this).height())
        $(this).height(0)
    } else {
      $(this).height($(this).attr('data-height'))
    }
  })
}
$('.switch input').click(toggleSourecode)

function analyze() {
  run('#q1', solution1)
  run('#q2', solution2)
  run('#q3', solution3a)
  run('#q4', solution3b)
  run('#q5', solution4)
  run('#q6', solution4b)
  run('#q7', solution5)
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  })
  toggleSourecode()
}
function run(id, solutionFunc, data){
    console.log('run solution for ' + id)
    var answer = solutionFunc(data)
    $(id).find('.answer').html(answer)
}

function loadDataThenRunSolutions(){
  $.get('http://localhost:8083/week13/team/CustomerAccount-Details.json')
      .done(function(data){
        DetailsItems = data
        $.get('http://localhost:8083/week13/team/CustomerAccount-Services.json')
          .done(function(data){
            ServicesItems = data
            $.get('http://localhost:8083/week13/team/noservice.json')
              .done(function(data){
                NoServicesItems =data
                analyze()
              }).fail(function(err){
              console.error(err)
            })
          }).fail(function(err){
          console.error(err)
        })
    }).fail(function(err){
      console.error(err)
    })
  }

loadDataThenRunSolutions()
