var items   // global scope (i.e., can be accessed in javascript console)
function solution1(){
  '...'
}

function solution2(){
  '...'
}
function solution3(){
	'...'
}
function solution4(){
  return '...'
}
function solution5(){
  return '...'
}
function run(id, solutionFunc, data){
    console.log('run solution for ' + id)
    var answer = solutionFunc(data)
    $(id).find('.answer').html(answer)
}
function loadDataThenRunSolutions(){
    $.get({url: '../Team/profile.json'})
     .done(function(data){
        items = data
         console.log('number of items loaded:', items.length)
         console.log('first item', items[0])
         run('#q1', solution1, items)
         run('#q2', solution2, items)
         run('#q3', solution3, items)
         run('#q4', solution4, items)
         run('#q5', solution5, items)
     })
     .fail(function(err){
         console.error(err)
     })
}
loadDataThenRunSolutions()
