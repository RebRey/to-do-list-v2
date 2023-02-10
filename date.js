// date generator with weekday, month, and day format
// export the return value "day" to app.js by using node.js
exports.getDate = function(){
const today = new Date();
const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
};

// function needs to output the date with the options selected (weekday,month,date)
return today.toLocaleDateString("eng-US", options);
};

// date generator with day only format
// export the return value "day" to app.js by using node.js

exports.getWeekDay = function(){
const today = new Date();
const options = {
    weekday: "long",
};
// function needs to output the date with the options selected (weekday only)
return today.toLocaleDateString("eng-US", options);


};
