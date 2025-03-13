
function normalize(path) {
  path = path.replace(/\\/g, "/")
  path = path.replace(/\/{2,}/g, "/");
  var parts    = path.split("/"),
      absolute = isAbsolute(path),
      prefix   = "";
  if (absolute)
      prefix = parts.shift() + "/";
  for (var i = 0; i < parts.length;) {
      if (parts[i] === "..") {
          if (i > 0 && parts[i - 1] !== "..")
              parts.splice(--i, 2);
          else if (absolute)
              parts.splice(i, 1);
          else
              ++i;
      } else if (parts[i] === ".")
          parts.splice(i, 1);
      else
          ++i;
  }
  prefix = prefix.includes('//') ? prefix : prefix + '/'
  return prefix + parts.join("/");
};

function isAbsolute(path) {
  return /^(?:\/|\w+:)/.test(path);
};
console.log(normalize('https://static.hnyequ.cn/h5/js/pbmsg/client_pb.json?refresh=1352454554'))