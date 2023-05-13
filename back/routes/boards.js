const express = require('express');
const router = express.Router();

let list = []

for (let idx = 0; idx < 8; idx++) {
  list.push({
    idx: idx,
    title: '제목' + idx,
    author: '작성자' + idx,
    contents: '작성내용' + idx,
    created_at: new Date()
  })
}
/* GET boards listing. */
router
.get('/', function(req, res, next) {
  let query = req.query;

  console.log(`Query Parameter == `+JSON.stringify(query));
  let page = query.page !== undefined ? query.page : 1;
  let size = query.size !== undefined ? query.size : 10;
  let result = [];
  if(query.keyword !== undefined && query.keyword.length > 0) {
    result = list.filter(board => board.title.includes(query.keyword))
  } else {
    result = list
  }
  res.send(result.slice(page-1, (page)*size))
})
.post('/', function(req, res, next) {
  var n = req.body
  n.idx = list.length
  n.created_at = new Date()
  list.push(n)
  res.status(200).send(n)
})
.get('/:idx', function(req, res, next) {
  let param = req.params
  let idx = param.idx
  let boards = list.filter(item => item.idx == idx)
  if(boards.length == 0) {
    res.status(404).end()
  }
  res.status(200).json(boards[0])
})
.put('/:idx', function(req, res, next) {
  let n = req.body
  n.created_at  = new Date()
  try {
    let tgtIdx = list.findIndex(item => item.idx == n.idx)
    list.splice(tgtIdx, 1, n)
  } catch(err) {
    console.error(err)
    return next(err)
  }
  res.status(200).send(n)
})
.delete('/:idx', function(req, res, next) {
  let param = req.params
  let idx = param.idx
  try {
    let tgtIdx = list.findIndex(board => board.idx == idx)
    list.splice(tgtIdx, 1)
  } catch(err) {
    console.error(err)
    return next(err)
  }
  res.status(200).end()
})

module.exports = router
