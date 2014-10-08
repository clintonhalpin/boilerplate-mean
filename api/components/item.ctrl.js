//  Items @ /api/items/

'use strict';

var _ = require('lodash');
var Item = require('./item.model')

// GET @ /api/items/  
exports.get = function(req, res) {
  Item.find(function(err, obj) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(obj);
  });
}

// POST @ /api/items/  
exports.post = function(req, res) {
  Item.create(req.body, function(err, obj) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(obj);
  });
}

// GET @ /api/items/:id
exports.getOne = function(req, res) {
  Item.findById(req.params.id, function (err, obj) {
    if(err) { return handleError(res, err); }
    if(!obj) { return res.send(404); }
    return res.status(201).json(obj);
  });
};

// PUT/PATCH @ /api/items/:id
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Item.findById(req.params.id, function (err, obj) {
    if (err) { return handleError(res, err); }
    if(!obj) { return res.status(404).end() }
    var updated = _.merge(obj, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(obj);
    });
  });
};

// DELETE @ /api/items/:id 
exports.destroy = function(req, res) {
  Item.findById(req.params.id, function (err, obj) {
    if(err) { return handleError(res, err); }
    if(!obj) { return res.status(404).json( req.params.id + ' not found'); }
    obj.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
