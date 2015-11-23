function analyze(){

  //
  // Getting To Know the Data
  //

  heading('Examples')

  ask('how many measurements were included in this dataset?', example1)

  ask('how many samples does each measurement contain?', example2)

  ask('at the 10-th measurement, what are valid sample values (> 0)?', example3)
  // a sample value is valid if it is greater than zero

  heading('Measurements and Samples')

  ask('how many unique non-zero, non-negative sample values in this dataset? what are they?', func1)

  ask('what is the average time (seconds) between two measurements?', func2)

  ask('at 09:57:18, how many samples in this measurement have the value 7?', func3)

  ask('which measurement has the most number of samples with the value 3?', func4)

  ask('how many measurements have no sample value greater than zero?', func5)

  ask('which valid (i.e., greater than zero) sample value is the most common?', func6)

  heading('Mapping')

  ask('when was the boat furthest away from NYC (40.7127 N, 74.0059 W)? what was the distance?', func7)
  // use Leaflet to draw a line between NYC and this "furtherest away" location

  ask('what was the path of the boat?', func8)
  // use Leaflet to draw a line between every two locations

  ask('where were the most common sample value measured?', func9)
  // say, your answer to Question Six is 13, draw a marker for each measurement that has
  // at least one sample whose value is 13

  ask('how does the desensity of valid sample values change across the geographical area?', func10)
  // use the brightness to indicate high number of valid sample values each
  // for each measurement, draw a marker,
  // use the brightness to represent the number of valid samples
  // the brighter a spot, the higher the number
  // for those measurements without a valid sample, draw nothing

  heading('Science')

  ask('what is the distribution of fish?', func11)

  ask('what is the distribution of  are schools of zooplankton?', func12)


  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  })
  toggleSourecode()
}

function example1(){
  return items.length
}

function example2(){
  return items[0].Samples.length
}

function example3(){
  return _.filter(items[9].Samples, function(d){
    return d > 0
  }).join(', ')
}

function func1(){
  var s = _.flatten(_.pluck(items, 'Samples'))
  var unique = _.uniq(_.filter(s, function(d){
    return d > 0
  }))
  return _.size(unique)
}

function func2(){
  var s = _.flatten(_.pluck(items, 'Ping_time'))
  var diff = _.map(s, function(item,i){
    if( i == 0) return 0
    else{
      var s0 = s[i-1].split(":")
      var s1 = s[i].split(':')
      var t0 = parseInt(s0[0])*3600+parseInt(s0[1])*60+parseInt(s0[2])
      var t1 = parseInt(s1[0])*3600+parseInt(s1[1])*60+parseInt(s1[2])
      return t1-t0
    }
  })
  return _.sum(diff)/diff.length + "sec"
}

function func3(){
  var f = _.filter(items,function(x){
    return _.contains(x.Ping_time, "09:57:18")
  })
  var r = _.filter(f.Samples,function(x){
    return parseInt(x) == 8
  })
  return r.length
}

function func4(){
  var key = 0;
  var ctr = 0;
  _.map(items,function(x){
    var count = 0;
    _.map(x.Samples,function(y){
      if(parseInt(y) == 3){
        count++;
      }
    })
    if(count > ctr){
      key = x.Ping_index
      ctr = count
    }
  })
  return "it's the " + key + "th with" + ctr + "count of value 3"
}

function func5(){
  var f = _.filter(items,function(x){
    var ctr = 0;
    _.forEach(x.Samples,function(y){
      if(parseInt(y) > 0){
        ctr++;
      }
    })
    return ctr == 0;
  })
  return f.length
}

function func6(){
  var s = _.flatten(_.pluck(items,'Samples'))

  var counts = {};
  for (var i = 0; i < s.length; i++) {
    counts[s[i]] = 1 + (counts[s[i]] || 0);
  }
  var ctr = 0;
  var key = 0;
  _.map(counts,function(x,y){
    if(x > ctr){
      ctr = x;
      key = y;
    }
  })
  return key + " has " + _.max(counts) + " occurrences"
}

