module.exports = function(api) {
  api.cache(true);
  return {
    sourceType: "unambiguous",
    presets: ['babel-preset-expo']
    
  };
  
};
