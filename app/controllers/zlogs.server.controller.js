'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Zlog = mongoose.model('Zlog'),
	_ = require('lodash');
	var moment = require('moment');
moment().format();


/**
 * Create a zlog
 */
exports.create = function(req, res) {
	var zlog = new Zlog(req.body);
	zlog.user = req.user;

	zlog.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			}); 
		} else {
			res.json(zlog);
		}
	});
};

/**
 * Show the current zlog
 */
exports.read = function(req, res) {
	res.json(req.zlog);
};

/**
 * Update a zlog
 */
exports.update = function(req, res) {
	var zlog = req.zlog;

	zlog = _.extend(zlog, req.body);

	zlog.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(zlog);
		}
	});
};

/**
 * Delete an zlog
 */
exports.delete = function(req, res) {
	var zlog = req.zlog;

	zlog.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(zlog);
		}
	});
};

/**
 * List of Zlog
 */
exports.list = function(req, res) {
	//console.log(req.body.imei));
//var query = req.body;
//console.log(query);{erase_imei:'990001054456454'}
	//var s_imei =  req.query.erase_imei;
	//var l_meid = req.query.erase_meid ;
	
 			 var l_imei = req.query.erase_imei;
             var l_meid = req.query.erase_meid;
             var l_itemid = req.query.itemid;
             var l_fromDate =req.query.fromDate;
             var l_toDate =req.query.toDate;
             var gtel =moment.utc('2012-04-10', 'YYYY-MM-DD');
             //moment.utc('10-04-2012', 'DD-MM-YYYY');
var ltel = moment.utc('10-04-2014', 'DD-MM-YYYY').endOf('Day');
             
            var query = {};
             query.$and=[];
             if(l_imei !=''){
                query.$and.push({'erase_imei':l_imei});
             }
             if(l_meid !=''){
                query.$and.push({'erase_meid':l_meid});
             }
             if(l_itemid !=''){
                query.$and.push({'model_id':l_itemid});
             }
            if(l_fromDate !='' && l_toDate == ''){
                var selector ={
                    '$gte' : new Date (l_fromDate).toISOString()
                };
                query.$and.push({'erase_datetime':selector});
             }
             if(l_toDate !='' && l_fromDate ==''){
                var selector1 ={
                    '$lte' : new Date (l_toDate).toISOString()
                };
                query.$and.push({'erase_datetime':selector1});
             }
             if(l_toDate !='' && l_fromDate !=''){
                var selector2 ={
                    '$gte' :  new Date (l_fromDate).toISOString(),
                    '$lte' : new Date (l_toDate).toISOString()

                };
                query.$and.push({'erase_datetime':selector2});
             }
//{'erase_datetime' :{$gte:gtel} }
	Zlog.find(query)//.where('erase_datetime').gte('201-11-27 01:11:25.0')
    .limit(100).exec(function(err, zlogs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(zlogs);

		}
	});
};

/**
 * Zlog middleware
 */
exports.zlogByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Zog is invalid'
		});
	}

	Zlog.findById(id).populate('user', 'displayName').exec(function(err, zlog) {
		if (err) return next(err);
		if (!zlog) {
			return res.status(404).send({
				message: 'Zlog not found'
			});
		}
		req.zlog = zlog;
		next();
	});
};

/**


 * Zlog authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.zlog.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};

// Search functionality

//exports.search = function(req, res) {
	//Zlog.find();

	//res.json(req.zlog);
//};


exports.searchList = function(req, res) {
	//console.log(req.body.imei));
//var query = req.body;
//console.log(query);{erase_imei:'990001054456454'}
var s_imei =  req.query.erase_imei;
	Zlog.find(s_imei).limit(1).exec(function(err, zlogs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(zlogs);

		}
	});
};