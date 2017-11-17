$(function () {
    $("#submit").click(function() {
        var month = $("#month").val();
        var day = $("#day").val();
        var year = $("#year").val();
        var birthday = {"month": month, "day": day, "year": year};
        birthday = JSON.stringify(birthday);
        console.log("birthday: ", birthday);
        $.ajax({
            url: 'https://wooddecor.herokuapp.com/calculate',
            type: 'post',
            data: birthday,
            dataType: 'json',
            contentType: 'application/json'
        }).done(function(age) {
            console.log("age: ", age);
            document.getElementById("title").innerHTML = "Congratulations! You have lived for:";
            document.getElementById("years").innerHTML = age.years + " Years";
            document.getElementById("months").innerHTML =  age.months + " Months";
            document.getElementById("weeks").innerHTML = age.weeks + " Weeks";
            document.getElementById("days").innerHTML = age.days + " Days";
            document.getElementById("hours").innerHTML = age.hours + " Hours";
            document.getElementById("minutes").innerHTML = age.minutes + " Minutes";
            document.getElementById("seconds").innerHTML = age.seconds + " Seconds";
        }).fail(function() {
            console.error("ERROR - Failed to submit birthday");
        });
    });
});