function func7(){
var el = $(this).find('.viz')[0]
$(el).height(500)
var circle = L.circle([items[0].Latitude, items[0].Longitude], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(createMap(el, [items[0].Latitude, items[0].Longitude], 5));
}

function func8(){
  var pos = [items[0].Latitude, items[0].Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, [items[0].Latitude, items[0].Longitude], 9)
  _.forEach(items, function(i){
    L.circle([i.Latitude, i.Longitude], 500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
    }).addTo(map);
  })
}

function func9(){
  var el = $(this).find('.viz')[0]
  $(el).height(500)
  var map = createMap(el, [geolib.getCenter([
      {latitude: items[0].Latitude, longitude: items[0].Longitude},
      {latitude: items[items.length-1].Latitude, longitude: items[items.length-1].Longitude}
    ]).latitude, geolib.getCenter([
        {latitude: items[0].Latitude, longitude: items[0].Longitude},
        {latitude: items[items.length-1].Latitude, longitude: items[items.length-1].Longitude}
      ]).longitude], 12)

  var mostCommon = _.chain(items)
    .map('Samples')
    .flatten()
    .filter(function(d) { return d > 0 })
    .groupBy()
    .mapValues('length')
    .pairs()
    .max(function(d) { return d[1] })
    .value()[0]

  _.forEach(items, function(x, index) {
    if (_.includes(x.Samples, mostCommon)) {
      var latlng = [parseFloat(x.Latitude), parseFloat(x.Longitude)]
      L.circle(latlng, 50, {color: 'red', fillColor: 'green', fillOpacity: 0.7}).addTo(map)
    }
  })
  return '...'
}

function func10(){
  var el = $(this).find('.viz')[0]
  $(el).height(500)
  var map = createMap(el, [geolib.getCenter([
      {latitude: items[0].Latitude, longitude: items[0].Longitude},
      {latitude: items[items.length-1].Latitude, longitude: items[items.length-1].Longitude}
    ]).latitude, geolib.getCenter([
        {latitude: items[0].Latitude, longitude: items[0].Longitude},
        {latitude: items[items.length-1].Latitude, longitude: items[items.length-1].Longitude}
      ]).longitude], 12)

  var counts = _.map(items, function(x) {
    var count = _.filter(x.Samples, function(s) { return s > 0 }).length
    return [x.Latitude, x.Longitude, count]
  })
  var colors = ['#c6e1f1', '#a1cee9', '#7bbbe0', '#55a7d7', '#3c8ebd', '#2e6e93', '#285e7e',
    '#214f69', '#1a3f54', '#142f3f']
  _.forEach(counts, function(x){
    if(x[2] != 0) {
      var latlng = [parseFloat(x[0]), parseFloat(x[1])]
      var color = colors[parseInt(x[2]/10)]
      L.circle(latlng, 5, { color: color, fillOpacity: 4 }).addTo(map);
    }
  })
  return '...'
}

function func11(){
   var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
   $(el).height(500) // set the map to the desired height
   var map = createMap(el, [items[0].Latitude, items[0].Longitude], 12)
   _.forEach(_.map(items, function(i){
      return {
        depth: i.Depth_stop,
        position: [i.Latitude, i.Longitude],
        fishes: _.filter(i.Samples, function(s){
          return parseInt(s) == 1 || parseInt(s) == 3
        }).length
      }
    }), function(i){
     L.circle(i.position, i.fishes*10, {
       color: 'blue',
       fillColor: '#f03',
       fillOpacity: 0.5
     }).addTo(map);
   })
   return "map"
  return '...'
}

function func12(){
   var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
   $(el).height(500) // set the map to the desired height
   var map = createMap(el, [items[0].Latitude, items[0].Longitude], 13)
   _.forEach(_.map(items, function(i){
      return {
        depth: i.Depth_stop,
        position: [i.Latitude, i.Longitude],
        zoo: _.filter(i.Samples, function(s){
          return parseInt(s) == 7 || parseInt(s) == 13
        }).length
      }
    }), function(i){
     L.circle(i.position, i.zoo*10, {
       color: 'green',
       fillColor: '#f03',
       fillOpacity: 0.5
     }).addTo(map);
   })
  return '...'
}
