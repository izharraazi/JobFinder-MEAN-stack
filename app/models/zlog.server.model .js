'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * ZlogSchema
 */
var ZlogSchema = new Schema({
	erase_id: {
		type: Number,
		required: 'erase_id Cannot be blank'
	},
	halong_serial: {
		type: String,
		default: '',
		trim: true,
	},
	model_id: {
		type: Number,
		required: 'Model_Id needed'
	},
	erase_userid: {
		type: String		
	},

	erase_datetime: {
		type: String
		
	},
	erase_logfile:{
		type:String
	},

	erase_imei:{
		type: String
	},

	erase_meid:{
		type:String
	},

	erase_status:{
		type:Number,
		max: 1
	},

	erase_verify:{
		type:Number,
		max: 1
	},

	erase_credit:{
		type:Number,
		max:11
	},
	erase_hash:{
		type:String,

	},
	customer_name:{
		type:String
	},
    
    erase_method:{
    	type:String
    },

    result_detail:{
    	type:String
    },

    device_manufacturer:{
    	type:String
    },

    device_carrier:{
    	type:String
    },

    device_baseband:{
    	type:String
    },

    device_firmware:{
    	type:String
    },

    device_capacity:{
    	type:String
    },

    device_wifi_address:{
    	type:String
    },

    device_bluetooth_address:{
    	type:String
    },

    device_model_number:{
    	type:String
    },

    device_color:{
    	type:String
    },

    device_os_type:{
    	type:String
    },

    device_sn:{
    	type:String
    },

    elapsetime:{
    	type:String
    },
    device_os_version:{
    	type:String
    },
    device_fmip:{
    	type:String
    },

    device_bricked:{
    	type:String
    },

    erase_error_code:{
    	type:String
    },

    function_test:{
    	type:String
    },

    process_type:{
    	type:String
    },

    date_received:{
    	type:Date
    },
    pushed_date:{
    	type:Date,
    },
    pushed_result_date:{
    	type:Date,
    },

    pushed_status:{
    	type:Number,
    	max:1
    },

    pushed_result:{
    	type:String
    },

    pushed_data:{
    	type:String
    },

    site_name:{
    	type:String
    },
    site_type:{
    	type:String

    },
    del_if:{
    	type:Number,
    	max:1
    }


},{ collection : 'Zlogs'});

mongoose.model('Zlog', ZlogSchema);
