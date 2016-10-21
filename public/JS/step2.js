var my_token = "9a3007d9112d7e4bafeccc1ee97a4e03";
var loading_inner = '<div class="loading"></div>Loading...';
$(document).ready(function() {
	console.log("page loaded");

	function get_string(callback) {
		console.log("getting string...");
		//do stuff
		$.ajax({
			url: 'http://challenge.code2040.org/api/reverse',
			type: 'POST',
			dataType: 'text',
			data: {
				token: my_token
			},
			success: function(data) {
				console.log(data);
				$("#step2_word_forward").val(data);
				callback(null, data)
			},
			error: function(err) {
				callback(err);
			}
		})
	}

	function reverse_string(str, callback) {
		console.log("reversing string...");
		//do stuff
		rev = str.split("").reverse().join("");
		$("#step2_word_reversed").val(rev)
		console.log(rev);
		callback(null, rev);
	}

	function send_reverse(str, callback) {
		console.log("sending the reverse...");
		console.log("we got: ", str);
		//do stuff
		$.ajax({
			url: 'http://challenge.code2040.org/api/reverse/validate',
			type: "post",
			data: {
				token: my_token,
				string: str
			},
			success: function(data) {
				console.log(data);
				$('step2_response').val(data);
				callback(null, data);
			},
			error: function(err) {
				console.log(err);
				callback(err)
			}
		});

	}


	function run_step_2(done) {
		console.log("Starting..");
		$('#step2_do').html(loading_inner);

		async.waterfall([
			get_string,
			reverse_string,
			send_reverse
		], function(err, res) {
			if (err) {
				console.log("error");
				console.log(err);
				$('#step2_do').removeClass("btn-primary").addClass("btn-error");
				$('#step2_response').html(err + "🤔");
				return;
			}
			$('#step2_do').removeClass("btn-primary").addClass("btn-success").html('do it again?');
			$('#step2_response').html(res + "👍🏽");
		});
	}

	$('#step2_do').click(run_step_2);
});