
$("button").click(function () {
    $("h1").css("color", "purple");
});


$("input").keypress(function (e) {
    $("h1").text(e.key);
    $("input").val("");
});