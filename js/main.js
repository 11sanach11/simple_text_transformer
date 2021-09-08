const transform = function() {
  var comments = $("#comments_area").val().split("\n").map(v => v.replace("\r", ""));
  var blocks = $("#blocks_area").val().split("\n").map(v => v.replace("\r", ""));
  var isSetDogsInStart = $("#is_set_dog_in_start").prop("checked");
  var reduceByRecords = $("#is_reduce_records").prop("checked") ? new Number($("#reduce_records_value").val()).valueOf() : 1;
  console.log("isSetDogsInStart: " + isSetDogsInStart);
  console.log("reduceByRecords: " + reduceByRecords);
  var result = [];
  var commentIndex = 0;
  var blockIndex = 0;
  while (blockIndex < blocks.length) {
    var endBlock = blockIndex + reduceByRecords;
    var blockArray = [];
    for (; blockIndex < endBlock && blockIndex < blocks.length; blockIndex++) {
      blockArray.push((isSetDogsInStart ? "@" : "") + blocks[blockIndex]);
    }
    result.push(comments[commentIndex] + " " + blockArray.join(" "));
    commentIndex++;
    if (commentIndex >= comments.length) {
      commentIndex = 0;
    }
  }
  console.log("Result: " + result.join("\n"));
  $("#result_area").val(result.join("\n"));
}
