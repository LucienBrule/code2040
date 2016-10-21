$(document).ready(function($) {


	function my_own_indexOf(needle, haystack) { // expects unsorted data, runs in n time.
		var position = 0;
		while (position < haystack.length) {
			var item = haystack[position];
			if (needle == haystack[position]) {
				return position;
			}
			position++;
		}
		console.log("needle not found :(");
		return null;
	}

	function get_haystack(callback) {
		$.ajax({
			url: "http://challenge.code2040.org/api/haystack/",
			type: 'POST',
			dataType: 'json',
			data: {
				token: my_token
			},
			success: function(data) {
				$("#step3_needle").text(JSON.stringify(data.needle, null, '\t'));
				$("#step3_haystack").text(JSON.stringify(data.haystack, null, '\t'));
				console.log(data);
				callback(null, data);
			},
			error: function(err) {
				console.log("error");
				callback(err);
			}
		});
	}

	function find_needle(data, callback) {
		var pos = my_own_indexOf(data.needle, data.haystack);
		// var pos =  data.haystack.indexOf(data.needle);
		console.log("pos: " + pos);
		$("#step3_needle").append("position: " + JSON.stringify(pos, null, '\t'));
		callback(null, pos);
	}

	function report_needle_position(pos, callback) {
		$.ajax({
			url: 'http://challenge.code2040.org/api/haystack/validate',
			type: 'POST',
			data: {
				token: my_token,
				needle: pos
			},
			success: function(data) {
				callback(null, data)
					// console.log(data);
			},
			error: function(err) {
				callback()
				console.log(err);
			}
		})
	}

	function run_step_3() {
		$('#step3_do').html(loading_inner);
		async.waterfall([
			get_haystack,
			find_needle,
			report_needle_position
		], function(err, res) {
			if (err) {
				console.log("error");
				console.log(err);
				$('#step3_do').removeClass("btn-primary").addClass("btn-error");
				$('#step3_response').html(err + "🤔");
				return;
			}
			$('#step3_do').removeClass("btn-primary").addClass("btn-success").html('do it again?');
			$('#step3_response').html(res + "👍🏽");
		});
	}
	$('#step3_do').click(run_step_3);
});