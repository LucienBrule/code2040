$(document).ready(function($) {


    function get_data_from_server(callback) {
        $.ajax({
            url: "http://challenge.code2040.org/api/prefix",
            type: "POST",
            data: {
                token: my_token
            },
            success: function(data) {
                console.log(data);
                callback(null, data);
            },
            error: function(err) {

            }
        });
    }

    //apple-esque verbose naming conventions ftw (lack of creatity rn)
    function generate_array_of_not_prefixes(data, callback) {
        var report = [];
        data.array.forEach(function(i) {
            if (!i.startsWith(data.prefix)) {
                report.push(i);
            }
        })
        console.log(report);
        $("#step4_vis").text(JSON.stringify(report, null, '\t'));

        callback(null, report);

    }

    function report_array_of_not_prefixes(data, callback) {
        $.ajax({
            url: 'http://challenge.code2040.org/api/prefix/validate',
            type: 'POST',
            data: {
                token: my_token,
                array: data
            },
            success: function(data) {
                console.log(data);
                callback(null, data);
            },
            error: function(err) {
                console.log(err);
                callback(null, err);
            }
        })

    }

    function run_step_4() {
        $('#step4_do').html(loading_inner);

        async.waterfall([
            get_data_from_server,
            generate_array_of_not_prefixes,
            report_array_of_not_prefixes
        ], function(err, res) {
            if (err) {
                console.log("error");
                console.log(err);
                $('#step4_do').removeClass("btn-primary").addClass("btn-error");
                // $('#step5_vis').text(err + "🤔");
                return;
            }
            $('#step4_do').removeClass("btn-primary").addClass("btn-success").html('do it again?');
            // $('#step5_response').html(res + "👍🏽"););
        });
    }
    $('#step4_do').click(run_step_4);

});
