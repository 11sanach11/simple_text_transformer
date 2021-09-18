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
  var text = 'Количество строк: ' + result.length;
  $('#result_area_items_counter').text(text);
  $("#result_area").val(result.join("\n"));
}

GLOBAL_DIRTY_STORAGE = {};
const areas = ['comments_area', 'blocks_area'];
for (var areaIndex in areas) {
  const area = areas[areaIndex];
  if (GLOBAL_DIRTY_STORAGE[area + "_messasge_counter_event"] == undefined) {
    console.log("For area: " + area);
    $("#" + area).on('change paste', function() {
      var text = 'Количество строк: ' + ($(this).val().split("\n").length);
      $('#' + area + '_items_counter').text(text);
    });
    GLOBAL_DIRTY_STORAGE[area + "_messasge_counter_event"] = true;
  }
}
