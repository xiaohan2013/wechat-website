'use strict';

var _ = require('lodash');
var Wechat = require('./wechat.model');

// Get list of wechats
exports.index = function(req, res) {
  Wechat.find(function (err, wechats) {
    if(err) { return handleError(res, err); }
    return res.json(200, wechats);
  });
};

// Get a single wechat
exports.show = function(req, res) {
  Wechat.findById(req.params.id, function (err, wechat) {
    if(err) { return handleError(res, err); }
    if(!wechat) { return res.send(404); }
    return res.json(wechat);
  });
};

// Creates a new wechat in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  Wechat.create(req.body, function(err, wechat) {
    if(err) { return handleError(res, err); }
    return res.json(201, wechat);
  });
};

// Updates an existing wechat in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Wechat.findById(req.params.id, function (err, wechat) {
    if (err) { return handleError(res, err); }
    if(!wechat) { return res.send(404); }
    var updated = _.merge(wechat, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, wechat);
    });
  });
};

// Deletes a wechat from the DB.
exports.destroy = function(req, res) {
  Wechat.findById(req.params.id, function (err, wechat) {
    if(err) { return handleError(res, err); }
    if(!wechat) { return res.send(404); }
    wechat.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}